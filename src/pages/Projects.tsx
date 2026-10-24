import { motion } from "framer-motion";
import { PROJECTS, FEATURED_ORDER } from "@/data/content";
import RevealText from "@/components/RevealText";
import ScrollStackCards, { type StackCardItem } from "@/components/effects/ScrollStackCards";

export default function Projects() {
  const list = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as typeof PROJECTS;
  const cards: StackCardItem[] = list.map((p) => ({
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="pt-32 pb-24 px-6">
      <div className="container-page">
        <p className="num mb-4">Work</p>
        <h1 className="display text-5xl md:text-8xl mb-6"><RevealText text="Selected work" /></h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground mb-14">
          Social campaigns, websites and systems. Scroll to stack the cards, click through for the full case study.
        </p>
        <ScrollStackCards items={cards} />
        <div className="mt-16 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest2">
          {PROJECTS.filter((p) => p.url && FEATURED_ORDER.includes(p.slug)).map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noreferrer" className="border-b border-current pb-1 hover:text-primary-400 transition-colors">
              {p.url!.replace("https://", "")} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
