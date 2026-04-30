import { useEffect, useState } from "react";
import { Menu, X, Anchor } from "lucide-react";

const links = [
  { label: "Destinasi", href: "#destinasi" },
  { label: "Aktivitas", href: "#aktivitas" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Mitra", href: "#mitra" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#FAF8F5]/80 border-b border-[#E5DCC5]/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a
          href="#hero"
          data-testid="navbar-logo"
          className="flex items-center gap-2 group"
        >
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled ? "bg-[#005F73] text-white" : "bg-white/90 text-[#005F73]"
            }`}
          >
            <Anchor size={18} strokeWidth={2.2} />
          </span>
          <span
            className={`font-serif text-2xl tracking-tight transition-colors ${
              scrolled ? "text-[#0A1929]" : "text-white"
            }`}
          >
            BahariTrip
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                href={l.href}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-[#0A9396] ${
                  scrolled ? "text-[#0A1929]" : "text-white/95"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            data-testid="nav-login-btn"
            className={`text-sm font-medium px-5 py-2 transition-colors ${
              scrolled ? "text-[#0A1929] hover:text-[#0A9396]" : "text-white hover:text-[#E9D8A6]"
            }`}
          >
            Masuk
          </button>
          <button
            data-testid="nav-cta-btn"
            className="bg-[#E05D36] text-white hover:bg-[#C94D29] transition-colors rounded-full px-6 py-2.5 text-sm font-medium shadow-sm"
          >
            Pesan Sekarang
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className={`md:hidden p-2 rounded-full ${scrolled ? "text-[#0A1929]" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#E5DCC5] px-6 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setOpen(false)}
              className="block text-[#0A1929] text-base font-medium"
            >
              {l.label}
            </a>
          ))}
          <button
            data-testid="mobile-nav-cta"
            className="w-full bg-[#E05D36] text-white rounded-full px-6 py-3 font-medium"
          >
            Pesan Sekarang
          </button>
        </div>
      )}
    </nav>
  );
};
