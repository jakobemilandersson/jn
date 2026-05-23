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
    // getAllByRole because each link appears in both desktop and mobile layouts
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Resume" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
  });

  it("marks the Home links as current when activeHref is #/", () => {
    render(<Navbar activeHref="#/" />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    homeLinks.forEach((link) =>
      expect(link.getAttribute("aria-current")).toBe("page")
    );
    screen
      .getAllByRole("link", { name: "Resume" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
    screen
      .getAllByRole("link", { name: "About" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
  });

  it("marks the Resume links as current when activeHref is #/resume", () => {
    render(<Navbar activeHref="#/resume" />);
    screen
      .getAllByRole("link", { name: "Resume" })
      .forEach((link) =>
        expect(link.getAttribute("aria-current")).toBe("page")
      );
    screen
      .getAllByRole("link", { name: "Home" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
    screen
      .getAllByRole("link", { name: "About" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
  });

  it("marks the About links as current when activeHref is #/about", () => {
    render(<Navbar activeHref="#/about" />);
    screen
      .getAllByRole("link", { name: "About" })
      .forEach((link) =>
        expect(link.getAttribute("aria-current")).toBe("page")
      );
    screen
      .getAllByRole("link", { name: "Home" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
    screen
      .getAllByRole("link", { name: "Resume" })
      .forEach((link) => expect(link.getAttribute("aria-current")).toBeNull());
  });

  it("marks Home as current for empty hash", () => {
    render(<Navbar activeHref="" />);
    screen
      .getAllByRole("link", { name: "Home" })
      .forEach((link) =>
        expect(link.getAttribute("aria-current")).toBe("page")
      );
  });

  it("each nav link points to the correct href", () => {
    render(<Navbar activeHref="#/" />);
    screen
      .getAllByRole("link", { name: "Home" })
      .forEach((link) => expect(link.getAttribute("href")).toBe("#/"));
    screen
      .getAllByRole("link", { name: "Resume" })
      .forEach((link) => expect(link.getAttribute("href")).toBe("#/resume"));
    screen
      .getAllByRole("link", { name: "About" })
      .forEach((link) => expect(link.getAttribute("href")).toBe("#/about"));
  });
});
