import { Link } from "react-router-dom";
import { SITE } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-page py-16 md:py-20">
        <p className="num !text-white/50 mb-4">Get in touch</p>
        <a
          href={`mailto:${SITE.email}`}
          className="font-black font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(1.5rem,4.6vw,3.75rem)] hover:text-glow transition-colors"
        >
          {SITE.email}
        </a>
        <div className="mt-14 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3 font-mono text-[11px] uppercase tracking-widest2 text-white/60">
          <div className="space-y-2">
            <p className="text-white/40">Based in</p>
            <p className="text-white">{SITE.location}</p>
          </div>
          <div className="space-y-2">
            <p className="text-white/40">Elsewhere</p>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="block text-white hover:text-glow">LinkedIn</a>
            <a href={`tel:${SITE.phone.replace(/\s|-/g, "")}`} className="block text-white hover:text-glow">{SITE.phone} (TH)</a>
            <a href={`tel:${SITE.phoneMyanmar.replace(/\s/g, "")}`} className="block text-white hover:text-glow">{SITE.phoneMyanmar} (MM)</a>
          </div>
          <div className="space-y-2">
            <p className="text-white/40">Site</p>
            <Link to="/projects" className="block text-white hover:text-glow">Work</Link>
            <Link to="/about" className="block text-white hover:text-glow">About</Link>
            <Link to="/privacy" className="block text-white/60 hover:text-glow">Privacy</Link>
          </div>
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-widest2 text-white/35">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
