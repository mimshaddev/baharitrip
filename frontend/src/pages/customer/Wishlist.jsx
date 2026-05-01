import { Heart, Star, ArrowUpRight } from "lucide-react";
import {
  DashboardLayout,
  PageHeader,
} from "../../components/dashboard/DashboardLayout";
import { customerNav } from "./nav";
import { wishlist } from "../../lib/mockData";

export default function CustomerWishlist() {
  return (
    <DashboardLayout
      role="customer"
      navItems={customerNav}
      breadcrumb="Akun Saya · Wishlist"
      title="Wishlist"
    >
      <PageHeader
        title="Yang Anda simpan"
        description="Pengalaman pilihan untuk dipesan saat tepat waktunya."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlist.map((p) => (
          <article
            key={p.id}
            data-testid={`wishlist-item-${p.id}`}
            className="group rounded-2xl bg-white border border-[#E5DCC5] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <button
                data-testid={`wishlist-remove-${p.id}`}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-[#E05D36] hover:bg-white"
                aria-label="Hapus dari wishlist"
              >
                <Heart size={16} fill="currentColor" />
              </button>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-xs font-medium text-[#0A1929] flex items-center gap-1">
                <Star size={11} fill="#E05D36" stroke="#E05D36" /> {p.rating}
              </div>
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#64748B] font-medium">
                {p.operator}
              </p>
              <h3 className="font-serif text-lg text-[#0A1929] tracking-tight mt-1.5 leading-snug">
                {p.title}
              </h3>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5DCC5]">
                <p className="font-serif text-base text-[#005F73]">{p.price}</p>
                <button
                  data-testid={`wishlist-book-${p.id}`}
                  className="w-9 h-9 rounded-full bg-[#0A1929] text-white flex items-center justify-center hover:bg-[#005F73] transition-colors"
                  aria-label="Pesan"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}
