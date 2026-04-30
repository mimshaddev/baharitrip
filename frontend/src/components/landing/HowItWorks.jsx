const steps = [
  {
    n: "01",
    title: "Pilih destinasi",
    desc: "Telusuri Makassar, Spermonde, atau Taka Bonerate. Saring berdasarkan minat, durasi, dan anggaran Anda.",
  },
  {
    n: "02",
    title: "Pesan & bayar aman",
    desc: "Pilih tur, aktivitas, atau penginapan. Pembayaran terenkripsi, konfirmasi instan via email & WhatsApp.",
  },
  {
    n: "03",
    title: "Nikmati liburan",
    desc: "Operator lokal kami menyambut Anda. Yang perlu Anda bawa hanyalah rasa kagum.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="cara-kerja"
      data-testid="how-it-works-section"
      className="relative py-24 md:py-36 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#0A9396] mb-4">
              Cara Kerja
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-[#0A1929]">
              Tiga langkah<br />
              menuju<br />
              <span className="italic text-[#005F73]">petualangan.</span>
            </h2>
            <p className="mt-8 text-base sm:text-lg text-[#4B5A69] leading-relaxed max-w-md">
              Kami merancang setiap detail — dari pemilihan operator
              tersertifikasi hingga konfirmasi pembayaran yang transparan.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                data-testid={`step-${s.n}`}
                className="group relative bg-white border border-[#E5DCC5] rounded-3xl p-8 md:p-12 hover:border-[#005F73]/40 hover:shadow-lg transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="shrink-0">
                    <span className="font-serif text-7xl md:text-8xl text-[#E05D36]/15 tracking-tighter leading-none group-hover:text-[#E05D36]/35 transition-colors">
                      {s.n}
                    </span>
                  </div>
                  <div className="flex-1 md:pt-3">
                    <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#0A1929] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-base text-[#4B5A69] leading-relaxed max-w-lg">
                      {s.desc}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-12 -bottom-3 w-px h-6 bg-[#E5DCC5]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
