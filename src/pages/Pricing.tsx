import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { PACKAGES, ADDONS, ADDON_PRICING_DISCLAIMER } from "@/data/content";
import Magnetic from "@/components/Magnetic";
import RevealText from "@/components/RevealText";
import QuoteBuilder from "@/components/QuoteBuilder";

/**
 * No numbers on this page anymore, on purpose. What's included per tier is
 * still fully specific, that's what actually helps someone self-select, a
 * price only makes sense once the scope is confirmed on a call anyway, and
 * leading with a number here just invites someone to compare against a
 * rate they saw somewhere else with a completely different scope behind it.
 * Every tier's CTA goes to a free discovery call, not a payment link.
 */
export default function Pricing() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">Service Packages</p>
          <h1 className="font-black text-4xl md:text-6xl tracking-tight text-parchment-100 mb-5">
            <RevealText text="Four Ways To Start" />
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            No open-ended scope, and no price guessing either. Every tier below shows exactly what's
            built and what it's for, the actual number gets confirmed on a free call once your specific
            scope is clear, not before.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-16">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07 }}
              className={`relative rounded-2xl border p-4 sm:p-7 flex flex-col ${
                pkg.featured
                  ? "border-primary-500 bg-primary-500/[0.06]"
                  : "border-primary-500/15 bg-bg-card"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-4 sm:left-6 rounded-full bg-primary-500 text-ink-900 text-[9.5px] sm:text-[10.5px] font-bold px-2.5 sm:px-3 py-1">
                  Most Popular
                </span>
              )}
              <h2 className="font-black text-base sm:text-xl tracking-tight text-parchment-100 mb-1">{pkg.name}</h2>
              <p className="text-[11.5px] sm:text-[13px] text-muted-foreground mb-4 sm:mb-5">{pkg.bestFor}</p>
              <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-1">
                {pkg.includes.map((f) => (
                  <li key={f} className="flex gap-1.5 sm:gap-2 text-[11.5px] sm:text-[13px] text-parchment-200">
                    <Check size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?package=${encodeURIComponent(pkg.name.toLowerCase())}`}
                className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-[11.5px] sm:text-[13px] font-bold transition-colors text-center ${
                  pkg.featured
                    ? "bg-primary-500 text-ink-900 hover:bg-primary-400"
                    : "border border-primary-500/30 text-parchment-100 hover:bg-primary-500/10"
                }`}
              >
                Ask About This
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[12.5px] text-muted-foreground mb-16">
          Every tier starts with a free, no-pressure discovery call. Scope and investment are confirmed
          together on that call, not guessed at from a price list.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-ink-900 border border-primary-500/10 p-8 md:p-12 text-center mb-16"
        >
          <p className="text-[14px] text-parchment-300 mb-6 max-w-md mx-auto">
            Not sure which tier fits? A free call sorts it out in 15 minutes, no pitch deck, no obligation.
          </p>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 text-ink-900 px-7 py-3.5 text-[14px] font-bold hover:bg-primary-400 transition-colors duration-200"
            >
              Book a Free Discovery Call <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </motion.div>

        {/* RECURRING ADD-ONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="eyebrow mb-4 flex items-center justify-center gap-2">
              <RefreshCw size={13} /> Ongoing
            </p>
            <h2 className="font-black text-3xl md:text-4xl tracking-tight text-parchment-100 mb-4">
              After Launch, Sold Separately
            </h2>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed max-w-xl mx-auto">
              A site is not finished the day it launches. These run monthly (or weekly/daily where it
              makes sense), standalone or bundled into any package above, so the investment keeps paying
              off after the build is done.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ADDONS.map((a) => (
              <div key={a.name} className="rounded-xl border border-primary-500/15 bg-bg-card p-3.5 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <p className="text-[12.5px] sm:text-[14px] font-semibold text-parchment-100">{a.name}</p>
                  <span className="shrink-0 self-start rounded-full bg-primary-500/10 px-2 sm:px-2.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-medium text-primary-500">
                    {a.cadence}
                  </span>
                </div>
                <p className="text-[11px] sm:text-[12.5px] text-muted-foreground leading-relaxed mb-2">{a.why}</p>
                {a.costAnchor && (
                  <p className="text-[10.5px] sm:text-[11.5px] text-primary-400 leading-relaxed border-t border-primary-500/10 pt-2">
                    {a.costAnchor}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-6 max-w-lg mx-auto">
            {ADDON_PRICING_DISCLAIMER}
          </p>
        </motion.div>

        {/* CUSTOM QUOTE CALCULATOR, formerly its own /quote page. Folded in
            here (and its own separate submit form dropped) so there's one
            packages page and one contact form on the whole site instead of
            two different places asking for a lead. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-primary-500/10"
        >
          <QuoteBuilder />
        </motion.div>
      </div>
    </div>
  );
}
