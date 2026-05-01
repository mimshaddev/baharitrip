# Instruksi Claude Code — Bangun Backend BahariTrip (Ruby on Rails)

> **Cara pakai**: Copy seluruh dokumen ini dan berikan ke Claude Code sebagai prompt pertama di project Rails baru. Claude Code akan mengeksekusi bertahap. Eksekusi per-section untuk kontrol lebih baik.

---

## Konteks Proyek

Anda membangun backend API-only untuk **BahariTrip** — platform booking wisata bahari Indonesia (fokus awal: Wakatobi, Sulawesi Tenggara). Target wisatawan nasional. 3 role user: Customer, Operator/Mitra, Admin.

Frontend React sudah selesai di project terpisah (Emergent). Backend Rails ini harus menyediakan JSON API yang cocok dengan struktur data frontend. Struktur data reference akan saya beri di section khusus.

### Tech Stack (WAJIB)
- Ruby 3.3+
- Rails 7.2 (API mode)
- PostgreSQL 15+
- Redis (untuk Sidekiq & cache)
- Gems: `devise`, `devise-jwt`, `pundit`, `sidekiq`, `pagy`, `alba` (serializer), `rack-cors`, `image_processing` + `active_storage` dengan Cloudflare R2, `ransack` (search), `aasm` (state machine booking), `money-rails`, `midtrans-client`, `rspec-rails`, `factory_bot_rails`, `faker`, `shoulda-matchers`

---

## SECTION 1 — Setup Awal

```bash
rails new baharitrip_api --api --database=postgresql -T
cd baharitrip_api
```

Tambahkan ke `Gemfile`:

```ruby
gem 'devise'
gem 'devise-jwt'
gem 'pundit'
gem 'sidekiq'
gem 'pagy'
gem 'alba'
gem 'rack-cors'
gem 'image_processing'
gem 'aws-sdk-s3', require: false  # untuk Cloudflare R2
gem 'ransack'
gem 'aasm'
gem 'money-rails'
gem 'midtrans-client'
gem 'httparty'  # untuk Amadeus

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'shoulda-matchers'
  gem 'pry-rails'
end
```

Jalankan:
```bash
bundle install
rails generate rspec:install
rails active_storage:install
rails db:create
```

Config CORS di `config/initializers/cors.rb`:
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('FRONTEND_URL', 'http://localhost:3000')
    resource '*',
      headers: :any,
      expose: %w[Authorization],
      methods: %i[get post put patch delete options head]
  end
end
```

Buat `.env` dengan variabel:
```
DATABASE_URL=
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=https://your-emergent-app.preview.emergentagent.com
JWT_SECRET=
DEVISE_JWT_SECRET_KEY=
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
AMADEUS_CLIENT_ID=
AMADEUS_CLIENT_SECRET=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=
WHATSAPP_API_KEY=
```

---

## SECTION 2 — Database Schema

Buat migrations untuk model berikut. **PENTING**: ikuti nama kolom persis seperti di bawah agar match struktur frontend.

### Users
```ruby
create_table :users do |t|
  t.string :email, null: false, index: { unique: true }
  t.string :encrypted_password, null: false
  t.string :reset_password_token
  t.datetime :reset_password_sent_at
  t.datetime :remember_created_at
  t.string :name, null: false
  t.string :phone
  t.string :city
  t.text :bio
  t.string :avatar_url
  t.integer :role, default: 0, null: false  # enum: customer, operator, admin
  t.boolean :active, default: true
  t.datetime :last_sign_in_at
  t.timestamps
end
```

### Jti denylist (untuk devise-jwt)
```ruby
create_table :jwt_denylist do |t|
  t.string :jti, null: false, index: true
  t.datetime :exp, null: false
end
```

### Partners (Mitra/Operator profiles)
```ruby
create_table :partners do |t|
  t.references :user, null: false, foreign_key: true
  t.string :name, null: false
  t.string :owner_name
  t.integer :partner_type, default: 0  # diving, snorkeling, tour, lodging, liveaboard
  t.string :location
  t.string :region  # Wakatobi, dll
  t.text :description
  t.string :logo_url
  t.integer :status, default: 0  # draft, review, approved, suspended
  t.integer :commission_percent, default: 15
  t.decimal :rating, precision: 3, scale: 2
  t.integer :total_bookings, default: 0
  t.datetime :approved_at
  t.timestamps
end
```

### Products
```ruby
create_table :products do |t|
  t.references :partner, null: false, foreign_key: true
  t.string :name, null: false
  t.string :slug, index: { unique: true }
  t.integer :category, default: 0  # diving, snorkeling, tour, lodging, liveaboard
  t.text :description
  t.text :inclusions, array: true, default: []
  t.string :duration  # "1 hari", "3 hari 2 malam"
  t.string :location
  t.string :region
  t.decimal :price_idr, precision: 12, scale: 2, null: false
  t.integer :min_guests, default: 1
  t.integer :max_guests, default: 10
  t.integer :lead_time_days, default: 2
  t.integer :status, default: 0  # draft, active, inactive
  t.decimal :rating, precision: 3, scale: 2
  t.integer :bookings_count, default: 0
  t.timestamps
end

# Foto produk pakai Active Storage has_many_attached
```

### Product Schedules (jadwal operasional)
```ruby
create_table :product_schedules do |t|
  t.references :product, null: false, foreign_key: true
  t.date :date, null: false
  t.time :start_time
  t.time :end_time
  t.integer :capacity, default: 10
  t.integer :booked, default: 0
  t.boolean :blackout, default: false
  t.timestamps
  t.index [:product_id, :date], unique: true
end
```

### Bookings
```ruby
create_table :bookings do |t|
  t.string :reference, null: false, index: { unique: true }  # BTR-1042
  t.references :user, null: false, foreign_key: true  # customer
  t.references :product, null: false, foreign_key: true
  t.references :partner, null: false, foreign_key: true
  t.references :product_schedule, foreign_key: true
  t.date :date, null: false
  t.integer :guests, default: 1
  t.decimal :subtotal, precision: 12, scale: 2
  t.decimal :discount, precision: 12, scale: 2, default: 0
  t.decimal :tax, precision: 12, scale: 2, default: 0
  t.decimal :total, precision: 12, scale: 2
  t.decimal :commission, precision: 12, scale: 2
  t.integer :status, default: 0  # pending, confirmed, completed, cancelled
  t.integer :payment_status, default: 0  # unpaid, paid, refunded
  t.text :customer_notes
  t.text :operator_notes
  t.string :customer_name
  t.string :customer_email
  t.string :customer_phone
  t.datetime :confirmed_at
  t.datetime :completed_at
  t.datetime :cancelled_at
  t.timestamps
end
```

### Payments
```ruby
create_table :payments do |t|
  t.references :booking, null: false, foreign_key: true
  t.string :provider, default: 'midtrans'
  t.string :external_id  # Midtrans transaction_id
  t.string :payment_method  # bca_va, gopay, etc
  t.decimal :amount, precision: 12, scale: 2
  t.integer :status, default: 0  # pending, paid, failed, refunded
  t.datetime :paid_at
  t.jsonb :raw_response, default: {}
  t.timestamps
end
```

### Payouts (pencairan ke mitra)
```ruby
create_table :payouts do |t|
  t.string :reference, null: false, index: { unique: true }  # PYT-204
  t.references :partner, null: false, foreign_key: true
  t.date :period_start
  t.date :period_end
  t.decimal :gross_amount, precision: 12, scale: 2
  t.decimal :commission_amount, precision: 12, scale: 2
  t.decimal :net_amount, precision: 12, scale: 2
  t.integer :status, default: 0  # unpaid, processing, paid
  t.datetime :paid_at
  t.string :bank_name
  t.string :bank_account
  t.timestamps
end
```

### Reviews
```ruby
create_table :reviews do |t|
  t.references :booking, null: false, foreign_key: true
  t.references :user, null: false, foreign_key: true
  t.references :product, null: false, foreign_key: true
  t.integer :rating, null: false  # 1-5
  t.text :comment
  t.boolean :hidden, default: false
  t.timestamps
end
```

### Wishlist
```ruby
create_table :wishlist_items do |t|
  t.references :user, null: false, foreign_key: true
  t.references :product, null: false, foreign_key: true
  t.timestamps
  t.index [:user_id, :product_id], unique: true
end
```

### Ferry Schedules (manual oleh admin)
```ruby
create_table :ferry_schedules do |t|
  t.string :origin
  t.string :destination
  t.date :departure_date
  t.time :departure_time
  t.time :arrival_time
  t.string :operator_name
  t.decimal :price_idr, precision: 12, scale: 2
  t.integer :capacity
  t.text :notes
  t.timestamps
end
```

### Messages (inbox mitra ↔ customer)
```ruby
create_table :conversations do |t|
  t.references :booking, foreign_key: true
  t.references :customer, foreign_key: { to_table: :users }
  t.references :partner, foreign_key: true
  t.timestamps
end

create_table :messages do |t|
  t.references :conversation, null: false, foreign_key: true
  t.references :sender, null: false, foreign_key: { to_table: :users }
  t.text :body
  t.datetime :read_at
  t.timestamps
end
```

### Notifications
```ruby
create_table :notifications do |t|
  t.references :user, null: false, foreign_key: true
  t.string :kind  # booking_confirmed, payment_received, etc
  t.string :title
  t.text :body
  t.string :link
  t.datetime :read_at
  t.timestamps
end
```

Jalankan semua migration:
```bash
rails g migration NamaMigrasi  # untuk tiap tabel di atas
rails db:migrate
```

---

## SECTION 3 — Models + Enums + Validations

Generate model. Contoh critical:

### `app/models/user.rb`
```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  enum role: { customer: 0, operator: 1, admin: 2 }

  has_one :partner, dependent: :destroy
  has_many :bookings, dependent: :restrict_with_error
  has_many :reviews, dependent: :destroy
  has_many :wishlist_items, dependent: :destroy
  has_many :wishlisted_products, through: :wishlist_items, source: :product
  has_many :notifications, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
```

### `app/models/partner.rb`
```ruby
class Partner < ApplicationRecord
  belongs_to :user
  has_many :products, dependent: :destroy
  has_many :bookings
  has_many :payouts

  enum partner_type: { diving: 0, snorkeling: 1, tour: 2, lodging: 3, liveaboard: 4 }
  enum status: { draft: 0, review: 1, approved: 2, suspended: 3 }

  validates :name, presence: true
  scope :published, -> { where(status: :approved) }
end
```

### `app/models/product.rb`
```ruby
class Product < ApplicationRecord
  extend FriendlyId rescue nil
  belongs_to :partner
  has_many :product_schedules, dependent: :destroy
  has_many :bookings
  has_many :reviews
  has_many_attached :images

  enum category: { diving: 0, snorkeling: 1, tour: 2, lodging: 3, liveaboard: 4 }
  enum status: { draft: 0, active: 1, inactive: 2 }

  validates :name, :price_idr, presence: true
  validates :price_idr, numericality: { greater_than: 0 }

  before_validation :generate_slug, on: :create

  private
  def generate_slug
    self.slug = "#{name.parameterize}-#{SecureRandom.hex(3)}" if slug.blank?
  end
end
```

### `app/models/booking.rb`
```ruby
class Booking < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :product
  belongs_to :partner
  belongs_to :product_schedule, optional: true
  has_many :payments, dependent: :destroy
  has_one :review, dependent: :nullify

  enum status: { pending: 0, confirmed: 1, completed: 2, cancelled: 3 }
  enum payment_status: { unpaid: 0, paid: 1, refunded: 2 }, _prefix: :payment

  aasm column: :status, enum: true do
    state :pending, initial: true
    state :confirmed, :completed, :cancelled

    event :confirm do
      transitions from: :pending, to: :confirmed
      after { update(confirmed_at: Time.current) }
    end
    event :complete do
      transitions from: :confirmed, to: :completed
      after { update(completed_at: Time.current) }
    end
    event :cancel do
      transitions from: %i[pending confirmed], to: :cancelled
      after { update(cancelled_at: Time.current) }
    end
  end

  before_validation :generate_reference, on: :create
  before_validation :calculate_total

  private
  def generate_reference
    self.reference ||= "BTR-#{SecureRandom.random_number(10_000).to_s.rjust(4, '0')}"
  end

  def calculate_total
    self.subtotal ||= (product&.price_idr || 0) * guests
    self.commission ||= subtotal * 0.15
    self.total ||= subtotal - discount.to_f + tax.to_f
  end
end
```

Model-model lain (`Payment`, `Payout`, `Review`, `WishlistItem`, `FerrySchedule`, `Conversation`, `Message`, `Notification`) mengikuti pola sama dengan enum + validations sederhana.

---

## SECTION 4 — Authentication (Devise + JWT)

Setup Devise JWT:

```bash
rails g devise:install
rails g devise User  # skip migration, sudah dibuat manual
```

Config di `config/initializers/devise.rb`:
```ruby
config.jwt do |jwt|
  jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
  jwt.dispatch_requests = [
    ['POST', %r{^/api/v1/auth/login$}],
    ['POST', %r{^/api/v1/auth/register$}]
  ]
  jwt.revocation_requests = [
    ['DELETE', %r{^/api/v1/auth/logout$}]
  ]
  jwt.expiration_time = 7.days.to_i
end
```

Controllers:
- `Api::V1::Auth::SessionsController#create` → login, return `{ user, token }`
- `Api::V1::Auth::RegistrationsController#create` → register customer
- `Api::V1::Auth::SessionsController#destroy` → logout (revoke JWT)
- `Api::V1::Auth::PasswordsController` → forgot/reset password

---

## SECTION 5 — Authorization (Pundit)

```bash
rails g pundit:install
```

Buat policies:
- `ProductPolicy` — operator hanya bisa edit produknya sendiri
- `BookingPolicy` — customer lihat booking sendiri, partner lihat booking yang masuk ke produknya, admin lihat semua
- `PartnerPolicy` — admin only untuk approve/reject
- `PayoutPolicy` — admin only untuk create/process

Tiap controller wajib `authorize @record` atau `policy_scope(Model)`.

---

## SECTION 6 — Routes & Controllers (cocok dengan Frontend)

### `config/routes.rb`
```ruby
Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq' if Rails.env.development?

  namespace :api do
    namespace :v1 do
      # Auth
      post   'auth/register', to: 'auth/registrations#create'
      post   'auth/login',    to: 'auth/sessions#create'
      delete 'auth/logout',   to: 'auth/sessions#destroy'
      post   'auth/forgot-password', to: 'auth/passwords#create'
      post   'auth/reset-password',  to: 'auth/passwords#update'

      # Public
      resources :products, only: %i[index show] do
        resources :reviews, only: %i[index]
        member do
          get :schedules
        end
      end

      # Current user (Customer)
      namespace :me do
        resource :profile, only: %i[show update], controller: :profiles
        resources :bookings, only: %i[index show create] do
          member { post :cancel }
          resources :reviews, only: %i[create]
        end
        resources :wishlist, only: %i[index create destroy], param: :product_id
        resources :notifications, only: %i[index] do
          collection { patch :mark_all_read }
          member     { patch :mark_read }
        end
        resources :conversations, only: %i[index show] do
          resources :messages, only: %i[index create]
        end
      end

      # Operator
      namespace :operator do
        get 'stats', to: 'stats#index'
        resources :products do
          resources :schedules, shallow: true
        end
        resources :bookings, only: %i[index show] do
          member do
            post :confirm
            post :cancel
            post :message
          end
        end
        resource :profile, only: %i[show update]
      end

      # Admin
      namespace :admin do
        get 'stats', to: 'stats#index'
        resources :partners do
          member do
            post :approve
            post :reject
            post :suspend
          end
        end
        resources :bookings, only: %i[index show]
        resources :payouts, only: %i[index show create] do
          member { post :process_payout }
        end
        resources :users, only: %i[index show update]
        resources :ferry_schedules
        resources :reviews, only: %i[index destroy]  # moderasi
      end

      # Search
      get 'search', to: 'search#index'
    end
  end
end
```

### Response format yang diharapkan Frontend

**POST `/api/v1/auth/login`**:
```json
{
  "user": { "id": 1, "name": "Ayu Pramudita", "email": "...", "role": "customer", "avatar_url": "..." },
  "token": "eyJ..."
}
```

**GET `/api/v1/me/bookings`**:
```json
{
  "data": [
    {
      "id": "BTR-1042",
      "product": "Wakatobi Diving Trip 3D2N",
      "operator": "Tomia Dive Center",
      "date": "12 - 14 Jan 2026",
      "guests": 2,
      "total": "Rp 4.800.000",
      "status": "confirmed",
      "img": "https://..."
    }
  ],
  "meta": { "page": 1, "total": 12, "per_page": 10 }
}
```

**GET `/api/v1/operator/stats`**:
```json
{
  "kpi": [
    { "label": "Booking Hari Ini", "value": "12", "delta": "+18%", "trend": "up" },
    { "label": "Pendapatan Bulan Ini", "value": "Rp 48,2 jt", "delta": "+22%", "trend": "up" },
    { "label": "Tingkat Okupansi", "value": "76%", "delta": "+5%", "trend": "up" },
    { "label": "Rating Rata-rata", "value": "4.9", "delta": "+0.1", "trend": "up" }
  ],
  "revenue_chart": [
    { "m": "Jul", "v": 38 }, { "m": "Agu", "v": 42 }
  ],
  "distribution": { "Diving": 64, "Snorkeling": 42, "Tour": 18, "Penginapan": 12 }
}
```

**GET `/api/v1/admin/stats`** — pattern sama dengan GMV, booking aktif, mitra aktif, pengguna baru.

Semua endpoint tabel gunakan pagy dan return `meta.page`, `meta.total`, `meta.per_page`.

---

## SECTION 7 — Serializers (Alba)

Contoh `app/serializers/booking_serializer.rb`:
```ruby
class BookingSerializer
  include Alba::Resource
  
  attributes :reference, :date, :guests, :status, :payment_status
  
  attribute :id do |b| b.reference end
  attribute :product do |b| b.product.name end
  attribute :operator do |b| b.partner.name end
  attribute :total do |b| "Rp #{b.total.to_i.to_s(:delimited, delimiter: '.')}" end
  attribute :date do |b| b.date.strftime("%d %b %Y") end
  attribute :img do |b| b.product.images.first&.url end
end
```

Buat serializer untuk: `UserSerializer`, `PartnerSerializer`, `ProductSerializer`, `BookingSerializer`, `ReviewSerializer`, `PayoutSerializer`, `NotificationSerializer`, `ConversationSerializer`, `MessageSerializer`.

---

## SECTION 8 — Background Jobs (Sidekiq)

Buat jobs di `app/jobs/`:
- `BookingConfirmationEmailJob` — kirim email konfirmasi saat status jadi confirmed
- `BookingReminderJob` — H-1 kirim reminder ke customer & operator
- `ReviewRequestJob` — 24 jam setelah completed, kirim email minta review
- `PayoutCalculationJob` — jalan tiap tanggal 1 untuk hitung payout bulan lalu per partner
- `WhatsappNotificationJob` — kirim via WhatsApp API (kalau sudah integrasi)

Cron di `config/sidekiq.yml`:
```yaml
:schedule:
  booking_reminders:
    cron: "0 9 * * *"
    class: BookingReminderJob
  payout_calculation:
    cron: "0 2 1 * *"
    class: PayoutCalculationJob
```

---

## SECTION 9 — Integrasi Midtrans

`app/services/payment_service.rb`:
```ruby
class PaymentService
  def initialize(booking)
    @booking = booking
    @client = Midtrans.client
  end

  def create_snap_token
    response = @client.snap.create_transaction(
      transaction_details: {
        order_id: @booking.reference,
        gross_amount: @booking.total.to_i
      },
      customer_details: {
        first_name: @booking.customer_name,
        email: @booking.customer_email,
        phone: @booking.customer_phone
      },
      item_details: [{
        id: @booking.product_id,
        price: @booking.product.price_idr.to_i,
        quantity: @booking.guests,
        name: @booking.product.name
      }]
    )
    response['token']
  end
end
```

Webhook: `Api::V1::Webhooks::MidtransController#notification` — validasi signature → update `Payment.status` dan `Booking.payment_status`.

---

## SECTION 10 — Search (Ransack)

Di `ProductsController#index`:
```ruby
def index
  @q = Product.active.ransack(params[:q])
  @products = pagy(@q.result.includes(:partner).order(rating: :desc))
  render json: ProductSerializer.new(@products).serializable_hash
end
```

Frontend akan kirim `?q[name_cont]=dive&q[region_eq]=Wakatobi&q[category_eq]=diving&q[price_idr_gteq]=500000`.

---

## SECTION 11 — Seeds

`db/seeds.rb` bikin minimal:
- 1 admin (`admin@baharitrip.id` / password `admin123`)
- 4 partners di Wakatobi (Tomia Dive Center, Hoga Marine, Patuno Wakatobi Resort, Bahari Sail) sesuai data mock frontend
- 4 products per partner
- 30 bookings dengan mix status
- 20 customers dummy

Gunakan Faker + referensi persis dari `frontend/src/lib/mockData.js`.

---

## SECTION 12 — Testing

### RSpec setup `spec/rails_helper.rb`
```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

Tulis spec untuk:
- **Models**: validations + enums + aasm transitions
- **Requests**: setiap endpoint dengan happy path + unauthorized + forbidden
- **Services**: `PaymentService`, `PayoutCalculator`
- **Policies**: tiap policy matrix (customer/partner/admin × action)

Target coverage minimal 80%.

---

## SECTION 13 — Deployment Notes

- Deploy ke Railway / Render / Fly.io (bukan Emergent karena Rails belum didukung)
- Environment variables set semua dari `.env.example` di atas
- Active Storage → Cloudflare R2 (S3-compatible)
- Sidekiq worker harus running sebagai process terpisah
- PostgreSQL connection pool minimal 10
- Konfigurasi `config/environments/production.rb` untuk `force_ssl = true`

---

## SECTION 14 — Urutan Eksekusi

Kerjakan **satu section selesai sebelum lanjut** dan jalankan tests setelah tiap section:

1. Section 1 (setup) → `bundle install && rails db:create`
2. Section 2 (migrations) → `rails db:migrate`
3. Section 3 (models) → `rspec spec/models`
4. Section 4 (auth) → test login/register via curl
5. Section 5 (pundit) → tambah policy specs
6. Section 6 (routes & controllers) untuk Customer namespace → test E2E
7. Section 6 untuk Operator namespace → test E2E
8. Section 6 untuk Admin namespace → test E2E
9. Section 7 (serializers) — confirm response cocok frontend mockData
10. Section 8 (jobs) → tambahkan sidekiq
11. Section 9 (Midtrans) → test sandbox
12. Section 10 (search) → test query
13. Section 11 (seeds) → `rails db:seed`
14. Section 12 (coverage boost)
15. Section 13 (deploy)

---

## Catatan Penting untuk Claude Code

1. **JANGAN pakai ActiveAdmin** — frontend custom dashboard sudah siap. Admin panel diakses via React app, bukan Rails view.
2. **API only** — hapus semua view, asset pipeline, cookie session.
3. **Jangan rubah nama field** yang sudah saya spesifikasikan — frontend sudah expect struktur ini.
4. **Waktu menambah gem baru**, update `Gemfile` lalu `bundle install`.
5. **Setiap commit sebaiknya atomic** — 1 feature = 1 commit.
6. **Kalau ada ambiguitas**, tanya dulu sebelum eksekusi.

---

## Referensi Struktur Data Frontend

Untuk pastikan response API match, baca file mock data frontend di:
```
frontend_project/src/lib/mockData.js
```

File tersebut berisi struktur objek persis yang diekspektasikan frontend untuk:
- `customerBookings`, `wishlist`, `operatorProducts`, `operatorBookings`, `operatorKpi`
- `adminKpi`, `partnerApprovals`, `adminBookings`, `payouts`, `revenueChart`, `userProfile`

**Selesai.** Kirimkan ke Claude Code dan eksekusi per-section.
