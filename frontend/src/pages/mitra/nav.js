import { LayoutDashboard, Package, Calendar, Inbox, BarChart3, Settings2 } from "lucide-react";

export const mitraNav = [
  { to: "/dashboard/mitra/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/mitra/produk", label: "Produk", icon: Package },
  { to: "/dashboard/mitra/jadwal", label: "Jadwal", icon: Calendar },
  { to: "/dashboard/mitra/booking", label: "Booking", icon: Inbox, badge: 5 },
  { to: "/dashboard/mitra/statistik", label: "Statistik", icon: BarChart3 },
  { to: "/dashboard/mitra/pengaturan", label: "Pengaturan", icon: Settings2 },
];
