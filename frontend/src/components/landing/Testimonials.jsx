import { Quote } from "lucide-react";

const reviews = [
  {
    quote:
      "Pengalaman snorkeling di Spermonde benar-benar tak terlupakan. Operatornya ramah dan tahu spot terbaik.",
    name: "Ayu Pramudita",
    origin: "Jakarta",
  },
  {
    quote:
      "Booking-nya gampang, harganya transparan. Tiga hari di Taka Bonerate jadi liburan terbaik tahun ini.",
    name: "Reza Mahendra",
    origin: "Bandung",
  },
  {
    quote:
      "We finally found a platform that connects us directly to local divers. Coral reefs were spectacular.",
    name: "Marjorie Klein",
    origin: "Berlin",
  },
  {
    quote:
      "Penginapan di pulau bersih, cuaca cerah, ikan-ikan banyak. Anak-anak pulang dengan ratusan foto.",
    name: "Keluarga Hartono",
    origin: "Surabaya",
  },
  {
    quote:
      "Dari Makassar ke Selayar terasa mulus berkat itinerary yang disusun BahariTrip. Semuanya tepat waktu.",
    name: "Daniswara",
    origin: "Yogyakarta",
  },
];

export const Testimonials = () => {
  const doubled = [...reviews, ...reviews];

  return (
    <section
      id="testimoni"
      data-testid="testimonials-section"
      className="relative py-24 md:py-36 bg-[#F0EBE1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#0A9396] mb-4">
              Cerita Wisatawan
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-[#0A1929] max-w-3xl">
              Mereka pulang<br />
              <span className="italic text-[#005F73]">membawa cerita.</span>
            </h2>
          </div>
          <p className="text-sm text-[#4B5A69] max-w-xs">
            Lebih dari <span className="font-medium text-[#0A1929]">2.400 ulasan</span>{" "}
            dari wisatawan domestik dan mancanegara.
          </p>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((r, idx) => (
            <article
              key={idx}
              data-testid={`testimonial-${idx}`}
              className="w-[340px] sm:w-[400px] shrink-0 bg-white rounded-3xl p-8 border border-[#E5DCC5]"
            >
              <Quote
                size={28}
                className="text-[#E05D36] mb-5"
                strokeWidth={1.5}
              />
              <p className="font-serif text-xl sm:text-2xl leading-snug tracking-tight text-[#0A1929] mb-8 italic">
                "{r.quote}"
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-[#E5DCC5]">
                <div>
                  <p className="font-medium text-[#0A1929] text-sm">{r.name}</p>
                  <p className="text-xs text-[#4B5A69] mt-0.5">{r.origin}</p>
                </div>
                <span className="text-[#E05D36] tracking-widest text-sm">★★★★★</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
