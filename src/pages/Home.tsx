import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE, STATS, PROJECTS, FEATURED_ORDER, WHAT_I_LEAD } from "@/data/content";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import ScrollMarquee from "@/components/ScrollMarquee";
import BentoGrid from "@/components/BentoGrid";
import ScrollTextHighlight from "@/components/effects/ScrollTextHighlight";

const ORGS = ["Fen-i", "Zebra Pitch", "Young CEO", "Click to Create", "MMG", "Daw Na Yeik", "De Fabiano"];
const STATEMENT =
  "Marketing, social media and technology under one roof. I plan the campaign, build the page it lands on, and read the numbers that come back.";
const HOME_SPANS = ["col-span-2 row-span-2", "", "", "col-span-2", "", "", ""];

// Each row fades and slides as it passes the middle of the screen.
function FocusItem({ w, i, open, setOpen }: { w: { title: string; text: string }; i: number; open: boolean; setOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 58%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [36, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, x }}>
      <button onClick={setOpen} className="block w-full border-t border-parchment-100/15 py-6 text-left last:border-b">
        <div className="flex items-center gap-5">
          <span className="num">0{i + 1}</span>
          <span className={`flex-1 text-lg font-semibold transition-colors ${open ? "text-primary-400" : ""}`}>{w.title}</span>
          <span className={`font-mono text-xl transition-transform ${open ? "rotate-45 text-primary-400" : ""}`}>+</span>
        </div>
        <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
          <p className="max-w-xl pl-10 pt-3 text-[15px] leading-relaxed text-muted-foreground">{w.text}</p>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const featured = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean).slice(0, 6) as typeof PROJECTS;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92svh] overflow-hidden bg-ink-900 text-white md:min-h-[100svh]">
        <motion.img
          src="/images/hero/jimmy-hero.jpg"
          alt="Saw Jimmy Moore"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 h-[115%] w-full object-cover object-[62%_30%] opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70" />
        <motion.div style={{ opacity: heroFade }} className="container-page relative flex min-h-[92svh] flex-col justify-end pb-28 pt-24 md:min-h-[100svh] md:pb-12 md:pt-28">
          <motion.div style={{ y: titleY }}>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="num mb-6 !text-white/60">
              {SITE.location} · {SITE.titles[0]} · {SITE.titles[1]}
            </motion.p>
            <h1 className="display text-[clamp(3rem,11vw,9rem)]">
              <RevealText text="Saw Jimmy" />
              <br />
              <span className="text-glow"><RevealText text="Moore" delay={0.15} /></span>
            </h1>
          </motion.div>
          <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="max-w-xl text-[15px] leading-relaxed text-white/75">
              {SITE.description}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }} className="flex gap-3 [&>*]:flex-1 md:[&>*]:flex-none">
              <Magnetic><Link to="/projects" className="btn-solid !bg-glow !text-ink-900 hover:!bg-white">View work</Link></Magnetic>
              <Link to="/contact" className="btn-line text-white hover:!border-glow hover:!bg-glow hover:!text-ink-900">Book a call</Link>
            </motion.div>
          </div>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute bottom-24 right-6 hidden font-mono text-[10px] uppercase tracking-widest2 text-white/50 md:block"
          >
            Scroll ↓
          </motion.span>
        </motion.div>
      </section>

      {/* TICKER */}
      <section className="overflow-hidden border-y border-parchment-100/15 bg-bg py-5">
        <div className="flex w-max" style={{ animation: "marquee 32s linear infinite" }}>
          {[0, 1].map((c) => (
            <div key={c} className="flex shrink-0 items-center" aria-hidden={c === 1}>
              {ORGS.map((o) => (
                <span key={o + c} className="mx-8 font-black text-2xl font-extrabold uppercase text-parchment-100/80">
                  {o} <span className="ml-8 text-primary-400">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="container-page py-14 md:py-36">
        <Reveal variant="left"><p className="num mb-8">00 / In one line</p></Reveal>
        <ScrollTextHighlight text={STATEMENT} className="max-w-5xl text-[clamp(1.8rem,5vw,4rem)] font-black font-extrabold leading-[1.05] tracking-tight" />
      </section>

      <ScrollMarquee rows={["Marketing", "Social", "Tech"]} />

      {/* 01 FOCUS */}
      <section className="container-page py-14 md:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <div className="self-start md:sticky md:top-28">
            <Reveal variant="left"><p className="num mb-4">01 / Focus</p></Reveal>
            <h2 className="display text-4xl md:text-6xl"><RevealText text="What I lead" /></h2>
          </div>
          <div>
            {WHAT_I_LEAD.map((w, i) => (
              <FocusItem key={w.title} w={w} i={i} open={open === i} setOpen={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* 02 NUMBERS */}
      <section className="container-page pb-14 md:pb-32">
        <Reveal variant="left"><p className="num mb-6 md:mb-10">02 / At a glance</p></Reveal>
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} variant="scale" delay={i * 0.12}>
              <TiltCard className="h-full border border-parchment-100/15 bg-bg-card p-3 transition-colors hover:border-primary-400 md:p-8">
                <p className="display text-4xl text-primary-400 md:text-8xl"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-widest2 text-muted-foreground md:mt-4 md:text-[11px]">{s.label}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 WORK, bento */}
      <section className="bg-ink-900 py-16 text-white md:py-28">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <div>
              <Reveal variant="left"><p className="num mb-4 !text-white/50">03 / Selected work</p></Reveal>
              <h2 className="display text-4xl md:text-6xl"><RevealText text="Projects" /></h2>
            </div>
            <Link to="/projects" className="btn-line hidden text-white hover:!border-glow hover:!bg-glow hover:!text-ink-900 md:inline-flex">All work</Link>
          </div>
          <BentoGrid
            items={featured}
            spans={HOME_SPANS}
            cta={{ label: "All work", to: "/projects", span: "col-span-2" }}
            notchBg="rgb(12 12 12)"
            notchFg="#ffffff"
          />
        </div>
      </section>
    </motion.div>
  );
}
