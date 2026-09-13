import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import {
  SITE,
  STATS,
  PROJECTS,
  IMPACT_POINTS,
  SERVICES,
  PACKAGES,
  GENERAL_FAQS,
  ABOUT_PARAGRAPHS,
} from "@/data/content";
import { useLang } from "@/lib/i18n";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import RevealText from "@/components/RevealText";
import ProcessSection from "@/components/ProcessSection";
import FaqAccordion from "@/components/FaqAccordion";
import SectionCTA from "@/components/SectionCTA";
import JourneyStrip from "@/components/JourneyStrip";
import ScrollTextHighlight from "@/components/effects/ScrollTextHighlight";
import BrickProjection from "@/components/effects/BrickProjection";
import ParticleDrift from "@/components/effects/ParticleDrift";
import SphereGallery3D, { type GalleryItem } from "@/components/effects/SphereGallery3D";
import ScrollStackCards, { type StackCardItem } from "@/components/effects/ScrollStackCards";

// De Fabiano has a real product photo already wired into its case study
// data. The other two hero slots stay stock until real photos of Jimmy (or
// more project screenshots) are dropped in, swap these two URLs first.
const HERO_IMAGES = [
  { src: "/images/hero/jimmy-hero.jpg" },
];

const SERVICE_GRADIENTS: Record<string, [string, string]> = {
  code: ["#1a2332", "#4a7fa5"],
  cart: ["#7456c9", "#cdbdf5"],
  megaphone: ["#444733", "#1a1a1a"],
  calendar: ["#0f2027", "#2c5364"],
  database: ["#1a1a1a", "#3a2a1a"],
  heart: ["#1a0f0d", "#4a1015"],
  user: ["#0f1420", "#2a3a5a"],
  layers: ["#0f1a14", "#1e3a2a"],
};

// The flagship showcase, 3 projects max, this is the highlight reel, not the
// archive (that's /projects, same component, full list). Picked for the
// strongest real numbers.
const FEATURED_SLUGS = [
  "de-fabiano",
  "mtss-myittasonesee",
  "hazel-portfolio",
  "de-fabiano-rebuild",
  "gratia-dev-command-center",
];
// Real screenshots where they exist (De Fabiano), a matching styled mockup
// from the reference pack everywhere else, still a real, considered visual
// per project instead of a flat brand-color gradient.
// Projects are real client work, only real assets go here, never a mockup
// from the services reference pack. De Fabiano has an actual product photo
// from the live site, everything else falls back to ScrollStackCards' own
// gradient + logo treatment until a real screenshot is captured, that's a
// deliberate gap, not a placeholder to paper over with a stock mockup.
const REAL_IMAGES: Record<string, string> = {
  "de-fabiano": "https://img1.wsimg.com/isteam/ip/67ab67ce-c960-462a-af80-096829e33a41/photo.jpg",
};
const FEATURED_CARDS: StackCardItem[] = FEATURED_SLUGS.map((slug) => {
  const p = PROJECTS.find((proj) => proj.slug === slug)!;
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    metric: p.metrics?.[0] ? { value: p.metrics[0].value, label: p.metrics[0].label } : undefined,
    image: REAL_IMAGES[p.slug],
    logo: p.logo,
    gradientFrom: p.cover.gradientFrom,
    gradientTo: p.cover.gradientTo,
    href: `/projects/${p.slug}`,
  };
}).filter((r) => r.title);

// Builds a data-URI SVG card (gradient + wrapped label), same trick the
// component's own placeholder generator uses, so real content and the
// component's fallback share one rendering path with no image hosting
// needed for this widget specifically.
function labelImage(text: string, from: string, to: string, w = 960, h = 640) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w2 of words) {
    if ((line + " " + w2).trim().length > 16) {
      lines.push(line.trim());
      line = w2;
    } else {
      line = (line + " " + w2).trim();
    }
  }
  if (line) lines.push(line);
  const lineHeight = 62;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((l, i) => `<tspan x='50%' y='${startY + i * lineHeight}'>${l}</tspan>`)
    .join("");
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/>` +
    `</linearGradient></defs><rect width='${w}' height='${h}' fill='url(#g)'/>` +
    `<text text-anchor='middle' dominant-baseline='middle' font-family='Archivo, Inter, sans-serif' ` +
    `font-size='46' font-weight='800' fill='rgba(255,255,255,0.95)'>${tspans}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// The sphere gallery shows SERVICES only now, not a mix of services and
// "problem" prompts, projects are already the vertical list right above it,
// and mixing in problem-prompt cards on top of services made the sphere's
// own point (a second, playful way to browse services) muddy. Every node
// routes straight to that service's page.
// The real component only ever opens a link in a new tab on click (it has
// no React Router awareness), so internal paths are resolved to absolute
// URLs here.
const origin = typeof window !== "undefined" ? window.location.origin : "";
const SPHERE_ITEMS: GalleryItem[] = SERVICES.map((s) => ({
  image: labelImage(s.name, ...SERVICE_GRADIENTS[s.icon]),
  link: `${origin}/services/${s.slug}`,
}));

export default function Home() {
  const { t } = useLang();
  const [nameLine] = useState(["Saw", "Jimmy", "Moore"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* HERO, boxed like the zerospace reference: one large rounded panel
          with the visual filling it edge to edge and text overlaid on top,
          instead of a split text-left/visual-right layout. Same rounded
          corners and side margin as the floating header above it, so the
          two read as one consistent system rather than two different
          layout languages stacked on top of each other. */}
      <section className="relative pt-24 md:pt-28 px-3 md:px-6">
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[40px] min-h-[560px] md:min-h-[680px] flex flex-col justify-end"
        >
          <div className="absolute inset-0">
            <ParticleDrift
              background="#12160f"
              baseColor="#5a6b3a"
              accentColor="#c4d69a"
              density={220}
              dotSize={5}
              speed={22}
              hover={200}
              linkDistance={190}
              linkThickness={1.4}
            />
          </div>
          {/* Gradient for text legibility over the particle background,
              the reference darkens toward the bottom where its own headline
              sits, same idea here. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

          {/* Brick-projection showcase, shrunk down to its own small card
              instead of being the whole hero background, still cycles
              through the same real project screenshots. */}
          <motion.div
            initial={{ opacity: 0, y: 12, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden lg:block absolute z-10 top-8 right-4 md:right-10 w-[180px] h-[220px] rounded-2xl overflow-hidden border border-white/20 shadow-lg"
          >
            <BrickProjection images={HERO_IMAGES} brick="#444733" density={20} brickSize={8} />
          </motion.div>

          <div className="relative z-10 px-6 md:px-14 pb-10 md:pb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-4 md:mb-6"
            >
              {SITE.tagline}
            </motion.p>

            {/* Name is fully legible on load now, no hover/tap gate. It's the
                most important line on the page, hiding it by default cost
                more clarity than the reveal interaction ever added, especially
                on mobile where there's no hover at all. */}
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
              className="font-black text-6xl sm:text-7xl md:text-[7.5rem] leading-[0.88] tracking-tight text-white mb-6 md:mb-8"
            >
              {nameLine.map((word, wi) => (
                <span key={word} className="block overflow-hidden">
                  {word.split("").map((ch, ci) => (
                    <motion.span
                      key={ci}
                      className={`inline-block ${wi === 1 ? "text-primary-400" : ""}`}
                      variants={{
                        hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
                        show: { y: "0%", opacity: 1, filter: "blur(0px)" },
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[17px] md:text-[19px] text-white/90"
              >
                I'm specialized in{" "}
                <span className="text-primary-400 font-medium">
                  <TypeAnimation
                    sequence={SITE.titles.flatMap((t) => [t, 1800])}
                    wrapper="span"
                    repeat={Infinity}
                    cursor
                  />
                </span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-md text-[13.5px] md:text-[14.5px] text-white/70 leading-relaxed"
              >
                I build websites and marketing systems that turn visitors into paying customers, for
                businesses at any stage. Bangkok-based, working with clients worldwide.
              </motion.p>
            </div>

            {/* CTA bar, one continuous pill with internal dividers, the same
                idea as the reference's "Date&time | Visitors | Room type |
                Book now" booking bar, adapted to this site's 3 real CTAs. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex flex-wrap items-stretch rounded-full bg-white/95 backdrop-blur p-1.5 gap-1 shadow-xl"
            >
              <Link
                to="/projects"
                className="flex items-center gap-1.5 rounded-full px-4 md:px-5 py-2.5 text-[12.5px] md:text-[13.5px] font-semibold text-ink-900 hover:bg-black/5 transition-colors"
              >
                {t("hero_view_projects")}
              </Link>
              <Link
                to="/pricing"
                className="flex items-center gap-1.5 rounded-full px-4 md:px-5 py-2.5 text-[12.5px] md:text-[13.5px] font-semibold text-ink-900 hover:bg-black/5 transition-colors"
              >
                See Pricing
              </Link>
              <Magnetic strength={0.2}>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 md:px-6 py-2.5 text-[12.5px] md:text-[13.5px] font-bold hover:bg-primary-500 transition-colors duration-200"
                >
                  {t("hero_get_in_touch")} <ArrowRight size={14} />
                </Link>
              </Magnetic>
            </motion.div>

            {/* Service "toggles": every service, real navigation straight to
                that service's page. These used to be scattered absolutely
                over the hero and collided with the headline on real
                viewport sizes, only ~3 ever landed somewhere safe to read.
                Laid out in normal flow with flex-wrap instead: they sit
                below everything else, wrap naturally at any width, and can
                never overlap the name or the CTA bar because they're not
                stacked on top of them, they're simply next in line. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap gap-2 mt-6 md:mt-8"
            >
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="rounded-full border border-white/20 bg-black/35 backdrop-blur px-3.5 py-1.5 text-[12px] font-medium text-white/85 hover:border-primary-400 hover:text-white hover:bg-black/50 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats sit just under the box, not inside it, matching the
            reference's own stats row appearing after its hero panel rather
            than crammed into the photo. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container-page grid grid-cols-3 gap-6 md:gap-10 pt-10 pb-4 px-3 md:px-8"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-black text-3xl md:text-5xl tracking-tight text-primary-500">{s.value}</p>
              <p className="text-[11px] md:text-[13px] text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>
      {/* TRUST BAR, immediate social proof right under the fold */}
      <div className="px-6 mb-16">
        <div className="container-page rounded-2xl border border-primary-500/10 bg-bg-card py-5">
          <p className="text-center text-[11px] uppercase tracking-widest2 text-muted-foreground mb-3">
            Worked with
          </p>
          <Marquee items={PROJECTS.map((p) => p.client.split(",")[0])} />
        </div>
      </div>

      {/* PROOF STATEMENT */}
      <section className="px-6 py-16">
        <div className="container-page max-w-3xl">
          <ScrollTextHighlight
            text={SITE.description}
            className="font-display text-[22px] md:text-[28px] font-medium leading-snug"
          />
        </div>
      </section>

      <ProcessSection />

      {/* IMPACT, 2-up on mobile with the 3rd spanning full width, instead of
          three full-width cards stacking one under another. */}
      <div className="px-6 mb-16">
        <div className="container-page grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {IMPACT_POINTS.map((point, i) => (
            <TiltCard key={point.title} className={i === IMPACT_POINTS.length - 1 ? "col-span-2 md:col-span-1" : ""}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-primary-500/15 bg-bg-card p-4 md:p-6 h-full"
              >
                <div className="text-xl md:text-2xl mb-2 md:mb-3">{point.icon}</div>
                <p className="text-[13px] md:text-[15px] font-semibold text-parchment-100 mb-1.5 md:mb-2">{point.title}</p>
                <p className="text-[11.5px] md:text-[13px] text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* STACKED SHOWCASE: three full-viewport sections, each `sticky top-0`
          with a rising z-index, so scrolling past one release it and the
          next pins in its place and visually covers it. This is your
          original effect, restored, not replaced, the cutoff bug wasn't
          the technique, it was Panel 1 not being given enough height to
          hold its own content (heading + 3 project rows + the 680px sphere
          gallery on desktop easily runs past two full screens), so the
          browser released it before you'd scrolled through all of it.
          Fixed by giving Panel 1 an explicit, generous floor instead of
          trusting the browser to measure a 3D canvas + hover-animated rows
          correctly on every device. */}
      <div className="relative">
        {/* Panel 1: Projects. Background is a hardcoded light gray
            regardless of site theme, so every text color in here must be
            hardcoded dark too, not the theme-reactive text-parchment-*
            classes (those flip to near-white in dark mode, which is
            invisible against this panel's always-light background, this
            was the white-on-white "Projects I've built" bug). */}
        <section className="sticky top-0 z-10 min-h-screen lg:min-h-[145vh] flex items-start bg-[#eef1f4] [scroll-snap-align:start] [scroll-snap-stop:always] px-6 pt-24 md:pt-28 pb-16">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-600 mb-3">{t("section_selected_work")}</p>
                <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink-900">
                  <RevealText text={t("section_projects_built")} />
                </h2>
              </div>
              <SectionCTA label={t("view_all")} to="/projects" variant="outline" tone="light" />
            </div>

            <ScrollStackCards items={FEATURED_CARDS} />

            {/* Fun secondary explorer: services and common problems, not
                projects (those are the list right above), each node routes to
                a service page. */}
            {/* Fun secondary explorer: drag to orbit, hover to zoom in on a
                service, click to open it. Bigger container, bigger `size`,
                and a stronger `hover` pull than the default, at the old
                settings the label text was too small to read and the hover
                pop too subtle to notice. */}
            <div className="hidden lg:flex flex-col items-center mt-12">
              <p className="text-[12px] text-ink-900/55 mb-4">Or drag to spin, hover a service to zoom in</p>
              <div className="w-full h-[420px]">
                <SphereGallery3D
                  images={SPHERE_ITEMS}
                  branches={SPHERE_ITEMS.length}
                  size={58}
                  hover={220}
                  background="transparent"
                  style={{ minWidth: 0, minHeight: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Panel 2: Services, solid dark panel so it genuinely covers Panel 1.
            Background is hardcoded dark regardless of theme, so text here
            must be hardcoded light. It was using text-parchment-50/300/400,
            which flip to dark navy in light mode (parchment-300/400 aren't
            even defined in the palette, so they were silently resolving to
            no color and inheriting the page's default, also wrong here) and
            were invisible against this panel whenever a visitor had light
            mode on. */}
        <section className="sticky top-0 z-20 min-h-screen flex items-center bg-ink-900 [scroll-snap-align:start] [scroll-snap-stop:always] px-6 py-20">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-primary-400 mb-3">What I Do</p>
                <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white">
                  <RevealText text="Ten ways to fix a business problem" />
                </h2>
              </div>
              <SectionCTA label="See all services" to="/services" variant="outline" tone="dark" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {SERVICES.slice(0, 6).map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/services/${s.slug}`}
                    className="group block h-full rounded-2xl border border-white/15 bg-white/[0.04] p-4 md:p-6 hover:border-primary-500/50 transition-colors"
                  >
                    <h3 className="text-[13.5px] md:text-[16px] font-bold text-white mb-1.5">{s.name}</h3>
                    <p className="text-[11.5px] md:text-[12.5px] text-white/65 leading-relaxed mb-3 line-clamp-3">
                      {s.painPoint}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11.5px] md:text-[12.5px] font-semibold text-primary-400">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[12px] text-white/50 mt-6">
              Plus learning platforms, directories, nonprofit/government sites, and custom internal tools, see all 10.
            </p>
          </div>
        </section>

        {/* Panel 3: Service Packages, no numbers, same reasoning as the
            standalone Pricing page: a price only means anything once scope
            is confirmed on a call, showing one here invites comparison
            against a completely different scope somewhere else. */}
        <section className="sticky top-0 z-30 min-h-screen flex items-center bg-[#444733] [scroll-snap-align:start] [scroll-snap-stop:always] px-6 py-20">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
              <div>
                <p className="eyebrow mb-3 text-[#c4d69a]">Service Packages</p>
                <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white">
                  <RevealText text="Four ways to start" />
                </h2>
              </div>
              <SectionCTA label="See full packages" to="/pricing" variant="outline" tone="dark" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {PACKAGES.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06 }}
                  className={`relative rounded-2xl border p-3.5 md:p-6 flex flex-col ${
                    pkg.featured ? "border-primary-400 bg-white/15" : "border-white/15 bg-white/[0.07]"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-2.5 left-3.5 rounded-full bg-primary-400 text-ink-900 text-[9px] font-bold px-2 py-0.5">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-black text-sm md:text-lg tracking-tight text-white mb-1">{pkg.name}</h3>
                  <p className="text-[11px] md:text-[12.5px] text-white/60 mb-3">{pkg.bestFor}</p>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {pkg.includes.slice(0, 2).map((f) => (
                      <li key={f} className="flex gap-1.5 text-[10.5px] md:text-[12px] text-white/80">
                        <Check size={12} className="text-[#c4d69a] flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?package=${encodeURIComponent(pkg.name.toLowerCase())}`}
                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-2 text-[10.5px] md:text-[12.5px] font-bold transition-colors ${
                      pkg.featured
                        ? "bg-primary-400 text-ink-900 hover:bg-primary-300"
                        : "border border-white/25 text-white hover:bg-white/10"
                    }`}
                  >
                    Ask About This
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[11.5px] text-white/50 mt-6">
              Every tier starts with a free discovery call, scope and investment are confirmed together, not
              guessed at from a price list.
            </p>
          </div>
        </section>
      </div>

      {/* ABOUT TEASER */}


      {/* ABOUT TEASER */}
      <section className="px-6 py-16">
        <div className="container-page rounded-[32px] bg-ink-700 border border-primary-500/10 p-8 md:p-14 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <p className="eyebrow mb-3">Who's Behind This</p>
            <h2 className="font-black text-2xl md:text-4xl tracking-tight text-parchment-100 mb-4">
              Web development and digital marketing, under one roof
            </h2>
            <p className="text-[14px] md:text-[15px] text-parchment-200 leading-relaxed mb-6">{ABOUT_PARAGRAPHS[0]}</p>
            <SectionCTA label="Get to know me" to="/about" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl bg-ink-900/60 border border-primary-500/10 p-4">
                <p className="font-black text-xl md:text-2xl text-primary-500">{s.value}</p>
                <p className="text-[10.5px] text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ, pre-answers the objections that would otherwise bounce someone off Contact */}
      <section className="px-6 py-16">
        <div className="container-page max-w-2xl mx-auto">
          <p className="eyebrow mb-4 text-center">FAQ</p>
          <h2 className="font-black text-2xl md:text-4xl tracking-tight text-parchment-100 text-center mb-10">
            Before you ask
          </h2>
          <FaqAccordion items={GENERAL_FAQS} />
        </div>
      </section>

      {/* JOURNEY, makes the path from "just looking" to "hired" explicit */}
      <section className="px-6 py-16">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow mb-3">How This Works</p>
            <h2 className="font-black text-2xl md:text-4xl tracking-tight text-parchment-100">
              From browsing to a live site, four steps
            </h2>
          </div>
          <JourneyStrip />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24">
        <div className="container-page text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Let's work together</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100 mb-5">
            <RevealText text={t("cta_project_in_mind")} />
          </h2>
          <p className="text-[15px] text-muted-foreground mb-9 leading-relaxed">
            Book a free 15-minute call, no pitch deck, or send a message if you'd rather start there.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SectionCTA label="Book a Free Call" to="/contact" />
            <SectionCTA label="See Pricing First" to="/pricing" variant="outline" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
