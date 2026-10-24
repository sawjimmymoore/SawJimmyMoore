import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE, STATS, PROJECTS, FEATURED_ORDER, WHAT_I_LEAD } from "@/data/content";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

const ORGS = ["Fen-i", "Zebra Pitch", "Young CEO", "Click to Create", "MMG", "Daw Na Yeik", "De Fabiano"];

export default function Home() {
  const [open, setOpen] = useState(0);
  const featured = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean).slice(0, 6) as typeof PROJECTS;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* HERO */}
      <section className="relative min-h-[100svh] bg-ink-900 text-white overflow-hidden">
        <img
          src="/images/hero/jimmy-hero.jpg"
          alt="Saw Jimmy Moore"
          className="absolute inset-0 h-full w-full object-cover object-[62%_30%] grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70" />
        <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-12 pt-28">
          <p className="num !text-white/60 mb-6">{SITE.location} · {SITE.titles[0]}</p>
          <h1 className="display text-[clamp(3rem,11vw,9rem)]">
            <RevealText text="Saw Jimmy" />
            <br />
            <span className="text-primary-400"><RevealText text="Moore" delay={0.15} /></span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-[15px] leading-relaxed text-white/75">{SITE.description}</p>
            <div className="flex gap-3">
              <Magnetic><Link to="/projects" className="btn-solid">View work</Link></Magnetic>
              <Link to="/contact" className="btn-line text-white">Contact</Link>
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

      {/* 01 WHAT I LEAD */}
      <section className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="num mb-4">01 / Focus</p>
            <h2 className="display text-4xl md:text-6xl">
              <RevealText text="What I lead" />
            </h2>
          </div>
          <div>
            {WHAT_I_LEAD.map((w, i) => (
              <button
                key={w.title}
                onClick={() => setOpen(open === i ? -1 : i)}
                onMouseEnter={() => setOpen(i)}
                className="block w-full border-t border-parchment-100/15 py-5 text-left last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="num">0{i + 1}</span>
                  <span className={`font-semibold text-lg transition-colors ${open === i ? "text-primary-400" : ""}`}>{w.title}</span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pl-10 pt-3 text-[15px] leading-relaxed text-muted-foreground max-w-xl">{w.text}</p>
                </motion.div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 02 WORK */}
      <section className="bg-ink-900 text-white py-24 md:py-32">
        <div className="container-page">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="num !text-white/50 mb-4">02 / Selected work</p>
              <h2 className="display text-4xl md:text-6xl"><RevealText text="Projects" /></h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex btn-line text-white">All work</Link>
          </div>
          <div>
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t border-white/15 py-7 transition-colors hover:bg-white/[0.03] md:grid-cols-[4rem_1.4fr_1fr_auto] last:border-b"
              >
                <span className="num !text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-black font-extrabold uppercase text-2xl md:text-4xl leading-none transition-transform group-hover:translate-x-2">
                  {p.title.split(",")[0]}
                </span>
                <span className="hidden md:block font-mono text-[11px] uppercase tracking-widest2 text-white/50">{p.category}</span>
                <ArrowUpRight className="text-white/40 transition-colors group-hover:text-primary-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 NUMBERS */}
      <section className="container-page py-24 md:py-32">
        <p className="num mb-10">03 / Results, De Fabiano</p>
        <div className="grid gap-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-t border-parchment-100/20 pt-5"
            >
              <p className="display text-6xl md:text-8xl">{s.value}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-400 text-white">
        <div className="container-page flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-5xl md:text-8xl">Let's talk.</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-ink-900 px-7 py-4 font-mono text-[11px] uppercase tracking-widest2 hover:bg-black">
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
