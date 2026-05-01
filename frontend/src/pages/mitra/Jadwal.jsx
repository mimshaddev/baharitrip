import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DashboardLayout,
  Card,
  PageHeader,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "./nav";

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Bookings keyed by day-of-month for January 2026
const bookings = {
  3: [{ p: "Roma Reef", c: 2 }],
  5: [{ p: "Sunset Sail", c: 4 }],
  6: [{ p: "Liveaboard", c: 4 }, { p: "Mari Mabuk", c: 1 }],
  9: [{ p: "Mari Mabuk", c: 1 }],
  10: [{ p: "Sunset Snorkeling", c: 3 }],
  12: [{ p: "Roma Reef", c: 2 }],
  14: [{ p: "Roma Reef", c: 2 }],
  18: [{ p: "Sunset Sail", c: 2 }],
  22: [{ p: "Liveaboard", c: 2 }],
  25: [{ p: "Sunset Snorkeling", c: 6 }],
};

export default function MitraJadwal() {
  // January 2026 starts on Thursday (index 4)
  const startOffset = 4;
  const totalDays = 31;
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <DashboardLayout
      role="mitra"
      navItems={mitraNav}
      breadcrumb="Mitra · Jadwal"
      title="Kalender jadwal"
    >
      <PageHeader
        title="Januari 2026"
        description="Kelola jadwal trip, kapasitas, dan blackout dates."
        actions={
          <div className="flex items-center gap-2">
            <button
              data-testid="prev-month"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DCC5] hover:bg-[#F0EBE1] flex items-center justify-center"
              aria-label="Bulan sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              data-testid="next-month"
              className="w-9 h-9 rounded-full bg-white border border-[#E5DCC5] hover:bg-[#F0EBE1] flex items-center justify-center"
              aria-label="Bulan selanjutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#E5DCC5] bg-[#FAF8F5]">
          {days.map((d) => (
            <div
              key={d}
              className="px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-[#64748B] font-medium text-center"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const items = day ? bookings[day] || [] : [];
            const isToday = day === 8;
            return (
              <div
                key={i}
                data-testid={day ? `cal-day-${day}` : undefined}
                className={`min-h-[110px] md:min-h-[130px] p-2 md:p-3 border-r border-b border-[#E5DCC5] last:border-r-0 ${
                  !day ? "bg-[#FAF8F5]/50" : "bg-white hover:bg-[#FAF8F5] cursor-pointer"
                } transition-colors`}
              >
                {day ? (
                  <>
                    <p
                      className={`text-sm font-medium ${
                        isToday
                          ? "w-7 h-7 rounded-full bg-[#005F73] text-white flex items-center justify-center"
                          : "text-[#0A1929]"
                      }`}
                    >
                      {day}
                    </p>
                    <div className="mt-2 space-y-1">
                      {items.slice(0, 2).map((it, idx) => (
                        <div
                          key={idx}
                          className="text-[10px] bg-[#005F73]/10 text-[#005F73] rounded-md px-1.5 py-0.5 font-medium truncate"
                        >
                          {it.p} · {it.c}
                        </div>
                      ))}
                      {items.length > 2 ? (
                        <p className="text-[10px] text-[#64748B] px-1">
                          +{items.length - 2} lagi
                        </p>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-[#64748B]">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#005F73]/10 border border-[#005F73]/40" />
          Booking aktif
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#005F73]" />
          Hari ini
        </span>
      </div>
    </DashboardLayout>
  );
}
