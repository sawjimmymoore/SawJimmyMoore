import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, FEATURED_ORDER } from "@/data/content";
import RevealText from "@/components/RevealText";

export default function Projects() {
  const list = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as typeof PROJECTS;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-32 pb-24">
      <div className="container-page">
        <p className="num mb-4">Work</p>
        <h1 className="display text-5xl md:text-8xl mb-16"><RevealText text="Selected work" /></h1>
        <div className="grid gap-px bg-parchment-100/15 md:grid-cols-2">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="bg-bg"
            >
              <Link to={`/projects/${p.slug}`} className="group relative block overflow-hidden p-8 md:p-10 min-h-[18rem]">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})` }}
                />
                <div className="relative flex h-full min-h-[14rem] flex-col justify-between transition-colors group-hover:text-white">
                  <div className="flex items-start justify-between">
                    <span className="num group-hover:!text-white/70">{String(i + 1).padStart(2, "0")} · {p.category}</span>
                    <ArrowUpRight className="opacity-40 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h2 className="display text-3xl md:text-4xl mb-3">{p.title.split(",")[0]}</h2>
                    <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground group-hover:text-white/80">{p.summary}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
