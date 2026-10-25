import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/content";
import AsciiWave from "@/components/effects/AsciiWave";
import { useTheme } from "@/lib/theme";
import Reveal from "@/components/Reveal";

// One dark area for the whole bottom of every page: the closing call to action
// and the footer share a single ASCII water background. The CTA is hidden only
// on the Contact page, where the booking form is the call to action.
export default function Footer() {
  const { pathname } = useLocation();
  const showCta = pathname !== "/contact";
  const { theme } = useTheme();
  const ink = theme === "dark" ? "#B9CC4F" : "#5E6B1F";

  return (
    <footer className="relative overflow-hidden border-t border-parchment-100/10 bg-bg text-parchment-100">
      {/* water is desktop only: keeps phones fast and battery friendly */}
      <div className="absolute inset-0 hidden opacity-45 md:block">
        <AsciiWave key={theme} ink={ink} cell={12} fill={10} push={14} speed={7} clickIntensity={55} />
      </div>

      {showCta && (
        <section className="relative container-page pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="num !text-parchment-100/60 mb-4">Next step</p>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="display text-[clamp(2.4rem,8vw,6.5rem)]"><Reveal variant="blur">Hiring or planning<br />a campaign?</Reveal></h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-parchment-100/70">
                Let's talk. I lead social campaigns and build the web and systems behind them.
              </p>
            </div>
            <Reveal variant="up" delay={0.15} className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-primary-400 px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-widest2 text-on-primary transition-colors hover:bg-primary-600">
                Book a call <ArrowUpRight size={16} />
              </Link>
              <a href={`mailto:${SITE.email}`} className="btn-line justify-center whitespace-nowrap">
                Email me
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <div className="relative container-page pb-28 pt-10 md:pb-16 md:pt-14">
        <div className="grid gap-6 border-t border-parchment-100/15 pt-8 font-mono text-[11px] uppercase tracking-widest2 text-parchment-100/60 grid-cols-2 md:grid-cols-4">
          <div className="space-y-2">
            <p className="text-parchment-100/45">Email</p>
            <a href={`mailto:${SITE.email}`} className="block break-all normal-case tracking-normal text-parchment-100 hover:text-primary-400">{SITE.email}</a>
          </div>
          <div className="space-y-2">
            <p className="text-parchment-100/45">Call</p>
            <a href={`tel:${SITE.phone.replace(/\s|-/g, "")}`} className="block text-parchment-100 hover:text-primary-400">{SITE.phone} (TH)</a>
            <a href={`tel:${SITE.phoneMyanmar.replace(/\s/g, "")}`} className="block text-parchment-100 hover:text-primary-400">{SITE.phoneMyanmar} (MM)</a>
          </div>
          <div className="space-y-2">
            <p className="text-parchment-100/45">Elsewhere</p>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="block text-parchment-100 hover:text-primary-400">LinkedIn</a>
            <p>{SITE.location}</p>
          </div>
          <div className="space-y-2">
            <p className="text-parchment-100/45">Site</p>
            <Link to="/projects" className="block text-parchment-100 hover:text-primary-400">Work</Link>
            <Link to="/about" className="block text-parchment-100 hover:text-primary-400">About</Link>
            <Link to="/privacy" className="block hover:text-primary-400">Privacy</Link>
          </div>
        </div>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-widest2 text-parchment-100/40">© {new Date().getFullYear()} {SITE.name}</p>
      </div>
    </footer>
  );
}
