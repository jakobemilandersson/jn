import { describe, it, expect } from "vitest";
import { applyFilters } from "../../../src/features/filters/lib/applyFilters";
import type { Skill, WorkExperience } from "../../../src/entities/resume/types";

// -----------------------------------------------------
// Helpers: deterministic mock experiences
// -----------------------------------------------------

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

interface RawSkill { presentation: string, stackType: string }

const skills = (rawSkills: RawSkill[]): Skill[] =>
  rawSkills.map((skill) => skill as Skill);

// Dataset:
// a: fullstack, [react, ts]
// b: backend,   [ruby]
// c: frontend,  [react]
// d: backend,   [go, docker]
const DATA: WorkExperience[] = [
  makeExp({ id: "a", stackType: "fullstack", skills: skills([{ presentation: "react", stackType: "frontend" }, { presentation: "ts", stackType: "frontend" }]) }),
  makeExp({ id: "b", stackType: "backend", skills: skills([{ presentation: "ruby", stackType: "backend" }]) }),
  makeExp({ id: "c", stackType: "frontend", skills: skills([{ presentation: "react", stackType: "frontend" }]) }),
  makeExp({ id: "d", stackType: "backend", skills: skills([{ presentation: "go", stackType: "backend" }, { presentation: "docker", stackType: "fullstack" }]) }),
];

// Monkey-patch applyFilters' internal data usage (if it reads real RESUME),
// OR, if your implementation takes data as a module-level const, adjust accordingly.
// If applyFilters uses a module-level RESUME import, you should refactor it 
// to accept data explicitly or to allow injection for testing. 
// For now we assume applyFilters only uses the arguments passed to it.


// -----------------------------------------------------
// TESTS — Strict = false (ANY/loose mode)
// -----------------------------------------------------
describe("applyFilters — loose mode (strict = false)", () => {
  it("returns all experiences when no filters applied", () => {
    const res = applyFilters(DATA, null, [], false);
    expect(res.map(r => r.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("filters by stackType only", () => {
    const res = applyFilters(DATA, "backend", [], false);
    expect(res.map(r => r.id)).toEqual(["b", "d"]);
  });

  it("filters by ANY skill match", () => {
    const res = applyFilters(DATA, null, ["react"], false);
    // a and c both contain react
    expect(res.map(r => r.id)).toEqual(["a", "c"]);
  });

  it("filters by BOTH stackType AND ANY skill", () => {
    const res = applyFilters(DATA, "backend", ["docker"], false);
    expect(res.map(r => r.id)).toEqual(["d"]);
  });

  it("returns empty list when no experience has ANY of the skills", () => {
    const res = applyFilters(DATA, null, ["unknown-skill"], false);
    expect(res.length).toBe(0);
  });
});

// -----------------------------------------------------
// TESTS — Strict = true (ALL / AND mode)
// -----------------------------------------------------
describe("applyFilters — strict mode (strict = true)", () => {
  it("requires ALL selected skills to be present", () => {
    const res = applyFilters(DATA, null, ["react", "ts"], true);
    // Only "a" has both
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("returns empty when at least one required skill is missing", () => {
    const res = applyFilters(DATA, null, ["react", "ts", "go"], true);
    expect(res.length).toBe(0);
  });

  it("filters by BOTH stackType AND ALL skills", () => {
    const res = applyFilters(DATA, "fullstack", ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]);
  });

  it("strict mode does NOT match if only some skills match", () => {
    // c has react but not ts → should not be included
    const res = applyFilters(DATA, null, ["react", "ts"], true);
    expect(res.map(r => r.id)).toEqual(["a"]); // not "c"
  });

  it("strict mode with a single skill behaves like loose mode for one skill", () => {
    const res = applyFilters(DATA, null, ["ruby"], true);
    expect(res.map(r => r.id)).toEqual(["b"]);
  });
});
