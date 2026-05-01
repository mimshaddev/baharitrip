import { Link, useLocation } from "react-router-dom";
import { Anchor } from "lucide-react";

export const Sidebar = ({ role, items, onNavigate }) => {
  const { pathname } = useLocation();

  const titles = {
    customer: "Akun Saya",
    mitra: "Mitra Dashboard",
    admin: "Admin Panel",
  };

  return (
    <aside
      data-testid={`sidebar-${role}`}
      className="hidden md:flex md:w-64 lg:w-72 shrink-0 bg-[#0B1D2E] text-white flex-col h-screen sticky top-0"
    >
      <div className="px-7 py-7 border-b border-white/10">
        <Link
          to="/"
          data-testid="sidebar-logo"
          className="flex items-center gap-2.5"
        >
          <span className="w-9 h-9 rounded-full bg-[#E9D8A6]/15 text-[#E9D8A6] flex items-center justify-center">
            <Anchor size={17} strokeWidth={2.2} />
          </span>
          <span className="font-serif text-xl tracking-tight">BahariTrip</span>
        </Link>
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium">
          {titles[role]}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-4 space-y-1">
        {items.map((item) => {
          const active =
            pathname === item.to ||
            (item.to !== `/dashboard/${role}` && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              data-testid={`sidebar-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                active
                  ? "bg-[#005F73] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.6} />
              <span className="font-medium">{item.label}</span>
              {item.badge ? (
                <span className="ml-auto text-[10px] bg-[#E05D36] text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/60">Butuh bantuan?</p>
          <p className="font-serif text-base mt-1">Tim BahariTrip 24/7</p>
          <a
            href="mailto:halo@baharitrip.id"
            className="mt-2 inline-block text-xs text-[#E9D8A6] hover:underline"
          >
            halo@baharitrip.id
          </a>
        </div>
      </div>
    </aside>
  );
};
