import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from ".";

describe("HeroSection", () => {
  it("renders the resume about card heading", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { name: /build simply\. think deeply\. keep learning\./i })).toBeInTheDocument();
    expect(screen.getByText(/Jakob Andersson\s*\/\s*Resume/i)).toBeInTheDocument();
  });

  it("renders the about copy", () => {
    render(<HeroSection />);
    expect(screen.getByText(/turning ideas into useful products/i)).toBeInTheDocument();
    expect(screen.getByText(/Outside work, I build mobile apps/i)).toBeInTheDocument();
  });

  it("'View featured work' links to #featured-work", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /view featured work/i });
    expect(link).toHaveAttribute("href", "#featured-work");
  });

  it("'Download CV' links to the hosted PDF with download attribute", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /download cv/i });
    expect(link).toHaveAttribute("href", "/jakob-andersson-resume.pdf");
    expect(link).toHaveAttribute("download", "jakob-andersson-resume.pdf");
  });

  it("'More about me' links to #/about", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /more about me/i });
    expect(link).toHaveAttribute("href", "#/about");
  });
});
