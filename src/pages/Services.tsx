import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES, GENERAL_FAQS } from "@/data/content";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollStackCards, { type StackCardItem } from "@/components/effects/ScrollStackCards";

const ICON_COLORS: Record<string, [string, string]> = {
  code: ["#1a2332", "#4a7fa5"],
  cart: ["#7456c9", "#cdbdf5"],
  megaphone: ["#444733", "#1a1a1a"],
  calendar: ["#0f2027", "#2c5364"],
  database: ["#1a1a1a", "#3a2a1a"],
  heart: ["#1a0f0d", "#4a1015"],
  user: ["#0f1420", "#2a3a5a"],
  layers: ["#0f1a14", "#1e3a2a"],
};

const cards: StackCardItem[] = SERVICES.map((s) => {
  const [from, to] = ICON_COLORS[s.icon] || ["#1a2332", "#4a7fa5"];
  return {
    slug: s.slug,
    title: s.name,
    category: s.tagline,
    summary: s.painPoint,
    image: s.image,
    gradientFrom: from,
    gradientTo: to,
    href: `/services/${s.slug}`,
    ctaLabel: "See full details",
  };
});

/**
 * Same stacking-card scroll effect as Projects, same component, so
 * scrolling behaves identically whether you're looking at services or
 * projects. Each card is a real styled mockup now instead of a flat
 * brand-color gradient.
 */
export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">Services</p>
          <h1 className="font-black text-4xl md:text-6xl tracking-tight text-parchment-100 mb-5">
            <RevealText text="A slow site is a business cost" />
          </h1>
          <p className="text-[15.5px] text-muted-foreground leading-relaxed">
            Every day without a working site or a real lead pipeline is a customer who found a competitor
            first. Here is exactly what is on offer, what it solves, and how it pays for itself.
          </p>
        </motion.div>

        <div className="mb-20">
          <ScrollStackCards items={cards} imageFit="contain" />
        </div>

        <div className="rounded-[32px] bg-ink-700 border border-primary-500/10 p-8 md:p-12 mb-16 text-center">
          <h2 className="font-black text-2xl md:text-3xl tracking-tight text-parchment-100 mb-4">
            See the full pricing breakdown
          </h2>
          <p className="text-[14px] text-parchment-300 mb-7 max-w-md mx-auto">
            Four fixed tiers, one clear price range each, no open-ended quotes.
          </p>
          <Magnetic>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 text-ink-900 px-7 py-3.5 text-[14px] font-bold hover:bg-primary-400 transition-colors duration-200"
            >
              View Pricing <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4 text-center">FAQ</p>
          <h2 className="font-black text-2xl md:text-3xl tracking-tight text-parchment-100 text-center mb-10">
            Common Questions
          </h2>
          <FaqAccordion items={GENERAL_FAQS} />
        </div>
      </div>
    </div>
  );
}
