import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/useSmoothScroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Two methods, both fired: Lenis owns scroll position when active and
    // must be told directly, but window.scrollTo runs too as a guaranteed
    // fallback in case Lenis is mid-init, disabled (reduced motion), or
    // for any reason not mounted yet.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
