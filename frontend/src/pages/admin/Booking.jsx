import { Search, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DashboardLayout,
  Card,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { adminNav } from "./nav";
import { adminBookings, STATUSES } from "../../lib/mockData";

export default function AdminBooking() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      role="admin"
      navItems={adminNav}
      breadcrumb="Admin · Booking"
      title="Oversight booking"
    >
      <PageHeader
        title="Semua booking platform"
        description="Lihat dan filter seluruh transaksi reservasi di BahariTrip."
        actions={
          <button
            data-testid="export-csv"
            className="flex items-center gap-2 text-sm text-[#0A1929] bg-white border border-[#E5DCC5] hover:bg-[#FAF8F5] rounded-full px-4 py-2.5 transition-colors"
          >
            <Download size={14} /> Ekspor CSV
          </button>
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 p-6 border-b border-[#E5DCC5]">
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 w-full lg:w-80">
            <Search size={15} className="text-[#64748B]" />
            <input
              data-testid="admin-booking-search"
              type="text"
              placeholder="Cari ID, tamu, produk..."
              className="bg-transparent outline-none text-sm w-full placeholder-[#64748B]"
            />
          </div>
          <select
            data-testid="filter-mitra"
            className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 text-sm text-[#0A1929] outline-none"
            defaultValue=""
          >
            <option value="">Semua mitra</option>
            <option>Tomia Dive</option>
            <option>Hoga Marine</option>
            <option>Patuno</option>
            <option>Bahari Sail</option>
          </select>
          <select
            data-testid="filter-status"
            className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 text-sm text-[#0A1929] outline-none"
            defaultValue=""
          >
            <option value="">Semua status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button
            data-testid="more-filters"
            className="flex items-center gap-2 text-sm text-[#0A1929] bg-[#FAF8F5] border border-[#E5DCC5] hover:bg-[#F0EBE1] rounded-full px-4 py-2 transition-colors"
          >
            <Filter size={14} /> Lebih banyak
          </button>
          <p className="ml-auto text-xs text-[#64748B]">
            <span className="font-medium text-[#0A1929]">{adminBookings.length}</span> booking
          </p>
        </div>

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
            {adminBookings.map((b) => (
              <tr
                key={b.id}
                data-testid={`admin-booking-${b.id}`}
                onClick={() => navigate(`/dashboard/admin/booking/${b.id}`)}
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
    </DashboardLayout>
  );
}
