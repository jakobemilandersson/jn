import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Navbar } from ".";

beforeEach(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

describe("Navbar", () => {
  it("renders a <nav> with aria-label Main", () => {
    render(<Navbar activeHref="#/" />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeDefined();
  });

  it("renders all three nav links", () => {
    render(<Navbar activeHref="#/" />);
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

  it("clicking a nav link calls window.scrollTo", () => {
    render(<Navbar activeHref="#/" />);
    fireEvent.click(screen.getAllByRole("link", { name: "Home" })[0]);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("clicking a hamburger button opens the settings panel", () => {
    render(<Navbar activeHref="#/" />);
    const buttons = screen.getAllByRole("button", { name: "Open background settings" });
    fireEvent.click(buttons[0]);
    expect(screen.getByRole("dialog", { name: "Space settings" })).toBeDefined();
  });

  it("closing the settings panel hides it", () => {
    render(<Navbar activeHref="#/" />);
    const openBtn = screen.getAllByRole("button", { name: "Open background settings" })[0];
    fireEvent.click(openBtn);
    fireEvent.click(screen.getByRole("button", { name: "Close settings" }));
    // aria-hidden="true" removes the element from the accessible name computation,
    // so { name } matching fails. Query by role + hidden only, then assert attributes.
    const dialogs = screen.getAllByRole("dialog", { hidden: true });
    const dialog = dialogs.find(
      (el) => el.getAttribute("aria-label") === "Space settings"
    );
    expect(dialog).toBeDefined();
    expect(dialog!.getAttribute("aria-hidden")).toBe("true");
    expect(dialog!.className).toContain("translate-x-full");
  });
});
