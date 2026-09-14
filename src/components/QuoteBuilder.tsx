import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, Check, ArrowRight } from "lucide-react";
import {
  QUOTE_PACKAGES,
  QUOTE_ADDONS,
  QUOTE_PASSCODE,
  WHY_ME,
  PROJECTS,
  type QuotePackage,
} from "@/data/content";
import { useLang } from "@/lib/i18n";
import { useCurrency, formatMoney, type CurrencyCode } from "@/lib/currency";
import CurrencyToggle from "@/components/CurrencyToggle";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";

const SESSION_KEY = "jimmy-quote-unlocked";

/**
 * This used to be its own page (/quote) with its own "Step 3, Send Your
 * Request" form, name/business/contact/timeline/notes fields and all,
 * submitting straight to Formspree on its own. That meant two separate
 * places on the site collecting a visitor's contact details and sending a
 * lead, this calculator and the Contact page, which is exactly the "too
 * many forms" confusion. Now this only handles picking packages and
 * add-ons; the moment someone's ready to send it, it hands the summary to
 * Contact as a pre-filled message and Contact is the only place that ever
 * asks for a name, email, or call time.
 */
export default function QuoteBuilder() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") setUnlocked(true);
  }, []);

  const handleRelock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  return <QuoteContent unlocked={unlocked} onUnlock={() => setUnlocked(true)} onRelock={handleRelock} />;
}

function UnlockBar({
  unlocked,
  onUnlock,
  onRelock,
}: {
  unlocked: boolean;
  onUnlock: () => void;
  onRelock: () => void;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) {
    return (
      <div className="inline-flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-[12.5px] font-medium text-primary-500">
          <Check size={14} /> {t("quote_friend_price_note")}
        </div>
        <button
          onClick={onRelock}
          className="text-[12px] text-muted-foreground hover:text-parchment-100 underline underline-offset-4 transition-colors"
        >
          Back to standard rate
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === QUOTE_PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onUnlock();
      setOpen(false);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      {!open ? (
        <Magnetic strength={0.2}>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-primary-500/25 px-4 py-2 text-[12.5px] font-medium text-parchment-100 hover:border-primary-500 transition-colors"
        >
          <Lock size={13} /> {t("quote_unlock_link")}
        </button>
        </Magnetic>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            value={value}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder={t("quote_unlock_link")}
            className={`rounded-full border bg-bg-card px-4 py-2 text-[13px] text-parchment-100 outline-none transition-colors ${
              error ? "border-red-400" : "border-primary-500/25 focus:border-primary-500"
            }`}
          />
          <button
            type="submit"
            className="rounded-full bg-ink-900 text-on-primary px-4 py-2 text-[12.5px] font-semibold hover:bg-primary-500 transition-colors duration-200"
          >
            {t("quote_unlock_button")}
          </button>
          {error && <p className="w-full text-[12px] text-red-400">That code didn't work, please check and try again.</p>}
        </form>
      )}
    </div>
  );
}

function QuoteContent({
  unlocked,
  onUnlock,
  onRelock,
}: {
  unlocked: boolean;
  onUnlock: () => void;
  onRelock: () => void;
}) {
  const { t } = useLang();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [customRequest, setCustomRequest] = useState(false);

  const setQty = (id: string, qty: number) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, Math.min(10, qty)) }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((cur) => (cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id]));
  };

  const toggleFeatures = (id: string) => {
    setExpandedFeatures((cur) => ({ ...cur, [id]: !cur[id] }));
  };

  const priceFor = (pkg: QuotePackage) => (unlocked ? pkg.priceFriend : pkg.priceMarket);

  const pkgLines = useMemo(
    () =>
      QUOTE_PACKAGES.map((p) => ({ pkg: p, qty: quantities[p.id] || 0 })).filter((l) => l.qty > 0),
    [quantities]
  );

  const addonLines = useMemo(
    () => QUOTE_ADDONS.filter((a) => selectedAddons.includes(a.id)),
    [selectedAddons]
  );

  const total = useMemo(() => {
    const pkgTotal = pkgLines.reduce((s, l) => s + priceFor(l.pkg) * l.qty, 0);
    const addonTotal = addonLines.reduce((s, a) => s + a.price, 0);
    return pkgTotal + addonTotal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkgLines, addonLines, unlocked]);

  const hasSelection = pkgLines.length > 0 || addonLines.length > 0;

  // Builds the same summary a visitor used to type into the old Step 3
  // form by hand, now generated from what they already picked above, and
  // hands it to Contact as a pre-filled message instead of submitting on
  // its own. Contact is where name, email, and (optionally) a call time
  // actually get collected, so there's exactly one place that happens.
  function goToContact() {
    const rateType = unlocked ? "Fen-i colleague rate" : "standard rate";
    const lines = [
      ...pkgLines.map((l) => `- ${l.pkg.title}${l.qty > 1 ? ` x${l.qty}` : ""}: ${formatMoney(priceFor(l.pkg) * l.qty, currency)}`),
      ...addonLines.map((a) => `- ${a.title}: +${formatMoney(a.price, currency)}${a.recurring ? "/mo" : ""}`),
    ];
    const summary = [
      "I'd like a quote for:",
      ...lines,
      "",
      `Estimated total: ${formatMoney(total, currency)} (${rateType}, approx, contract is in THB)`,
    ].join("\n");
    navigate(`/contact?quote=${encodeURIComponent(summary)}`);
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <p className="eyebrow mb-3">{t("quote_hero_eyebrow")}</p>
        <h2 className="font-black text-3xl md:text-4xl tracking-tight text-parchment-100 mb-4">
          Want An Exact Number Instead?
        </h2>
        <p className="text-[14.5px] text-muted-foreground leading-relaxed max-w-xl mx-auto mb-4">{t("quote_hero_subtitle")}</p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[12px] text-muted-foreground">Prices shown in</span>
          <CurrencyToggle />
        </div>
        <div className="flex justify-center">
          <UnlockBar unlocked={unlocked} onUnlock={onUnlock} onRelock={onRelock} />
        </div>
      </div>

      {/* PACKAGES */}
      <section className="mb-12">
        <p className="eyebrow mb-3">Step 1, Choose Your Package</p>
        <h3 className="font-black text-2xl md:text-3xl font-bold text-parchment-100 mb-8">
          What would you like to build?
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUOTE_PACKAGES.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              qty={quantities[pkg.id] || 0}
              setQty={(q) => setQty(pkg.id, q)}
              expanded={!!expandedFeatures[pkg.id]}
              toggleExpanded={() => toggleFeatures(pkg.id)}
              index={i}
              unlocked={unlocked}
              currency={currency}
              priceLabel={unlocked ? t("quote_friend_price_note") : t("quote_public_price_note")}
            />
          ))}
        </div>
      </section>

      {/* CUSTOM REQUEST CHECKBOX */}
      <section className="mb-20 max-w-2xl">
        <label className="flex items-start gap-3 rounded-xl border border-primary-500/15 bg-bg-card p-5 cursor-pointer">
          <input
            type="checkbox"
            checked={customRequest}
            onChange={(e) => setCustomRequest(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary-500"
          />
          <span className="text-[14px] text-parchment-100 font-medium">{t("quote_custom_checkbox")}</span>
        </label>

        <AnimatePresence>
          {customRequest && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-xl border border-primary-500/20 bg-primary-500/5 p-5">
                <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-4">{t("quote_custom_cta")}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-on-primary px-6 py-3 text-[13.5px] font-semibold hover:bg-primary-500 transition-colors duration-200"
                >
                  {t("quote_custom_button")} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ADDONS */}
      <section className="mb-20">
        <p className="eyebrow mb-3">Step 2, Add Extras (Optional)</p>
        <h3 className="font-black text-2xl md:text-3xl font-bold text-parchment-100 mb-8">
          Anything else you need?
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {QUOTE_ADDONS.map((addon) => {
            const selected = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-start gap-3 rounded-xl border p-5 text-left transition-colors ${
                  selected ? "border-primary-500 bg-primary-500/5" : "border-primary-500/15 bg-bg-card hover:border-primary-500/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
                    selected ? "border-primary-500 bg-primary-500" : "border-primary-500/30"
                  }`}
                >
                  {selected && <Check size={12} className="text-on-primary" />}
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-parchment-100">{addon.title}</span>
                    <span className="text-[13px] font-semibold text-primary-500 whitespace-nowrap">
                      from +{formatMoney(addon.price, currency)}
                      {addon.recurring ? "/mo" : ""}
                    </span>
                  </span>
                  <span className="block text-[12.5px] text-muted-foreground mt-1 leading-relaxed">{addon.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SUMMARY */}
      {hasSelection && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 rounded-2xl border border-primary-500/20 bg-bg-card p-7 max-w-xl mx-auto"
        >
          <p className="text-[13px] font-semibold text-parchment-200 uppercase tracking-[0.06em] mb-4">Your Selection</p>
          <div className="space-y-2 mb-4">
            {pkgLines.map((l) => (
              <div key={l.pkg.id} className="flex justify-between text-[14px]">
                <span className="text-parchment-100">
                  {l.pkg.title}
                  {l.qty > 1 ? ` x${l.qty}` : ""}
                </span>
                <span className="font-medium text-parchment-100">{formatMoney(priceFor(l.pkg) * l.qty, currency)}</span>
              </div>
            ))}
            {addonLines.map((a) => (
              <div key={a.id} className="flex justify-between text-[14px]">
                <span className="text-parchment-100">{a.title}</span>
                <span className="font-medium text-parchment-100">
                  +{formatMoney(a.price, currency)}
                  {a.recurring ? "/mo" : ""}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline border-t border-primary-500/15 pt-4">
            <span className="text-[14px] font-semibold text-parchment-100">Estimated Total</span>
            <span className="font-display text-2xl font-bold text-primary-500">{formatMoney(total, currency)}</span>
          </div>
          {!unlocked && (
            <p className="text-[11.5px] text-muted-foreground mt-2">
              {t("quote_public_price_note")}, {t("quote_unlock_link")}
            </p>
          )}
          <Magnetic strength={0.2}>
            <button
              onClick={goToContact}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 text-on-primary px-5 py-2.5 text-[13px] font-semibold hover:bg-primary-500 transition-colors duration-200"
            >
              Continue to Contact <ArrowRight size={14} />
            </button>
          </Magnetic>
        </motion.section>
      )}

      {/* WHY ME */}
      <section>
        <p className="eyebrow mb-3 text-center">Why Work With Me</p>
        <div className="grid md:grid-cols-2 gap-5">
          {WHY_ME.map((w) => (
            <div key={w.title} className="flex gap-3 items-start rounded-xl border border-primary-500/15 bg-bg-card p-5">
              <Check size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-semibold text-parchment-100 mb-1">{w.title}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PackageCard({
  pkg,
  qty,
  setQty,
  expanded,
  toggleExpanded,
  index,
  unlocked,
  currency,
  priceLabel,
}: {
  pkg: QuotePackage;
  qty: number;
  setQty: (q: number) => void;
  expanded: boolean;
  toggleExpanded: () => void;
  index: number;
  unlocked: boolean;
  currency: CurrencyCode;
  priceLabel: string;
}) {
  const accentBorder =
    pkg.accent === "green" ? "border-t-emerald-500" : pkg.accent === "gold" ? "border-t-amber-500" : "border-t-primary-500";

  const price = unlocked ? pkg.priceFriend : pkg.priceMarket;

  return (
    <TiltCard>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={`rounded-2xl border border-t-[3px] ${accentBorder} border-primary-500/15 bg-bg-card p-6 flex flex-col ${
        qty > 0 ? "ring-2 ring-primary-500/40" : ""
      }`}
    >
      <span className="text-[11px] uppercase tracking-widest2 text-primary-500 font-semibold mb-2">{pkg.tag}</span>
      <h3 className="font-display text-lg font-semibold text-parchment-100 mb-1.5">{pkg.title}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{pkg.description}</p>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[12px] text-muted-foreground">From</span>
        <span className="font-display text-2xl font-bold text-parchment-100">{formatMoney(price, currency)}</span>
        {unlocked && <span className="text-[13px] text-muted-foreground line-through">{formatMoney(pkg.priceMarket, currency)}</span>}
      </div>
      <p className={`text-[11.5px] font-medium mb-4 ${unlocked ? "text-primary-500" : "text-muted-foreground"}`}>
        {unlocked ? "✦ " : ""}
        {priceLabel}
      </p>

      {pkg.exampleSlug ? (
        (() => {
          const example = PROJECTS.find((p) => p.slug === pkg.exampleSlug);
          return example ? (
            <Link
              to={`/projects/${example.slug}`}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary-500 hover:text-primary-600 transition-colors mb-5 w-fit"
            >
              See example: {example.title} <ArrowRight size={11} />
            </Link>
          ) : null;
        })()
      ) : (
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary-500 hover:text-primary-600 transition-colors mb-5 w-fit"
        >
          See example projects <ArrowRight size={11} />
        </Link>
      )}

      <div className="flex items-center gap-3 mb-5">
        <span className="text-[12.5px] text-muted-foreground">Qty</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty(qty - 1)}
            className="h-7 w-7 rounded-full border border-primary-500/25 text-parchment-100 hover:border-primary-500 transition-colors"
          >
            −
          </button>
          <span className="w-6 text-center text-[14px] font-medium text-parchment-100">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="h-7 w-7 rounded-full border border-primary-500/25 text-parchment-100 hover:border-primary-500 transition-colors"
          >
            +
          </button>
        </div>
        {qty > 0 && (
          <span className="ml-auto text-[13px] font-semibold text-primary-500">
            {formatMoney(qty * price, currency)}
          </span>
        )}
      </div>

      <button
        onClick={toggleExpanded}
        className="flex items-center justify-between text-[12.5px] font-medium text-parchment-200 hover:text-primary-500 transition-colors py-2 border-t border-primary-500/10"
      >
        What's included
        <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="pt-2 pb-1 space-y-1.5">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2 text-[12.5px] text-muted-foreground leading-relaxed">
                  <span className="text-primary-500 flex-shrink-0">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </TiltCard>
  );
}
