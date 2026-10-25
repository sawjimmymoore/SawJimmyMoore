import { motion } from "framer-motion";
import type { ReactNode } from "react";

const FROM = {
  up: { opacity: 0, y: 44 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.88 },
  blur: { opacity: 0, y: 24, filter: "blur(10px)" },
  tilt: { opacity: 0, y: 60, rotate: 3, scale: 0.94 },
} as const;

// One-shot scroll reveal. Works on touch devices because it needs no hover.
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof FROM;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={FROM[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
