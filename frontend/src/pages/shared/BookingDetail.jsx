import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  MessageSquare,
  Check,
  X,
  Download,
  CreditCard,
  Star,
} from "lucide-react";
import {
  DashboardLayout,
  Card,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "../mitra/nav";
import { customerNav } from "../customer/nav";
import { adminNav } from "../admin/nav";
import {
  operatorBookings,
  customerBookings,
  STATUSES,
} from "../../lib/mockData";
import { Toaster, toast } from "sonner";

// Merged data for lookup across roles
const allBookings = [
  ...operatorBookings.map((b) => ({
    ...b,
    operator: "Tomia Dive Center",
    img: "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
    customerEmail: "tamu@email.com",
    customerPhone: "+62 812-1111-2222",
  })),
  ...customerBookings.map((b) => ({
    ...b,
    customer: "Ayu Pramudita",
    customerEmail: "ayu.pramudita@email.com",
    customerPhone: "+62 812-3456-7890",
  })),
];

const findBooking = (id) =>
  allBookings.find((b) => b.id === id) || allBookings[0];

const timeline = [
  { time: "12 Jan 2026, 14:32", title: "Booking dibuat", desc: "Pesanan dimasukkan oleh tamu" },
  { time: "12 Jan 2026, 14:35", title: "Pembayaran diterima", desc: "Via Midtrans · BCA Virtual Account" },
  { time: "12 Jan 2026, 15:10", title: "Booking dikonfirmasi", desc: "Operator menyetujui jadwal" },
  { time: "12 Jan 2026, 15:11", title: "Email konfirmasi terkirim", desc: "Termasuk e-voucher & itinerary" },
];

const navByRole = (role) => {
  if (role === "mitra") return mitraNav;
  if (role === "admin") return adminNav;
  return customerNav;
};

const breadcrumbByRole = (role) => {
  if (role === "mitra") return "Mitra · Booking · Detail";
  if (role === "admin") return "Admin · Booking · Detail";
  return "Akun Saya · Booking · Detail";
};

const backPath = (role) => {
  if (role === "mitra") return "/dashboard/mitra/booking";
  if (role === "admin") return "/dashboard/admin/booking";
  return "/dashboard/customer/booking";
};

export default function BookingDetail({ role = "mitra" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const b = findBooking(id);

  const handleAction = (action) => {
    const messages = {
      confirm: "Booking telah dikonfirmasi",
      cancel: "Booking telah dibatalkan",
      contact: "Pesan dikirim ke tamu",
      refund: "Refund sedang diproses",
      message: "Pesan dikirim ke operator",
    };
    toast.success(messages[action] || "Aksi berhasil");
  };

  const isMitra = role === "mitra";
  const isAdmin = role === "admin";
  const isCustomer = role === "customer";

  return (
    <DashboardLayout
      role={role}
      navItems={navByRole(role)}
      breadcrumb={breadcrumbByRole(role)}
      title={`Booking ${b.id}`}
    >
      <Toaster position="top-center" richColors />

      <Link
        to={backPath(role)}
        data-testid="back-to-list"
        className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0A1929] mb-6 transition-colors"
      >
        <ChevronLeft size={15} /> Kembali ke daftar booking
      </Link>

      {/* Header */}
      <Card className="p-0 overflow-hidden mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-56 md:h-auto shrink-0">
            <img src={b.img} alt={b.product} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-7 md:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#64748B] font-medium">
                  Booking {b.id}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[#0A1929] mt-2">
                  {b.product}
                </h2>
                <p className="text-sm text-[#64748B] mt-1.5">oleh {b.operator}</p>
              </div>
              <StatusBadge status={b.status} statuses={STATUSES} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7 pt-6 border-t border-[#E5DCC5]">
              {[
                { icon: CalendarDays, l: "Tanggal", v: b.date },
                { icon: Users, l: "Jumlah Tamu", v: `${b.guests} orang` },
                { icon: MapPin, l: "Lokasi", v: "Wakatobi" },
                { icon: CreditCard, l: "Total", v: b.total, highlight: true },
              ].map((it) => (
                <div key={it.l}>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium flex items-center gap-1.5">
                    <it.icon size={11} className="text-[#005F73]" />
                    {it.l}
                  </p>
                  <p
                    className={`mt-1.5 ${
                      it.highlight
                        ? "font-serif text-xl text-[#005F73]"
                        : "text-sm font-medium text-[#0A1929]"
                    }`}
                  >
                    {it.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer / Operator card */}
          <Card className="p-7">
            <h3 className="font-serif text-xl tracking-tight mb-5">
              {isCustomer ? "Operator" : "Informasi tamu"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  l: isCustomer ? "Nama operator" : "Nama tamu",
                  v: isCustomer ? b.operator : b.customer,
                },
                { l: "Email", v: b.customerEmail || "kontak@baharitrip.id", icon: Mail },
                { l: "Telepon", v: b.customerPhone || "+62 812-0000-0000", icon: Phone },
                { l: "Asal", v: "Jakarta · Indonesia", icon: MapPin },
              ].map((it) => (
                <div key={it.l}>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                    {it.l}
                  </p>
                  <p className="text-sm text-[#0A1929] font-medium mt-1.5 flex items-center gap-2">
                    {it.icon ? <it.icon size={13} className="text-[#64748B]" /> : null}
                    {it.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E5DCC5]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium mb-2">
                Catatan tamu
              </p>
              <p className="text-sm text-[#4B5A69] leading-relaxed bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl p-4">
                Kami pemula dalam diving — mohon disiapkan instruktur yang fasih bahasa Indonesia.
                Kami juga akan datang dari Bandara Matahora pukul 10:00 pagi.
              </p>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-7">
            <h3 className="font-serif text-xl tracking-tight mb-6">Linimasa</h3>
            <div className="relative pl-6 border-l border-[#E5DCC5] space-y-6">
              {timeline.map((t, i) => (
                <div key={i} data-testid={`timeline-${i}`} className="relative">
                  <span className="absolute -left-[1.85rem] top-1 w-3 h-3 rounded-full bg-[#005F73] ring-4 ring-[#E6F4F1]" />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                    {t.time}
                  </p>
                  <p className="text-sm font-medium text-[#0A1929] mt-1">{t.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Activities/Itinerary */}
          <Card className="p-7">
            <h3 className="font-serif text-xl tracking-tight mb-5">Itinerari</h3>
            <div className="space-y-4">
              {[
                { t: "08:00", a: "Penjemputan di Bandara Matahora atau hotel" },
                { t: "10:00", a: "Briefing & gear check di Tomia Dive Center" },
                { t: "10:30", a: "Speedboat menuju Roma Reef (40 menit)" },
                { t: "11:30", a: "Dive 1: Roma Reef — kedalaman 12-18m" },
                { t: "13:30", a: "Lunch break + surface interval di pulau" },
                { t: "14:30", a: "Dive 2: Mari Mabuk Wall — drift dive" },
                { t: "17:00", a: "Kembali ke Wangi-Wangi" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 pb-4 last:pb-0 border-b border-[#E5DCC5] last:border-b-0"
                >
                  <span className="text-xs font-mono font-medium text-[#005F73] shrink-0 mt-0.5 bg-[#E6F4F1] rounded-md px-2 py-1">
                    {row.t}
                  </span>
                  <p className="text-sm text-[#4B5A69] leading-relaxed">{row.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT - Pricing & Actions */}
        <div className="space-y-6">
          <Card className="p-7">
            <h3 className="font-serif text-xl tracking-tight mb-5">Rincian biaya</h3>
            <div className="space-y-3 text-sm">
              {[
                { l: `Paket × ${b.guests}`, v: "Rp 2.500.000" },
                { l: "Sewa peralatan diving", v: "Rp 350.000" },
                { l: "Asuransi tamu", v: "Rp 75.000" },
                { l: "Diskon promo", v: "- Rp 200.000", neg: true },
              ].map((row) => (
                <div key={row.l} className="flex justify-between">
                  <span className="text-[#4B5A69]">{row.l}</span>
                  <span className={row.neg ? "text-[#E05D36] font-medium" : "text-[#0A1929] font-medium"}>
                    {row.v}
                  </span>
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-[#E5DCC5] flex justify-between items-end">
                <span className="text-sm text-[#64748B]">Total</span>
                <span className="font-serif text-2xl text-[#005F73]">{b.total}</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#E6F4F1] border border-[#B3DCD5] p-4 flex items-center gap-3">
              <CreditCard size={16} className="text-[#005F73] shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#005F73]">Lunas via Midtrans</p>
                <p className="text-[11px] text-[#005F73]/70 mt-0.5">BCA VA · 12 Jan 2026, 14:35</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-7">
            <h3 className="font-serif text-xl tracking-tight mb-5">Aksi</h3>
            <div className="space-y-3">
              {isMitra && b.status === "pending" && (
                <>
                  <button
                    data-testid="action-confirm"
                    onClick={() => handleAction("confirm")}
                    className="w-full bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check size={15} /> Konfirmasi booking
                  </button>
                  <button
                    data-testid="action-cancel"
                    onClick={() => handleAction("cancel")}
                    className="w-full text-[#E05D36] border border-[#E05D36]/30 hover:bg-[#FCEEEA] rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <X size={15} /> Tolak booking
                  </button>
                </>
              )}
              {isMitra && b.status === "confirmed" && (
                <button
                  data-testid="action-contact"
                  onClick={() => handleAction("contact")}
                  className="w-full bg-[#0A1929] hover:bg-[#005F73] text-white rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare size={15} /> Hubungi tamu
                </button>
              )}
              {isCustomer && (
                <>
                  <button
                    data-testid="action-message"
                    onClick={() => handleAction("message")}
                    className="w-full bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare size={15} /> Hubungi operator
                  </button>
                  {b.status === "completed" && (
                    <button
                      data-testid="action-review"
                      onClick={() => navigate("/dashboard/customer/review")}
                      className="w-full text-[#0A1929] border border-[#E5DCC5] hover:bg-[#F0EBE1] rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Star size={15} /> Tulis review
                    </button>
                  )}
                </>
              )}
              {isAdmin && (
                <button
                  data-testid="action-refund"
                  onClick={() => handleAction("refund")}
                  className="w-full text-[#E05D36] border border-[#E05D36]/30 hover:bg-[#FCEEEA] rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Proses refund
                </button>
              )}
              <button
                data-testid="action-download"
                className="w-full text-[#0A1929] bg-[#FAF8F5] border border-[#E5DCC5] hover:bg-[#F0EBE1] rounded-full px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={15} /> Unduh e-voucher
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
