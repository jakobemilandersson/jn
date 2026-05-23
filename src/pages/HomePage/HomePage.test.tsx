import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./index";

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
  });

  it("renders a hero section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#hero")).toBeInTheDocument();
  });

  it("renders a featured work section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#featured-work")).toBeInTheDocument();
  });

  it("renders an about section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#about")).toBeInTheDocument();
  });

  it("renders a contact section", () => {
    render(<HomePage />);
    expect(document.querySelector("section#contact")).toBeInTheDocument();
  });
});
