import { useMemo } from "react";

// A very subtle field of tiny twinkling dots, decorative glitter that
// stays in the background, never competes with content. Fixed positions
// (seeded once via useMemo) so it doesn't re-shuffle on re-render.
export default function Starfield({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.4 + 0.6, // 0.6px - 2px, genuinely tiny
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-primary-400"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.35,
            animation: `starTwinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
