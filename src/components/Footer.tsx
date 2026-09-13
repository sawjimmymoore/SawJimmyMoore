import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin } from "lucide-react";
import { SITE } from "@/data/content";
import { useLang, type DictKey } from "@/lib/i18n";
import Magnetic from "@/components/Magnetic";
import ParticleDrift from "@/components/effects/ParticleDrift";
import { useTheme } from "@/lib/theme";

const SITEMAP: { key: DictKey; href: string }[] = [
  { key: "nav_home", href: "/" },
  { key: "nav_projects", href: "/projects" },
  { key: "nav_experience", href: "/experience" },
  { key: "nav_about", href: "/about" },
  { key: "nav_contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const { t } = useLang();
  const { theme } = useTheme();
  return (
    <footer className="relative overflow-hidden px-3 md:px-6 pb-4 md:pb-6 pt-4">
      <div className="container-page relative rounded-[32px] bg-header-bg text-header-text border border-primary-500/10 overflow-hidden">
      {/* Same live-wire particle background as the hero, same brand feel
          top and bottom of the page. Sits behind everything at low
          opacity so it reads as texture, not noise, and never fights the
          text sitting on top of it. */}
      {/* pointer-events left ON here (not pointer-events-none) so this is
          actually interactive, not just decorative; it sits behind the
          footer content in z-order but content elements (links, text) still
          get first crack at clicks since they come later in paint order. */}
      <div className="absolute inset-0 opacity-40 dark:opacity-60">
        <ParticleDrift
          background="transparent"
          baseColor={theme === "dark" ? "#5a6b3a" : "#8a9b5a"}
          accentColor="#c4d69a"
          density={100}
          dotSize={4}
          speed={18}
          hover={190}
          linkDistance={130}
          linkThickness={1}
        />
      </div>
      <div
        className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl animate-float-slow motion-reduce:animate-none pointer-events-none"
        style={{ backgroundColor: "rgb(var(--primary-400) / 0.14)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-3xl animate-float-slow motion-reduce:animate-none pointer-events-none"
        style={{ backgroundColor: "rgb(var(--accent-warm) / 0.1)", animationDelay: "2.4s" }}
        aria-hidden
      />
      <div className="relative py-8 md:py-16 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8 md:gap-8">
          <div>
            <p className="font-display text-[22px] md:text-[26px] font-semibold leading-tight mb-3 text-header-text whitespace-pre-line">
              {t("footer_tagline")}
            </p>
            <Magnetic strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-header-text text-[14px] font-medium underline underline-offset-4 hover:text-primary-500 transition-colors"
            >
              {t("footer_get_in_touch")}
            </Link>
            </Magnetic>
          </div>

          {/* Sitemap + Elsewhere side by side on mobile too, instead of two
              full-width vertical lists stacked one under another, that's
              what was making the footer take up an entire phone screen. */}
          <div className="grid grid-cols-2 md:contents gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-header-muted mb-3 md:mb-4">{t("footer_sitemap")}</p>
            <ul className="space-y-2 md:space-y-2.5">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[13.5px] md:text-[14px] text-header-text/80 hover:text-header-text transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-header-muted mb-3 md:mb-4">{t("footer_elsewhere")}</p>
            <ul className="space-y-2 md:space-y-2.5">
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[13.5px] md:text-[14px] text-header-text/80 hover:text-header-text transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-[13.5px] md:text-[14px] text-header-text/80 hover:text-header-text transition-colors break-all"
                >
                  <Mail size={14} className="shrink-0" /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-[13.5px] md:text-[14px] text-header-text/80 hover:text-header-text transition-colors"
                >
                  <Phone size={14} /> {SITE.phone}
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 pt-5 md:pt-6 border-t border-primary-500/15 flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-header-muted">
          <span>© {new Date().getFullYear()} {SITE.name}. {t("footer_rights")}</span>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} to={l.href} className="hover:text-header-text transition-colors">
                {l.label}
              </Link>
            ))}
            <span>{SITE.location}</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
