import { Check, X, Eye, Search } from "lucide-react";
import { useState } from "react";
import {
  DashboardLayout,
  Card,
  PageHeader,
  StatusBadge,
} from "../../components/dashboard/DashboardLayout";
import { adminNav } from "./nav";
import { partnerApprovals, STATUSES } from "../../lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { toast, Toaster } from "sonner";

export default function AdminMitra() {
  const [selected, setSelected] = useState(null);

  const handleApprove = (id) => {
    toast.success(`Mitra ${id} berhasil disetujui`);
    setSelected(null);
  };

  const handleReject = (id) => {
    toast.error(`Mitra ${id} telah ditolak`);
    setSelected(null);
  };

  return (
    <DashboardLayout
      role="admin"
      navItems={adminNav}
      breadcrumb="Admin · Mitra"
      title="Manajemen mitra & operator"
    >
      <Toaster position="top-center" richColors />

      <PageHeader
        title="Persetujuan mitra"
        description="Verifikasi dan kelola partner yang ingin bergabung di platform."
      />

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-[#E5DCC5]">
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 w-full md:w-80">
            <Search size={15} className="text-[#64748B]" />
            <input
              data-testid="mitra-search"
              type="text"
              placeholder="Cari nama mitra..."
              className="bg-transparent outline-none text-sm w-full placeholder-[#64748B]"
            />
          </div>
          <select
            data-testid="mitra-status-filter"
            className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 text-sm text-[#0A1929] outline-none"
            defaultValue=""
          >
            <option value="">Semua status</option>
            <option value="review">Review</option>
            <option value="approved">Disetujui</option>
          </select>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#FAF8F5] border-b border-[#E5DCC5]">
            <tr className="text-left">
              {["ID", "Mitra", "Pemilik", "Tipe", "Lokasi", "Diajukan", "Status", ""].map((h) => (
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
            {partnerApprovals.map((p) => (
              <tr
                key={p.id}
                data-testid={`mitra-row-${p.id}`}
                className="border-b border-[#E5DCC5] last:border-b-0 hover:bg-[#F0EBE1]/40 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-[#0A1929]">{p.id}</td>
                <td className="px-6 py-4 font-medium text-[#0A1929]">{p.name}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.owner}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.type}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.location}</td>
                <td className="px-6 py-4 text-[#4B5A69]">{p.submitted}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={p.status} statuses={STATUSES} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    data-testid={`mitra-detail-${p.id}`}
                    onClick={() => setSelected(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#005F73] hover:bg-[#FAF8F5] rounded-full px-3 py-1.5 transition-colors"
                  >
                    <Eye size={13} /> Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="rounded-2xl border-[#E5DCC5] max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl tracking-tight">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-[#64748B]">
                  Tinjauan permohonan kemitraan
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { l: "Pemilik", v: selected.owner },
                  { l: "Tipe", v: selected.type },
                  { l: "Lokasi", v: selected.location },
                  { l: "Tanggal Pengajuan", v: selected.submitted },
                ].map((it) => (
                  <div key={it.l}>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                      {it.l}
                    </p>
                    <p className="text-sm text-[#0A1929] font-medium mt-1">{it.v}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl p-4 mt-2">
                <p className="text-xs uppercase tracking-[0.18em] text-[#64748B] font-medium mb-2">
                  Catatan
                </p>
                <p className="text-sm text-[#4B5A69] leading-relaxed">
                  Operator memiliki sertifikasi PADI Dive Master, asuransi tamu aktif, dan 3
                  testimoni dari grup pendahulu. Direkomendasikan untuk disetujui.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-[#E5DCC5]">
                <button
                  data-testid="mitra-reject-btn"
                  onClick={() => handleReject(selected.id)}
                  className="flex items-center gap-2 text-sm text-[#E05D36] border border-[#E05D36]/30 hover:bg-[#FCEEEA] rounded-full px-5 py-2.5 transition-colors font-medium"
                >
                  <X size={14} /> Tolak
                </button>
                <button
                  data-testid="mitra-approve-btn"
                  onClick={() => handleApprove(selected.id)}
                  className="flex items-center gap-2 text-sm bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-5 py-2.5 transition-colors font-medium"
                >
                  <Check size={14} /> Setujui
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
