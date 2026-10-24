import { useState } from "react";

/**
 * Shared by the Services list's card thumbnails and each service's own
 * full mockup image on its detail page, so "maximize this mockup" behaves
 * identically everywhere on the site instead of being a one-off.
 */
export function useImageLightbox() {
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);
  const [zoom, setZoom] = useState(1);

  function open(image: string, title: string) {
    setZoom(1);
    setLightbox({ image, title });
  }
  function close() {
    setLightbox(null);
  }

  return { lightbox, zoom, setZoom, open, close };
}
