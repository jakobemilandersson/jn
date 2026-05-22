import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Resume", to: "/" },
  { label: "About", to: "/about" },
];

export function Nav() {
  return (
    <nav aria-label="Main" className="relative z-10 flex gap-6 px-6 pt-6">
      {NAV_LINKS.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
