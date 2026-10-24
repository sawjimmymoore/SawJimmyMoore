import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const LINKS = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const onDarkHero = pathname === "/" && !scrolled;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const tone = onDarkHero ? "text-white" : "text-header-text";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onDarkHero ? "bg-transparent" : "bg-header-bg/90 backdrop-blur border-b border-header-border/10"
      }`}
    >
      <div className={`container-page flex h-16 items-center justify-between ${tone}`}>
        <Link
          to="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-black text-lg font-extrabold uppercase tracking-tight">
          Saw Jimmy Moore
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-widest2 transition-colors ${onDarkHero ? "hover:text-glow" : "hover:text-primary-400"} ${
                  isActive ? (onDarkHero ? "text-glow" : "text-primary-400") : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button onClick={toggle} aria-label="Toggle theme" className={onDarkHero ? "hover:text-glow transition-colors" : "hover:text-primary-400 transition-colors"}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-ink-900 text-white px-6 pb-8 pt-4 border-t border-white/10">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="block border-b border-white/10 py-4 font-black font-extrabold uppercase text-3xl">
              {l.label}
            </Link>
          ))}
          <button onClick={toggle} className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-white/70">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      )}
    </header>
  );
}
