import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from ".";

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
  });

  it("renders the hero section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#hero")).toBeInTheDocument();
  });

  it("renders the featured work section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#featured-work")).toBeInTheDocument();
  });
});
