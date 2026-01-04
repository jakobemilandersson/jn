import React from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "@shared/ui";
import ResumePage from "@pages/ResumePage";
import { SpaceBackground } from "./SpaceBackground";
import "./styles.css";

function App() {
  return (
    <React.StrictMode>
      {/* App-shell decoration */}
      <SpaceBackground />

      {/* Layout */}
      <main className="min-h-screen px-4 relative z-0">
        <ResumePage />
        <Footer />
      </main>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
