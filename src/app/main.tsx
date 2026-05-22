import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "@shared/ui";
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

const NAV_LINKS = [
  { label: "Resume", href: "#/" },
  { label: "About", href: "#/about" },
];

function App() {
  const hash = useHashRoute();
  const isAbout = hash === "#/about";

  return (
    <React.StrictMode>
      <SpaceBackground />

      <nav className="relative z-10 flex gap-6 px-6 pt-6">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${
              (href === "#/about" ? isAbout : !isAbout)
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      <main className="min-h-screen px-4 relative z-0">
        {isAbout ? <AboutPage /> : <ResumePage />}
        <Footer />
      </main>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
