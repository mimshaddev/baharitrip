# BahariTrip — Product Requirements Document

## Original Problem Statement
"Build me the landing page" — for **BahariTrip**, a Ruby on Rails marine tourism booking platform serving South Sulawesi, Indonesia (Makassar, Spermonde Islands, Taka Bonerate). Books tours, diving, snorkeling, and hotels.

Subsequent request: define UI/UX guidelines for the dashboard / backend side of the project (Customer, Operator, Admin roles).

## Stack
- Frontend: React 19 + Tailwind + Shadcn/UI (in /app/frontend)
- Backend (existing, external — owned by user): Ruby on Rails 7.2 + PostgreSQL + ActiveAdmin + Devise + Pundit
- The /app FastAPI+MongoDB template backend is **unused** for this task

## User Personas
- **Tamu / Customer** — books tours, diving, accommodation
- **Operator** — local tour/dive/hotel providers managing listings & schedules
- **Admin** — platform managers overseeing users, payments, content

## What's Been Implemented (2025-12)
### Public Landing Page (DONE)
- Single-page React landing at `/` (Indonesian content)
- Sections: Navbar, Hero with search bar + stats, Featured Destinations bento (Makassar, Spermonde, Taka Bonerate), Activities grid (Tur, Diving, Snorkeling, Hotel), How It Works (3 steps), Testimonials marquee, Operator/Mitra CTA, Footer with newsletter
- Brand: Organic & Earthy palette — teal #005F73, coral #E05D36, sand #E9D8A6, cream #FAF8F5, navy #0B1D2E
- Typography: Playfair Display (headings) + Outfit (body)
- All interactive elements have data-testid attributes
- Files: `/app/frontend/src/App.js`, `/app/frontend/src/components/landing/*.jsx`, `/app/frontend/src/index.css`
- Verified via screenshot — renders correctly

### Dashboard Design Guidelines (DONE — blueprint only)
- File: `/app/dashboard_design_guidelines.json`
- Covers all three dashboards (Customer, Operator, Admin), shadcn customizations, color tokens, typography scale, sidebar/topbar/table/form patterns, status badge palette derived from brand colors
- **NOT implemented** — user explicitly chose to stop at design blueprint

## Backlog (Prioritized)

### P0 — when user resumes
- Implement Operator Dashboard (6 pages): Overview, Produk, Jadwal, Booking, Pesan, Statistik
- Implement Customer Dashboard (4 pages): My Bookings, Wishlist, Reviews, Profile
- Implement Admin Panel (4 pages): Overview, Users/Operators, Bookings, Payments+Reports

### P1
- Functional search bar on landing (filter destinations/categories)
- Connect newsletter to actual email service (Resend / SendGrid)
- Authentication flow (Devise on Rails or Emergent Google Auth on React)
- Connect dashboards to real Rails API endpoints (CORS + JSON API on Rails side)

### P2
- Booking flow UI (date selection, guest count, payment via Midtrans)
- Reviews & ratings UI on completed bookings
- Operator approval workflow
- Manual ferry schedules CRUD (admin)
- Multi-language toggle (ID / EN)
- SEO meta tags + Open Graph for landing
- Analytics integration

## Mocked / Not Working
- **Newsletter form** — UI only, shows success toast, does NOT send email
- **Hero search bar** — UI only, does NOT search
- **All CTA buttons (Pesan Sekarang, Masuk, Bergabung Sebagai Mitra)** — UI only, no routing/auth
- **Backend** — landing page is fully static; no Rails or FastAPI integration

## Next Action Items
- Decide whether to implement the dashboards (frontend-only mock or wire to existing Rails backend)
- Provide Rails API base URL + auth scheme if dashboard integration is desired
- Decide newsletter email provider when ready to make signup functional
