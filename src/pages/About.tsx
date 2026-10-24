import { motion } from "framer-motion";
import { ABOUT_PARAGRAPHS, EXPERIENCE, SKILLS, EDUCATION, CERTIFICATIONS, SITE } from "@/data/content";
import RevealText from "@/components/RevealText";

export default function About() {
  const skills = SKILLS.filter((s) => !["Sales & Operations", "Soft Skills", "Education & Coordination"].includes(s.category));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative bg-ink-900 text-white pt-32 pb-20 overflow-hidden">
        <img src="/images/hero/jimmy-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[62%_30%] grayscale opacity-30" />
        <div className="container-page relative">
          <p className="num !text-white/60 mb-4">About</p>
          <h1 className="display text-5xl md:text-8xl"><RevealText text="Marketing, social, tech." /></h1>
        </div>
      </section>

      <section className="container-page py-20 grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <p className="num">01 / Profile</p>
        <div className="space-y-6 text-[16px] leading-relaxed max-w-2xl">
          {ABOUT_PARAGRAPHS.map((p) => <p key={p}>{p}</p>)}
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">{SITE.languages}</p>
        </div>
      </section>

      <section className="container-page pb-20">
        <p className="num mb-8">02 / Experience</p>
        {EXPERIENCE.map((e) => (
          <div key={e.role + e.company} className="grid gap-4 border-t border-parchment-100/15 py-8 md:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-2">{e.period}</p>
              <h3 className="font-semibold text-lg">{e.role}</h3>
              <p className="text-sm text-muted-foreground">{e.company}</p>
            </div>
            <ul className="space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-ink-900 text-white py-20">
        <div className="container-page">
          <p className="num !text-white/50 mb-8">03 / Toolkit</p>
          <div className="grid gap-px bg-white/15 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.category} className="bg-ink-900 p-7">
                <h3 className="font-semibold mb-4">{s.category}</h3>
                <p className="text-[13px] leading-relaxed text-white/60">{s.tags.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <p className="num">04 / Education</p>
        <div className="space-y-4">
          {EDUCATION.map((e) => (
            <div key={e.degree} className="border-t border-parchment-100/15 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">{e.period}</p>
              <p className="font-semibold">{e.degree}</p>
              <p className="text-sm text-muted-foreground">{e.school}</p>
            </div>
          ))}
          <p className="border-t border-parchment-100/15 pt-4 text-sm text-muted-foreground">{CERTIFICATIONS.join(" · ")}</p>
        </div>
      </section>
    </motion.div>
  );
}
