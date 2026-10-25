import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/content";

// Closing call to action. Framed around hiring and campaigns, not a service menu.
export default function CtaBlock({ title = "Hiring or planning a campaign?", sub = "Let's talk. I lead social campaigns and build the web and systems behind them." }: { title?: string; sub?: string }) {
  return (
    <section className="bg-glow text-ink-900">
      <div className="container-page grid gap-8 py-16 md:grid-cols-[1.6fr_1fr] md:items-end md:py-24">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink-900/60 mb-4">Next step</p>
          <h2 className="display text-[clamp(2.4rem,7vw,6rem)]">{title}</h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-900/75">{sub}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link to="/contact" className="group inline-flex items-center gap-3 bg-ink-900 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 text-white transition-colors hover:bg-black">
            Book a call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center border border-ink-900 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 transition-colors hover:bg-ink-900 hover:text-white">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
