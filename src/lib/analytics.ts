// Consent-gated Google Analytics 4 loader. Only loads gtag.js, and only
// after the visitor accepts the cookie banner, never on page load
// unconditionally. VITE_GA_MEASUREMENT_ID needs a real value (set it in
// Vercel project settings, or a local .env) before this does anything;
// with no ID set this silently no-ops, it does not fetch or track.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let loaded = false;

export function loadAnalyticsIfConsented() {
  if (loaded || !GA_ID) return;
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("jimmy-cookie-consent") !== "accepted") return;

  loaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
  window.gtag = gtag;
}

export function trackPageview(path: string) {
  if (!loaded || !window.gtag || !GA_ID) return;
  window.gtag("config", GA_ID, { page_path: path });
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
