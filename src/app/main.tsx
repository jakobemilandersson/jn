import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "@shared/ui";
import HomePage from "@pages/HomePage";
import ResumePage from "@pages/ResumePage";
import AboutPage from "@pages/AboutPage";
import { SpaceBackground } from "./SpaceBackground";
import "./styles.css";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

const NAV_LINKS = [
  { label: "Home", href: "#/" },
  { label: "Resume", href: "#/resume" },
  { label: "About", href: "#/about" },
];

function App() {
  const hash = useHashRoute();
  const scrolled = useScrolled();

  const isHome = hash === "" || hash === "#/" || hash === "#";
  const isResume = hash === "#/resume";
  const isAbout = hash === "#/about";

  let page;
  if (isResume) {
    page = <ResumePage />;
  } else if (isAbout) {
    page = <AboutPage />;
  } else {
    page = <HomePage />;
  }

  return (
    <React.StrictMode>
      <SpaceBackground />

      <nav
        className={`fixed top-0 left-0 right-0 z-20 flex gap-6 px-6 pt-6 pb-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 pt-4 pb-3"
            : ""
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => {
          const isActive =
            href === "#/"
              ? isHome
              : href === "#/resume"
              ? isResume
              : isAbout;
          return (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <main className="min-h-screen px-4 relative z-10 pt-16">
        {page}
        <Footer />
      </main>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
