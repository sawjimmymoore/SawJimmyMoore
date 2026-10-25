import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/data/content";

// Asymmetric bento grid with notched corners (after the Apptronik and Stodio
// references). Each tile pops in with a tilt and settles, the logo drifts at its
// own speed while scrolling, and the notch arrow turns on hover or tap.
function Tile({ p, i, span, notchBg, notchFg }: { p: Project; i: number; span: string; notchBg: string; notchFg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const big = span.includes("row-span-2") && span.includes("col-span-2");
  const wide = span.includes("col-span-2");
  const letter = String.fromCharCode(97 + i);

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
        className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] p-4 text-white transition-transform duration-300 active:scale-[0.98] md:rounded-[28px] md:p-6"
      >
        <span
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: `linear-gradient(140deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})` }}
        />
        {/* logo or big letter drifting at its own speed */}
        <motion.span style={{ y: drift }} className="pointer-events-none absolute -right-2 bottom-0 select-none font-black text-[7rem] font-extrabold leading-none text-white/10 md:text-[11rem]">
          {p.logo ? "" : letter}
        </motion.span>
        {p.logo && (
          <motion.span style={{ y: drift }} className="pointer-events-none absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-2 opacity-90 md:h-16 md:w-16">
            <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
          </motion.span>
        )}

        {/* notch cut out of the top-right corner */}
        <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full md:h-16 md:w-16" style={{ background: notchBg }} />
        <span className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-active:rotate-45 md:right-1.5 md:top-1.5 md:h-9 md:w-9" style={{ color: notchFg }}>
          <ArrowUpRight size={18} />
        </span>

        <span className="relative font-mono text-[10px] uppercase tracking-widest2 text-white/75">
          ({letter}) <span className="hidden sm:inline">{p.category}</span>
        </span>
        <div className="relative">
          <h3 className={`display leading-[0.95] ${big ? "break-words text-3xl md:text-5xl" : wide ? "text-xl md:text-4xl" : "text-lg md:text-2xl"}`}>
            {p.title.split(",")[0]}
          </h3>
          {(big || wide) && (
            <p className={`mt-2 max-w-md text-[12px] leading-relaxed text-white/75 md:text-[14px] ${big ? "" : "hidden md:block"}`}>{p.summary}</p>
          )}
        </div>
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
        <Link to={cta.to} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-glow p-4 text-ink-900 transition-transform active:scale-[0.98] md:rounded-[28px] md:p-6">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink-900/60">Next</span>
          <div className="flex items-end justify-between gap-3">
            <span className="display text-2xl md:text-5xl">{cta.label}</span>
            <ArrowRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:h-12 md:w-12" strokeWidth={1.5} />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
