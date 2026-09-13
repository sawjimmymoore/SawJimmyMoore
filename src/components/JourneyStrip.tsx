import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Calculator, PhoneCall, Rocket, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: Compass, label: "Explore", detail: "Browse projects and pricing, no commitment.", to: "/pricing" },
  { icon: Calculator, label: "Get a Quote", detail: "Build your own scope, see a real estimate instantly.", to: "/quote" },
  { icon: PhoneCall, label: "Free Call", detail: "15 minutes to lock down the scope, no payment yet.", to: "/contact" },
  { icon: Rocket, label: "Build & Launch", detail: "Fixed price agreed upfront, regular check-ins, no black box.", to: "/contact" },
];

/**
 * Makes the path from "just looking" to "hired" explicit and literal, so a
 * visitor never has to guess what happens after they click a CTA. Every
 * step links somewhere real, this is a map of the funnel, not decoration.
 */
export default function JourneyStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <Link
              to={step.to}
              className="group flex h-full flex-col rounded-2xl border border-primary-500/15 bg-bg-card p-4 md:p-5 hover:border-primary-500/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                  <Icon size={15} />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
              </div>
              <p className="text-[13.5px] md:text-[14.5px] font-bold text-parchment-100 mb-1">{step.label}</p>
              <p className="text-[11px] md:text-[12px] text-muted-foreground leading-relaxed flex-1">{step.detail}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Go <ArrowRight size={11} />
              </span>
            </Link>
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-primary-500/40">
                <ArrowRight size={16} />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
