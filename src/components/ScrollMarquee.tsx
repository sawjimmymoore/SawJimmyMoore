import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Big type rows that slide in opposite directions as the page scrolls.
// Driven by scroll position, so it moves on phones with no hover at all.
export default function ScrollMarquee({ rows }: { rows: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className="overflow-hidden py-10 md:py-16 select-none" aria-hidden>
      {rows.map((text, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const x = useTransform(scrollYProgress, [0, 1], [dir * -18 + "%", dir * 18 + "%"]);
        const outline = i % 2 === 1;
        return (
          <motion.div
            key={text}
            style={{ x, WebkitTextStroke: outline ? "1.5px rgb(var(--text-100) / 0.55)" : undefined }}
            className={`display whitespace-nowrap text-[clamp(3rem,15vw,10rem)] ${outline ? "text-transparent" : "text-parchment-100"}`}
          >
            {`${text} · ${text} · ${text} · ${text}`}
          </motion.div>
        );
      })}
    </div>
  );
}
