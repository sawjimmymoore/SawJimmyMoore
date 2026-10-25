import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PROJECTS, FEATURED_ORDER, type Project } from "@/data/content";
import RevealText from "@/components/RevealText";

function Cell({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const lineScale = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const fromLeft = i % 2 === 0;

  const spot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-bg"
    >
      {/* top rule draws itself as the card scrolls in */}
      <motion.span style={{ scaleX: lineScale }} className="absolute left-0 top-0 z-10 h-[2px] w-full origin-left bg-primary-400" />
      <Link to={`/projects/${p.slug}`} onMouseMove={spot} className="group relative block overflow-hidden p-8 md:p-10 min-h-[19rem]">
        {/* colour wipes up from the bottom on hover */}
        <span
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
          style={{ background: `linear-gradient(135deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})` }}
        />
        {/* cursor spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.16), transparent 65%)" }}
        />
        {/* ghost number drifts at its own speed */}
        <motion.span
          style={{ y: ghostY }}
          className="pointer-events-none absolute -bottom-6 right-4 select-none font-black font-extrabold text-[9rem] leading-none text-parchment-100/[0.06] transition-colors group-hover:text-white/10"
        >
          {String(i + 1).padStart(2, "0")}
        </motion.span>
        {p.logo && (
          <span className="absolute bottom-8 right-8 flex h-14 w-14 translate-y-4 items-center justify-center rounded-xl bg-white/90 p-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        )}
        <div className="relative flex h-full min-h-[15rem] flex-col justify-between transition-colors duration-300 group-hover:text-white">
          <div className="flex items-start justify-between">
            <span className="num group-hover:!text-white/70">{String(i + 1).padStart(2, "0")} · {p.category}</span>
            <ArrowUpRight className="opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100" />
          </div>
          <div>
            <h2 className="display mb-3 text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{p.title.split(",")[0]}</h2>
            <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground group-hover:text-white/80">{p.summary}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const list = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const names = list.map((p) => p.title.split(",")[0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-32 pb-24">
      <div className="container-page">
        <div ref={heroRef} className="mb-12">
          <p className="num mb-4">Work · ({String(list.length).padStart(2, "0")})</p>
          <motion.h1 style={{ x: titleX, opacity: fade }} className="display text-5xl md:text-8xl">
            <RevealText text="Selected work" />
          </motion.h1>
        </div>
      </div>

      {/* ticker of project names, runs the other way to the home one */}
      <div className="mb-14 overflow-hidden border-y border-parchment-100/15 py-4">
        <div className="flex w-max" style={{ animation: "marquee 40s linear infinite reverse" }}>
          {[0, 1].map((c) => (
            <div key={c} className="flex shrink-0 items-center" aria-hidden={c === 1}>
              {names.map((n) => (
                <span key={n + c} className="mx-6 font-black font-extrabold uppercase text-xl text-parchment-100/70">
                  {n} <span className="ml-6 text-primary-400">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="grid gap-px bg-parchment-100/15 md:grid-cols-2">
          {list.map((p, i) => <Cell key={p.slug} p={p} i={i} />)}
          {/* fills the last cell when the count is odd, so no empty block shows */}
          {list.length % 2 === 1 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-glow text-ink-900">
              <Link to="/contact" className="group flex h-full min-h-[19rem] flex-col justify-between p-8 md:p-10">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink-900/60">Next project</span>
                <div className="flex items-end justify-between gap-4">
                  <span className="display text-4xl md:text-6xl">Let's talk</span>
                  <ArrowRight className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:translate-x-3 md:h-16 md:w-16" strokeWidth={1.5} />
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
