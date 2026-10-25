import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";
import useSmoothScroll from "@/lib/useSmoothScroll";
import useDocumentMeta from "@/lib/useDocumentMeta";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import MobileNav from "@/components/MobileNav";
import { loadAnalyticsIfConsented, trackPageview } from "@/lib/analytics";
import { useEffect } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  const location = useLocation();
  useSmoothScroll();
  useDocumentMeta();

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
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <ScrollToTop />
      <BackToTop />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* Services, pricing and quote pages are retired. Old links land on the work page. */}
              <Route path="/services/*" element={<Navigate to="/projects" replace />} />
              <Route path="/pricing" element={<Navigate to="/projects" replace />} />
              <Route path="/quote" element={<Navigate to="/contact" replace />} />
              <Route path="/experience" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileNav />
      <ChatWidget />
      <CookieConsent />
    </div>
    </MotionConfig>
  );
}

export default App;
