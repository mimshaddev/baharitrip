import { Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DashboardLayout,
  Card,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "./nav";
import { operatorBookings, STATUSES } from "../../lib/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

const tabs = [
  { v: "all", l: "Semua" },
  { v: "pending", l: "Menunggu" },
  { v: "confirmed", l: "Terkonfirmasi" },
  { v: "completed", l: "Selesai" },
];

const Table = ({ items, onRowClick }) => (
  <Card className="p-0 overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-[#FAF8F5] border-b border-[#E5DCC5]">
        <tr className="text-left">
          {["ID", "Tamu", "Produk", "Tanggal", "Tamu", "Total", "Status"].map((h) => (
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
        {items.map((b) => (
          <tr
            key={b.id}
            data-testid={`booking-row-${b.id}`}
            onClick={() => onRowClick(b.id)}
            className="border-b border-[#E5DCC5] last:border-b-0 hover:bg-[#F0EBE1]/40 transition-colors cursor-pointer"
          >
            <td className="px-6 py-4 font-medium text-[#0A1929]">{b.id}</td>
            <td className="px-6 py-4 text-[#0A1929]">{b.customer}</td>
            <td className="px-6 py-4 text-[#4B5A69]">{b.product}</td>
            <td className="px-6 py-4 text-[#4B5A69]">{b.date}</td>
            <td className="px-6 py-4 text-[#4B5A69]">{b.guests}</td>
            <td className="px-6 py-4 font-medium text-[#0A1929]">{b.total}</td>
            <td className="px-6 py-4">
              <StatusBadge status={b.status} statuses={STATUSES} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default function MitraBooking() {
  const navigate = useNavigate();
  const filter = (v) =>
    v === "all" ? operatorBookings : operatorBookings.filter((b) => b.status === v);
  const goDetail = (id) => navigate(`/dashboard/mitra/booking/${id}`);

  return (
    <DashboardLayout
      role="mitra"
      navItems={mitraNav}
      breadcrumb="Mitra · Booking"
      title="Manajemen booking"
    >
      <PageHeader
        title="Reservasi tamu"
        description="Kelola permintaan booking dari semua produk Anda."
        actions={
          <button
            data-testid="export-btn"
            className="flex items-center gap-2 text-sm text-[#0A1929] bg-white border border-[#E5DCC5] hover:bg-[#FAF8F5] rounded-full px-4 py-2.5 transition-colors"
          >
            <Download size={14} /> Ekspor
          </button>
        }
      />

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white border border-[#E5DCC5] rounded-full px-4 py-2.5 w-full md:w-96">
          <Search size={15} className="text-[#64748B]" />
          <input
            data-testid="booking-search"
            type="text"
            placeholder="Cari ID booking, nama tamu..."
            className="bg-transparent outline-none text-sm w-full placeholder-[#64748B]"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-5">
        <TabsList className="bg-[#F0EBE1] rounded-full p-1 w-fit">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              data-testid={`booking-tab-${t.v}`}
              className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#005F73] data-[state=active]:shadow-sm text-sm"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((t) => (
          <TabsContent key={t.v} value={t.v}>
            <Table items={filter(t.v)} onRowClick={goDetail} />
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
}
