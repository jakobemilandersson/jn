import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WipBanner } from "./WipBanner";

describe("WipBanner", () => {
  it("renders without crashing", () => {
    render(<WipBanner />);
  });

  it("displays the under-development disclaimer message", () => {
    render(<WipBanner />);
    expect(
      screen.getByText(/filtering.*work experience data are under active development/i)
    ).toBeInTheDocument();
  });

  it("has an accessible status role", () => {
    render(<WipBanner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
