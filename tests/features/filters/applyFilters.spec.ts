import { describe, it, expect } from "vitest";
import { applyFilters } from "../../../src/features/filters/lib/applyFilters";
import { RESUME } from "../../../src/entities/resume";

describe("applyFilters", () => {
  it("returns all experiences when no filters are applied", () => {
    const result = applyFilters(null, []);
    expect(result.length).toBe(RESUME.length);
  });

  it("filters by stack type only", () => {
    const result = applyFilters("frontend", []);
    expect(result.every(r => r.stackType === "frontend")).toBe(true);
  });

  it("filters by skills only", () => {
    const result = applyFilters(null, ["react"]);
    expect(result.length).toBeGreaterThan(0);

    for (const r of result) {
      const presentations = r.skills.map(s => s.presentation);
      expect(presentations).toContain("react");
    }
  });

  it("filters by both stack type and skills", () => {
    const result = applyFilters("backend", ["mysql"]);
    expect(result.every(r => r.stackType === "backend")).toBe(true);

    for (const r of result) {
      const presentations = r.skills.map(s => s.presentation);
      expect(presentations).toContain("mysql");
    }
  });

  it("returns empty list when skill requirements are not met", () => {
    const result = applyFilters(null, ["skill-that-does-not-exist"]);
    expect(result.length).toBe(0);
  });
});
