import { Compass, Waves, Fish, Hotel, ArrowRight } from "lucide-react";

const activities = [
  {
    id: "tour",
    title: "Tur",
    desc: "Pengalaman terkurasi bersama pemandu lokal yang fasih cerita pulau.",
    Icon: Compass,
    count: "48 paket",
  },
  {
    id: "diving",
    title: "Penyelaman",
    desc: "Selami terumbu karang Pulau Selayar dan Taka Bonerate yang masih perawan.",
    Icon: Waves,
    count: "32 spot",
  },
  {
    id: "snorkeling",
    title: "Snorkeling",
    desc: "Air jernih, ikan warna-warni — cocok untuk pemula maupun keluarga.",
    Icon: Fish,
    count: "27 lokasi",
  },
  {
    id: "hotel",
    title: "Penginapan",
    desc: "Dari resort tepi pantai hingga homestay pulau yang otentik.",
    Icon: Hotel,
    count: "60+ properti",
  },
];

export const Activities = () => {
  return (
    <section
      id="aktivitas"
      data-testid="activities-section"
      className="relative py-24 md:py-36 bg-[#F0EBE1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#0A9396] mb-4">
            Kategori Aktivitas
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-[#0A1929]">
            Pilih cara Anda<br />
            <span className="italic text-[#E05D36]">menyatu dengan laut.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map(({ id, title, desc, Icon, count }) => (
            <div
              key={id}
              data-testid={`activity-card-${id}`}
              className="group relative bg-white rounded-3xl p-8 border border-[#E5DCC5] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#005F73]/8 flex items-center justify-center mb-6 group-hover:bg-[#005F73] transition-colors">
                <Icon
                  size={26}
                  className="text-[#005F73] group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>

              <p className="text-[11px] uppercase tracking-[0.2em] text-[#4B5A69] mb-2">
                {count}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0A1929] tracking-tight mb-3">
                {title}
              </h3>
              <p className="text-sm text-[#4B5A69] leading-relaxed mb-6">
                {desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-[#005F73] group-hover:gap-3 transition-all">
                <span>Lihat semua</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
