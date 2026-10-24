import { useState } from "react";
import { motion } from "framer-motion";
import { SITE, WORKING_HOURS, QUOTE_FORMSPREE_ID } from "@/data/content";
import RevealText from "@/components/RevealText";

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${QUOTE_FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) { setState("done"); form.reset(); } else setState("error");
    } catch { setState("error"); }
  }

  const field = "w-full border-b border-parchment-100/30 bg-transparent py-3 outline-none focus:border-primary-400 transition-colors";
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-32 pb-24">
      <div className="container-page grid gap-16 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="num mb-4">Contact</p>
          <h1 className="display text-5xl md:text-7xl mb-10"><RevealText text="Say hello." /></h1>
          <div className="space-y-6 font-mono text-[12px] uppercase tracking-widest2">
            <a href={`mailto:${SITE.email}`} className="block hover:text-primary-400 break-all">{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/\s|-/g, "")}`} className="block hover:text-primary-400">{SITE.phone}</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="block hover:text-primary-400">LinkedIn</a>
            <p className="text-muted-foreground normal-case tracking-normal font-body text-sm">
              {SITE.location} · {WORKING_HOURS.days}, {WORKING_HOURS.hours} {WORKING_HOURS.timezone}
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-8">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
          <input type="hidden" name="_subject" value="Portfolio message" />
          <label className="block"><span className="num">Name</span><input name="name" required className={field} /></label>
          <label className="block"><span className="num">Email</span><input name="email" type="email" required className={field} /></label>
          <label className="block"><span className="num">Message</span><textarea name="message" rows={5} required className={field} /></label>
          <button disabled={state === "sending"} className="btn-solid disabled:opacity-60">
            {state === "sending" ? "Sending" : "Send message"}
          </button>
          {state === "done" && <p className="text-sm text-primary-400">Thanks, I will reply soon.</p>}
          {state === "error" && <p className="text-sm text-primary-400">Something went wrong. Please email me directly.</p>}
        </form>
      </div>
    </motion.div>
  );
}
