import { motion } from "framer-motion";
import { SITE, ABOUT_PARAGRAPHS, SKILLS, EXPERIENCE, RESULTS, EDUCATION, CERTIFICATIONS } from "@/data/content";
import { useLang } from "@/lib/i18n";
import RevealText from "@/components/RevealText";
import TiltCard from "@/components/TiltCard";

/**
 * Combined About + Experience. These used to be two separate pages telling
 * overlapping parts of the same story (who Jimmy is, what he's done); one
 * page reads better and skips the "which page has the timeline again?"
 * problem. Sections run bio -> skills -> track record -> background.
 */
export default function About() {
  const { t } = useLang();
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="eyebrow mb-4">{t("about_eyebrow")}</p>
          <h1 className="font-black text-4xl md:text-6xl tracking-tight text-parchment-100">
            <RevealText text={t("about_title")} />
          </h1>
        </motion.div>

        {/* BIO + INFO CARD */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-[15.5px] text-parchment-200 leading-relaxed mb-5">
                {p}
              </p>
            ))}
          </motion.div>

          <TiltCard>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-primary-500/15 bg-bg-card p-7 h-fit"
            >
              <InfoRow label="Location" value={SITE.location} />
              <InfoRow label="Email" value={SITE.email} />
              <InfoRow label="Phone" value={SITE.phone} />
              <InfoRow label="Languages" value={SITE.languages} />
              <InfoRow label="LinkedIn" value="jimmy-moore-742b75214" />
              <InfoRow label="Status" value={SITE.status} last />
            </motion.div>
          </TiltCard>
        </div>

        {/* SKILLS */}
        <div className="mb-24">
          <p className="eyebrow mb-4">Capabilities</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100 mb-10">Skills</h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {SKILLS.map((s, i) => (
              <TiltCard key={s.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-xl border border-primary-500/15 bg-bg-card p-6 h-full"
                >
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <p className="text-[15px] font-semibold text-parchment-100 mb-3.5">{s.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary-500/8 px-2.5 py-1 text-[11.5px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* EXPERIENCE TIMELINE */}
        <div className="mb-24">
          <p className="eyebrow mb-4">Where This Comes From</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100 mb-10">Experience</h2>
          <div className="space-y-10 max-w-3xl">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={item.role + item.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pl-8 border-l-2 border-primary-500/20"
              >
                <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary-500" />
                <p className="font-mono text-[12px] uppercase tracking-widest2 text-primary-500 mb-1.5">{item.period}</p>
                <h3 className="font-display text-xl font-semibold text-parchment-100 mb-1">{item.role}</h3>
                <p className="text-[13.5px] text-muted-foreground mb-4">{item.company}</p>
                <ul className="space-y-2">
                  {item.bullets.map((b, bi) => (
                    <li key={bi} className="text-[14px] text-parchment-200 leading-relaxed flex gap-2.5">
                      <span className="text-primary-500 mt-1.5 flex-shrink-0">▪</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        <div className="mb-24">
          <p className="eyebrow mb-4">Track Record</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100 mb-10">Key Results</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {RESULTS.map((r, i) => (
              <TiltCard key={r.title} className={r.featured ? "md:col-span-2" : ""}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl border p-7 h-full ${
                    r.featured ? "border-primary-500/40 bg-primary-500/[0.04]" : "border-primary-500/15 bg-bg-card"
                  }`}
                >
                  <p className="text-[11.5px] uppercase tracking-[0.08em] text-primary-500 font-medium mb-2">{r.tag}</p>
                  <h3 className="font-display text-xl font-semibold text-parchment-100 mb-5">{r.title}</h3>
                  <div className={`grid gap-5 mb-5 ${r.featured ? "grid-cols-3 md:grid-cols-6" : "grid-cols-2"}`}>
                    {r.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-display text-xl md:text-2xl font-bold text-primary-500">{m.value}</p>
                        <p className="text-[11.5px] text-muted-foreground mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[14px] text-parchment-200 leading-relaxed">{r.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <p className="eyebrow mb-4">Background</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100 mb-10">Education & Certifications</h2>

          <div className="grid grid-cols-2 gap-3 md:gap-5 mb-8">
            {EDUCATION.map((e) => (
              <TiltCard key={e.degree}>
                <div className="rounded-xl border border-primary-500/15 bg-bg-card p-6">
                  <p className="font-mono text-[12px] text-primary-500 mb-2">{e.period}</p>
                  <p className="text-[15px] font-semibold text-parchment-100 mb-1">{e.degree}</p>
                  <p className="text-[13.5px] text-muted-foreground">{e.school}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CERTIFICATIONS.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 rounded-full border border-primary-500/25 px-4 py-2 text-[13px] text-parchment-200">
                <span className="text-primary-500">✦</span> {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 py-3 ${!last ? "border-b border-primary-500/10" : ""}`}>
      <span className="text-[12.5px] text-muted-foreground">{label}</span>
      <span className="text-[13.5px] font-medium text-parchment-100 text-right">{value}</span>
    </div>
  );
}
