import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Check } from "lucide-react";
import { SITE, QUOTE_FORMSPREE_ID, MESSAGE_SUGGESTIONS, WORKING_HOURS, PACKAGES } from "@/data/content";
import { useLang } from "@/lib/i18n";
import { useCurrency, formatPriceRange } from "@/lib/currency";
import { useTimezone, TIMEZONES, convertFromBangkok } from "@/lib/timezone";
import DitherReveal from "@/components/effects/DitherReveal";
import BookingCalendar from "@/components/BookingCalendar";

/**
 * Calendar-first, not calendar-optional. It used to sit collapsed behind a
 * "want to book a call? (optional)" toggle below the message form, which
 * buries the one action most visitors actually want. Now the week view is
 * the first thing on the page; the written message is the secondary,
 * lower-commitment path for anyone not ready to pick a time yet.
 *
 * If arrived via a Pricing tier's "Get Started" (?package=growth), the
 * message pre-fills with that context instead of a blank box, so a visitor
 * doesn't have to re-explain what they just clicked.
 */
export default function Contact() {
  const { t } = useLang();
  const { currency } = useCurrency();
  const { timezone, setTimezone } = useTimezone();
  const [searchParams] = useSearchParams();
  const packageSlug = searchParams.get("package");
  const matchedPackage = PACKAGES.find((p) => p.name.toLowerCase() === packageSlug);
  const matchedPackagePrice = matchedPackage
    ? formatPriceRange(matchedPackage.priceMinTHB, matchedPackage.priceMaxTHB, currency, matchedPackage.priceIsFloor)
    : "";

  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [mode, setMode] = useState<"call" | "message">("call");

  useEffect(() => {
    if (matchedPackage) {
      setForm((f) => ({
        ...f,
        message: f.message || `I'm interested in the ${matchedPackage.name} package (${matchedPackagePrice}). `,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageSlug]);

  const canSubmit = form.name.trim() && form.email.trim() && (form.message.trim() || selectedSlot);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // Honeypot: a real visitor never sees or fills this field (see the
    // hidden input below), a bot filling every field on the form does.
    // Fake a normal success without ever calling Formspree.
    if (form.hp) {
      setStatus("sent");
      return;
    }
    setStatus("sending");

    const subjectPrefix = selectedSlot ? "[Call Request] " : isCustom ? "[Custom Request] " : "";

    try {
      const res = await fetch(`https://formspree.io/f/${QUOTE_FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `${subjectPrefix}Portfolio inquiry from ${form.name}`,
          _gotcha: form.hp || "",
          name: form.name,
          email: form.email,
          message: form.message || "(no message, call slot requested below)",
          requested_slot: selectedSlot || "(no call requested, message only)",
          package: matchedPackage?.name || "(not specified)",
          custom_request: isCustom ? "Yes, flagged as custom" : "No",
          source: "Contact Page",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm({ name: "", email: "", message: "", hp: "" });
    setIsCustom(false);
    setSelectedSlot(null);
    setStatus("idle");
  }

  return (
    <div className="relative pt-32 pb-24 px-6 min-h-[100vh]">
      <div className="fixed inset-0 -z-[3]">
        <DitherReveal
          image={{ src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=70" }}
          ditherStyle="bayer8"
          revealRadius={160}
          dotSize={6}
        />
        <div className="absolute inset-0 bg-ink-900/55" />
      </div>

      <div className="container-page relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="eyebrow mb-4">Get In Touch</p>
          <h1 className="font-black text-4xl md:text-6xl text-parchment-100 mb-5 tracking-tight">{t("contact_title")}</h1>
          <p className="text-[15.5px] text-parchment-200 leading-relaxed max-w-xl mx-auto">
            {matchedPackage
              ? `Booking a free scoping call for the ${matchedPackage.name} package, no payment, no obligation, just a conversation to lock down the scope.`
              : "Pick a free 15-minute slot below, no pitch deck, no obligation, or send a message if you'd rather start there."}
          </p>
        </motion.div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-ink-900/80 backdrop-blur p-10 text-center border border-primary-500/20"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
              <Check size={22} />
            </div>
            <p className="text-[22px] font-semibold text-parchment-100 mb-2">Message Sent</p>
            <p className="text-[14px] text-muted-foreground mb-2">
              Thanks{form.name ? `, ${form.name}` : ""}. Jimmy will get back to you directly, usually within 24 hours
              {selectedSlot ? `, and will confirm your ${selectedSlot} slot by email` : ""}.
            </p>
            <button
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 px-5 py-2.5 text-[13px] font-semibold text-parchment-100 hover:bg-primary-500/10 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <>
            {/* Mode switch: calendar is the default, message is one tap away, not the reverse */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setMode("call")}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                  mode === "call" ? "bg-primary-500 text-ink-900" : "border border-primary-500/25 text-parchment-200 hover:border-primary-500"
                }`}
              >
                Book a Free Call
              </button>
              <button
                onClick={() => setMode("message")}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                  mode === "message" ? "bg-primary-500 text-ink-900" : "border border-primary-500/25 text-parchment-200 hover:border-primary-500"
                }`}
              >
                Send a Message Instead
              </button>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-primary-500/15 bg-ink-900/70 backdrop-blur p-5 sm:p-8"
            >
              <div className="flex flex-wrap gap-4 pb-5 border-b border-primary-500/10 text-[13px]">
                {/* Honeypot: hidden from real visitors (off-screen, not
                    display:none so basic bots that skip hidden fields still
                    fill it), Formspree drops the submission if it's non-empty. */}
                <input
                  type="text"
                  name="_hp"
                  value={form.hp}
                  onChange={(e) => setForm({ ...form, hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                />
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 text-parchment-300 hover:text-primary-500 transition-colors">
                  <Mail size={13} /> {SITE.email}
                </a>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1.5 text-parchment-300 hover:text-primary-500 transition-colors">
                  <Phone size={13} /> {SITE.phone}
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-parchment-300 hover:text-primary-500 transition-colors">
                  <Linkedin size={13} /> LinkedIn
                </a>
              </div>

              {mode === "call" ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <p className="flex items-center gap-2 text-[13px] text-parchment-300">
                      {WORKING_HOURS.days}, {convertFromBangkok("10:00", timezone)} to {convertFromBangkok("18:00", timezone)}{" "}
                      ({TIMEZONES.find((tz) => tz.id === timezone)?.label})
                    </p>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value as typeof timezone)}
                      className="rounded-full border border-primary-500/20 bg-bg-card px-3 py-1.5 text-[12px] text-parchment-100 outline-none focus:border-primary-500"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.id} value={tz.id}>{tz.label}</option>
                      ))}
                    </select>
                  </div>
                  {timezone !== "Asia/Bangkok" && (
                    <p className="text-[11px] text-muted-foreground -mt-2 mb-4">
                      Converted from Bangkok time, approximate (standard time, not adjusted for daylight saving).
                      Calendar slots below are still labeled in Bangkok time.
                    </p>
                  )}
                  <BookingCalendar
                    selected={selectedSlot}
                    onSelect={(slot) => setSelectedSlot(slot)}
                  />
                  {selectedSlot && (
                    <p className="mt-4 text-[13px] text-primary-400 font-medium">Selected: {selectedSlot} (Bangkok time), fill in your details below to confirm.</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-[13px] font-medium text-parchment-200 mb-2">What's this about?</label>
                  <div className="flex flex-wrap gap-2">
                    {MESSAGE_SUGGESTIONS.map((s) => (
                      <button
                        type="button"
                        key={s.label}
                        onClick={() => setForm((f) => ({ ...f, message: s.template }))}
                        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                          form.message === s.template && s.template
                            ? "border-primary-500 text-primary-500"
                            : "border-primary-500/25 text-parchment-200 hover:border-primary-500 hover:text-primary-500"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-parchment-200 mb-2">{t("contact_name")}</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-primary-500/20 bg-bg-card px-4 py-3 text-[14px] text-parchment-100 focus:border-primary-500 outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-parchment-200 mb-2">{t("contact_email")}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-primary-500/20 bg-bg-card px-4 py-3 text-[14px] text-parchment-100 focus:border-primary-500 outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {mode === "message" && (
                <div>
                  <label className="block text-[13px] font-medium text-parchment-200 mb-2">{t("contact_message")}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-primary-500/20 bg-bg-card px-4 py-3 text-[14px] text-parchment-100 focus:border-primary-500 outline-none transition-colors resize-none"
                    placeholder="Tell me a bit about what you have in mind..."
                  />
                </div>
              )}

              {mode === "call" && matchedPackage && (
                <p className="text-[12.5px] text-muted-foreground -mt-2">
                  Message pre-filled: "{form.message}" — edit or replace it below if you'd like.
                </p>
              )}
              {mode === "call" && (
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-primary-500/20 bg-bg-card px-4 py-3 text-[13px] text-parchment-100 focus:border-primary-500 outline-none transition-colors resize-none"
                  placeholder="Anything you'd like Jimmy to know before the call? (optional)"
                />
              )}

              <label className="flex items-start gap-3 rounded-xl border border-primary-500/15 bg-bg-card p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCustom}
                  onChange={(e) => setIsCustom(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary-500"
                />
                <span className="text-[13.5px] text-parchment-100">{t("contact_custom_checkbox")}</span>
              </label>
              {isCustom && (
                <p className="text-[12.5px] text-muted-foreground leading-relaxed -mt-3">{t("contact_custom_note")}</p>
              )}

              {status === "error" && (
                <p className="text-[13px] text-red-400">
                  Something went wrong sending your message. Please try again, or email directly at{" "}
                  <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || status === "sending"}
                className="w-full rounded-full bg-primary-500 text-ink-900 px-6 py-3.5 text-[14px] font-bold hover:bg-primary-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : selectedSlot ? `Confirm & Request ${selectedSlot}` : "Send Message"}
              </button>
              {!canSubmit && (
                <p className="text-center text-[11.5px] text-muted-foreground">
                  Name, email, and either a message or a call time are all needed before this can send.
                </p>
              )}
              <p className="text-center text-[11px] text-muted-foreground">
                This sends a request, it doesn't lock the slot yet. Jimmy confirms by email, no double-booking risk.
              </p>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
}
