import { describe, it, expect } from "vitest";
import { applyFilters } from "@features/filters/lib/applyFilters";
import type { WorkExperience, Skill } from "@entities/resume/types";

// -----------------------------------------------------
// Minimal deterministic factories
// -----------------------------------------------------

const makeSkill = (presentation: string, stackType: "fullstack" | "backend" | "frontend" = "fullstack"): Skill => ({
  presentation,
  stackType,
});

const makeExp = (overrides: Partial<WorkExperience>): WorkExperience => ({
  id: "id",
  role: "Dev",
  company: "Corp",
  description: "",
  start: "2020",
  end: "2021",
  stackType: "fullstack",
  skills: [],
  ...overrides,
});

// -----------------------------------------------------
// Test dataset
// -----------------------------------------------------

const DATA: WorkExperience[] = [
  makeExp({
    id: "a",
    stackType: "fullstack",
    skills: [makeSkill("react"), makeSkill("ts")],
  }),

  makeExp({
    id: "b",
    stackType: "backend",
    skills: [makeSkill("ruby")],
  }),

  makeExp({
    id: "c",
    stackType: "frontend",
    skills: [makeSkill("react")],
  }),

  makeExp({
    id: "d",
    stackType: "backend",
    skills: [makeSkill("go"), makeSkill("docker")],
  }),
];

// -----------------------------------------------------
// Loose mode (strict = false)
// -----------------------------------------------------
describe("applyFilters — loose mode (ANY skill)", () => {
  it("returns all experiences when no filters are applied", () => {
    const res = applyFilters(DATA, null, [], false);
    expect(res.map(r => r.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("filters by stackType only", () => {
    const res = applyFilters(DATA, "backend", [], false);
    expect(res.map(r => r.id)).toEqual(["b", "d"]);
  });

  it("returns experiences matching ANY selected skill", () => {
    const res = applyFilters(DATA, null, ["react"], false);
    expect(res.map(r => r.id)).toEqual(["a", "c"]);
  });

  it("filters by BOTH stackType and ANY skill", () => {
    const res = applyFilters(DATA, "backend", ["docker"], false);
    expect(res.map(r => r.id)).toEqual(["d"]);
  });

  it("returns empty list when no experience matches ANY skill", () => {
    const res = applyFilters(DATA, null, ["unknown"], false);
    expect(res.length).toBe(0);
  });
});

// -----------------------------------------------------
// Strict mode (strict = true)
// -----------------------------------------------------
describe("applyFilters — strict mode (ALL skills)", () => {
  it("requires ALL selected skills to be present", () => {
    const res = applyFilters(DATA, null, ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("returns empty when at least one required skill is missing", () => {
    const res = applyFilters(DATA, null, ["react", "ts", "go"], true);
    expect(res.length).toBe(0);
  });

  it("filters by BOTH stackType and ALL skills", () => {
    const res = applyFilters(DATA, "fullstack", ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("does not match experiences missing any required skill", () => {
    const res = applyFilters(DATA, null, ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]); // c has only react
  });

  it("treats one-skill strict mode the same as loose mode for one skill", () => {
    const res = applyFilters(DATA, null, ["ruby"], true);
    expect(res.map(r => r.id)).toEqual(["b"]);
  });
});

// -----------------------------------------------------
// Ordering by number of matching skills
// -----------------------------------------------------
describe("applyFilters — ordering by matching skill count", () => {
  it("orders results by number of matching skills (descending)", () => {
    const res = applyFilters(DATA, null, ["react", "ts"], false)
    expect(res.map(r => r.id)).toEqual(["a", "c"])
    // a matches 2 skills, c matches 1
  })

  it("keeps stable order when match counts are equal", () => {
    const res = applyFilters(DATA, null, ["react"], false)
    expect(res.map(r => r.id)).toEqual(["a", "c"])
    // both match 1 skill → preserve original order
  })

  it("orders backend results correctly when multiple matches exist", () => {
    const res = applyFilters(DATA, "backend", ["go", "docker"], false)
    expect(res.map(r => r.id)).toEqual(["d"])
  })
})
