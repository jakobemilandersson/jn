import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeaturedWorkSection } from ".";

describe("FeaturedWorkSection", () => {
  it("renders without crashing", () => {
    render(<FeaturedWorkSection />);
  });

  it("renders exactly two project entries", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders the client project title", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/Internal Operations Platform/i)).toBeInTheDocument();
  });

  it("renders the jakob.now project title", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/jakob\.now/i)).toBeInTheDocument();
  });

  it("renders a stack for each project", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/React, TypeScript, Node\.js, PostgreSQL/i)).toBeInTheDocument();
    expect(screen.getByText(/React, TypeScript, Vite, Zustand, TailwindCSS/i)).toBeInTheDocument();
  });
});
