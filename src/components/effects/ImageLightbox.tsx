import { createPortal } from "react-dom";
import { Minus, Plus, X } from "lucide-react";

export default function ImageLightbox({
  lightbox,
  zoom,
  setZoom,
  onClose,
}: {
  lightbox: { image: string; title: string } | null;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  if (!lightbox) return null;

  // Portaled to document.body rather than rendered in place: wherever this
  // is called from may sit inside a transformed/sticky ancestor (tilt
  // cards, scroll-stack sections), and any transform between here and the
  // viewport would break `position: fixed` the same way it breaks
  // `position: sticky`. Rendering at the body root sidesteps that.
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} />
      </button>

      <div
        className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-2 absolute bottom-6 left-1/2 -translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          disabled={zoom <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-mono text-[12px] text-white/80">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)))}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
          disabled={zoom >= 3}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="max-h-[85vh] max-w-[90vw] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <img
          src={lightbox.image}
          alt={lightbox.title}
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
          className="h-auto max-h-[85vh] w-auto max-w-[90vw] select-none rounded-lg object-contain transition-transform duration-200"
        />
      </div>
    </div>,
    document.body
  );
}
