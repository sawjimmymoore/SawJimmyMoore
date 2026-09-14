import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import MobileTabBar from "@/components/MobileTabBar";
import useSmoothScroll from "@/lib/useSmoothScroll";
import useDocumentMeta from "@/lib/useDocumentMeta";
import { loadAnalyticsIfConsented, trackPageview } from "@/lib/analytics";
import AsciiWave from "@/components/effects/AsciiWave";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";

// Route-level code splitting: this used to import every page eagerly,
// which meant a first-time visitor loading /privacy downloaded the same
// ~1.1MB bundle as the Home page, three.js (BrickProjection,
// SphereGallery3D) included, before seeing a paragraph of legal text.
// Each page is now its own chunk, fetched only when that route is visited.
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  const location = useLocation();
  const { theme } = useTheme();
  useSmoothScroll();
  useDocumentMeta();
  const isContactPage = location.pathname === "/contact";
  const isHome = location.pathname === "/";
  // Was a single fixed orange ("#c9924a") in both themes, which read as
  // near-invisible on the light ivory background since a warm mid-tone
  // orange sits too close to the ivory's own luminance. Swapped for the
  // site's dark-olive accent, one shade per theme so it actually shows
  // against both the ivory background and the charcoal one.
  const waterInk = theme === "dark" ? "#a3ab7c" : "#444733";

  // Analytics only ever loads once cookie consent is accepted, see
  // CookieConsent.tsx and lib/analytics.ts. Fires once on mount (covers a
  // returning visitor who already consented) and again whenever consent
  // changes, plus a pageview on every route change once it's actually
  // loaded.
  useEffect(() => {
    loadAnalyticsIfConsented();
    const onConsent = () => loadAnalyticsIfConsented();
    window.addEventListener("cookie-consent-changed", onConsent);
    return () => window.removeEventListener("cookie-consent-changed", onConsent);
  }, []);
  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/*
        One signature ambient effect only: the ASCII water. It used to run
        underneath MotionBackground + Starfield + this same water at 14%
        opacity, four independent mouse-reactive systems fighting for
        attention and each running its own animation loop. Retired the other
        two so the water is actually the thing people notice and stir, not a
        detail buried under three other effects. Opacity is higher on Home,
        where there's the most open space behind it, and lighter elsewhere
        so it doesn't fight with body copy.
      */}
      {!isContactPage && (
        <div className={`fixed inset-0 -z-[5] ${isHome ? "opacity-[0.32] md:opacity-[0.36]" : "opacity-[0.16]"}`} aria-hidden>
          <AsciiWave ink={waterInk} cell={11} fill={7} push={14} speed={7} clickIntensity={55} />
        </div>
      )}
      <CursorGlow />
      <ScrollToTop />
      <BackToTop />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Contact />} />
              {/* Quote used to be its own page with its own separate lead
                  form; its calculator now lives inside Pricing, so this
                  just redirects any old links/bookmarks there. */}
              <Route path="/quote" element={<Navigate to="/pricing" replace />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatWidget />
      <MobileTabBar />
      <CookieConsent />
    </div>
  );
}

export default App;
