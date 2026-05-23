import React from "react";
import { useScrolled } from "./useScrolled";

const NAV_LINKS = [
  { label: "Home", href: "#/" },
  { label: "Resume", href: "#/resume" },
  { label: "About", href: "#/about" },
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
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-20 flex items-center gap-1 px-6 pt-6 pb-4 transition-all duration-300 ${
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
    </nav>
  );
}
