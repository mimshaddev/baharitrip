import { Download } from "lucide-react";
import {
  DashboardLayout,
  Card,
  PageHeader,
  KpiCard,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { adminNav } from "./nav";
import { payouts, STATUSES } from "../../lib/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

const PayoutTable = ({ items }) => (
  <Card className="p-0 overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-[#FAF8F5] border-b border-[#E5DCC5]">
        <tr className="text-left">
          {["ID Pembayaran", "Mitra", "Periode", "Jumlah", "Status", ""].map((h) => (
            <th
              key={h}
              className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium px-6 py-3"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((p) => (
          <tr
            key={p.id}
            data-testid={`payout-${p.id}`}
            className="border-b border-[#E5DCC5] last:border-b-0 hover:bg-[#F0EBE1]/40 transition-colors"
          >
            <td className="px-6 py-4 font-medium text-[#0A1929]">{p.id}</td>
            <td className="px-6 py-4 text-[#0A1929]">{p.partner}</td>
            <td className="px-6 py-4 text-[#4B5A69]">{p.period}</td>
            <td className="px-6 py-4 font-medium text-[#0A1929]">{p.amount}</td>
            <td className="px-6 py-4">
              <StatusBadge status={p.status} statuses={STATUSES} />
            </td>
            <td className="px-6 py-4 text-right">
              {p.status === "unpaid" ? (
                <button
                  data-testid={`process-payout-${p.id}`}
                  className="text-xs font-medium bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-4 py-1.5 transition-colors"
                >
                  Proses
                </button>
              ) : (
                <button
                  data-testid={`view-receipt-${p.id}`}
                  className="text-xs font-medium text-[#005F73] hover:underline"
                >
                  Lihat resi
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default function AdminPembayaran() {
  return (
    <DashboardLayout
      role="admin"
      navItems={adminNav}
      breadcrumb="Admin · Pembayaran"
      title="Pembayaran & payout"
    >
      <PageHeader
        title="Manajemen payout mitra"
        description="Proses pencairan ke partner dan pantau arus kas platform."
        actions={
          <button
            data-testid="payout-export"
            className="flex items-center gap-2 text-sm text-[#0A1929] bg-white border border-[#E5DCC5] hover:bg-[#FAF8F5] rounded-full px-4 py-2.5 transition-colors"
          >
            <Download size={14} /> Ekspor laporan
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard label="Pendapatan Platform" value="Rp 184 jt" delta="+18%" trend="up" />
        <KpiCard label="Komisi BahariTrip" value="Rp 27,6 jt" delta="+22%" trend="up" />
        <KpiCard label="Payout Bulan Ini" value="Rp 156,4 jt" delta="+15%" trend="up" />
        <KpiCard label="Pending Payout" value="Rp 31,3 jt" delta="2 mitra" trend="up" />
      </div>

      <Tabs defaultValue="all" className="space-y-5">
        <TabsList className="bg-[#F0EBE1] rounded-full p-1 w-fit">
          {[
            { v: "all", l: "Semua" },
            { v: "unpaid", l: "Belum Dibayar" },
            { v: "paid", l: "Lunas" },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              data-testid={`payout-tab-${t.v}`}
              className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#005F73] data-[state=active]:shadow-sm text-sm"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <PayoutTable items={payouts} />
        </TabsContent>
        <TabsContent value="unpaid">
          <PayoutTable items={payouts.filter((p) => p.status === "unpaid")} />
        </TabsContent>
        <TabsContent value="paid">
          <PayoutTable items={payouts.filter((p) => p.status === "paid")} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
