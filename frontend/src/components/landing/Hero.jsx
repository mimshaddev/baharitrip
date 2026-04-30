import { Search, MapPin, CalendarDays, Users } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1755020475254-06790e2437b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx0cm9waWNhbCUyMGlzbGFuZCUyMG9jZWFuJTIwYWVyaWFsfGVufDB8fHx8MTc3NzU0MjA3N3ww&ixlib=rb-4.1.0&q=85";

export const Hero = () => {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Pemandangan udara pantai dan laut Sulawesi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0B1D2E]/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-3xl fade-up">
          <p
            data-testid="hero-overline"
            className="text-sm uppercase tracking-[0.3em] font-medium text-[#E9D8A6] mb-6"
          >
            Wakatobi · Sulawesi Tenggara
          </p>
          <h1
            data-testid="hero-headline"
            className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tighter font-light"
          >
            Pintu menuju{" "}
            <span className="italic font-normal text-[#E9D8A6]">jantung</span>
            <br />
            Coral Triangle dunia.
          </h1>
          <p
            data-testid="hero-subtitle"
            className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed font-light"
          >
            Pesan tur, penyelaman, dan penginapan terbaik di Wakatobi —
            satu platform, untuk wisatawan dari seluruh Indonesia.
          </p>
        </div>

        {/* Search bar - glassmorphism */}
        <div
          data-testid="hero-search-bar"
          className="mt-12 max-w-5xl backdrop-blur-2xl bg-white/85 border border-white/40 shadow-2xl rounded-3xl p-3 sm:p-4 fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2 md:gap-0 md:divide-x md:divide-[#E5DCC5]">
            <SearchField
              icon={<MapPin size={18} className="text-[#005F73]" />}
              label="Destinasi"
              placeholder="Mau ke mana?"
              testid="search-destination"
            />
            <SearchField
              icon={<CalendarDays size={18} className="text-[#005F73]" />}
              label="Tanggal"
              placeholder="Pilih tanggal"
              testid="search-date"
            />
            <SearchField
              icon={<Users size={18} className="text-[#005F73]" />}
              label="Tamu"
              placeholder="2 orang"
              testid="search-guests"
            />
            <button
              data-testid="hero-search-btn"
              className="bg-[#E05D36] hover:bg-[#C94D29] text-white rounded-2xl px-8 py-4 md:py-0 md:my-1 md:mx-1 font-medium tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Search size={18} />
              <span>Cari Petualangan</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { v: "120+", l: "Destinasi pilihan" },
            { v: "85+", l: "Operator tepercaya" },
            { v: "4.9★", l: "Rating wisatawan" },
          ].map((s) => (
            <div key={s.l} data-testid={`hero-stat-${s.v}`}>
              <p className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                {s.v}
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SearchField = ({ icon, label, placeholder, testid }) => (
  <div className="px-4 py-3 md:px-6 md:py-3 flex items-center gap-3 hover:bg-[#FAF8F5]/60 rounded-2xl transition-colors">
    <span className="shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#4B5A69] font-medium">
        {label}
      </p>
      <input
        data-testid={testid}
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-[#0A1929] placeholder-[#0A1929]/50 text-sm font-medium"
      />
    </div>
  </div>
);
