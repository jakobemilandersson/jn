import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "@shared/ui";
import ResumePage from "@pages/ResumePage";
import AboutPage from "@pages/AboutPage";
import { SpaceBackground } from "./SpaceBackground";
import { Nav } from "./Nav";
import "./styles.css";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <SpaceBackground />
        <Nav />
        <main className="min-h-screen px-4 relative z-0">
          <Routes>
            <Route path="/" element={<ResumePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
