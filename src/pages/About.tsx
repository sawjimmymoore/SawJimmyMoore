import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ABOUT_PARAGRAPHS, EXPERIENCE, SKILLS, EDUCATION, CERTIFICATIONS, SITE } from "@/data/content";
import RevealText from "@/components/RevealText";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import ScrollTextHighlight from "@/components/effects/ScrollTextHighlight";
import AsciiWave from "@/components/effects/AsciiWave";

const TABS = ["Experience", "Toolkit", "Education"] as const;

export default function About() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Experience");
  const [openExp, setOpenExp] = useState(0);
  const skills = SKILLS.filter((s) => !["Sales & Operations", "Soft Skills", "Education & Coordination"].includes(s.category));
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative bg-ink-900 text-white pt-24 md:pt-32 pb-14 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-50"><AsciiWave ink="#B9CC4F" cell={12} fill={7} push={12} speed={6} clickIntensity={50} /></div>
        <div className="container-page relative">
          <p className="num !text-white/60 mb-4">About</p>
          <h1 className="display text-5xl md:text-8xl"><RevealText text="Marketing, social, tech." /></h1>
        </div>
      </section>

      <section className="container-page py-12 md:py-28 grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <p className="num md:sticky md:top-28 self-start">01 / Profile</p>
        <div>
          <ScrollTextHighlight text={ABOUT_PARAGRAPHS[0]} className="text-[clamp(1.3rem,2.6vw,2rem)] font-semibold leading-snug mb-10" />
          <div className="space-y-6 text-[16px] leading-relaxed text-muted-foreground max-w-2xl">
            {ABOUT_PARAGRAPHS.slice(1).map((p, i) => (
              <motion.p key={p} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>{p}</motion.p>
            ))}
            <p className="font-mono text-[11px] uppercase tracking-widest2">{SITE.languages}</p>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {[
            { v: 8, l: "Websites and systems built" },
            { v: 4, l: "Brand social pages run" },
            { v: 3, l: "Programmes marketed end to end" },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <TiltCard className="border border-parchment-100/15 bg-bg-card p-3 md:p-7 hover:border-primary-400 transition-colors">
                <p className="display text-4xl md:text-6xl text-primary-400"><CountUp to={s.v} /></p>
                <p className="mt-2 md:mt-3 font-mono text-[9px] leading-snug md:text-[11px] uppercase tracking-widest2 text-muted-foreground">{s.l}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <section className="container-page pb-16 md:pb-24">
        <p className="num mb-6">02 / Detail</p>
        <div className="mb-8 flex w-full md:w-auto md:inline-flex border border-parchment-100/20 p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 md:flex-none px-3 md:px-5 py-3 md:py-2.5 font-mono text-[11px] uppercase tracking-widest2"
            >
              {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 bg-primary-400" />}
              <span className={`relative ${tab === t ? "text-on-primary" : ""}`}>{t}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {tab === "Experience" && (
              <div ref={lineRef} className="relative pl-8 md:pl-12">
                <div className="absolute left-2 top-0 h-full w-px bg-parchment-100/15" />
                <motion.div style={{ scaleY }} className="absolute left-2 top-0 h-full w-px origin-top bg-primary-400" />
                {EXPERIENCE.map((e, i) => (
                  <motion.div
                    key={e.role + e.company}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <span className={`absolute -left-[2.15rem] md:-left-[3.15rem] top-6 h-3 w-3 rounded-full border-2 border-primary-400 ${openExp === i ? "bg-primary-400" : "bg-bg"}`} />
                    <button onClick={() => setOpenExp(openExp === i ? -1 : i)} className="block w-full border border-parchment-100/15 bg-bg-card p-6 text-left transition-colors hover:border-primary-400">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-2">{e.period}</p>
                          <h3 className="font-semibold text-lg">{e.role}</h3>
                          <p className="text-sm text-muted-foreground">{e.company}</p>
                        </div>
                        <span className={`font-mono text-xl transition-transform ${openExp === i ? "rotate-45" : ""}`}>+</span>
                      </div>
                      <motion.ul initial={false} animate={{ height: openExp === i ? "auto" : 0, opacity: openExp === i ? 1 : 0 }} className="overflow-hidden space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                        <li className="pt-4" />
                        {e.bullets.map((b) => <li key={b}>{b}</li>)}
                      </motion.ul>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "Toolkit" && (
              <div className="grid gap-5 md:grid-cols-2">
                {skills.map((s, i) => (
                  <motion.div key={s.category} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <TiltCard className="h-full border border-parchment-100/15 bg-bg-card p-7 hover:border-primary-400 transition-colors">
                      <h3 className="font-semibold mb-4">{s.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tg) => (
                          <span key={tg} className="border border-parchment-100/20 px-3 py-1 text-[12px] text-muted-foreground transition-colors hover:border-primary-400 hover:text-primary-400">{tg}</span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "Education" && (
              <div className="grid gap-5 md:grid-cols-2">
                {EDUCATION.map((e) => (
                  <TiltCard key={e.degree} className="border border-parchment-100/15 bg-bg-card p-7 hover:border-primary-400 transition-colors">
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-2">{e.period}</p>
                    <p className="font-semibold">{e.degree}</p>
                    <p className="text-sm text-muted-foreground">{e.school}</p>
                  </TiltCard>
                ))}
                <TiltCard className="border border-parchment-100/15 bg-bg-card p-7 md:col-span-2">
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-2">Certifications</p>
                  <p className="text-sm text-muted-foreground">{CERTIFICATIONS.join(" · ")}</p>
                </TiltCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
