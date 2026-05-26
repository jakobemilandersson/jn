import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@pages/HomePage";
import ResumePage from "@pages/ResumePage";
import AboutPage from "@pages/AboutPage";
import { Navbar } from "@widgets/navbar";
import { SpaceBackground } from "./SpaceBackground";
import "./styles.css";

const basename = import.meta.env.BASE_URL ?? "/";

function AppShell() {
  const { pathname } = useLocation();

  return (
    <>
      <SpaceBackground />
      <Navbar activeHref={pathname} />
      <main className="min-h-screen px-4 relative z-10 pt-0 md:pt-16 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <AppShell />
      </BrowserRouter>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
