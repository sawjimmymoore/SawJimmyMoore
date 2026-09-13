import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "jimmy-currency";

// Static rates against THB, refresh periodically, these are approximate and
// meant for "roughly what this costs me" framing, not for invoicing.
// 1 unit of CURRENCY = this many THB.
export const CURRENCIES = [
  { code: "THB", symbol: "฿", label: "Thai Baht", rateFromTHB: 1 },
  { code: "USD", symbol: "$", label: "US Dollar", rateFromTHB: 1 / 36 },
  { code: "GBP", symbol: "£", label: "British Pound", rateFromTHB: 1 / 46 },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar", rateFromTHB: 1 / 27 },
  { code: "EUR", symbol: "€", label: "Euro", rateFromTHB: 1 / 39 },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", rateFromTHB: 1 / 24 },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar", rateFromTHB: 1 / 26 },
  { code: "AED", symbol: "AED ", label: "UAE Dirham", rateFromTHB: 1 / 9.8 },
  { code: "HKD", symbol: "HK$", label: "Hong Kong Dollar", rateFromTHB: 1 / 4.6 },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", rateFromTHB: 1 / 0.24 },
  { code: "INR", symbol: "₹", label: "Indian Rupee", rateFromTHB: 1 / 0.43 },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

// Region -> currency, covers the regions this site is actually likely to
// see traffic from. Anything not in this map (or not resolvable at all)
// falls back to USD, deliberately: guessing wrong at a currency we don't
// actually support is worse than defaulting to the one everyone reads.
const REGION_TO_CURRENCY: Record<string, CurrencyCode> = {
  TH: "THB",
  GB: "GBP",
  SG: "SGD",
  AU: "AUD",
  CA: "CAD",
  AE: "AED",
  HK: "HKD",
  JP: "JPY",
  IN: "INR",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", IE: "EUR",
  PT: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR",
};

function detectCurrencyFromLocale(): CurrencyCode {
  try {
    const locale = navigator.language || (navigator.languages && navigator.languages[0]);
    if (!locale) return "USD";
    // "en-GB" -> "GB", "th-TH" -> "TH", a bare "en" has no region at all
    const region = locale.split("-")[1]?.toUpperCase();
    if (region && REGION_TO_CURRENCY[region]) return REGION_TO_CURRENCY[region];
  } catch {
    /* Intl/navigator not available, fall through to USD */
  }
  return "USD";
}

function getInitialCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "USD";
  // An explicit prior choice always wins over a fresh guess.
  const stored = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
  if (stored && CURRENCIES.some((c) => c.code === stored)) return stored;
  return detectCurrencyFromLocale();
}

/** Converts a THB amount and formats it with the right symbol, rounded to a
 * clean figure, not fake precision from the conversion. */
export function formatMoney(amountTHB: number, currency: CurrencyCode): string {
  const meta = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const converted = amountTHB * meta.rateFromTHB;
  const rounded = currency === "THB" ? Math.round(converted) : Math.round(converted / 5) * 5;
  return `${meta.symbol}${rounded.toLocaleString()}`;
}

/** Renders a package's price range (or "Scoped per project") in the active
 * currency. Every range carries a trailing "+", the fixed-price tiers this
 * site sells are all "at least this much, more if the scope grows", never a
 * hard ceiling, so the "+" is honest rather than a sales trick. */
export function formatPriceRange(
  minTHB: number | null,
  maxTHB: number | null,
  currency: CurrencyCode,
  isFloor?: boolean
): string {
  if (minTHB == null || maxTHB == null) return "Scoped per project";
  if (isFloor) return `${formatMoney(minTHB, currency)}+`;
  return `${formatMoney(minTHB, currency)}\u2013${formatMoney(maxTHB, currency)}+`;
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (amountTHB: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(getInitialCurrency);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = (c: CurrencyCode) => setCurrencyState(c);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format: (a) => formatMoney(a, currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
