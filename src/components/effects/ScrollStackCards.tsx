import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Maximize2, Minus, Plus, X } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export interface StackCardItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image?: string;
  /** Shown centered over the gradient when there's no `image` yet, use the
      client's real logo here, never a stock mockup standing in for a
      screenshot that doesn't exist. */
  logo?: string;
  gradientFrom?: string;
  gradientTo?: string;
  metric?: { value: string; label: string };
  href: string;
  ctaLabel?: string;
}

/**
 * Cards pile on top of one another as the page scrolls, each new card
 * covering the last with only a thin sliver of the earlier ones peeking out
 * above it, exactly the reference behaviour: no JS scroll-hijacking, just
 * plain nested `position: sticky` blocks stacked in normal document flow,
 * each with a slightly bigger `top` offset than the one before it. That's
 * also what gives the parent section enough natural scroll height for
 * "everything else waits until the whole stack has scrolled past" to work
 * for free, no manual height math required.
 *
 * The whole card is a real link to `item.href`, not just the "view full
 * case study" text, clicking anywhere on the card (the image, the title,
 * the summary) navigates. The sticky *wrapper* around each card stays a
 * plain div though, only the card itself is the `<Link>`, so the stacking
 * behaviour below is unaffected either way.
 *
 * IMPORTANT: nothing between this component and the nearest scrolling
 * viewport may carry a CSS `transform` (including a leftover Framer Motion
 * `animate={{ y: ... }}` that never gets cleared to `none`), a `transform`
 * on any ancestor silently breaks `position: sticky` for everything inside
 * it. If this stops stacking, that's the first thing to check.
 */
export default function ScrollStackCards({
  items,
  topOffset = 104,
  stackStep = 40,
  imageFit = "cover",
}: {
  items: StackCardItem[];
  /** px from the viewport top where the first card sticks */
  topOffset?: number;
  /** px each subsequent card's sticky point is pushed down, this is what
      creates the "sliver of the previous card peeking out" look. */
  stackStep?: number;
  /**
   * "cover": image side panel, cropped to fill it, for real project
   * screenshots/photos where a tight crop reads fine.
   * "contain": the whole mockup shown uncropped, full width, own natural
   * height, for the services showcase mockups, where cropping into a
   * side-panel was hiding most of the graphic, the point there is to see
   * the whole thing, not a sliver of it.
   */
  imageFit?: "cover" | "contain";
}) {
  // Lightbox is shared across every card in the stack rather than one piece
  // of state per card: only one mockup can ever be open at a time, so a
  // single { image, title } slot here is enough, and it means opening a new
  // one from a different card can't leave a stale open state behind.
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);
  const [zoom, setZoom] = useState(1);

  function openLightbox(image: string, title: string) {
    setZoom(1);
    setLightbox({ image, title });
  }
  function closeLightbox() {
    setLightbox(null);
  }

  return (
    <div className="relative">
      {items.map((item, i) => {
        const gradient = `linear-gradient(135deg, ${item.gradientFrom || "#1a2332"}, ${item.gradientTo || "#4a7fa5"})`;
        // Both variants reserve their box before the image finishes
        // loading: "cover" already had a fixed-height parent, "contain"
        // didn't, so a late-loading showcase image would grow the card
        // after the browser had already measured it for sticky purposes,
        // desyncing the nested-sticky math for the rest of the stack (the
        // panel-1/panel-2 overlap glitch traced back partly to this). All
        // showcase mockups ship at 1500x1000 (3:2), so that's the
        // reserved ratio; a differently-shaped image just letterboxes
        // instead of causing a layout jump.
        const visual = item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            width={1500}
            height={1000}
            style={imageFit === "contain" ? { aspectRatio: "3 / 2" } : undefined}
            className={
              imageFit === "contain"
                ? "block w-full h-auto object-cover"
                : "absolute inset-0 h-full w-full object-cover object-top"
            }
          />
        ) : item.logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <img src={item.logo} alt={item.title} className="max-h-20 max-w-[70%] object-contain" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-6xl text-white/90">{item.title.charAt(0)}</span>
          </div>
        );

        // Plain <span>, not a nested <Link>, the whole card below is
        // already the link, an anchor inside an anchor is invalid HTML and
        // most browsers only keep the outer one anyway.
        const copy = (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-600 mb-2">
              {item.category}
            </p>
            <h3 className="font-black text-2xl md:text-3xl tracking-tight text-ink-900 mb-3">{item.title}</h3>
            <p className="text-[14px] md:text-[15px] text-ink-900/65 leading-relaxed mb-4 max-w-md">
              {item.summary}
            </p>
            {item.metric && (
              <p className="text-[13.5px] font-semibold mb-4 text-primary-700">
                {item.metric.value} <span className="text-ink-900/50 font-normal">{item.metric.label}</span>
              </p>
            )}
            <span className="inline-flex items-center gap-1.5 font-semibold text-[13px] text-ink-900 group-hover:text-primary-600 transition-colors w-fit">
              {item.ctaLabel || "View full case study"} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </>
        );

        return (
          <div
            key={item.slug}
            className="sticky mb-5 md:mb-7"
            style={{ top: `${topOffset + i * stackStep}px`, zIndex: i + 1 }}
          >
            {imageFit === "contain" ? (
              <Link
                to={item.href}
                className="group block rounded-[26px] md:rounded-[32px] overflow-hidden bg-white border border-black/5 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)] hover:border-primary-500/40 hover:shadow-[0_28px_80px_-16px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-[box-shadow,border-color,transform] duration-300"
              >
                <div className="p-6 md:p-10 pb-4 md:pb-5 flex items-start justify-between gap-6 flex-wrap">
                  <div className="max-w-lg">{copy}</div>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-[10.5px] font-mono uppercase tracking-widest2 text-ink-900/60 shrink-0">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                {/* Full mockup, uncropped, this is the whole point of
                    "contain": every service shows its complete reference
                    visual, not a cover-cropped sliver of one corner of it.
                    The old mouse-tilt (same TiltCard used on the Impact
                    cards elsewhere on Home) lives on this inner box only,
                    never on the outer Link/sticky wrapper, a transform on
                    anything between the sticky element and the page would
                    quietly break the stack. */}
                <div className="px-4 pb-4 md:px-6 md:pb-6" style={{ background: gradient }}>
                  <div className="relative group/mockup">
                    <TiltCard className="rounded-2xl overflow-hidden">{visual}</TiltCard>
                    {item.image && (
                      <button
                        type="button"
                        onClick={(e) => {
                          // Without these two, the click would both open the
                          // lightbox AND bubble up to the outer <Link>,
                          // navigating away to the case study the instant
                          // it opened.
                          e.preventDefault();
                          e.stopPropagation();
                          openLightbox(item.image!, item.title);
                        }}
                        aria-label={`Maximize ${item.title} mockup`}
                        className="absolute top-3 right-3 md:top-4 md:right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 backdrop-blur text-white/90 opacity-100 md:opacity-0 md:group-hover/mockup:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                      >
                        <Maximize2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={item.href}
                className="group block rounded-[26px] md:rounded-[32px] overflow-hidden bg-white border border-black/5 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.35)] hover:border-primary-500/40 hover:shadow-[0_28px_80px_-16px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-[box-shadow,border-color,transform] duration-300 grid md:grid-cols-[1.05fr_1fr]"
              >
                <TiltCard
                  className="relative h-52 sm:h-64 md:h-full md:min-h-[300px] overflow-hidden"
                  style={{ background: gradient }}
                >
                  {visual}
                  <span className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10.5px] font-mono uppercase tracking-widest2 text-white/90">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </TiltCard>
                <div className="p-6 md:p-10 flex flex-col justify-center">{copy}</div>
              </Link>
            )}
          </div>
        );
      })}

      {/* Portaled to document.body rather than rendered in place: this
          component lives deep inside the sticky-stack tree, and per the
          note above, any transform on an ancestor between here and the
          viewport would just as happily break `position: fixed` as it
          breaks `position: sticky`. Rendering at the body root sidesteps
          that entirely. */}
      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
            >
              <X size={20} />
            </button>

            <div
              className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-2 absolute bottom-6 left-1/2 -translate-x-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
                aria-label="Zoom out"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
                disabled={zoom <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-mono text-[12px] text-white/80">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)))}
                aria-label="Zoom in"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
                disabled={zoom >= 3}
              >
                <Plus size={16} />
              </button>
            </div>

            <div
              className="max-h-[85vh] max-w-[90vw] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] select-none rounded-lg object-contain transition-transform duration-200"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
