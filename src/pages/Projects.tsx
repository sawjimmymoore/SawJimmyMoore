import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/content";
import { useLang } from "@/lib/i18n";
import RevealText from "@/components/RevealText";
import ScrollStackCards, { type StackCardItem } from "@/components/effects/ScrollStackCards";

// Projects are real client work, only real assets belong here, never a
// mockup from the services reference pack, those are stand-ins for
// services that don't have a client site of their own and mixing the two
// up misrepresents actual delivered work. De Fabiano has a real product
// photo from the live site; everything else falls back to a plain
// gradient + logo (ScrollStackCards' own default) until an actual
// screenshot is captured, that's an honest gap, not something to paper
// over with a stock mockup (Kru Gunn, MTSS, Hazel are all live URLs, a
// real capture can replace the gradient here the moment one exists).
const REAL_IMAGES: Record<string, string> = {
  "de-fabiano": "https://img1.wsimg.com/isteam/ip/67ab67ce-c960-462a-af80-096829e33a41/photo.jpg",
};

export default function Projects() {
  const { t } = useLang();
  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  const cards: StackCardItem[] = filtered.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    metric: p.metrics?.[0] ? { value: p.metrics[0].value, label: p.metrics[0].label } : undefined,
    image: REAL_IMAGES[p.slug],
    logo: p.logo,
    gradientFrom: p.cover.gradientFrom,
    gradientTo: p.cover.gradientTo,
    href: `/projects/${p.slug}`,
  }));

  return (
    // No `y` in this transition, only `opacity`. A leftover `transform`
    // (which `animate={{ y: 0 }}` leaves behind even at rest) on any
    // ancestor silently breaks `position: sticky` for the card stack below,
    // same root cause already found and fixed on Home.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="container-page">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">{t("projects_eyebrow")}</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight text-parchment-100 mb-5">
            <RevealText text={t("projects_title")} />
          </h1>
          <p className="text-[15.5px] text-muted-foreground leading-relaxed">
            Every project shows its category, its outcome, and a real visual at a glance. Scroll
            through the stack below, click through only for the full case study.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-ink-900 text-on-primary"
                  : "border border-primary-500/20 text-parchment-200 hover:border-primary-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ScrollStackCards items={cards} />
      </div>
    </motion.div>
  );
}
