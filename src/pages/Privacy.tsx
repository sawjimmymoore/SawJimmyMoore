import { motion } from "framer-motion";
import { SITE } from "@/data/content";
import RevealText from "@/components/RevealText";

/**
 * Plain, honest privacy policy for a solo freelance practice, not a SaaS
 * boilerplate copy-pasted from a generator. Covers what's actually
 * collected here: contact form submissions, basic analytics, and nothing
 * sold or shared with third parties. Jim should read this over and adjust
 * anything that doesn't match reality (e.g. once real analytics/cookie
 * tooling is wired in, this needs to name it specifically).
 */
export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container-page max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight text-parchment-100 mb-4">
            <RevealText text="Privacy Policy" />
          </h1>
          <p className="text-[13px] text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
        </motion.div>

        <div className="space-y-8 text-[14.5px] leading-relaxed text-parchment-200">
          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Who this covers</h2>
            <p>
              This policy applies to {SITE.name}'s website and covers what information is collected from
              visitors, why, and what happens to it. This is a solo freelance practice based in {SITE.location},
              not a company with a data-processing department, so this is written in plain terms rather than
              boilerplate legal language.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">What gets collected</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact and quote-request form submissions: name, email, phone, and whatever project details are entered, used only to respond to the inquiry.</li>
              <li>Basic site analytics (pages visited, general location by country/city, device type) to understand traffic and improve the site.</li>
              <li>No payment or card details are collected or stored by this site directly.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">What doesn't happen</h2>
            <p>
              Information submitted through this site is never sold, rented, or shared with third parties for
              marketing purposes. It's used only to respond to inquiries and deliver the services requested.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Cookies</h2>
            <p>
              This site may use essential cookies for basic functionality (like remembering a theme or
              language preference) and analytics cookies to understand traffic. A cookie preference banner
              lets visitors control non-essential cookies.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Your rights</h2>
            <p>
              You can request a copy of any information held about you, ask for it to be corrected, or ask
              for it to be deleted at any time by emailing{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary-500 hover:underline">{SITE.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Changes to this policy</h2>
            <p>
              This policy may be updated occasionally as the site or its tools change. Continued use of the
              site after changes means acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-black text-xl text-parchment-100 mb-2">Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary-500 hover:underline">{SITE.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
