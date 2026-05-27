import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from ".";

describe("HeroSection", () => {
  it("renders the name as a heading", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { name: /jakob andersson/i })).toBeInTheDocument();
  });

  it("renders the positioning subline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Uppsala, Sweden/i)).toBeInTheDocument();
  });

  it("'View featured work' links to #featured-work", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /view featured work/i });
    expect(link).toHaveAttribute("href", "#featured-work");
  });

  it("renders a 'Download CV' link", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /download cv/i })).toBeInTheDocument();
  });

  it("'More about me' links to #/about", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /more about me/i });
    expect(link).toHaveAttribute("href", "#/about");
  });
});
