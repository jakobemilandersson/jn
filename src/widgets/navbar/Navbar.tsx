import React, { useState } from "react";
import { useScrolled } from "./useScrolled";
import { SpaceSettingsPanel } from "@app/SpaceSettingsPanel";

function IconHome({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
  );
}

function IconFileText({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconUser({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconHamburger({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/", Icon: IconHome },
  { label: "Resume", href: "/resume", Icon: IconFileText },
  { label: "About", href: "/about", Icon: IconUser },
];

interface NavbarProps {
  activeHref: string;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function Navbar({ activeHref }: NavbarProps) {
  const scrolled = useScrolled();
  const [settingsOpen, setSettingsOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/") {
      return activeHref === "/" || activeHref === "";
    }
    return activeHref === href;
  }

  return (
    <>
      <nav aria-label="Main">
        {/* Desktop sticky header */}
        <div
          className={`hidden md:flex fixed top-0 left-0 right-0 z-20 items-center px-6 pt-6 pb-4 transition-all duration-300 ${
            scrolled
              ? "bg-black/60 backdrop-blur-md border-b border-white/10 pt-4 pb-3"
              : ""
          }`}
        >
          {/* Nav links — left-aligned */}
          <div className="flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={scrollToTop}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    active ? "text-white" : "text-white/40 hover:text-white/70"
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

          {/* Hamburger — right side */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Open background settings"
            aria-expanded={settingsOpen}
            className="p-2 rounded-md text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
          >
            <IconHamburger size={18} />
          </button>
        </div>

        {/* Mobile bottom tab bar */}
        <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-md border-t border-white/10">
          {NAV_LINKS.map(({ label, href, Icon }) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={href}
                onClick={scrollToTop}
                aria-current={active ? "page" : undefined}
                className="relative flex flex-col items-center justify-center flex-1 min-h-[56px] py-2 gap-1 transition-colors"
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 inset-y-1.5 rounded-full bg-white/10"
                  />
                )}
                <span
                  className={`relative transition-colors ${
                    active ? "text-white" : "text-white/40"
                  }`}
                >
                  <Icon size={20} />
                </span>
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

          {/* Hamburger tab — rightmost slot on mobile */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Open background settings"
            aria-expanded={settingsOpen}
            className="relative flex flex-col items-center justify-center flex-1 min-h-[56px] py-2 gap-1 transition-colors text-white/40 hover:text-white/70"
          >
            <IconHamburger size={20} />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>

      <SpaceSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
