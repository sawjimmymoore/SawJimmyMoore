import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

/**
 * The same button, reused every 2-3 sections down a page instead of once at
 * the very bottom, Delve's "Book a Demo repeated 6-8 times" pattern. Same
 * visual style every time so it reads as "the button" instantly, label
 * varies by context so it never feels like a repeated ad.
 *
 * Both variants carry real visual weight now, a thin 1px outline with no
 * fill read as an afterthought next to the page's other content; a visible
 * background tint plus a shadow on the solid variant makes every CTA read
 * as clickable at a glance, not just on close inspection.
 */
export default function SectionCTA({
  label,
  to,
  variant = "solid",
  tone = "auto",
}: {
  label: string;
  to: string;
  variant?: "solid" | "outline";
  /** "auto" follows the site theme (default, correct for sections that
   * sit on the page's normal background). Use "light"/"dark" for a
   * section with a hardcoded background color that doesn't flip with
   * the theme toggle, so the button text doesn't flip against it and
   * go invisible. */
  tone?: "auto" | "light" | "dark";
}) {
  const outlineText = tone === "light" ? "text-ink-900" : tone === "dark" ? "text-white" : "text-parchment-100";
  return (
    <Magnetic strength={0.25}>
      <Link
        to={to}
        className={
          variant === "solid"
            ? "inline-flex items-center gap-2 rounded-full bg-primary-500 text-ink-900 px-7 py-3.5 text-[14px] font-bold shadow-[0_6px_24px_-6px_rgba(201,146,74,0.55)] hover:bg-primary-400 hover:shadow-[0_8px_28px_-6px_rgba(201,146,74,0.7)] transition-all duration-200"
            : `inline-flex items-center gap-2 rounded-full border-2 border-primary-500/50 bg-primary-500/[0.06] px-7 py-3.5 text-[14px] font-bold ${outlineText} hover:bg-primary-500/15 hover:border-primary-500 transition-all duration-200`
        }
      >
        {label} <ArrowRight size={15} />
      </Link>
    </Magnetic>
  );
}
