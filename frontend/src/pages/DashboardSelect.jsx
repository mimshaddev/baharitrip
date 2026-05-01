import { Link } from "react-router-dom";
import { Compass, Briefcase, Shield, ArrowUpRight } from "lucide-react";

const cards = [
  {
    role: "customer",
    label: "Customer",
    title: "Akun Saya",
    desc: "Kelola booking, wishlist, dan profil perjalanan Anda di Wakatobi.",
    icon: Compass,
    to: "/dashboard/customer/booking",
    bg: "from-[#0A9396] to-[#005F73]",
  },
  {
    role: "mitra",
    label: "Mitra",
    title: "Mitra Dashboard",
    desc: "Kelola produk, jadwal trip, dan reservasi tamu Anda.",
    icon: Briefcase,
    to: "/dashboard/mitra/overview",
    bg: "from-[#E05D36] to-[#B35A00]",
  },
  {
    role: "admin",
    label: "Admin",
    title: "Admin Panel",
    desc: "Pantau platform, kelola mitra, payout, dan oversight booking.",
    icon: Shield,
    to: "/dashboard/admin/overview",
    bg: "from-[#0B1D2E] to-[#0A1929]",
  },
];

export default function DashboardSelect() {
  return (
    <main
      data-testid="role-select-page"
      className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] font-medium text-[#0A9396] mb-4">
            Demo Dashboard · BahariTrip
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#0A1929]">
            Pilih sudut pandang.
          </h1>
          <p className="mt-4 text-base text-[#64748B] leading-relaxed">
            Telusuri dashboard untuk tiga peran utama di platform BahariTrip — semua
            tampilan menggunakan data demo dan dapat ditukar kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Link
              key={c.role}
              to={c.to}
              data-testid={`role-card-${c.role}`}
              className="group relative rounded-3xl overflow-hidden p-8 text-white bg-gradient-to-br hover:scale-[1.015] transition-transform"
              style={{ minHeight: 320 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.bg}`} />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                    <c.icon size={22} strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <div className="mt-auto">
                  <p className="text-xs uppercase tracking-[0.22em] opacity-70 mb-2">
                    {c.label}
                  </p>
                  <h3 className="font-serif text-3xl tracking-tight leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm opacity-80 mt-3 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            data-testid="back-to-landing"
            className="text-sm text-[#64748B] hover:text-[#0A1929] underline underline-offset-4"
          >
            ← Kembali ke landing page
          </Link>
        </div>
      </div>
    </main>
  );
}
