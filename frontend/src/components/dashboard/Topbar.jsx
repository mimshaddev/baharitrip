import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown, LogOut, User2, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userProfile } from "../../lib/mockData";

const ROLES = [
  { id: "customer", label: "Tampilan Customer", path: "/dashboard/customer/booking" },
  { id: "mitra", label: "Tampilan Mitra", path: "/dashboard/mitra/overview" },
  { id: "admin", label: "Tampilan Admin", path: "/dashboard/admin/overview" },
];

export const Topbar = ({ role, title, breadcrumb, onMenuClick }) => {
  const navigate = useNavigate();
  const current = ROLES.find((r) => r.id === role);

  return (
    <header
      data-testid="dashboard-topbar"
      className="h-20 bg-white/95 backdrop-blur border-b border-[#E5DCC5] sticky top-0 z-30 flex items-center justify-between px-5 md:px-8 gap-4"
    >
      <div className="flex items-center gap-4 min-w-0">
        <button
          data-testid="topbar-menu-toggle"
          className="md:hidden p-2 -ml-2 text-[#0A1929]"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          {breadcrumb ? (
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] mb-1 truncate">
              {breadcrumb}
            </p>
          ) : null}
          <h1
            data-testid="page-title"
            className="font-serif text-xl sm:text-2xl tracking-tight text-[#0A1929] truncate"
          >
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 bg-[#FAF8F5] border border-[#E5DCC5] rounded-full px-4 py-2 w-72">
          <Search size={16} className="text-[#64748B]" />
          <input
            data-testid="topbar-search"
            type="text"
            placeholder="Cari booking, produk, mitra..."
            className="bg-transparent outline-none text-sm w-full placeholder-[#64748B]"
          />
        </div>

        {/* Role switcher demo */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid="role-switcher-btn"
              className="flex items-center gap-2 bg-[#F0EBE1] hover:bg-[#E5DCC5] rounded-full px-4 py-2 text-xs font-medium text-[#0A1929] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#005F73]" />
              <span className="hidden sm:inline">{current?.label}</span>
              <span className="sm:hidden">Demo</span>
              <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-2xl border-[#E5DCC5]">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
              Demo · Pilih peran
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ROLES.map((r) => (
              <DropdownMenuItem
                key={r.id}
                data-testid={`role-option-${r.id}`}
                onClick={() => navigate(r.path)}
                className="rounded-lg cursor-pointer"
              >
                {r.label}
                {r.id === role && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#005F73]" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          data-testid="topbar-notifications"
          className="relative w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5DCC5] hover:bg-[#F0EBE1] transition-colors flex items-center justify-center"
        >
          <Bell size={16} className="text-[#0A1929]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E05D36]" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid="topbar-profile-btn" className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border border-[#E5DCC5]">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-[#005F73] text-white">AP</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl border-[#E5DCC5]">
            <DropdownMenuLabel>
              <p className="font-medium text-[#0A1929] text-sm">{userProfile.name}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{userProfile.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-lg">
              <User2 size={14} className="mr-2" /> Profil saya
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg text-[#E05D36]">
              <LogOut size={14} className="mr-2" /> Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
