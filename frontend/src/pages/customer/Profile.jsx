import { Camera } from "lucide-react";
import {
  DashboardLayout,
  Card,
  PageHeader,
} from "../../components/dashboard/DashboardLayout";
import { customerNav } from "./nav";
import { userProfile } from "../../lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const Field = ({ label, defaultValue, type = "text", testid }) => (
  <div>
    <label className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
      {label}
    </label>
    <input
      data-testid={testid}
      type={type}
      defaultValue={defaultValue}
      className="mt-2 w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl px-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors"
    />
  </div>
);

export default function CustomerProfile() {
  return (
    <DashboardLayout
      role="customer"
      navItems={customerNav}
      breadcrumb="Akun Saya · Profil"
      title="Profil saya"
    >
      <PageHeader
        title="Detail akun"
        description="Kelola identitas, kontak, dan preferensi perjalanan Anda."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 flex flex-col items-center text-center p-8">
          <div className="relative">
            <Avatar className="w-28 h-28 border-2 border-[#E5DCC5]">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-[#005F73] text-white text-2xl">
                AP
              </AvatarFallback>
            </Avatar>
            <button
              data-testid="profile-avatar-upload"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#0A1929] text-white flex items-center justify-center hover:bg-[#005F73] transition-colors"
              aria-label="Ganti foto"
            >
              <Camera size={15} />
            </button>
          </div>
          <h3 className="font-serif text-2xl mt-5 tracking-tight">{userProfile.name}</h3>
          <p className="text-sm text-[#64748B] mt-1">{userProfile.email}</p>
          <div className="w-full mt-6 pt-6 border-t border-[#E5DCC5] grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B]">Bergabung</p>
              <p className="text-sm font-medium text-[#0A1929] mt-1">{userProfile.joined}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B]">Trip</p>
              <p className="text-sm font-medium text-[#0A1929] mt-1">12 perjalanan</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-8">
          <h3 className="font-serif text-xl tracking-tight">Informasi pribadi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            <Field label="Nama Lengkap" defaultValue={userProfile.name} testid="profile-name" />
            <Field label="Email" defaultValue={userProfile.email} type="email" testid="profile-email" />
            <Field label="Nomor Telepon" defaultValue={userProfile.phone} testid="profile-phone" />
            <Field label="Kota" defaultValue={userProfile.city} testid="profile-city" />
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                Tentang Anda (opsional)
              </label>
              <textarea
                data-testid="profile-bio"
                rows={3}
                placeholder="Saya pencinta laut yang gemar menyelam..."
                className="mt-2 w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl px-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#E5DCC5]">
            <button
              data-testid="profile-cancel-btn"
              className="text-sm font-medium px-5 py-2.5 text-[#64748B] hover:text-[#0A1929] transition-colors"
            >
              Batal
            </button>
            <button
              data-testid="profile-save-btn"
              className="bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Simpan perubahan
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
