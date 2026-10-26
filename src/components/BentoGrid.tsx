import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/data/content";
import RollText from "@/components/RollText";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

// Asymmetric bento grid with notched corners (after the Apptronik and Stodio
// references). Every layer of a tile has its own hover/tap motion:
//   - big title rolls letter by letter
//   - small label stretches its tracking and swaps "(a)" for the number
//   - summary + tags + "case study" line slide up from a mask
//   - cursor spotlight, light sheen sweep, bottom progress line
//   - notch circle swells, arrow turns, logo/letter drifts and tilts
function Tile({ p, i, span, notchBg, notchFg }: { p: Project; i: number; span: string; notchBg: string; notchFg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const big = span.includes("row-span-2") && span.includes("col-span-2");
  const wide = span.includes("col-span-2");
  const showSummary = big || wide;
  const letter = String.fromCharCode(97 + i);
  const num = String(i + 1).padStart(2, "0");
  const title = p.title.split(",")[0];

  const spot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.9, rotate: i % 2 ? 2.5 : -2.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={span}
    >
      <Link
        to={`/projects/${p.slug}`}
        onMouseMove={spot}
        className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] p-4 text-white transition-transform duration-500 hover:-translate-y-1 active:scale-[0.98] md:rounded-[28px] md:p-6"
      >
        {/* gradient cover, swells on hover */}
        <span
          className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110 group-active:scale-110"
          style={{ background: `linear-gradient(140deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})`, transitionTimingFunction: EASE }}
        />
        {/* cursor spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.22), transparent 65%)" }}
        />
        {/* light sheen sweeping across */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[160%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
        {/* paper grain */}
        <span className="grain-overlay !opacity-[0.07]" />

        {/* logo or big letter drifting at its own speed, tilts + grows on hover */}
        <motion.span style={{ y: drift }} className="pointer-events-none absolute -right-2 bottom-0">
          {p.logo ? (
            <span className="absolute bottom-3 right-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-2 opacity-90 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 md:h-16 md:w-16" style={{ transitionTimingFunction: EASE }}>
              <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
            </span>
          ) : (
            <span className="block origin-bottom-right select-none font-black text-[7rem] font-extrabold leading-none text-white/10 transition-all duration-700 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-white/20 md:text-[11rem]" style={{ transitionTimingFunction: EASE }}>
              {letter}
            </span>
          )}
        </motion.span>

        {/* notch cut out of the top-right corner, swells on hover */}
        <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full transition-transform duration-500 group-hover:scale-[1.35] md:h-16 md:w-16" style={{ background: notchBg, transitionTimingFunction: EASE }} />
        <span className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 group-active:rotate-45 md:right-1.5 md:top-1.5 md:h-9 md:w-9" style={{ color: notchFg, transitionTimingFunction: EASE }}>
          <ArrowUpRight size={18} />
        </span>

        {/* small label: "(a)" rolls into the number, tracking stretches, category slides */}
        <span className="relative flex items-center gap-2 font-mono text-[10px] uppercase text-white/80">
          <span className="relative inline-block h-[1.2em] overflow-hidden leading-[1.2]">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full group-active:-translate-y-full" style={{ transitionTimingFunction: EASE }}>({letter})</span>
            <span className="absolute inset-x-0 top-0 block translate-y-full font-semibold text-white transition-transform duration-500 group-hover:translate-y-0 group-active:translate-y-0" style={{ transitionTimingFunction: EASE }}>{num}</span>
          </span>
          <span className="hidden tracking-[0.2em] transition-all duration-500 group-hover:translate-x-1 group-hover:tracking-[0.34em] group-hover:text-white sm:inline" style={{ transitionTimingFunction: EASE }}>
            {p.category}
          </span>
        </span>

        <div className="relative">
          {/* tags slide in above the title on the big tile */}
          {big && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 3).map((t, ti) => (
                <span
                  key={t}
                  className="translate-y-3 rounded-full border border-white/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest2 text-white/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100"
                  style={{ transitionDelay: `${ti * 70}ms`, transitionTimingFunction: EASE }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* big title: letters roll */}
          <h3 className={`display leading-[0.98] ${p.logo && !big ? "pr-12 md:pr-[4.5rem]" : ""} ${big ? "text-3xl md:text-5xl" : wide ? "text-xl md:text-4xl" : "text-base md:text-2xl"}`}>
            <RollText text={title} />
          </h3>

          {/* summary: always visible on big/wide (nudges up on hover), revealed from a mask on the small tiles */}
          <div
            className={`grid transition-all duration-500 ${showSummary ? "grid-rows-[1fr]" : "hidden grid-rows-[0fr] group-hover:grid-rows-[1fr] md:grid"}`}
            style={{ transitionTimingFunction: EASE }}
          >
            <div className="overflow-hidden">
              <p
                className={`mt-2 max-w-md text-[12px] leading-relaxed text-white/75 transition-all duration-500 group-hover:text-white md:text-[14px] ${showSummary ? "group-hover:-translate-y-0.5" : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"} ${big ? "" : wide ? "hidden md:block" : "line-clamp-3"}`}
                style={{ transitionTimingFunction: EASE }}
              >
                {p.summary}
              </p>
              <span
                className="mt-3 hidden -translate-x-4 items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:inline-flex"
                style={{ transitionDelay: "120ms", transitionTimingFunction: EASE }}
              >
                View case study <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* bottom progress line draws across on hover */}
        <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-white/85 transition-transform duration-700 group-hover:scale-x-100 group-active:scale-x-100" style={{ transitionTimingFunction: EASE }} />
      </Link>
    </motion.div>
  );
}

export default function BentoGrid({
  items,
  spans,
  cta,
  notchBg,
  notchFg,
}: {
  items: Project[];
  spans: string[];
  cta: { label: string; to: string; span: string };
  notchBg: string;
  notchFg: string;
}) {
  return (
    <div className="grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-2.5 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
      {items.map((p, i) => (
        <Tile key={p.slug} p={p} i={i} span={spans[i] ?? ""} notchBg={notchBg} notchFg={notchFg} />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className={cta.span}
      >
        <Link to={cta.to} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-glow p-4 text-ink-900 transition-transform duration-500 hover:-translate-y-1 active:scale-[0.98] md:rounded-[28px] md:p-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[160%] -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
          <span className="relative font-mono text-[10px] uppercase tracking-widest2 text-ink-900/60 transition-all duration-500 group-hover:tracking-[0.34em] group-hover:text-ink-900">Next</span>
          <div className="relative flex items-end justify-between gap-3">
            <span className="display text-2xl md:text-5xl"><RollText text={cta.label} /></span>
            <ArrowRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:translate-x-3 md:h-12 md:w-12" strokeWidth={1.5} />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
