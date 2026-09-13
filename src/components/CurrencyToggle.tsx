import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES, useCurrency } from "@/lib/currency";

/**
 * Replaces the old Thai-only language toggle in the header. Targeting
 * foreigners means the number that matters most on a pricing page is the
 * one in a currency they actually think in, not a THB figure they have to
 * mentally convert every time.
 */
export default function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-full border border-primary-500/20 px-3 py-1.5 text-[12.5px] font-semibold text-parchment-100 hover:border-primary-500/50 transition-colors ${className}`}
      >
        {currency} <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-primary-500/15 bg-ink-700 shadow-xl py-1.5 z-50">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3.5 py-2 text-[12.5px] hover:bg-primary-500/10 transition-colors ${
                c.code === currency ? "text-primary-500 font-semibold" : "text-parchment-200"
              }`}
            >
              <span>{c.code}</span>
              <span className="text-muted-foreground">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
