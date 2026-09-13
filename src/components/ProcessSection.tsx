import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { CLIENT_JOURNEY_TEMPLATE } from "@/data/content";
import Magnetic from "@/components/Magnetic";
import RevealText from "@/components/RevealText";

/**
 * The "how working with me actually goes" section, five plain steps from
 * first call to ongoing support, each with a CTA back to booking a call.
 * This is the freelance equivalent of a SaaS "Book a Demo" flow: it tells
 * a prospective client exactly what happens before they commit to anything.
 */
export default function ProcessSection() {
  return (
    <section className="px-6 py-20">
      <div className="container-page">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-parchment-100">
            <RevealText text="From first call to launch" />
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            No open-ended hours, no black box. Here's exactly what happens when you work with me.
          </p>
        </div>

        {/* Mobile/tablet: a real zigzag timeline, not the desktop grid
            shrunk down to one column. A centered spine with steps
            alternating left/right so it reads as its own layout, not a
            compressed version of the 5-up grid. */}
        <div className="relative sm:hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary-500/0 via-primary-500/25 to-primary-500/0" />
          <div className="relative flex flex-col gap-10">
            {CLIENT_JOURNEY_TEMPLATE.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-2 items-start gap-4"
                >
                  {left ? (
                    <>
                      <div className="text-right">
                        <h3 className="text-[15px] font-semibold text-parchment-100">{step.title}</h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="flex justify-start">
                        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/40 bg-bg-card font-mono text-[13px] font-bold text-primary-500 -translate-x-1/2">
                          {step.step}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-end">
                        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/40 bg-bg-card font-mono text-[13px] font-bold text-primary-500 translate-x-1/2">
                          {step.step}
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-[15px] font-semibold text-parchment-100">{step.title}</h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tablet and up: the original straight grid, 2-up then 5-up. */}
        <div className="relative hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-primary-500/0 via-primary-500/25 to-primary-500/0 lg:block" />
          {CLIENT_JOURNEY_TEMPLATE.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/40 bg-bg-card font-mono text-[13px] font-bold text-primary-500">
                {step.step}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-parchment-100">{step.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-primary-500/15 bg-bg-card p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[15px] font-semibold text-parchment-100">Ready to talk through your project?</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Book a free discovery call, no pressure, no obligation.
            </p>
          </div>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-on-primary px-6 py-3.5 text-[14px] font-semibold hover:bg-primary-500 transition-colors duration-200 whitespace-nowrap"
            >
              <Calendar size={15} /> Book a Free Call <ArrowRight size={14} />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
