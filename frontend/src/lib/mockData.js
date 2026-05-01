// Mock data for BahariTrip dashboards (Wakatobi, Sulawesi Tenggara)

export const STATUSES = {
  pending: { label: "Menunggu", className: "bg-[#FDF6E3] text-[#B35A00] border border-[#E9D8A6]" },
  confirmed: { label: "Terkonfirmasi", className: "bg-[#E6F4F1] text-[#005F73] border border-[#B3DCD5]" },
  completed: { label: "Selesai", className: "bg-[#E6E9EC] text-[#0B1D2E] border border-[#B0B9C2]" },
  cancelled: { label: "Dibatalkan", className: "bg-[#FCEEEA] text-[#E05D36] border border-[#F3C5B8]" },
  active: { label: "Aktif", className: "bg-[#E6F4F1] text-[#005F73] border border-[#B3DCD5]" },
  draft: { label: "Draf", className: "bg-[#F0EBE1] text-[#4B5A69] border border-[#E5DCC5]" },
  paid: { label: "Lunas", className: "bg-[#E6F4F1] text-[#005F73] border border-[#B3DCD5]" },
  unpaid: { label: "Belum Dibayar", className: "bg-[#FDF6E3] text-[#B35A00] border border-[#E9D8A6]" },
  approved: { label: "Disetujui", className: "bg-[#E6F4F1] text-[#005F73] border border-[#B3DCD5]" },
  review: { label: "Review", className: "bg-[#FDF6E3] text-[#B35A00] border border-[#E9D8A6]" },
};

export const customerBookings = [
  {
    id: "BTR-1042",
    product: "Wakatobi Diving Trip 3D2N",
    operator: "Tomia Dive Center",
    date: "12 - 14 Jan 2026",
    guests: 2,
    total: "Rp 4.800.000",
    status: "confirmed",
    img: "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
  },
  {
    id: "BTR-1031",
    product: "Hoga Snorkeling Day Tour",
    operator: "Hoga Marine",
    date: "8 Jan 2026",
    guests: 3,
    total: "Rp 1.350.000",
    status: "pending",
    img: "https://images.unsplash.com/photo-1691849793899-ac59a3bdc08d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "BTR-0998",
    product: "Wangi-Wangi Resort 2 Malam",
    operator: "Patuno Wakatobi Resort",
    date: "20 - 22 Des 2025",
    guests: 2,
    total: "Rp 3.200.000",
    status: "completed",
    img: "https://images.pexels.com/photos/8547164/pexels-photo-8547164.jpeg",
  },
  {
    id: "BTR-0967",
    product: "Sailing Tour Kaledupa",
    operator: "Bahari Sail",
    date: "30 Nov 2025",
    guests: 4,
    total: "Rp 2.100.000",
    status: "cancelled",
    img: "https://images.unsplash.com/photo-1755020475254-06790e2437b4?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export const wishlist = [
  {
    id: "p1",
    title: "Roma Reef Dive Package",
    operator: "Tomia Dive Center",
    price: "Rp 1.250.000",
    img: "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
    rating: 4.9,
  },
  {
    id: "p2",
    title: "Sunset Sail Wangi-Wangi",
    operator: "Bahari Sail",
    price: "Rp 480.000",
    img: "https://images.unsplash.com/photo-1755020475254-06790e2437b4?crop=entropy&cs=srgb&fm=jpg&q=85",
    rating: 4.8,
  },
  {
    id: "p3",
    title: "Hoga Coral Snorkeling",
    operator: "Hoga Marine",
    price: "Rp 350.000",
    img: "https://images.unsplash.com/photo-1691849793899-ac59a3bdc08d?crop=entropy&cs=srgb&fm=jpg&q=85",
    rating: 4.7,
  },
  {
    id: "p4",
    title: "Patuno Beach Resort",
    operator: "Patuno Wakatobi",
    price: "Rp 1.600.000",
    img: "https://images.pexels.com/photos/8547164/pexels-photo-8547164.jpeg",
    rating: 4.9,
  },
];

export const operatorProducts = [
  {
    id: "PRD-201",
    name: "Roma Reef Dive Package",
    category: "Diving",
    price: "Rp 1.250.000",
    schedules: 8,
    bookings: 24,
    status: "active",
    img: "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
  },
  {
    id: "PRD-198",
    name: "Mari Mabuk Wall Dive",
    category: "Diving",
    price: "Rp 1.450.000",
    schedules: 6,
    bookings: 18,
    status: "active",
    img: "https://images.pexels.com/photos/10769610/pexels-photo-10769610.jpeg",
  },
  {
    id: "PRD-187",
    name: "Sunset Snorkeling Hoga",
    category: "Snorkeling",
    price: "Rp 350.000",
    schedules: 14,
    bookings: 42,
    status: "active",
    img: "https://images.unsplash.com/photo-1691849793899-ac59a3bdc08d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "PRD-176",
    name: "Liveaboard 4D3N Wakatobi",
    category: "Tour",
    price: "Rp 8.500.000",
    schedules: 2,
    bookings: 4,
    status: "draft",
    img: "https://images.unsplash.com/photo-1755020475254-06790e2437b4?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export const operatorBookings = [
  {
    id: "BTR-1042",
    customer: "Reza Mahendra",
    product: "Roma Reef Dive Package",
    date: "12 Jan 2026",
    guests: 2,
    total: "Rp 2.500.000",
    status: "confirmed",
  },
  {
    id: "BTR-1041",
    customer: "Ayu Pramudita",
    product: "Sunset Snorkeling Hoga",
    date: "10 Jan 2026",
    guests: 3,
    total: "Rp 1.050.000",
    status: "pending",
  },
  {
    id: "BTR-1038",
    customer: "Daniswara",
    product: "Mari Mabuk Wall Dive",
    date: "9 Jan 2026",
    guests: 1,
    total: "Rp 1.450.000",
    status: "confirmed",
  },
  {
    id: "BTR-1029",
    customer: "Keluarga Hartono",
    product: "Liveaboard 4D3N",
    date: "6 - 9 Jan 2026",
    guests: 4,
    total: "Rp 34.000.000",
    status: "pending",
  },
  {
    id: "BTR-0998",
    customer: "Marjorie Klein",
    product: "Roma Reef Dive Package",
    date: "22 Des 2025",
    guests: 2,
    total: "Rp 2.500.000",
    status: "completed",
  },
];

export const operatorKpi = [
  { label: "Booking Hari Ini", value: "12", delta: "+18%", trend: "up" },
  { label: "Pendapatan Bulan Ini", value: "Rp 48,2 jt", delta: "+22%", trend: "up" },
  { label: "Tingkat Okupansi", value: "76%", delta: "+5%", trend: "up" },
  { label: "Rating Rata-rata", value: "4.9", delta: "+0.1", trend: "up" },
];

export const adminKpi = [
  { label: "GMV Bulan Ini", value: "Rp 1,84 M", delta: "+34%", trend: "up" },
  { label: "Booking Aktif", value: "284", delta: "+12%", trend: "up" },
  { label: "Mitra Aktif", value: "62", delta: "+4", trend: "up" },
  { label: "Pengguna Baru", value: "1.247", delta: "+19%", trend: "up" },
];

export const partnerApprovals = [
  {
    id: "OP-088",
    name: "Tomia Dive Center",
    owner: "Bambang Soejatmiko",
    type: "Operator Diving",
    location: "Tomia, Wakatobi",
    submitted: "2 Jan 2026",
    status: "review",
  },
  {
    id: "OP-087",
    name: "Hoga Marine Adventures",
    owner: "Sari Kusuma",
    type: "Operator Snorkeling",
    location: "Hoga, Kaledupa",
    submitted: "30 Des 2025",
    status: "review",
  },
  {
    id: "OP-086",
    name: "Patuno Wakatobi Resort",
    owner: "I Made Wijaya",
    type: "Penginapan",
    location: "Wangi-Wangi",
    submitted: "28 Des 2025",
    status: "approved",
  },
  {
    id: "OP-085",
    name: "Bahari Sail Co.",
    owner: "Ahmad Yusuf",
    type: "Operator Tur",
    location: "Wangi-Wangi",
    submitted: "26 Des 2025",
    status: "approved",
  },
];

export const adminBookings = [
  ...operatorBookings,
  {
    id: "BTR-1015",
    customer: "Rini Astuti",
    product: "Sunset Sail Wangi-Wangi",
    date: "5 Jan 2026",
    guests: 2,
    total: "Rp 960.000",
    status: "confirmed",
  },
  {
    id: "BTR-1010",
    customer: "Fajar Nugroho",
    product: "Patuno Beach Resort 2N",
    date: "3 Jan 2026",
    guests: 2,
    total: "Rp 3.200.000",
    status: "confirmed",
  },
];

export const payouts = [
  { id: "PYT-204", partner: "Tomia Dive Center", amount: "Rp 18.450.000", period: "Des 2025", status: "paid" },
  { id: "PYT-203", partner: "Hoga Marine", amount: "Rp 9.180.000", period: "Des 2025", status: "paid" },
  { id: "PYT-202", partner: "Patuno Wakatobi", amount: "Rp 24.640.000", period: "Des 2025", status: "unpaid" },
  { id: "PYT-201", partner: "Bahari Sail", amount: "Rp 6.720.000", period: "Des 2025", status: "unpaid" },
];

export const revenueChart = [
  { m: "Jul", v: 38 }, { m: "Agu", v: 42 }, { m: "Sep", v: 51 },
  { m: "Okt", v: 47 }, { m: "Nov", v: 62 }, { m: "Des", v: 78 },
  { m: "Jan", v: 85 },
];

export const userProfile = {
  name: "Ayu Pramudita",
  email: "ayu.pramudita@email.com",
  phone: "+62 812-3456-7890",
  city: "Jakarta",
  joined: "Sep 2024",
  avatar: "https://images.unsplash.com/photo-1758600587683-d86675a2f6e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwzfHxzbWlsaW5nJTIwYXNpYW4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MHx8fHwxNzc3NTQ1NDE0fDA&ixlib=rb-4.1.0&q=85",
};

export const operatorProfile = {
  name: "Tomia Dive Center",
  owner: "Bambang Soejatmiko",
  email: "ops@tomiadive.id",
  avatar: "https://images.pexels.com/photos/12319501/pexels-photo-12319501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};
