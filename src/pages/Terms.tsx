import { motion } from "framer-motion";
import { SITE } from "@/data/content";
import RevealText from "@/components/RevealText";

/**
 * Plain terms for a freelance web dev / marketing practice, covers
 * engagement basics: scoping, payment, ownership, and liability. Not a
 * substitute for a real contract on paid work, every engagement should
 * still get its own written agreement, this just sets baseline
 * expectations for anyone visiting the site or requesting a quote.
 */
export default function Terms() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight text-parchment-100 mb-4">
            <RevealText text="Terms & Conditions" />
          </h1>
          <p className="text-[13px] text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
        </motion.div>

        <div className="space-y-8 text-[14.5px] leading-relaxed text-parchment-200">
          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Agreement to terms</h2>
            <p>
              By using this website or submitting a quote or contact request, you agree to these terms. This
              is a solo freelance practice ({SITE.name}, {SITE.location}) offering web development, e-commerce,
              digital marketing, and custom web application services.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Scope and quotes</h2>
            <p>
              Package tiers and pricing shown on this site are indicative starting ranges, not binding
              quotes. Every project is scoped individually on a free discovery call, and a fixed-scope
              proposal is agreed in writing before any paid work starts.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Payment</h2>
            <p>
              Payment terms (deposits, milestones, final payment) are agreed per project before work begins
              and confirmed in writing. Late payment may pause work until resolved.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Ownership</h2>
            <p>
              Once a project is paid in full, the client owns the delivered code, content, and design for
              that project, with no ongoing licensing fees. Reusable internal tooling, templates, and
              filler/stock assets not specific to the client's project remain the developer's own.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Revisions and support</h2>
            <p>
              Each package includes a defined number of revision rounds during the build phase. Ongoing
              maintenance, content updates, or feature additions after launch are handled under a separate
              support arrangement, not included by default.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Liability</h2>
            <p>
              Every reasonable effort is made to deliver working, tested software, but no guarantee is made
              that any site or campaign will be error-free or achieve specific business results, since
              outcomes depend on many factors outside this practice's control (market conditions, ad
              platform changes, client-side content decisions, and so on).
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Third-party services</h2>
            <p>
              Projects may rely on third-party platforms (hosting, ad platforms, payment processors,
              analytics). Those platforms' own terms and pricing apply, and this practice isn't responsible
              for their outages, policy changes, or fees.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Changes to these terms</h2>
            <p>These terms may be updated occasionally; continued use of the site means acceptance of the current version.</p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary-500 hover:underline">{SITE.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
