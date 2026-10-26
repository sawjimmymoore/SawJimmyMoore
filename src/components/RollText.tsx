import { Fragment } from "react";

// Letter-by-letter "slot machine" roll. Every character is stacked with a copy
// of itself; on hover (or tap) of the nearest `.group` ancestor the first copy
// slides up and out while the second slides in, staggered left to right.
// Words stay whole so wrapping still happens between words only.
export default function RollText({
  text,
  className = "",
  altClassName = "",
  step = 18,
  duration = 550,
}: {
  text: string;
  className?: string;
  altClassName?: string;
  step?: number;
  duration?: number;
}) {
  const words = text.split(" ");
  let n = 0;
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {Array.from(w).map((c, ci) => {
              const delay = `${n++ * step}ms`;
              const ease = "cubic-bezier(0.22,1,0.36,1)";
              return (
                <span key={ci} className="relative inline-block overflow-hidden align-bottom leading-[1.04]">
                  <span
                    className="block transition-transform group-hover:-translate-y-full group-active:-translate-y-full"
                    style={{ transitionDuration: `${duration}ms`, transitionDelay: delay, transitionTimingFunction: ease }}
                  >
                    {c}
                  </span>
                  <span
                    className={`absolute inset-x-0 top-0 block translate-y-full transition-transform group-hover:translate-y-0 group-active:translate-y-0 ${altClassName}`}
                    style={{ transitionDuration: `${duration}ms`, transitionDelay: delay, transitionTimingFunction: ease }}
                  >
                    {c}
                  </span>
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
