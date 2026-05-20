import { describe, it, expect } from "vitest";
import { formatDateLabel } from "@features/filters";

describe("formatDateLabel", () => {
  it("returns null when both from and to are null", () => {
    expect(formatDateLabel(null, null)).toBeNull();
  });

  it("formats a full range correctly", () => {
    expect(formatDateLabel("2022-03", "2024-06")).toBe("Mar 2022 \u2013 Jun 2024");
  });

  it("formats from-only as 'From ...'", () => {
    expect(formatDateLabel("2022-03", null)).toBe("From Mar 2022");
  });

  it("formats to-only as 'Until ...'", () => {
    expect(formatDateLabel(null, "2024-06")).toBe("Until Jun 2024");
  });

  it("formats January correctly (month index boundary)", () => {
    expect(formatDateLabel("2023-01", null)).toBe("From Jan 2023");
  });

  it("formats December correctly (month index boundary)", () => {
    expect(formatDateLabel(null, "2023-12")).toBe("Until Dec 2023");
  });
});
