import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface ShowcaseRow {
  slug: string;
  title: string;
  category: string;
  summary: string;
  metric?: { value: string; label: string };
  image?: string;
  logo?: string;
  gradientFrom?: string;
  gradientTo?: string;
  href: string;
  /** Shown inline when the row is expanded. */
  details?: string[];
}

/**
 * Full-width vertical row list, one card per project. Hovering (desktop) or
 * tapping (touch) a row expands it: a real cover image/logo panel slides in
 * on the left, details on the right, matching a stacked-deck reference the
 * client sent rather than the previous full-bleed dark-photo-behind-text
 * treatment. The row itself is no longer a link, hovering to preview a
 * project shouldn't also be one click away from leaving the page by
 * accident; "View full case study" is the only actual navigation.
 */
export default function VerticalShowcaseList({ rows }: { rows: ShowcaseRow[] }) {
  const [active, setActive] = useState<string | null>(rows[0]?.slug ?? null);

  return (
    <div className="rounded-3xl border border-primary-500/15 overflow-hidden divide-y divide-primary-500/10 bg-bg-card">
      {rows.map((row) => {
        const isActive = active === row.slug;
        const cover = (
          <div
            className="relative h-full w-full overflow-hidden rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${row.gradientFrom || "#1a2332"}, ${row.gradientTo || "#4a7fa5"})` }}
          >
            {/* Logo/gradient is the base layer always, so if the real photo
                below fails to load (e.g. an external host going down), it
                just falls back to this instead of leaving a blank box. */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {row.logo ? (
                <img src={row.logo} alt={`${row.title} logo`} className="max-h-[64%] max-w-[64%] object-contain drop-shadow-lg" loading="lazy" />
              ) : (
                <span className="font-black text-5xl text-white/90">{row.title.charAt(0)}</span>
              )}
            </div>
            {row.image && (
              <img
                src={row.image}
                alt={row.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
        );
        return (
          <div
            key={row.slug}
            onMouseEnter={() => setActive(row.slug)}
            className="group relative block"
          >
            <motion.div
              initial={false}
              animate={{ paddingTop: isActive ? 28 : 16, paddingBottom: isActive ? 28 : 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 px-5 md:px-8"
            >
              <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8 md:items-center">
                {/* Cover panel: only actually present in the DOM (and taking
                    up grid space) once active, so inactive rows stay a
                    plain compact line with zero layout cost. */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 190 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="hidden md:block overflow-hidden"
                    >
                      {cover}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <p
                    className={`font-mono text-[11px] uppercase tracking-widest2 mb-1.5 transition-colors duration-300 ${
                      isActive ? "text-primary-500" : "text-primary-500/70"
                    }`}
                  >
                    {row.category}
                  </p>
                  <h3
                    className={`font-black tracking-tight mb-2 transition-all duration-300 ${
                      isActive ? "text-2xl md:text-3xl text-parchment-100" : "text-xl md:text-2xl text-parchment-100/80"
                    }`}
                  >
                    {row.title}
                  </h3>
                  <p
                    className={`leading-relaxed transition-all duration-300 ${
                      isActive ? "text-[14px] md:text-[15px] text-muted-foreground max-w-2xl mb-3" : "text-[13px] text-muted-foreground line-clamp-2 mb-2 max-w-2xl"
                    }`}
                  >
                    {row.summary}
                  </p>
                  {row.metric && (
                    <p className="text-[13px] font-semibold mb-2 text-primary-400">
                      {row.metric.value} <span className="text-muted-foreground font-normal">{row.metric.label}</span>
                    </p>
                  )}

                  <AnimatePresence>
                    {isActive && row.details && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="hidden md:grid grid-cols-2 gap-x-6 gap-y-2 mb-4 overflow-hidden max-w-3xl"
                      >
                        {row.details.map((d) => (
                          <li key={d} className="flex gap-2 text-[13px] text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary-400 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <Link
                    to={row.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-[12.5px] text-parchment-300 hover:text-primary-500 transition-colors"
                  >
                    View full case study <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Mobile/touch fallback: always-visible compact cover, since
                there's no hover to trigger the reveal above. */}
            <div className="md:hidden w-full h-24 flex-shrink-0 overflow-hidden relative -mt-1 rounded-b-xl">
              {cover}
            </div>
          </div>
        );
      })}
    </div>
  );
}
