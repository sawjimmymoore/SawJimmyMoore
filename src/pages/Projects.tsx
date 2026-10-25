import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, FEATURED_ORDER, type Project } from "@/data/content";
import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";
import Mark from "@/components/Mark";
import type { GalleryItem } from "@/components/effects/SphereGallery3D";

// Bright, saturated node colours so the sphere reads well on the dark panel.
const NODE_COLORS: [string, string][] = [
  ["#6B7A1F", "#A3B52F"], ["#C77D0A", "#F5A524"], ["#0D9488", "#2DD4BF"], ["#D6455D", "#FF7A8A"],
  ["#5B4BDB", "#8B7BFF"], ["#2563EB", "#60A5FA"], ["#714B67", "#B07AA1"], ["#2F6B4F", "#4FB286"],
  ["#B4531A", "#F0803C"], ["#0E7490", "#38BDF8"],
];

const SphereGallery3D = lazy(() => import("@/components/effects/SphereGallery3D"));

// Label card for each sphere node: project colours plus its name.
function labelImage(text: string, from: string, to: string, w = 960, h = 640) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > 14) { lines.push(line.trim()); line = word; }
    else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  const lh = 70;
  const y0 = h / 2 - ((lines.length - 1) * lh) / 2;
  const tspans = lines.map((l, i) => `<tspan x='50%' y='${y0 + i * lh}'>${l.replace(/&/g, "&amp;")}</tspan>`).join("");
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs>` +
    `<rect width='${w}' height='${h}' fill='url(#g)'/><text text-anchor='middle' dominant-baseline='middle' font-family='Helvetica, Arial, sans-serif' font-size='56' font-weight='800' fill='rgba(255,255,255,0.96)'>${tspans}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function Cell({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const lineScale = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const fromLeft = i % 2 === 0;

  const spot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full bg-bg"
    >
      <motion.span style={{ scaleX: lineScale }} className="absolute left-0 top-0 z-10 h-[2px] w-full origin-left bg-primary-400" />
      <Link
        to={`/projects/${p.slug}`}
        onMouseMove={spot}
        className="group relative block h-full min-h-[10rem] overflow-hidden p-4 active:brightness-110 md:min-h-[19rem] md:p-10"
      >
        <span
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 group-active:scale-y-100"
          style={{ background: `linear-gradient(135deg, ${p.cover.gradientFrom}, ${p.cover.gradientTo})` }}
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.16), transparent 65%)" }}
        />
        <motion.span
          style={{ y: ghostY }}
          className="pointer-events-none absolute -bottom-6 right-2 select-none font-black text-[5rem] font-extrabold leading-none text-parchment-100/[0.07] transition-colors group-hover:text-white/10 md:right-4 md:text-[9rem]"
        >
          {String(i + 1).padStart(2, "0")}
        </motion.span>
        {p.logo && (
          <span className="absolute bottom-4 right-4 hidden h-14 w-14 translate-y-4 items-center justify-center rounded-xl bg-white/90 p-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        )}
        <div className="relative flex h-full min-h-[7.5rem] flex-col justify-between transition-colors duration-300 group-hover:text-white md:min-h-[15rem]">
          <div className="flex items-start justify-between">
            <span className="num !text-[9px] group-hover:!text-white/70 md:!text-[11px]">{String(i + 1).padStart(2, "0")} · {p.category}</span>
            <ArrowUpRight className="hidden opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 md:block" />
          </div>
          <div>
            <h2 className="display mb-1 text-lg leading-[0.95] transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl md:mb-3 md:text-4xl">{p.title.split(",")[0]}</h2>
            <p className="hidden max-w-md text-[14px] leading-relaxed text-muted-foreground group-hover:text-white/80 md:block">{p.summary}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const list = FEATURED_ORDER.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const items: GalleryItem[] = list.map((p, i) => ({
    image: labelImage(p.title.split(",")[0], ...NODE_COLORS[i % NODE_COLORS.length]),
    link: `/projects/${p.slug}`,
  }));
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pb-20 pt-24 md:pt-32">
      <div className="container-page">
        <div ref={heroRef} className="mb-8 md:mb-12">
          <Reveal variant="left"><p className="num mb-4">Work · ({String(list.length).padStart(2, "0")})</p></Reveal>
          <motion.h1 style={{ x: titleX, opacity: fade }} className="display text-5xl md:text-8xl">
            <RevealText text="Selected" /> <Mark kind="underline" color="teal">work</Mark>
          </motion.h1>
        </div>

        {/* 3D sphere: every project is a node. Drag to spin, tap a node to open it. */}
        <Reveal variant="scale">
          <div className="relative mb-12 h-[360px] overflow-hidden rounded-[24px] bg-ink-900 md:mb-20 md:h-[540px] md:rounded-[32px]">
            <Suspense fallback={null}>
              <SphereGallery3D images={items} branches={items.length} scale={120} size={52} hover={220} background="transparent" style={{ minWidth: 0, minHeight: 0 }} />
            </Suspense>
            <p className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest2 text-white/55">
              Drag to spin · tap a project to open it
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-parchment-100/15">
          {list.map((p, i) => <Cell key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </motion.div>
  );
}
