import { TrendingUp, ArrowRight } from "lucide-react";
import {
  DashboardLayout,
  Card,
  KpiCard,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { adminNav } from "./nav";
import {
  adminKpi,
  partnerApprovals,
  revenueChart,
  STATUSES,
} from "../../lib/mockData";

const PlatformChart = () => {
  const max = Math.max(...revenueChart.map((d) => d.v));
  return (
    <Card className="p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
            GMV Platform
          </p>
          <h3 className="font-serif text-2xl mt-1.5 tracking-tight text-[#0A1929]">
            Rp 1,84 M
          </h3>
          <p className="text-xs text-[#005F73] mt-1 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +34% YoY
          </p>
        </div>
        <select
          data-testid="chart-period"
          className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 text-xs text-[#0A1929] outline-none"
          defaultValue="6m"
        >
          <option value="1m">1 bulan</option>
          <option value="3m">3 bulan</option>
          <option value="6m">6 bulan</option>
          <option value="1y">1 tahun</option>
        </select>
      </div>

      <div className="h-56 flex items-stretch gap-3 px-2">
        {revenueChart.map((d, i) => (
          <div key={d.m} className="flex-1 flex flex-col items-stretch gap-2">
            <div className="flex-1 flex items-end">
              <div
                className={`w-full rounded-t-lg ${
                  i === revenueChart.length - 1
                    ? "bg-gradient-to-b from-[#E05D36] to-[#005F73]"
                    : "bg-[#005F73]/25"
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

export default function AdminOverview() {
  const pending = partnerApprovals.filter((p) => p.status === "review");

  return (
    <DashboardLayout
      role="admin"
      navItems={adminNav}
      breadcrumb="Admin"
      title="Platform overview"
    >
      <PageHeader
        title="Selamat datang, Admin"
        description="Pantau kesehatan platform BahariTrip secara keseluruhan."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {adminKpi.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <PlatformChart />
        </div>

        <Card className="p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                Antrean persetujuan
              </p>
              <h3 className="font-serif text-2xl mt-1.5 tracking-tight">
                {pending.length} mitra
              </h3>
            </div>
            <span className="text-xs bg-[#FDF6E3] text-[#B35A00] border border-[#E9D8A6] rounded-full px-3 py-1 font-medium">
              Perlu review
            </span>
          </div>
          <div className="space-y-3">
            {pending.map((p) => (
              <div
                key={p.id}
                data-testid={`pending-${p.id}`}
                className="rounded-xl border border-[#E5DCC5] p-4 hover:bg-[#FAF8F5] transition-colors"
              >
                <p className="font-medium text-[#0A1929] text-sm">{p.name}</p>
                <p className="text-xs text-[#64748B] mt-1">
                  {p.type} · {p.location}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5DCC5]">
                  <span className="text-[11px] text-[#64748B]">Diajukan {p.submitted}</span>
                  <a
                    href="/dashboard/admin/mitra"
                    data-testid={`pending-review-${p.id}`}
                    className="text-xs font-medium text-[#005F73] hover:underline flex items-center gap-1"
                  >
                    Review <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-7">
          <h3 className="font-serif text-xl tracking-tight mb-1">Top mitra</h3>
          <p className="text-xs text-[#64748B] mb-5">Berdasarkan GMV bulan ini</p>
          {[
            { n: "Tomia Dive Center", v: "Rp 184,5 jt", p: 84 },
            { n: "Patuno Wakatobi Resort", v: "Rp 246,4 jt", p: 100 },
            { n: "Hoga Marine", v: "Rp 91,8 jt", p: 42 },
            { n: "Bahari Sail", v: "Rp 67,2 jt", p: 28 },
          ].map((row) => (
            <div key={row.n} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-[#0A1929] font-medium">{row.n}</span>
                <span className="text-[#64748B] text-xs">{row.v}</span>
              </div>
              <div className="h-1.5 bg-[#F0EBE1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#005F73] rounded-full"
                  style={{ width: `${row.p}%` }}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-7">
          <h3 className="font-serif text-xl tracking-tight mb-1">Aktivitas terbaru</h3>
          <p className="text-xs text-[#64748B] mb-5">7 hari terakhir</p>
          <div className="space-y-4">
            {[
              { t: "Mitra baru disetujui", d: "Patuno Wakatobi Resort", c: "#005F73" },
              { t: "Pembayaran diproses", d: "Rp 18,4 jt ke Tomia Dive", c: "#0A9396" },
              { t: "Booking dibatalkan", d: "BTR-0967 oleh customer", c: "#E05D36" },
              { t: "Produk baru diunggah", d: "5 produk dari 3 mitra", c: "#B35A00" },
            ].map((a, i) => (
              <div
                key={i}
                data-testid={`activity-${i}`}
                className="flex items-start gap-3 pb-4 last:pb-0 border-b border-[#E5DCC5] last:border-b-0"
              >
                <span
                  className="w-2 h-2 rounded-full mt-1.5"
                  style={{ backgroundColor: a.c }}
                />
                <div>
                  <p className="text-sm text-[#0A1929] font-medium">{a.t}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
