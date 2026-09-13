import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { SITE } from "@/data/content";
import { useTheme } from "@/lib/theme";
import { useLang, type DictKey } from "@/lib/i18n";
import Magnetic from "@/components/Magnetic";
import CurrencyToggle from "@/components/CurrencyToggle";

const NAV_ITEMS: { key: DictKey; href: string }[] = [
  { key: "nav_home", href: "/" },
  { key: "nav_services", href: "/services" },
  { key: "nav_pricing", href: "/pricing" },
  { key: "nav_projects", href: "/projects" },
  { key: "nav_about", href: "/about" },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={t("theme_toggle")}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-primary-500/25 text-header-text hover:border-primary-500 transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLang();
  // Currency only matters once there are prices on screen to convert, so it
  // only shows in the header on the Pricing page itself, not globally. Quote
  // keeps its own inline toggle since it also has live prices.
  const showCurrency = location.pathname === "/pricing";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const linkBase = "text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-4">
      <div
        className={`container-page rounded-full transition-all duration-300 bg-header-bg/90 backdrop-blur-md text-header-text border border-primary-500/10 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)]" : ""
        }`}
      >
      <div className="flex items-center justify-between h-16 px-5 md:px-7">
        <Link to="/" className="group relative font-display text-[19px] font-bold tracking-wide text-header-text">
          <span
            className="absolute -left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse"
            aria-hidden
          />
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">Jimmy</span>{" "}
          <span className="text-primary-500 inline-block transition-transform duration-300 group-hover:translate-y-0.5">Moore</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `group ${linkBase} relative pb-1 ${
                  isActive ? "text-header-text" : "text-header-muted hover:text-header-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(item.key)}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-primary-500"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-primary-500 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {showCurrency && <CurrencyToggle />}
          <ThemeToggle />
          <Magnetic strength={0.25}>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-ink-900 text-on-primary px-5 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] hover:bg-primary-500 transition-colors duration-200"
          >
            {SITE.status === "Open to opportunities" ? t("nav_get_in_touch") : t("nav_contact")}
          </Link>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="h-8 w-8" />
          <button
            className="text-header-text"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="container-page overflow-hidden rounded-3xl bg-header-bg/95 backdrop-blur-md text-header-text border border-primary-500/10"
          >
            {/* Home, Services, Projects, Pricing, and Contact live in the fixed
                bottom tab bar on mobile now, one tap away, no menu needed.
                This dropdown is just for the rest: About and a quote request. */}
            <div className="py-4 px-4 flex flex-col gap-1">
              <Link to="/about" className="rounded-lg px-3 py-3 text-[15px] text-header-text hover:bg-primary-500/10 transition-colors">
                {t("nav_about")}
              </Link>
              <Link to="/quote" className="rounded-lg px-3 py-3 text-[15px] text-header-text hover:bg-primary-500/10 transition-colors">
                {t("nav_quote")}
              </Link>
              <a
                href="https://linkedin.com/in/jimmy-moore-742b75214"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3 py-3 text-[15px] text-header-text hover:bg-primary-500/10 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
