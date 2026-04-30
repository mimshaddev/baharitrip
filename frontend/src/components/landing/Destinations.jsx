import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    id: "makassar",
    name: "Makassar",
    tagline: "Gerbang kebudayaan Sulawesi",
    img: "https://images.pexels.com/photos/25538280/pexels-photo-25538280.jpeg",
    spots: 38,
    span: "md:col-span-8 md:row-span-2",
    height: "min-h-[420px] md:min-h-[640px]",
  },
  {
    id: "spermonde",
    name: "Kepulauan Spermonde",
    tagline: "Surga island hopping",
    img: "https://images.unsplash.com/photo-1691849793899-ac59a3bdc08d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx0cm9waWNhbCUyMGlzbGFuZCUyMG9jZWFuJTIwYWVyaWFsfGVufDB8fHx8MTc3NzU0MjA3N3ww&ixlib=rb-4.1.0&q=85",
    spots: 42,
    span: "md:col-span-4",
    height: "min-h-[300px]",
  },
  {
    id: "takabonerate",
    name: "Taka Bonerate",
    tagline: "Atol terbesar di Asia Tenggara",
    img: "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
    spots: 26,
    span: "md:col-span-4",
    height: "min-h-[300px]",
  },
];

export const Destinations = () => {
  return (
    <section
      id="destinasi"
      data-testid="destinations-section"
      className="relative py-24 md:py-36 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#0A9396] mb-4">
              Destinasi Unggulan
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-[#0A1929]">
              Surga tropis<br />
              <span className="italic text-[#005F73]">menanti Anda.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#4B5A69] max-w-md leading-relaxed">
            Tiga ekosistem laut yang berbeda — kota pelabuhan kuno, kepulauan
            bertabur pasir putih, dan atol legendaris kelas dunia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {destinations.map((d) => (
            <a
              key={d.id}
              data-testid={`destination-card-${d.id}`}
              href={`#${d.id}`}
              className={`group relative ${d.span} ${d.height} overflow-hidden rounded-3xl block`}
            >
              <img
                src={d.img}
                alt={d.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#0A1929] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight size={18} />
              </div>

              <div className="absolute top-6 left-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/80 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5">
                  {d.spots} pengalaman
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[#E9D8A6] mb-2">
                  {d.tagline}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                  {d.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
