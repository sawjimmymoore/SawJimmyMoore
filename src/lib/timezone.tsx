import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "jimmy-timezone";

// A curated list, not the full IANA database, these are the zones a
// foreign client is actually likely to be in. Offsets are STANDARD time,
// ignoring DST, good enough for "roughly what time that is for you", not
// for exact calendar math (BookingCalendar itself still runs in Bangkok
// time internally, this only relabels the working-hours line and the
// timezone picker for now).
export const TIMEZONES = [
  { id: "Asia/Bangkok", label: "Bangkok (ICT)", offset: 7 },
  { id: "Asia/Singapore", label: "Singapore (SGT)", offset: 8 },
  { id: "Europe/London", label: "London (GMT)", offset: 0 },
  { id: "Europe/Berlin", label: "Central Europe (CET)", offset: 1 },
  { id: "America/New_York", label: "New York (ET)", offset: -5 },
  { id: "America/Los_Angeles", label: "Los Angeles (PT)", offset: -8 },
  { id: "Australia/Sydney", label: "Sydney (AET)", offset: 11 },
] as const;

export type TimezoneId = (typeof TIMEZONES)[number]["id"];

function getInitialTimezone(): TimezoneId {
  if (typeof window === "undefined") return "Asia/Bangkok";
  const stored = window.localStorage.getItem(STORAGE_KEY) as TimezoneId | null;
  if (stored && TIMEZONES.some((t) => t.id === stored)) return stored;
  try {
    const guess = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONES.some((t) => t.id === guess)) return guess as TimezoneId;
  } catch {
    /* fall through to default */
  }
  return "Asia/Bangkok";
}

/** Shifts a Bangkok "HH:MM" 24h time string to the target zone, wrapping
 * the day. Approximate (standard-time offsets only, see note above). */
export function convertFromBangkok(hhmm: string, targetTz: TimezoneId): string {
  const [h, m] = hhmm.split(":").map(Number);
  const target = TIMEZONES.find((t) => t.id === targetTz) || TIMEZONES[0];
  const bangkok = TIMEZONES[0];
  let hour = h + (target.offset - bangkok.offset);
  hour = ((hour % 24) + 24) % 24;
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

interface TimezoneContextValue {
  timezone: TimezoneId;
  setTimezone: (tz: TimezoneId) => void;
}

const TimezoneContext = createContext<TimezoneContextValue | null>(null);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezoneState] = useState<TimezoneId>(getInitialTimezone);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, timezone);
  }, [timezone]);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone: setTimezoneState }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const ctx = useContext(TimezoneContext);
  if (!ctx) throw new Error("useTimezone must be used within TimezoneProvider");
  return ctx;
}
