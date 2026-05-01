# BahariTrip — Product Requirements Document

## Original Problem Statement
"Build me the landing page" untuk **BahariTrip** — platform booking wisata bahari Indonesia. Saat ini fokus di Wakatobi, Sulawesi Tenggara, target wisatawan nasional. Backend Rails dikerjakan oleh user di luar Emergent (opsi C — Rails not supported di Emergent).

## Stack
- Frontend: React 19 + Tailwind + Shadcn/UI
- Backend Rails 7.2: dikerjakan terpisah oleh user (di luar Emergent)
- /app FastAPI+MongoDB template tidak digunakan

## What's Been Implemented

### Public Landing Page (DONE)
- `/` — Hero, Destinasi (Wangi-Wangi/Tomia/Hoga), Aktivitas, Cara Kerja, Testimoni, Mitra CTA, Footer + Newsletter
- Konten Bahasa Indonesia, fokus Wakatobi
- Brand "Organic & Earthy": teal #005F73, coral #E05D36, sand #E9D8A6
- Typography: **Bricolage Grotesque** (heading) + **Outfit** (body) — sans-serif modern editorial
- Files: `/app/frontend/src/components/landing/*.jsx`

### Dashboard UI — Customer / Mitra / Admin (DONE — mock data)
Routes:
- `/dashboard` — Role selector demo (3 cards)
- `/dashboard/customer/booking|wishlist|profil` — Customer dashboard
- `/dashboard/mitra/overview|produk|jadwal|booking` — Mitra/Operator dashboard
- `/dashboard/admin/overview|mitra|booking|pembayaran` — Admin panel

Komponen utama:
- `/app/frontend/src/components/dashboard/` — Sidebar (navy), Topbar (role switcher), DashboardLayout, KpiCard, StatusBadge, EmptyState, PageHeader
- Mock data: `/app/frontend/src/lib/mockData.js`
- Pages: `/app/frontend/src/pages/{customer,mitra,admin}/*.jsx`

Halaman fungsional:
- **Customer**: Booking dengan tab status + KPI cards, Wishlist grid, Profile form
- **Mitra**: Overview dengan KPI + revenue bar chart + booking table, Produk dengan filter table, Jadwal kalender Januari 2026, Booking dengan tab filter
- **Admin**: Platform overview dengan GMV chart + persetujuan antrean + top mitra + activity log, Mitra approval dengan dialog, Booking oversight, Pembayaran/payout dengan tabs

Komponen Shadcn dipakai: Tabs, Dialog, DropdownMenu, Avatar, Sheet (mobile sidebar), Toast (sonner)

### Dashboard Design Guidelines
- File: `/app/dashboard_design_guidelines.json`

## Mocked / Not Working
- **All dashboard data** — array statis dari `mockData.js`, tidak konek backend Rails
- **Search bar hero, semua CTA "Pesan Sekarang/Masuk"** — UI only
- **Newsletter form** — toast sukses saja, tidak kirim email
- **Approve/Reject mitra** — toast saja, tidak update state
- **Auth flow** — tidak ada, semua route dashboard public

## Backlog (Prioritized)

### P0
- Integrasi semua dashboard ke API Rails (perlu base URL + auth token)
- Auth flow (Devise di Rails atau Emergent Google Auth)
- Hero search functional (date picker, destination select)

### P1
- Halaman detail produk + flow booking lengkap
- Form CRUD produk (multi-step) untuk mitra
- Form review setelah booking selesai
- Jadwal feri manual CRUD untuk admin
- Newsletter actual (Resend/SendGrid)
- Pesan/inbox real-time mitra-customer

### P2
- Multi-language (ID/EN)
- Detail booking modal/page dari list
- File upload UI dengan drag & drop
- Notifikasi real-time
- Analytics tracking

## Next Action Items
- User implements Rails backend with matching API endpoints
- Connect dashboards to Rails: provide REACT_APP_BACKEND_URL pointing to Rails domain
- Decide auth strategy
