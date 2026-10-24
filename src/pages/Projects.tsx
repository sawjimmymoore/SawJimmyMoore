import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PROJECTS, FEATURED_ORDER, type Project } from "@/data/content";
import RevealText from "@/components/RevealText";
import TiltCard from "@/components/TiltCard";
import ScrollStackCards, { type StackCardItem } from "@/components/effects/ScrollStackCards";

// Scroll-driven card: rises, un-tilts and scales into place as it enters, the
// cover drifts at a different speed than the card (parallax), and the whole
// card eases out again as it leaves. Right-hand column sits lower so the grid
// staggers instead of reading as a flat table.
function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [90, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0.88, 1, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.5]);
  const coverY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const metric = p.metrics?.[0];

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, rotateX, opacity, transformPerspective: 1000 }}
      className={i % 2 === 1 ? "md:mt-24" : ""}
    >
      <TiltCard className="h-full">
        <Link
          to={`/projects/${p.slug}`}
          className="group block overflow-hidden rounded-[28px] border border-parchment-100/15 bg-bg-card transition-colors hover:border-primary-400"
        >
          <div className="relative h-60 overflow-hidden">
            <motion.div
              style={{ y: coverY, background: `linear-gradient(135deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})` }}
              className="absolute -inset-x-4 -inset-y-12 transition-transform duration-700 group-hover:scale-110"
            />
            {p.logo && (
              <motion.div style={{ y: logoY }} className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/90 p-3 shadow-lg">
                  <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
                </span>
              </motion.div>
            )}
            <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-white backdrop-blur">
              ({String(i + 1).padStart(2, "0")}) {p.category}
            </span>
            {metric && (
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-ink-900">
                {metric.value} <span className="font-normal text-ink-900/60">{metric.label}</span>
              </span>
            )}
          </div>
          <div className="p-7">
            <div className="flex items-start justify-between gap-4">
              <h2 className="display text-2xl md:text-3xl">{p.title.split(",")[0]}</h2>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current transition-all group-hover:rotate-45 group-hover:border-primary-400 group-hover:bg-primary-400 group-hover:text-on-primary">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{p.summary}</p>
            <p className="mt-5 border-t border-dashed border-parchment-100/25 pt-4 font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground">
              {p.role}{p.period ? ` · ${p.period}` : ""}
            </p>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const [view, setView] = useState<"grid" | "stack">("grid");
  const [cat, setCat] = useState("All");
  const all = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const cats = ["All", ...Array.from(new Set(all.map((p) => p.category)))];
  const list = cat === "All" ? all : all.filter((p) => p.category === cat);

  const stack: StackCardItem[] = list.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    metric: p.metrics?.[0] ? { value: p.metrics[0].value, label: p.metrics[0].label } : undefined,
    logo: p.logo,
    gradientFrom: p.cover.gradientFrom,
    gradientTo: p.cover.gradientTo,
    href: `/projects/${p.slug}`,
  }));

  return (
    // opacity only: a leftover transform on an ancestor breaks the sticky stack
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="pt-32">
      <div className="container-page">
        <p className="num mb-4">Work</p>
        <h1 className="display text-5xl md:text-8xl mb-10"><RevealText text="Selected work" /></h1>

        <div className="mb-14 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                  cat === c ? "border-primary-400 bg-primary-400 text-on-primary" : "border-parchment-100/25 hover:border-primary-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full border border-parchment-100/25 p-1">
            {(["grid", "stack"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className="relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest2">
                {view === v && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ink-900" />}
                <span className={`relative ${view === v ? "text-white" : ""}`}>{v === "grid" ? "Cards" : "Stack"}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div key={"g" + cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-x-8 gap-y-10 md:grid-cols-2 pb-28">
              {list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
            </motion.div>
          ) : (
            <motion.div key={"s" + cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-28">
              <ScrollStackCards items={stack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* big closing block, like the reference "Get Started" */}
      <Link to="/contact" className="group block bg-glow text-ink-900">
        <div className="container-page flex items-center justify-between gap-6 py-16 md:py-24">
          <span className="display text-[clamp(3rem,10vw,9rem)]">Get in touch</span>
          <ArrowRight className="h-12 w-12 md:h-28 md:w-28 shrink-0 transition-transform duration-500 group-hover:translate-x-4" strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
  );
}
