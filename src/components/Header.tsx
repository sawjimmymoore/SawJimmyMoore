import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const LINKS = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const onDarkHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const tone = onDarkHero ? "text-white" : "text-header-text";
  const hover = onDarkHero ? "hover:text-glow" : "hover:text-primary-400";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onDarkHero ? "bg-transparent" : "bg-header-bg/90 backdrop-blur border-b border-header-border/10"
      }`}
    >
      <div className={`container-page flex h-14 md:h-16 items-center justify-between ${tone}`}>
        <Link
          to="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-black font-extrabold uppercase tracking-tight text-base md:text-lg"
        >
          Saw Jimmy Moore
        </Link>

        {/* Desktop: real buttons, including the primary action */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-widest2 transition-colors ${hover} ${isActive ? (onDarkHero ? "text-glow" : "text-primary-400") : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button onClick={toggle} aria-label="Toggle theme" className={`transition-colors ${hover}`}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/contact" className="bg-glow px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest2 text-ink-900 transition-colors hover:bg-white">
            Book a call
          </Link>
        </nav>

        {/* Mobile: nav lives in the bottom bar, so the top only needs the theme switch */}
        <button onClick={toggle} aria-label="Toggle theme" className="md:hidden p-2">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
