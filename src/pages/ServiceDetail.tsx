import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ShoppingCart, Megaphone, CalendarClock, Check, Database, HeartHandshake, UserCircle, Layers } from "lucide-react";
import { SERVICES } from "@/data/content";
import Magnetic from "@/components/Magnetic";
import FaqAccordion from "@/components/FaqAccordion";

const ICONS = { code: Code2, cart: ShoppingCart, megaphone: Megaphone, calendar: CalendarClock, database: Database, heart: HeartHandshake, user: UserCircle, layers: Layers };

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = ICONS[service.icon];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-14">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 mb-5">
            <Icon size={22} />
          </span>
          <p className="eyebrow mb-3">Services</p>
          <h1 className="font-black text-4xl md:text-6xl tracking-tight text-parchment-100 mb-4">{service.name}</h1>
          <p className="text-[16px] text-primary-400 font-semibold">{service.tagline}</p>
        </motion.div>

        {/* PAIN POINT / IMPACT , Delve-style two-part problem framing */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-primary-500/15 bg-bg-card p-6">
            <p className="text-[11px] font-mono uppercase tracking-wide text-primary-400 mb-2">The Problem</p>
            <p className="text-[14px] text-parchment-200 leading-relaxed">{service.painPoint}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
            <p className="text-[11px] font-mono uppercase tracking-wide text-red-400 mb-2">The Cost of Waiting</p>
            <p className="text-[14px] text-parchment-200 leading-relaxed">{service.impact}</p>
          </motion.div>
        </div>

        {/* WHAT YOU GET */}
        <div className="mb-16">
          <h2 className="font-black text-2xl tracking-tight text-parchment-100 mb-6">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.whatYouGet.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-2.5 text-[13.5px] text-parchment-200 leading-relaxed"
              >
                <Check size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* JOURNEY */}
        <div className="mb-16">
          <h2 className="font-black text-2xl tracking-tight text-parchment-100 mb-6">How It Works</h2>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/25 to-primary-500/0 lg:block" />
            {service.journey.map((step, i) => (
              <motion.div key={step.stage} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/40 bg-bg-card font-mono text-[13px] font-bold text-primary-500">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[14px] font-semibold text-parchment-100">{step.stage}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INVESTMENT */}
        <div className="mb-16 rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/[0.06] to-transparent p-7">
          <p className="text-[11px] font-mono uppercase tracking-wide text-primary-400 mb-2">Investment</p>
          <p className="text-[14px] text-parchment-200 leading-relaxed">{service.investmentNote}</p>
        </div>

        {/* FAQ */}
        {service.faqs.length > 0 && (
          <div className="mb-16">
            <h2 className="font-black text-2xl tracking-tight text-parchment-100 mb-6">Questions</h2>
            <FaqAccordion items={service.faqs} />
          </div>
        )}

        <div className="flex flex-col items-center text-center rounded-[32px] bg-ink-900 border border-primary-500/10 py-14 px-6">
          <h2 className="font-black text-2xl tracking-tight text-parchment-100 mb-4">
            Book a free demo, no obligation, no pitch deck
          </h2>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 text-ink-900 px-8 py-4 text-[15px] font-bold hover:bg-primary-400 transition-colors duration-200"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
