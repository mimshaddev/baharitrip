import { CalendarDays, MapPin, Users, ChevronRight, Inbox, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DashboardLayout,
  Card,
  PageHeader,
  StatusBadge,
  EmptyState,
} from "../../components/dashboard/DashboardLayout";
import { customerNav } from "./nav";
import { customerBookings, STATUSES } from "../../lib/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

const filterByTab = (tab) => {
  if (tab === "upcoming") return customerBookings.filter((b) => ["confirmed", "pending"].includes(b.status));
  if (tab === "completed") return customerBookings.filter((b) => b.status === "completed");
  if (tab === "cancelled") return customerBookings.filter((b) => b.status === "cancelled");
  return customerBookings;
};

const BookingCard = ({ b }) => (
  <Card
    data-testid={`booking-card-${b.id}`}
    className="p-0 overflow-hidden hover:shadow-md transition-shadow"
  >
    <div className="flex flex-col md:flex-row">
      <div className="md:w-56 h-48 md:h-auto shrink-0 relative">
        <img src={b.img} alt={b.product} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#64748B] font-medium">
              {b.id}
            </p>
            <h3 className="font-serif text-xl md:text-2xl tracking-tight text-[#0A1929] mt-1.5">
              {b.product}
            </h3>
            <p className="text-sm text-[#64748B] mt-1">oleh {b.operator}</p>
          </div>
          <StatusBadge status={b.status} statuses={STATUSES} />
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4B5A69] mt-2">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="text-[#005F73]" /> {b.date}
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} className="text-[#005F73]" /> {b.guests} tamu
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-[#005F73]" /> Wakatobi
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 mt-auto border-t border-[#E5DCC5]">
          <p className="font-serif text-xl text-[#0A1929]">{b.total}</p>
          <button
            data-testid={`booking-detail-${b.id}`}
            className="text-sm font-medium text-[#005F73] hover:gap-3 flex items-center gap-2 transition-all"
          >
            Lihat detail
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </Card>
);

export default function CustomerBookings() {
  return (
    <DashboardLayout
      role="customer"
      navItems={customerNav}
      breadcrumb="Akun Saya · Booking"
      title="Booking saya"
    >
      <PageHeader
        title="Petualangan Anda di Wakatobi"
        description="Pantau, kelola, dan kenang setiap perjalanan Anda di satu tempat."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total booking", value: "12", icon: Inbox },
          { label: "Akan datang", value: "2", icon: CalendarDays },
          { label: "Wishlist", value: "8", icon: Heart },
          { label: "Review tertunda", value: "1", icon: Star },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                  {s.label}
                </p>
                <p className="font-serif text-3xl text-[#0A1929] mt-1">{s.value}</p>
              </div>
              <span className="w-10 h-10 rounded-xl bg-[#F0EBE1] flex items-center justify-center text-[#005F73]">
                <s.icon size={18} strokeWidth={1.6} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-[#F0EBE1] rounded-full p-1 w-fit">
          {[
            { v: "upcoming", l: "Akan datang" },
            { v: "completed", l: "Selesai" },
            { v: "cancelled", l: "Dibatalkan" },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              data-testid={`bookings-tab-${t.v}`}
              className="rounded-full px-5 py-2 data-[state=active]:bg-white data-[state=active]:text-[#005F73] data-[state=active]:shadow-sm text-sm"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        {["upcoming", "completed", "cancelled"].map((tab) => {
          const items = filterByTab(tab);
          return (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {items.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="Belum ada booking di sini"
                  description="Saatnya menjelajah Wakatobi. Lihat destinasi dan paket favorit kami."
                />
              ) : (
                items.map((b) => <BookingCard key={b.id} b={b} />)
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#005F73] to-[#0B1D2E] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#E9D8A6] mb-3">
            Cerita pulau menanti
          </p>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight">
            Jelajahi petualangan baru di Wakatobi.
          </h3>
        </div>
        <Link
          to="/"
          data-testid="explore-cta"
          className="bg-[#E9D8A6] text-[#0B1D2E] hover:bg-white rounded-full px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap"
        >
          Lihat destinasi
        </Link>
      </div>
    </DashboardLayout>
  );
}
