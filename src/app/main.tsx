import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "@pages/HomePage";
import ResumePage from "@pages/ResumePage";
import AboutPage from "@pages/AboutPage";
import { Navbar } from "@widgets/navbar";
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

function App() {
  const hash = useHashRoute();

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

      <Navbar activeHref={hash} />

      <main className="min-h-screen px-4 relative z-10 pt-0 md:pt-16 pb-20 md:pb-0">
        {page}
      </main>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
