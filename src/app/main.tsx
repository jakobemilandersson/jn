import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import ResumePage from "@pages/ResumePage";
import AboutPage from "@pages/AboutPage";
import { Navbar } from "@widgets/navbar";
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
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
