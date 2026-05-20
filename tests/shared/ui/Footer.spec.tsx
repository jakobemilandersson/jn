import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@shared/ui";

describe("Footer", () => {
  it("renders a LinkedIn link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/jakob-emil-andersson");
  });

  it("renders a GitHub link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "https://github.com/jakobemilandersson");
  });

  it("opens external links in a new tab", () => {
    render(<Footer />);
    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });
});
