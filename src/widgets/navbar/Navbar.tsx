import React from "react";
import { Home, FileText, User } from "lucide-react";
import { useScrolled } from "./useScrolled";

const NAV_LINKS = [
  { label: "Home", href: "#/", Icon: Home },
  { label: "Resume", href: "#/resume", Icon: FileText },
  { label: "About", href: "#/about", Icon: User },
];

interface NavbarProps {
  activeHref: string;
}

export function Navbar({ activeHref }: NavbarProps) {
  const scrolled = useScrolled();

  function isActive(href: string): boolean {
    if (href === "#/") {
      return activeHref === "" || activeHref === "#/" || activeHref === "#";
    }
    return activeHref === href;
  }

  return (
    <nav aria-label="Main">
      {/* Desktop sticky header — hidden on mobile */}
      <div
        className={`hidden md:flex fixed top-0 left-0 right-0 z-20 items-center gap-1 px-6 pt-6 pb-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 pt-4 pb-3"
            : ""
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/10"
                />
              )}
              <span className="relative">{label}</span>
            </a>
          );
        })}
      </div>

      {/* Mobile bottom tab bar — hidden on desktop */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-md border-t border-white/10">
        {NAV_LINKS.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-col items-center justify-center flex-1 min-h-[56px] py-2 gap-1 transition-colors"
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 inset-y-1.5 rounded-full bg-white/10"
                />
              )}
              <Icon
                size={20}
                aria-hidden="true"
                className={`relative transition-colors ${
                  active ? "text-white" : "text-white/40"
                }`}
              />
              <span
                className={`relative text-xs font-medium transition-colors ${
                  active ? "text-white" : "text-white/40"
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
