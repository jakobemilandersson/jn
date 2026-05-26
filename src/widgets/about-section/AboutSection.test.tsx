import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AboutSection } from ".";

describe("AboutSection", () => {
  it("renders without crashing", () => {
    render(<AboutSection />);
  });

  it("renders the name", () => {
    render(<AboutSection />);
    expect(screen.getByText(/Jakob Andersson/i)).toBeInTheDocument();
  });

  it("renders the location", () => {
    render(<AboutSection />);
    expect(screen.getByText(/Uppsala, Sweden/i)).toBeInTheDocument();
  });

  it("renders availability information", () => {
    render(<AboutSection />);
    expect(screen.getByText(/freelance/i)).toBeInTheDocument();
  });
});
