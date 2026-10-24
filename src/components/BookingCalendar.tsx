import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { WORKING_HOURS } from "@/data/content";

const SLOT_TIMES = ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day; // move to Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

interface BookingCalendarProps {
  onSelect: (label: string) => void;
  selected: string | null;
}

export default function BookingCalendar({ onSelect, selected }: BookingCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const weekStart = useMemo(() => {
    const base = startOfWeek(new Date());
    base.setDate(base.getDate() + weekOffset * 7);
    return base;
  }, [weekOffset]);

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  const isPast = (d: Date) => d < today;
  const isBookable = (d: Date) => !isWeekend(d) && !isPast(d);

  // Default to the first bookable day in view, not always Monday — Monday
  // may already be in the past if today is mid-week, and a past day was
  // previously still selectable as the active tab, letting someone request
  // a time slot that had already passed.
  const firstBookableIndex = days.findIndex(isBookable);
  const [activeDay, setActiveDay] = useState(firstBookableIndex >= 0 ? firstBookableIndex : 0);

  // Re-anchor to a bookable day whenever the visible week changes (e.g. Next
  // Week always starts on a fresh Monday, which is always bookable).
  const resolvedActiveDay = days[activeDay] && isBookable(days[activeDay]) ? activeDay : Math.max(0, firstBookableIndex);
  const activeDate = days[resolvedActiveDay];

  function goToWeek(next: number) {
    setWeekOffset(next);
    const base = startOfWeek(new Date());
    base.setDate(base.getDate() + next * 7);
    const nextDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      return d;
    });
    const idx = nextDays.findIndex(isBookable);
    setActiveDay(idx >= 0 ? idx : 0);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => goToWeek(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-500/20 text-parchment-300 disabled:opacity-30 hover:border-primary-500 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <p className="text-[12.5px] font-medium text-parchment-200">
          {weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} to{" "}
          {days[6].toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </p>
        <button
          type="button"
          onClick={() => goToWeek(weekOffset + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-500/20 text-parchment-300 hover:border-primary-500 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {days.map((d, i) => {
          const disabled = !isBookable(d);
          const active = i === resolvedActiveDay;
          return (
            <button
              type="button"
              key={d.toISOString()}
              disabled={disabled}
              onClick={() => setActiveDay(i)}
              className={`rounded-lg py-2 text-center transition-colors ${
                disabled
                  ? "text-parchment-700 cursor-not-allowed"
                  : active
                  ? "bg-primary-500 text-ink-900"
                  : "text-parchment-200 hover:bg-primary-500/10"
              }`}
            >
              <p className="text-[9.5px] uppercase tracking-wide">{d.toLocaleDateString(undefined, { weekday: "short" })}</p>
              <p className="text-[13px] font-semibold mt-0.5">{d.getDate()}</p>
            </button>
          );
        })}
      </div>

      {!activeDate || !isBookable(activeDate) ? (
        <p className="text-[12.5px] text-parchment-500 text-center py-4">
          No bookable days in view. Try the next week, or send a direct message instead.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {SLOT_TIMES.map((time) => {
            const label = `${activeDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, ${time} (${WORKING_HOURS.timezone})`;
            const isSelected = selected === label;
            return (
              <button
                type="button"
                key={time}
                onClick={() => onSelect(label)}
                className={`flex items-center justify-center gap-1 rounded-lg border py-2 text-[12.5px] font-medium transition-colors ${
                  isSelected
                    ? "border-primary-500 bg-primary-500/10 text-primary-400"
                    : "border-primary-500/15 text-parchment-200 hover:border-primary-500/50"
                }`}
              >
                {isSelected && <Check size={12} />}
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
