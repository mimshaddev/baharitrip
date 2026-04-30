import { useState } from "react";
import { Anchor, Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Toaster, toast } from "sonner";

const cols = [
  {
    title: "Jelajahi",
    links: ["Destinasi", "Tur", "Penyelaman", "Penginapan"],
  },
  {
    title: "Tentang",
    links: ["Tentang Kami", "Cerita Kami", "Karier", "Pers"],
  },
  {
    title: "Bantuan",
    links: ["Pusat Bantuan", "Kontak", "Syarat & Ketentuan", "Privasi"],
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Mohon masukkan email yang valid");
      return;
    }
    toast.success("Terima kasih! Anda akan menerima cerita laut terbaik kami.");
    setEmail("");
  };

  return (
    <footer
      data-testid="footer-section"
      className="relative bg-[#0B1D2E] text-white pt-24 md:pt-32 overflow-hidden"
    >
      <Toaster position="top-center" richColors />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <p className="text-sm uppercase tracking-[0.25em] font-medium text-[#E9D8A6] mb-4">
              Buletin Bahari
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Cerita pulau & promo eksklusif,<br />
              <span className="italic text-[#E9D8A6]">langsung ke kotak masuk.</span>
            </h3>
          </div>
          <div className="lg:col-span-6 lg:pl-8 flex items-center">
            <form
              data-testid="newsletter-form"
              onSubmit={onSubmit}
              className="w-full flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 relative">
                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50"
                />
                <input
                  data-testid="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alamat@email.com"
                  className="w-full bg-white/8 border border-white/15 rounded-full pl-12 pr-6 py-4 text-white placeholder-white/40 outline-none focus:border-[#E9D8A6] focus:bg-white/12 transition-all"
                />
              </div>
              <button
                data-testid="newsletter-submit-btn"
                type="submit"
                className="bg-[#E9D8A6] text-[#0B1D2E] hover:bg-white rounded-full px-8 py-4 font-medium tracking-wide transition-colors"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 py-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <a
              href="#hero"
              data-testid="footer-logo"
              className="flex items-center gap-2 mb-5"
            >
              <span className="w-9 h-9 rounded-full bg-[#E9D8A6]/15 flex items-center justify-center text-[#E9D8A6]">
                <Anchor size={18} strokeWidth={2.2} />
              </span>
              <span className="font-serif text-2xl tracking-tight">BahariTrip</span>
            </a>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Platform booking wisata bahari Indonesia — saat ini fokus di
              Wakatobi, Sulawesi Tenggara. Menghubungkan wisatawan nasional
              dengan operator lokal terpercaya sejak 2024.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, label: "instagram" },
                { Icon: Facebook, label: "facebook" },
                { Icon: Twitter, label: "twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  data-testid={`social-${label}`}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/25 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-2 lg:col-start-auto">
              <h5 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5">
                {col.title}
              </h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-testid={`footer-link-${link.toLowerCase().replace(/\s|&/g, "-")}`}
                      className="text-sm text-white/85 hover:text-[#E9D8A6] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <h5 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5">
              Hubungi
            </h5>
            <p className="text-sm text-white/85 leading-relaxed">
              Wangi-Wangi, Wakatobi<br />
              Sulawesi Tenggara 93791<br />
              <a href="mailto:halo@baharitrip.id" className="hover:text-[#E9D8A6] transition-colors">
                halo@baharitrip.id
              </a>
            </p>
          </div>
        </div>

        {/* Massive logo */}
        <div className="border-t border-white/10 pt-12 pb-10">
          <h2
            data-testid="footer-massive-logo"
            className="font-serif text-[20vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter text-white/[0.07] select-none text-center font-light"
          >
            BahariTrip
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-xs text-white/50">
            <p>© 2025 BahariTrip. Semua hak dilindungi.</p>
            <p>Dibuat dengan rasa di Wakatobi, Sulawesi Tenggara.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
