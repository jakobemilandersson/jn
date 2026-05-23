import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from ".";

describe("Navbar", () => {
  it("renders a <nav> with aria-label Main", () => {
    render(<Navbar activeHref="#/" />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeDefined();
  });

  it("renders all three nav links", () => {
    render(<Navbar activeHref="#/" />);
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Resume" })).toBeDefined();
    expect(screen.getByRole("link", { name: "About" })).toBeDefined();
  });

  it("marks the Home link as current when activeHref is #/", () => {
    render(<Navbar activeHref="#/" />);
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Resume" }).getAttribute("aria-current")
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("aria-current")
    ).toBeNull();
  });

  it("marks the Resume link as current when activeHref is #/resume", () => {
    render(<Navbar activeHref="#/resume" />);
    expect(
      screen.getByRole("link", { name: "Resume" }).getAttribute("aria-current")
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("aria-current")
    ).toBeNull();
  });

  it("marks the About link as current when activeHref is #/about", () => {
    render(<Navbar activeHref="#/about" />);
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("aria-current")
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Resume" }).getAttribute("aria-current")
    ).toBeNull();
  });

  it("marks Home as current for empty hash", () => {
    render(<Navbar activeHref="" />);
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")
    ).toBe("page");
  });

  it("each nav link points to the correct href", () => {
    render(<Navbar activeHref="#/" />);
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("href")
    ).toBe("#/");
    expect(
      screen.getByRole("link", { name: "Resume" }).getAttribute("href")
    ).toBe("#/resume");
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("href")
    ).toBe("#/about");
  });
});
