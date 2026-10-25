import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, User, CalendarCheck } from "lucide-react";

// Thumb-reach nav: every destination is one tap, no menu to open.
// The last item is the conversion action, so it is styled as the button.
const ITEMS = [
  { to: "/", label: "Home", Icon: Home, end: true },
  { to: "/projects", label: "Work", Icon: LayoutGrid },
  { to: "/about", label: "About", Icon: User },
];

export default function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-header-border/10 bg-header-bg/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-[1fr_1fr_1fr_1.5fr] items-center gap-1 px-2 py-2">
        {ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-lg py-2 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                isActive ? "text-primary-400" : "text-header-text-muted"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/contact"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-glow px-3 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-900 active:scale-95 transition-transform"
        >
          <CalendarCheck size={16} /> Book call
        </NavLink>
      </div>
    </nav>
  );
}
