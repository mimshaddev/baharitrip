import { TrendingUp, ArrowRight, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DashboardLayout,
  Card,
  KpiCard,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "./nav";
import {
  operatorKpi,
  operatorBookings,
  revenueChart,
  STATUSES,
  operatorProfile,
} from "../../lib/mockData";

const RevenueChart = () => {
  const max = Math.max(...revenueChart.map((d) => d.v));
  return (
    <Card className="lg:col-span-2 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
            Pendapatan
          </p>
          <h3 className="font-serif text-2xl mt-1.5 tracking-tight text-[#0A1929]">
            Rp 285,4 jt
          </h3>
          <p className="text-xs text-[#005F73] mt-1 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +24% dari semester lalu
          </p>
        </div>
        <button data-testid="chart-options" className="p-2 hover:bg-[#FAF8F5] rounded-full">
          <MoreVertical size={16} className="text-[#64748B]" />
        </button>
      </div>

      <div className="h-56 flex items-stretch gap-3 px-2">
        {revenueChart.map((d, i) => (
          <div key={d.m} className="flex-1 flex flex-col items-stretch gap-2">
            <div className="flex-1 flex items-end">
              <div
                className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                  i === revenueChart.length - 1 ? "bg-[#005F73]" : "bg-[#005F73]/25"
                }`}
                style={{ height: `${(d.v / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#64748B] font-medium text-center">
              {d.m}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default function MitraOverview() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      role="mitra"
      navItems={mitraNav}
      breadcrumb="Mitra Dashboard"
      title={`Halo, ${operatorProfile.name}`}
    >
      <PageHeader
        title="Operasi hari ini"
        description="Ringkasan performa & aktivitas booking di properti Anda."
        actions={
          <button
            data-testid="new-product-btn"
            onClick={() => navigate("/dashboard/mitra/produk/baru")}
            className="bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Tambah Produk
            <ArrowRight size={14} />
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {operatorKpi.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <RevenueChart />

        <Card className="p-7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
              Distribusi Booking
            </p>
          </div>
          {[
            { l: "Diving", v: 64, c: "#005F73" },
            { l: "Snorkeling", v: 42, c: "#0A9396" },
            { l: "Tour", v: 18, c: "#E05D36" },
            { l: "Penginapan", v: 12, c: "#E9D8A6" },
          ].map((row) => (
            <div key={row.l} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#0A1929]">{row.l}</span>
                <span className="text-[#64748B] text-xs font-medium">{row.v}</span>
              </div>
              <div className="h-1.5 bg-[#F0EBE1] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(row.v / 64) * 100}%`, backgroundColor: row.c }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Card className="mt-6 p-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#E5DCC5]">
          <div>
            <h3 className="font-serif text-xl tracking-tight">Booking terbaru</h3>
            <p className="text-xs text-[#64748B] mt-1">5 booking terakhir di properti Anda</p>
          </div>
          <a
            href="/dashboard/mitra/booking"
            data-testid="see-all-bookings"
            className="text-sm text-[#005F73] hover:underline font-medium flex items-center gap-1"
          >
            Lihat semua <ArrowRight size={14} />
          </a>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#FAF8F5] border-b border-[#E5DCC5]">
            <tr className="text-left text-[#64748B]">
              {["ID", "Tamu", "Produk", "Tanggal", "Total", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-[10px] uppercase tracking-[0.18em] font-medium px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {operatorBookings.slice(0, 5).map((b) => (
              <tr
                key={b.id}
                onClick={() => navigate(`/dashboard/mitra/booking/${b.id}`)}
                className="border-b border-[#E5DCC5] last:border-b-0 hover:bg-[#F0EBE1]/40 transition-colors cursor-pointer"
                data-testid={`overview-booking-${b.id}`}
              >
                <td className="px-6 py-4 font-medium text-[#0A1929]">{b.id}</td>
                <td className="px-6 py-4 text-[#0A1929]">{b.customer}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{b.product}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{b.date}</td>
                <td className="px-6 py-4 font-medium text-[#0A1929]">{b.total}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={b.status} statuses={STATUSES} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
