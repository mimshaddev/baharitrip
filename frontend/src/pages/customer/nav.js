import { Home, Heart, User2, Star } from "lucide-react";

export const customerNav = [
  { to: "/dashboard/customer/booking", label: "Booking saya", icon: Home },
  { to: "/dashboard/customer/wishlist", label: "Wishlist", icon: Heart, badge: 8 },
  { to: "/dashboard/customer/review", label: "Review", icon: Star },
  { to: "/dashboard/customer/profil", label: "Profil", icon: User2 },
];
