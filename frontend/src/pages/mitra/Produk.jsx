import { Plus, Search, Filter, MoreVertical, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DashboardLayout,
  Card,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "./nav";
import { operatorProducts, STATUSES } from "../../lib/mockData";

export default function MitraProduk() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      role="mitra"
      navItems={mitraNav}
      breadcrumb="Mitra · Produk"
      title="Manajemen produk"
    >
      <PageHeader
        title="Produk Anda"
        description="Atur paket tur, dive trip, dan penginapan Anda."
        actions={
          <button
            data-testid="add-product-btn"
            onClick={() => navigate("/dashboard/mitra/produk/baru")}
            className="bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={14} /> Produk baru
          </button>
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-[#E5DCC5]">
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 w-full md:w-80">
            <Search size={15} className="text-[#64748B]" />
            <input
              data-testid="product-search"
              type="text"
              placeholder="Cari produk..."
              className="bg-transparent outline-none text-sm w-full placeholder-[#64748B]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="filter-btn"
              className="flex items-center gap-2 text-sm text-[#0A1929] bg-[#FAF8F5] border border-[#E5DCC5] hover:bg-[#F0EBE1] rounded-full px-4 py-2 transition-colors"
            >
              <Filter size={14} /> Filter
            </button>
            <select
              data-testid="status-filter"
              className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 text-sm text-[#0A1929] outline-none"
              defaultValue=""
            >
              <option value="">Semua status</option>
              <option value="active">Aktif</option>
              <option value="draft">Draf</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#FAF8F5] border-b border-[#E5DCC5]">
            <tr className="text-left">
              {["Produk", "Kategori", "Harga", "Jadwal", "Booking", "Status", ""].map((h) => (
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
            {operatorProducts.map((p) => (
              <tr
                key={p.id}
                data-testid={`product-row-${p.id}`}
                className="border-b border-[#E5DCC5] last:border-b-0 hover:bg-[#F0EBE1]/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E5DCC5]"
                    />
                    <div>
                      <p className="font-medium text-[#0A1929]">{p.name}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.category}</td>
                <td className="px-6 py-4 font-medium text-[#0A1929]">{p.price}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.schedules} jadwal</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.bookings}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={p.status} statuses={STATUSES} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    data-testid={`product-edit-${p.id}`}
                    onClick={() => navigate(`/dashboard/mitra/produk/${p.id}/edit`)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#005F73] hover:bg-[#FAF8F5] rounded-full px-3 py-1.5 transition-colors mr-1"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    data-testid={`product-actions-${p.id}`}
                    className="p-1.5 hover:bg-[#FAF8F5] rounded-full"
                  >
                    <MoreVertical size={14} className="text-[#64748B]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-5 border-t border-[#E5DCC5]">
          <p className="text-xs text-[#64748B]">
            Menampilkan <span className="font-medium text-[#0A1929]">1-4</span> dari 12 produk
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs text-[#0A1929] bg-[#FAF8F5] border border-[#E5DCC5] rounded-full">
              Sebelumnya
            </button>
            <button className="px-3 py-1.5 text-xs text-white bg-[#005F73] rounded-full">
              Selanjutnya
            </button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
