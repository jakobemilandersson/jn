import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeaturedWorkSection } from ".";

describe("FeaturedWorkSection", () => {
  it("renders without crashing", () => {
    render(<FeaturedWorkSection />);
  });

  it("renders exactly three project entries", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders the client project title", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/Social Mobile Game/i)).toBeInTheDocument();
  });

  it("renders the Merge Champion project title", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/Merge Champion/i)).toBeInTheDocument();
  });

  it("renders the Storbit project title", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByText(/Storbit/i)).toBeInTheDocument();
  });

  it("renders stack chips for each project", () => {
    render(<FeaturedWorkSection />);
    expect(screen.getAllByText("React Native")).toHaveLength(2);
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("Flame")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Ruby on Rails")).toBeInTheDocument();
  });
});
