import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Hand-drawn style emphasis, after the Odoo site: a highlighter swipe, a wavy
// underline or a loose circle that draws itself when scrolled into view.
// Colours come from theme tokens, so they stay readable in light and dark.
const COLOR = { sun: "rgb(var(--sun))", teal: "rgb(var(--teal))", coral: "rgb(var(--coral))" } as const;
type Color = keyof typeof COLOR;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Mark({
  children,
  kind = "highlight",
  color = "sun",
  delay = 0.2,
}: {
  children: ReactNode;
  kind?: "highlight" | "underline" | "circle";
  color?: Color;
  delay?: number;
}) {
  const vp = { once: true, amount: 0.8 } as const;
  if (kind === "highlight") {
    return (
      <span className="relative inline-block">
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, delay, ease: EASE }}
          className="absolute inset-x-[-0.12em] bottom-[0.02em] top-[0.14em] origin-left -rotate-1 rounded-[3px]"
          style={{ background: COLOR[color] }}
        />
        <span className="relative text-ink-900">{children}</span>
      </span>
    );
  }
  if (kind === "underline") {
    return (
      <span className="relative inline-block">
        {children}
        <svg aria-hidden className="absolute -bottom-[0.14em] left-0 h-[0.28em] w-full overflow-visible" viewBox="0 0 100 12" preserveAspectRatio="none">
          <motion.path
            d="M2 7 Q 13 0 25 6 T 50 6 T 75 6 T 98 5"
            fill="none"
            stroke={COLOR[color]}
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={vp}
            transition={{ duration: 0.9, delay, ease: EASE }}
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="relative inline-block">
      {children}
      <svg aria-hidden className="pointer-events-none absolute -inset-x-[0.3em] -inset-y-[0.12em] h-[1.3em] w-[calc(100%+0.6em)] overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
        <motion.path
          d="M52 3 C 86 2 98 12 96 22 C 93 34 68 38 42 37 C 14 36 3 28 5 17 C 7 7 30 3 62 4"
          fill="none"
          stroke={COLOR[color]}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={vp}
          transition={{ duration: 1, delay, ease: EASE }}
        />
      </svg>
    </span>
  );
}

// Small burst of rays, like the sparks around Odoo's closing headline.
export function Sparks({ className = "" }: { className?: string }) {
  const rays = [
    { d: "M20 40 L8 28", c: "sun" },
    { d: "M36 30 L34 12", c: "coral" },
    { d: "M52 34 L66 20", c: "teal" },
    { d: "M56 52 L74 52", c: "sun" },
  ] as const;
  return (
    <svg aria-hidden className={className} viewBox="0 0 80 64" fill="none">
      {rays.map((r, i) => (
        <motion.path
          key={r.d}
          d={r.d}
          stroke={COLOR[r.c]}
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}
