import { LayoutDashboard, Users, Package, Inbox, Wallet, FileText, Ship, Settings2 } from "lucide-react";

export const adminNav = [
  { to: "/dashboard/admin/overview", label: "Platform", icon: LayoutDashboard },
  { to: "/dashboard/admin/mitra", label: "Mitra & Operator", icon: Users, badge: 2 },
  { to: "/dashboard/admin/produk", label: "Produk", icon: Package },
  { to: "/dashboard/admin/booking", label: "Booking", icon: Inbox },
  { to: "/dashboard/admin/pembayaran", label: "Pembayaran", icon: Wallet },
  { to: "/dashboard/admin/laporan", label: "Laporan", icon: FileText },
  { to: "/dashboard/admin/feri", label: "Jadwal Feri", icon: Ship },
  { to: "/dashboard/admin/pengaturan", label: "Pengaturan", icon: Settings2 },
];
