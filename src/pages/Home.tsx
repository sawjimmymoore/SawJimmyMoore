import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE, STATS, PROJECTS, FEATURED_ORDER, WHAT_I_LEAD } from "@/data/content";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import ScrollTextHighlight from "@/components/effects/ScrollTextHighlight";
import AsciiWave from "@/components/effects/AsciiWave";

const ORGS = ["Fen-i", "Zebra Pitch", "Young CEO", "Click to Create", "MMG", "Daw Na Yeik", "De Fabiano"];
const STATEMENT =
  "Marketing, social media and technology under one roof. I plan the campaign, build the page it lands on, and read the numbers that come back.";

export default function Home() {
  const [open, setOpen] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const featured = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean).slice(0, 6) as typeof PROJECTS;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] bg-ink-900 text-white overflow-hidden">
        <motion.img
          src="/images/hero/jimmy-hero.jpg"
          alt="Saw Jimmy Moore"
          style={{ y: imgY }}
          className="absolute inset-0 h-[115%] w-full object-cover object-[62%_30%] grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70" />
        <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-12 pt-28">
          <motion.div style={{ y: titleY }}>
            <p className="num !text-white/60 mb-6">{SITE.location} · {SITE.titles[0]} · {SITE.titles[1]}</p>
            <h1 className="display text-[clamp(3rem,11vw,9rem)]">
              <RevealText text="Saw Jimmy" />
              <br />
              <span className="text-glow"><RevealText text="Moore" delay={0.15} /></span>
            </h1>
          </motion.div>
          <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-[15px] leading-relaxed text-white/75">{SITE.description}</p>
            <div className="flex gap-3">
              <Magnetic><Link to="/projects" className="btn-solid !bg-glow !text-ink-900 hover:!bg-white">View work</Link></Magnetic>
              <Link to="/contact" className="btn-line text-white hover:!bg-glow hover:!text-ink-900 hover:!border-glow">Book a call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="border-y border-parchment-100/15 bg-bg py-5 overflow-hidden">
        <div className="flex w-max" style={{ animation: "marquee 32s linear infinite" }}>
          {[0, 1].map((c) => (
            <div key={c} className="flex shrink-0 items-center" aria-hidden={c === 1}>
              {ORGS.map((o) => (
                <span key={o + c} className="mx-8 font-black font-extrabold uppercase text-2xl text-parchment-100/80">
                  {o} <span className="ml-8 text-primary-400">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT, words light up on scroll */}
      <section className="container-page py-24 md:py-36">
        <p className="num mb-8">00 / In one line</p>
        <ScrollTextHighlight text={STATEMENT} className="font-black font-extrabold text-[clamp(1.8rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-5xl" />
      </section>

      {/* 01 FOCUS */}
      <section className="container-page pb-24 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-28 self-start">
            <p className="num mb-4">01 / Focus</p>
            <h2 className="display text-4xl md:text-6xl"><RevealText text="What I lead" /></h2>
          </div>
          <div>
            {WHAT_I_LEAD.map((w, i) => (
              <motion.button
                key={w.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="block w-full border-t border-parchment-100/15 py-6 text-left last:border-b"
              >
                <div className="flex items-center gap-5">
                  <span className="num">0{i + 1}</span>
                  <span className={`flex-1 font-semibold text-lg transition-colors ${open === i ? "text-primary-400" : ""}`}>{w.title}</span>
                  <span className={`font-mono text-xl transition-transform ${open === i ? "rotate-45 text-primary-400" : ""}`}>+</span>
                </div>
                <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                  <p className="pl-10 pt-3 text-[15px] leading-relaxed text-muted-foreground max-w-xl">{w.text}</p>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 02 NUMBERS */}
      <section className="container-page py-24 md:py-32">
        <p className="num mb-10">02 / At a glance</p>
        <div className="grid gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard className="h-full border border-parchment-100/15 bg-bg-card p-8 transition-colors hover:border-primary-400">
                <p className="display text-7xl md:text-8xl text-primary-400"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">{s.label}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dark area: each section has its own ASCII water pool behind it. The
          effect listens on window, so content above it never blocks the pointer. */}
      <div className="relative overflow-hidden bg-ink-900">
      {/* 03 WORK */}
      <section className="relative text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-45"><AsciiWave ink="#B9CC4F" cell={11} fill={10} push={14} speed={7} clickIntensity={55} /></div>
        <div className="container-page relative">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="num !text-white/50 mb-4">03 / Selected work</p>
              <h2 className="display text-4xl md:text-6xl"><RevealText text="Projects" /></h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex btn-line text-white hover:!bg-glow hover:!text-ink-900 hover:!border-glow">All work</Link>
          </div>
          <div>
            {featured.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden border-t border-white/15 py-7 md:grid-cols-[4rem_1.4fr_1fr_auto] last:border-b"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-0 opacity-30 transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${p.cover.gradientTo}, transparent)` }}
                  />
                  <span className="num relative !text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative font-black font-extrabold uppercase text-2xl md:text-4xl leading-none transition-transform duration-300 group-hover:translate-x-3">
                    {p.title.split(",")[0]}
                  </span>
                  <span className="relative hidden md:block font-mono text-[11px] uppercase tracking-widest2 text-white/50">{p.category}</span>
                  <ArrowUpRight className="relative text-white/40 transition-all group-hover:text-glow group-hover:rotate-45" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative text-white">
        <div className="absolute inset-0 opacity-50"><AsciiWave ink="#B9CC4F" cell={11} fill={9} push={14} speed={7} clickIntensity={55} /></div>
        <div className="container-page relative flex flex-col gap-8 pb-28 pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="num !text-white/60 mb-4">Move the cursor. Click the water.</p>
            <h2 className="display text-5xl md:text-8xl">Hiring or planning<br />a campaign?</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Let's talk. I lead social campaigns and build the web and systems behind them.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-glow px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 text-ink-900 hover:bg-white transition-colors">
              Book a call <ArrowUpRight size={16} />
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn-line text-white hover:!bg-white hover:!text-ink-900 hover:!border-white">Email me</a>
          </div>
        </div>
      </section>
      </div>
    </motion.div>
  );
}
