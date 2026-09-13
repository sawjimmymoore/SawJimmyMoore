import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_META } from "@/data/content";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-route <title>/description, since this is a client-rendered SPA and
 * index.html can only ever hold one static set. Falls back to the route's
 * own pathname match, then to whatever base entry exists, rather than
 * throwing if a route isn't in PAGE_META (e.g. a dynamic /projects/:slug,
 * which sets its own meta explicitly where it has real per-project copy).
 */
export default function useDocumentMeta(override?: { title?: string; description?: string }) {
  const location = useLocation();

  useEffect(() => {
    const base = PAGE_META[location.pathname];
    const title = override?.title || base?.title;
    const description = override?.description || base?.description;

    if (title) {
      document.title = title;
      setMeta("og:title", title, "property");
      setMeta("twitter:title", title);
    }
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }
    setMeta("og:url", window.location.href, "property");
  }, [location.pathname, override?.title, override?.description]);
}
