import { ArrowRight, TrendingUp, Users, ShieldCheck } from "lucide-react";

const RESORT_IMG =
  "https://images.pexels.com/photos/8547164/pexels-photo-8547164.jpeg";

const benefits = [
  {
    Icon: TrendingUp,
    title: "Pendapatan baru",
    desc: "Akses jaringan wisatawan domestik & mancanegara.",
  },
  {
    Icon: Users,
    title: "Manajemen mudah",
    desc: "Atur jadwal, kuota, dan harga dari satu dashboard.",
  },
  {
    Icon: ShieldCheck,
    title: "Pembayaran aman",
    desc: "Pencairan harian dengan komisi transparan.",
  },
];

export const OperatorCTA = () => {
  return (
    <section
      id="mitra"
      data-testid="operator-cta-section"
      className="relative py-24 md:py-36 bg-[#0B1D2E] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25">
        <img
          src={RESORT_IMG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D2E] via-[#0B1D2E]/85 to-[#0B1D2E]/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#E9D8A6] mb-5">
              Untuk Operator & Pemilik Properti
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white">
              Tingkatkan bisnis<br />
              pariwisata Anda{" "}
              <span className="italic text-[#E9D8A6]">bersama kami.</span>
            </h2>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
              Bergabunglah dengan 85+ operator lokal yang mempercayakan reservasi
              tur, dive trip, dan penginapan mereka kepada BahariTrip.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                data-testid="operator-join-btn"
                className="bg-[#E05D36] hover:bg-[#C94D29] text-white rounded-full px-8 py-4 font-medium tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                Bergabung Sebagai Mitra
                <ArrowRight size={18} />
              </button>
              <button
                data-testid="operator-learn-btn"
                className="bg-transparent border border-white/35 text-white hover:bg-white/10 rounded-full px-8 py-4 font-medium tracking-wide transition-colors"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {benefits.map(({ Icon, title, desc }) => (
              <div
                key={title}
                data-testid={`benefit-${title.toLowerCase().replace(/\s/g, "-")}`}
                className="backdrop-blur-md bg-white/8 border border-white/15 rounded-2xl p-6 flex items-start gap-5 hover:bg-white/12 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E9D8A6]/15 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#E9D8A6]" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white tracking-tight mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
