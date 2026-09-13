import { NavLink } from "react-router-dom";
import { Home, Layers, Briefcase, Tag, MessageCircle } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Layers },
  { to: "/projects", label: "Work", icon: Briefcase },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/contact", label: "Contact", icon: MessageCircle },
];

/**
 * Fixed bottom tab bar, mobile only. Replaces "the top nav, but as a
 * hamburger dropdown" with the pattern people actually use every day on a
 * phone, one tap to any main destination, always visible, thumb-reachable.
 * The desktop <Header> nav stays untouched; this is purely additive on
 * small screens (hidden md:up).
 */
export default function MobileTabBar() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 flex md:hidden items-stretch justify-between border-t border-primary-500/15 bg-ink-900/95 backdrop-blur-md px-1 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
      aria-label="Primary"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-colors ${
              isActive ? "text-primary-400" : "text-parchment-400"
            }`
          }
        >
          <Icon size={19} strokeWidth={2.2} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
