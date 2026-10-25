import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS, FEATURED_ORDER, type Project } from "@/data/content";
import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";
import BentoGrid from "@/components/BentoGrid";
import ScrollMarquee from "@/components/ScrollMarquee";

// md: 4 columns x 5 rows, no holes. Phones: 2 columns, dense packing.
const WORK_SPANS = [
  "col-span-2 row-span-2", "", "", "col-span-2",
  "md:row-span-2", "col-span-2", "", "col-span-2", "",
  "md:col-span-2",
];

export default function Projects() {
  const list = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pb-20 pt-24 md:pt-32">
      <div className="container-page">
        <div ref={heroRef} className="mb-6 md:mb-10">
          <Reveal variant="left"><p className="num mb-4">Work · ({String(list.length).padStart(2, "0")})</p></Reveal>
          <motion.h1 style={{ x: titleX, opacity: fade }} className="display text-5xl md:text-8xl">
            <RevealText text="Selected work" />
          </motion.h1>
        </div>
      </div>
      <ScrollMarquee rows={list.slice(0, 2).map((p) => p.title.split(",")[0])} />
      <div className="container-page mt-6">
        <BentoGrid
          items={list}
          spans={WORK_SPANS}
          cta={{ label: "Let's talk", to: "/contact", span: "col-span-2" }}
          notchBg="rgb(var(--bg))"
          notchFg="rgb(var(--text-100))"
        />
      </div>
    </motion.div>
  );
}
