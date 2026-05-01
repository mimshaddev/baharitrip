# CLAUDE.md — BahariTrip Project Context

> Dokumen ini adalah konteks proyek untuk Claude Code (atau AI assistant lain). Berisi overview sistem, arsitektur, konvensi, dan hal-hal yang WAJIB / JANGAN dilakukan saat development.

---

## 1. Proyek Overview

**BahariTrip** adalah platform booking wisata bahari Indonesia — saat ini fokus di Wakatobi, Sulawesi Tenggara, dengan target wisatawan nasional.

Platform menyediakan:
- Booking tur, penyelaman, snorkeling, dan penginapan
- Marketplace antara wisatawan ↔ operator lokal
- Pembayaran terintegrasi (Midtrans)
- Dashboard manajemen untuk 3 peran: Customer, Mitra/Operator, Admin

### Target user
- **Customer (Tamu)**: wisatawan domestik Indonesia
- **Mitra/Operator**: penyedia jasa lokal di Wakatobi (dive center, hotel, tour guide)
- **Admin**: tim platform BahariTrip

### Regions (fase awal)
- Wangi-Wangi (gateway)
- Tomia (diving)
- Kaledupa / Hoga (snorkeling & research station)
- Binongko

---

## 2. Arsitektur Sistem

Proyek ini dibagi menjadi **dua repositori terpisah**:

### 2.1 Frontend — `baharitrip-frontend` (sudah selesai MVP)
- **Stack**: React 19 + Tailwind + Shadcn/UI
- **Host**: Emergent platform (preview URL)
- **Status**: Landing page + dashboard (Customer/Mitra/Admin) dengan mock data — siap diintegrasikan ke API
- **Struktur mock data** ada di `src/lib/mockData.js` — backend API harus return shape yang sama

### 2.2 Backend — `baharitrip-api` (repositori ini)
- **Stack**: Ruby on Rails 7.2 (API-only) + PostgreSQL + Redis + Sidekiq
- **Host**: Railway / Render / Fly.io (BUKAN Emergent — Rails tidak didukung di Emergent)
- **Status**: akan dibangun dari nol
- **Tanggung jawab**: data, bisnis logic, auth, pembayaran, notifikasi, webhook

---

## 3. Tech Stack Backend (Rails)

| Area | Pilihan |
|---|---|
| Framework | Rails 7.2 API-only |
| Database | PostgreSQL 15+ |
| Cache / Job queue | Redis + Sidekiq |
| Auth | Devise + devise-jwt |
| Authorization | Pundit |
| Serializer | Alba |
| Search / filter | Ransack |
| State machine | AASM (untuk Booking) |
| Pagination | Pagy |
| File storage | Active Storage + Cloudflare R2 |
| Payments | Midtrans |
| Flight search (opsional) | Amadeus |
| Notifikasi | WhatsApp Business API + email via SendGrid/Resend |
| Testing | RSpec + FactoryBot + Faker + Shoulda Matchers |
| CORS | rack-cors |

---

## 4. Struktur Database

Schema lengkap ada di `db/schema.rb`. Ringkasannya:

- `users` — semua user dengan `role` (customer/operator/admin)
- `partners` — profil bisnis mitra (operator/hotel/dive center)
- `products` — paket tur/dive/hotel yang dijual mitra
- `product_schedules` — jadwal tersedia per produk per tanggal
- `bookings` — reservasi customer (reference: `BTR-XXXX`)
- `payments` — transaksi pembayaran (Midtrans)
- `payouts` — pencairan ke mitra per periode (reference: `PYT-XXXX`)
- `reviews` — review pasca-booking
- `wishlist_items` — simpan produk favorit customer
- `ferry_schedules` — jadwal feri manual (admin input)
- `conversations` + `messages` — chat mitra ↔ customer
- `notifications` — notifikasi in-app per user
- `jwt_denylist` — revoked JWT tokens

### Enums penting (WAJIB pakai nilai ini)

```ruby
User.roles             # customer, operator, admin
Partner.partner_types  # diving, snorkeling, tour, lodging, liveaboard
Partner.statuses       # draft, review, approved, suspended
Product.categories     # diving, snorkeling, tour, lodging, liveaboard
Product.statuses       # draft, active, inactive
Booking.statuses       # pending, confirmed, completed, cancelled
Booking.payment_statuses # unpaid, paid, refunded
Payment.statuses       # pending, paid, failed, refunded
Payout.statuses        # unpaid, processing, paid
```

---

## 5. Struktur Kode

```
app/
├── controllers/
│   └── api/
│       └── v1/
│           ├── auth/          # login, register, logout, password reset
│           ├── me/            # customer endpoints (prefix: /api/v1/me)
│           ├── operator/      # mitra endpoints (prefix: /api/v1/operator)
│           ├── admin/         # admin endpoints (prefix: /api/v1/admin)
│           ├── webhooks/      # midtrans notification
│           ├── products_controller.rb
│           └── search_controller.rb
├── models/
├── serializers/       # Alba serializers
├── services/          # PaymentService, PayoutCalculator, dll
├── jobs/              # Sidekiq jobs
├── policies/          # Pundit policies
└── mailers/
```

### Konvensi
- **Service objects** untuk logika kompleks (bukan di controller/model)
- **Pundit policies** untuk autorisasi — jangan taruh di controller
- **Serializers** untuk semua JSON response — tidak pernah `render json: model` langsung
- **Sidekiq jobs** untuk operasi async (email, WhatsApp, recalculate)
- **State machines (AASM)** untuk lifecycle Booking — jangan update `status` langsung, pakai event

---

## 6. Routes

Semua endpoint ada di `/api/v1/*`. Lihat `config/routes.rb`.

### Public
- `GET  /api/v1/products` — list + filter via Ransack
- `GET  /api/v1/products/:slug`
- `GET  /api/v1/products/:slug/reviews`
- `GET  /api/v1/search?q[...]=...`

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `DELETE /api/v1/auth/logout`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

### Customer (`/api/v1/me/`)
- `GET/PATCH /me/profile`
- `GET/POST /me/bookings` + `GET/POST :id/cancel`
- `POST /me/bookings/:id/reviews`
- `GET/POST/DELETE /me/wishlist`
- `GET/PATCH /me/notifications`
- `GET/POST /me/conversations/:id/messages`

### Operator (`/api/v1/operator/`)
- `GET /operator/stats`
- `CRUD /operator/products` + nested `schedules`
- `GET /operator/bookings` + `:id/confirm|cancel|message`
- `GET/PATCH /operator/profile`

### Admin (`/api/v1/admin/`)
- `GET /admin/stats`
- `CRUD /admin/partners` + `:id/approve|reject|suspend`
- `GET /admin/bookings`
- `CRUD /admin/payouts` + `:id/process`
- `CRUD /admin/users`
- `CRUD /admin/ferry_schedules`
- `GET/DELETE /admin/reviews` (moderasi)

---

## 7. Response Format (WAJIB ikuti struktur ini)

Frontend sudah expect struktur data tertentu. Wajib match.

### POST `/api/v1/auth/login`
```json
{
  "user": {
    "id": 1,
    "name": "Ayu Pramudita",
    "email": "ayu@example.com",
    "role": "customer",
    "avatar_url": "https://..."
  },
  "token": "eyJ..."
}
```

### GET `/api/v1/me/bookings`
```json
{
  "data": [
    {
      "id": "BTR-1042",
      "product": "Roma Reef Dive Package",
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

### GET `/api/v1/operator/stats`
```json
{
  "kpi": [
    { "label": "Booking Hari Ini", "value": "12", "delta": "+18%", "trend": "up" }
  ],
  "revenue_chart": [{ "m": "Jul", "v": 38 }],
  "distribution": { "Diving": 64, "Snorkeling": 42 }
}
```

### GET `/api/v1/admin/stats`
Pattern sama — KPI: GMV, Booking Aktif, Mitra Aktif, Pengguna Baru.

**Aturan format**:
- Uang: string format Indonesia `"Rp 4.800.000"`
- Tanggal: string manusiawi `"12 Jan 2026"` atau range `"12 - 14 Jan 2026"`
- Status: kebab value sesuai enum (`"confirmed"`, `"pending"`, dll)
- Pagination: `{ page, total, per_page }` di `meta`

---

## 8. Environment Variables

```
DATABASE_URL=
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=https://...preview.emergentagent.com

JWT_SECRET=
DEVISE_JWT_SECRET_KEY=

MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=

AMADEUS_CLIENT_ID=        # optional
AMADEUS_CLIENT_SECRET=    # optional
WHATSAPP_API_KEY=         # optional
SENDGRID_API_KEY=         # optional
```

Semua harus ada di `.env.example` dan dibaca via `ENV.fetch`.

---

## 9. Cara Menjalankan

### Development
```bash
bundle install
cp .env.example .env  # isi nilai-nya
rails db:create db:migrate db:seed
bin/dev  # menjalankan rails server + sidekiq via Procfile.dev
```

Server dev: `http://localhost:3000`  
Sidekiq UI: `http://localhost:3000/sidekiq`

### Test
```bash
bundle exec rspec
```

### Sandbox credentials (dari seed)
- Admin: `admin@baharitrip.id` / `admin123`
- Operator: `ops@tomiadive.id` / `password123`
- Customer: `ayu@baharitrip.id` / `password123`

---

## 10. Business Flows Utama

### 10.1 Flow Booking & Pembayaran
1. Customer pilih produk + tanggal + jumlah tamu
2. `POST /api/v1/me/bookings` → server buat `Booking` dengan status `pending`, `payment_status: unpaid`
3. Server panggil `PaymentService#create_snap_token` → return Midtrans snap token
4. Frontend buka Midtrans Snap → user bayar
5. Midtrans kirim webhook ke `POST /api/v1/webhooks/midtrans`
6. Controller validasi signature, update `Payment.status = paid`, `Booking.payment_status = paid`
7. Trigger `BookingConfirmationEmailJob` + notifikasi WhatsApp + decrement `product_schedule.booked`
8. Booking tetap `pending` sampai operator `confirm` (bisa auto-confirm kalau ada auto-approval rule)

### 10.2 Flow Approval Mitra
1. Mitra daftar via `POST /api/v1/auth/register` dengan role awal `operator`
2. Mitra isi `Partner` profile via `PATCH /operator/profile` — status jadi `review`
3. Admin lihat di `/admin/partners` → review → `approve|reject|suspend`
4. Kalau approved: kirim email welcome, partner bisa publish produk

### 10.3 Flow Payout Mitra
1. Tanggal 1 tiap bulan, `PayoutCalculationJob` jalan
2. Hitung GMV mitra bulan sebelumnya dari bookings `completed`
3. Buat `Payout` record dengan status `unpaid`
4. Admin review di `/admin/payouts` → klik `process_payout` → transfer manual / integrasi dengan bank API
5. Status jadi `paid`, kirim notifikasi ke mitra

---

## 11. Integrasi Eksternal

### Midtrans
- **Sandbox**: `https://api.sandbox.midtrans.com`
- **Production**: `https://api.midtrans.com`
- **Webhook URL** (set di dashboard Midtrans): `https://api.baharitrip.id/api/v1/webhooks/midtrans`
- **Service class**: `app/services/payment_service.rb`
- **Validasi signature** wajib di webhook handler

### Amadeus (opsional — untuk flight search)
- Informational only — bukan booking langsung
- Cache response 1 jam untuk hemat quota
- Fallback: link ke Google Flights kalau API down

### Cloudflare R2 (Active Storage)
- S3-compatible — gunakan adapter `s3` di `storage.yml`
- Public bucket untuk gambar produk
- Generate CDN URL via Rails

### WhatsApp Business API
- Template message untuk booking confirmation + reminder H-1
- Fallback ke email kalau WA gagal

---

## 12. JANGAN LAKUKAN ❌

1. **Jangan pakai ActiveAdmin** — admin panel sudah ada di frontend React
2. **Jangan generate views / helpers / assets** — ini API-only
3. **Jangan bypass Pundit** — setiap endpoint controller yang return data WAJIB `authorize` atau `policy_scope`
4. **Jangan simpan password / key di git** — semua via `.env` + `Rails.application.credentials.dig`
5. **Jangan update `booking.status` langsung** — pakai AASM event (`booking.confirm!`)
6. **Jangan hardcode URL frontend** — pakai `ENV['FRONTEND_URL']`
7. **Jangan skip test** — minimal coverage 80% untuk model + controller + policy
8. **Jangan kirim `_id` field dari MongoDB** — (N/A di PG, tapi serializer harus clean)
9. **Jangan cache webhook response** — selalu proses fresh
10. **Jangan rubah shape response JSON** yang sudah didefinisikan di section 7 — frontend akan pecah

---

## 13. WAJIB LAKUKAN ✅

1. **Serializer untuk SEMUA response** — Alba
2. **Pagy** untuk semua list endpoint — default 20 per page
3. **Strong params** di semua controller
4. **N+1 check** — pakai `bullet` gem di dev
5. **Sidekiq** untuk semua operasi > 500ms (email, webhook retry, payout calc)
6. **Rate limiting** di auth endpoints — pakai `rack-attack`
7. **Log semua webhook** raw payload ke DB (untuk audit)
8. **Money via `money-rails`** — jangan pakai BigDecimal mentah untuk currency
9. **Time zone** default `Asia/Makassar` untuk Wakatobi
10. **CORS** hanya allow domain `ENV['FRONTEND_URL']` di production

---

## 14. Production Checklist (sebelum go-live)

- [ ] SSL enforced (`config.force_ssl = true`)
- [ ] Database backup otomatis harian
- [ ] Sidekiq dashboard protected dengan basic auth
- [ ] Rack::Attack rate limit di endpoint sensitif (login, forgot-password, webhook)
- [ ] Error monitoring: Sentry / Honeybadger
- [ ] Application monitoring: AppSignal / NewRelic
- [ ] Log aggregation: Logtail / Papertrail
- [ ] Health check endpoint `/up` (bawaan Rails 7.1+)
- [ ] Robot.txt + sitemap (kalau ada SEO pages)
- [ ] GDPR / UU PDP compliance — endpoint data export + deletion untuk user
- [ ] Seed production admin dengan password kuat
- [ ] Midtrans production mode + webhook URL sudah di-register
- [ ] Active Storage → R2 production bucket
- [ ] All ENV variables set di production (Railway/Render/Fly)
- [ ] Cron Sidekiq schedule aktif
- [ ] CORS origin hanya domain frontend production

---

## 15. Git Workflow

- Branch: `main` (production) + `develop` (staging) + feature branches
- Commit message: conventional commits (`feat:`, `fix:`, `chore:`, dll)
- PR template: deskripsi + testing notes + breaking changes
- CI: GitHub Actions — jalankan rspec + rubocop sebelum merge

---

## 16. Kontak & Referensi

- **Frontend repo**: `baharitrip-frontend` (di Emergent / GitHub terpisah)
- **Design guidelines**: lihat `dashboard_design_guidelines.json` di frontend repo
- **Mock data reference**: `src/lib/mockData.js` di frontend repo — gunakan sebagai sumber kebenaran untuk shape JSON response

---

**Catatan penutup untuk Claude Code**:  
Saat bekerja di repo ini, selalu cek `CLAUDE.md` ini di awal sesi. Kalau ada ambiguitas yang tidak tercover di sini, tanya dulu sebelum eksekusi. Jangan buat asumsi tentang skema atau format response tanpa konfirmasi.
