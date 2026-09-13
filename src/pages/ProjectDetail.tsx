import { useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Monitor,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PROJECTS, type Project, type ProjectPage, type StaticShowcasePage } from "@/data/content";
import FaqAccordion from "@/components/FaqAccordion";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45 }}
    >
      <ProjectHero project={project} />
      <div className="container-page pb-32">
        {project.metrics && <Metrics metrics={project.metrics} />}
        {project.challenge && <Challenge challenge={project.challenge} />}
        {project.journey && project.journey.length > 0 && <ClientJourney journey={project.journey} />}
        {project.approach && <Approach approach={project.approach} />}
        {project.staticShowcase && project.staticShowcase.length > 0 && (
          <StaticSiteShowcase pages={project.staticShowcase} url={project.url} />
        )}
        {!project.staticShowcase && project.showcasePages && project.showcasePages.length > 0 && (
          <SiteShowcase pages={project.showcasePages} projectTitle={project.title} url={project.url} />
        )}
        {project.outcomes && <Outcomes outcomes={project.outcomes} />}
        <Meta project={project} />
        <Nav project={project} />
      </div>
    </motion.div>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="px-4 md:px-8 pt-24 md:pt-28 mb-14">
      <div
        ref={ref}
        className="relative min-h-[58vh] flex items-end overflow-hidden rounded-[32px] border border-primary-500/10"
      >
        {/* Parallax gradient background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.cover.gradientFrom} 0%, ${project.cover.gradientTo} 100%)`,
            }}
          />
          {/* Dark scrim behind the text, keeps white text readable regardless of
              cover colors or light/dark page theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative container-page py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] text-parchment-200/70 hover:text-parchment-100 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All projects
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="eyebrow mb-4 text-parchment-200/70"
          >
            {project.role} · {project.period ?? project.client}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-4 max-w-3xl mb-6"
          >
            {project.logo && (
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="h-14 w-14 md:h-16 md:w-16 rounded-2xl object-contain bg-white/95 border border-white/20 p-2 flex-shrink-0"
              />
            )}
            <h1 className="font-black text-4xl md:text-6xl font-bold text-white leading-[1.05]">
              {project.title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-parchment-200/80 max-w-2xl leading-relaxed mb-8"
          >
            {project.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[12px] text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── METRICS ─────────────────────────────────────────────── */
function Metrics({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <Section label="Results at a glance">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-primary-500/20 bg-bg-card p-5 text-center"
          >
            <p className="font-display text-3xl font-bold text-primary-500 mb-1">{m.value}</p>
            <p className="text-[12px] text-muted-foreground leading-tight">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── CHALLENGE ───────────────────────────────────────────── */
function Challenge({ challenge }: { challenge: string }) {
  return (
    <Section label="The Challenge">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl pl-6 border-l-2 border-primary-500/40"
      >
        <p className="text-[16px] text-parchment-200 leading-relaxed">{challenge}</p>
      </motion.div>
    </Section>
  );
}

/* ── APPROACH ────────────────────────────────────────────── */
function Approach({ approach }: { approach: string[] }) {
  return (
    <Section label="My Approach">
      <div className="max-w-3xl space-y-5">
        {approach.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-4"
          >
            <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-primary-500/10 text-primary-500 font-mono text-[12px] font-bold mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[15px] text-parchment-200 leading-relaxed pt-0.5">{step}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── CLIENT JOURNEY ──────────────────────────────────────── */
function ClientJourney({
  journey,
}: {
  journey: { step: string; title: string; description: string }[];
}) {
  return (
    <Section label="The Client Journey">
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {/* Connecting line, desktop only */}
        <div className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 lg:block" />
        {journey.map((j, i) => (
          <motion.div
            key={j.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/40 bg-bg-card font-mono text-[13px] font-bold text-primary-500">
              {j.step}
            </span>
            <h4 className="mt-3 text-[15px] font-semibold text-parchment-100">{j.title}</h4>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{j.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── SITE SHOWCASE ───────────────────────────────────────── */
function SiteShowcase({
  pages,
  projectTitle,
}: {
  pages: ProjectPage[];
  projectTitle: string;
  url?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const active = pages[activeIndex];

  const go = (i: number) => {
    setActiveIndex(i);
    setLoading(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <Section label="Live Site Walkthrough">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[14px] text-muted-foreground mb-6 max-w-xl">
          Browse the actual live website below, this is the real site, not a screenshot. Use the page
          tabs to navigate between sections.
        </p>

        {/* Page tab navigation */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pages.map((page, i) => (
            <button
              key={page.url}
              onClick={() => go(i)}
              className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-200 ${
                i === activeIndex
                  ? "bg-primary-500 text-on-primary"
                  : "bg-bg-card border border-primary-500/20 text-muted-foreground hover:border-primary-500/50 hover:text-parchment-100"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* Browser chrome */}
        <div className="rounded-2xl overflow-hidden border border-primary-500/20 shadow-2xl">
          {/* Browser top bar */}
          <div className="bg-ink-800/80 px-4 py-3 flex items-center gap-3 border-b border-primary-500/10">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>

            {/* Prev/Next */}
            <div className="flex gap-1">
              <button
                onClick={() => go(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="p-1 rounded text-muted-foreground hover:text-parchment-100 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(Math.min(pages.length - 1, activeIndex + 1))}
                disabled={activeIndex === pages.length - 1}
                className="p-1 rounded text-muted-foreground hover:text-parchment-100 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* URL bar */}
            <div className="flex-1 flex items-center gap-2 bg-bg-card/50 rounded-md px-3 py-1.5 min-w-0">
              <Monitor size={12} className="text-primary-400 flex-shrink-0" />
              <span className="text-[11.5px] text-muted-foreground truncate">{active.url}</span>
            </div>

            {/* Reload + open external */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  setLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                className="p-1.5 rounded text-muted-foreground hover:text-parchment-100 transition-colors"
                title="Reload"
              >
                <RefreshCw size={13} />
              </button>
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded text-muted-foreground hover:text-parchment-100 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* iframe area */}
          <div className="relative bg-white" style={{ height: "600px" }}>
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-bg gap-3"
                >
                  <div className="h-8 w-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
                  <p className="text-[12.5px] text-muted-foreground">Loading {active.label}…</p>
                </motion.div>
              )}
            </AnimatePresence>
            <iframe
              key={iframeKey}
              src={active.url}
              title={`${projectTitle}, ${active.label}`}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* Page description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.url}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex gap-4 items-start rounded-xl bg-primary-500/[0.06] border border-primary-500/15 px-5 py-4"
          >
            <span className="text-primary-500 flex-shrink-0 mt-0.5">✦</span>
            <div>
              <p className="text-[13px] font-semibold text-parchment-100 mb-1">{active.label}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{active.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* ── STATIC SITE SHOWCASE (for sites that block iframe embedding) ──── */
function StaticSiteShowcase({ pages, url }: { pages: StaticShowcasePage[]; url?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pages[activeIndex];

  return (
    <Section label="Site Walkthrough">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[14px] text-muted-foreground mb-6 max-w-xl">
          Content recreated from the real, live site below, shown here as scrollable pages rather than an
          embed, since the original site's server blocks iframe embedding on security grounds.
          {url && (
            <>
              {" "}
              <a href={url} target="_blank" rel="noreferrer" className="text-primary-500 hover:text-primary-600 font-medium">
                Visit the live site ↗
              </a>
            </>
          )}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {pages.map((page, i) => (
            <button
              key={page.label}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-200 ${
                i === activeIndex
                  ? "bg-primary-500 text-on-primary"
                  : "bg-bg-card border border-primary-500/20 text-muted-foreground hover:border-primary-500/50 hover:text-parchment-100"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-primary-500/15 bg-bg-card overflow-hidden"
          >
            {/* fake browser chrome so it still reads as a "site preview" */}
            <div className="bg-ink-800/80 px-4 py-3 flex items-center gap-3 border-b border-primary-500/10">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
              <span className="text-[11.5px] text-muted-foreground truncate">{active.url}</span>
            </div>

            {/* mock site nav bar, real brand color, visual only (not clickable) */}
            <div
              className="px-5 py-3.5 flex items-center justify-between gap-4 flex-wrap"
              style={{ backgroundColor: "#131f29" }}
            >
              <span className="font-display text-[15px] font-semibold text-white">Defabiano</span>
              <div className="flex items-center gap-4 text-[11px] text-white/60 flex-wrap">
                {["Home", "Product", "Service", "Our Store", "About us", "Contact us"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            {active.heroImage && (
              <div className="relative h-44 md:h-56 overflow-hidden">
                <img
                  src={active.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,31,41,0.75), transparent 60%)" }} />
              </div>
            )}

            <div className="p-6 md:p-10 max-h-[520px] overflow-y-auto space-y-6">
              {active.blocks.map((block, bi) => {
                if (block.type === "heading") {
                  return (
                    <h3 key={bi} className="font-display text-2xl font-bold text-parchment-100">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <p key={bi} className="text-[14px] text-parchment-200 leading-relaxed">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={bi} className="space-y-2">
                      {block.items?.map((item, ii) => (
                        <li key={ii} className="flex gap-2.5 text-[14px] text-parchment-200 leading-relaxed">
                          <span className="text-primary-500 mt-1.5 flex-shrink-0">▪</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "features") {
                  return (
                    <div key={bi} className="grid sm:grid-cols-2 gap-4">
                      {block.features?.map((f) => (
                        <div key={f.title} className="rounded-xl border border-primary-500/10 bg-bg p-4">
                          <p className="text-[13.5px] font-semibold text-parchment-100 mb-1">{f.title}</p>
                          <p className="text-[12.5px] text-muted-foreground leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (block.type === "faq") {
                  return <FaqAccordion key={bi} items={block.faqs ?? []} className="!bg-transparent !border-0 divide-y-0 space-y-3" />;
                }
                return null;
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* ── OUTCOMES ────────────────────────────────────────────── */
function Outcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <Section label="Outcomes">
      <div className="max-w-3xl grid md:grid-cols-2 gap-3">
        {outcomes.map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 items-start rounded-xl border border-primary-500/15 bg-bg-card p-4"
          >
            <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
            <p className="text-[13.5px] text-parchment-200 leading-relaxed">{o}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── META (tools + external link) ─────────────────────────── */
function Meta({ project }: { project: Project }) {
  return (
    <Section label="Tools Used">
      <div className="flex flex-wrap gap-2 mb-8">
        {(project.tools ?? project.tags).map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-primary-500/25 px-3.5 py-1.5 text-[12.5px] text-parchment-200"
          >
            {tool}
          </span>
        ))}
      </div>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-on-primary px-5 py-2.5 text-[13.5px] font-semibold hover:bg-primary-500 transition-colors duration-200"
        >
          Visit live site <ArrowUpRight size={14} />
        </a>
      )}
    </Section>
  );
}

/* ── PREV / NEXT NAV ─────────────────────────────────────── */
function Nav({ project }: { project: Project }) {
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  return (
    <div className="mt-24 pt-10 border-t border-primary-500/10 flex justify-between flex-wrap gap-4">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group flex flex-col gap-1"
        >
          <span className="eyebrow flex items-center gap-1">
            <ArrowLeft size={12} /> Previous
          </span>
          <span className="text-[14px] font-medium text-parchment-100 group-hover:text-primary-500 transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          to={`/projects/${next.slug}`}
          className="group flex flex-col gap-1 text-right"
        >
          <span className="eyebrow flex items-center justify-end gap-1">
            Next <ArrowLeft size={12} className="rotate-180" />
          </span>
          <span className="text-[14px] font-medium text-parchment-100 group-hover:text-primary-500 transition-colors">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}

/* ── REUSABLE SECTION WRAPPER ─────────────────────────────── */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-20"
    >
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </motion.section>
  );
}
