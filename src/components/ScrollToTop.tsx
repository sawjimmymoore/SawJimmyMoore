import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/useSmoothScroll";

// Two methods, both fired: Lenis owns scroll position when active and must
// be told directly, but window.scrollTo runs too as a guaranteed fallback
// in case Lenis is mid-init, disabled (reduced motion), or for any reason
// not mounted yet.
//
// Exported so "go home" links (the header logo, the Home nav item, the
// mobile tab bar's Home tab) can call it directly on click. The effect
// below only re-runs when `pathname` changes, so clicking one of those
// links while already on that page doesn't change the pathname and the
// effect never fires, leaving the scroll position wherever it was. Those
// links call this function themselves so "already home" still snaps to
// the top instead of doing nothing.
export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
