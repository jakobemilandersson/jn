import { describe, it, expect } from "vitest";
import { extractSkills, resolveSkill } from "@entities/resume/lib/skillIndex";
import type { Skill, StackType, WorkExperience } from "@entities/resume/types";

// -----------------------------------------------------
// Mock factories
// -----------------------------------------------------

const skill = (presentation: string, stackType: StackType = "backend"): Skill => ({
  presentation,
  stackType,
});

const exp = (overrides: Partial<WorkExperience>): WorkExperience => ({
  id: "id",
  role: "Dev",
  company: "Corp",
  description: "",
  start: "2020",
  end: "2021",
  stackType: "backend",
  skills: [],
  ...overrides,
});

// -----------------------------------------------------
// Deterministic mock dataset
// -----------------------------------------------------

const DATA: WorkExperience[] = [
  exp({ id: "a", skills: [skill("react", "frontend"), skill("docker", "fullstack")] }),
  exp({ id: "b", skills: [skill("react", "frontend"), skill("node", "backend")] }),
  exp({ id: "c", skills: [skill("go", "backend")] }),
];

// Expected unique skill set:
// react, docker, node, go

// -----------------------------------------------------
// Tests
// -----------------------------------------------------

describe("skillIndex — extractSkills", () => {
  it("returns a deduplicated list of skills", () => {
    const result = extractSkills(DATA).map((s) => s.presentation);

    expect(result.sort()).toEqual(["react", "docker", "node", "go"].sort());
  });

  it("preserves skill objects exactly (no clones)", () => {
    const result = extractSkills(DATA);

    const originalReact = DATA[0].skills[0];
    const extractedReact = result.find(s => s.presentation === "react");

    // Same object reference
    expect(extractedReact).toStrictEqual(originalReact);
  });
});

describe("skillIndex — resolveSkill()", () => {
  it("resolves an existing skill by its presentation", () => {
    const s = resolveSkill("docker", DATA);
    expect(s).not.toBeNull();
    expect(s!.presentation).toBe("docker");
    expect(s!.stackType).toBe("fullstack");
  });

  it("returns null when skill does not exist", () => {
    const s = resolveSkill("not-a-skill", DATA);
    expect(s).toBeNull();
  });

  it("correctly resolves duplicate skills across experiences", () => {
    const s = resolveSkill("react", DATA);

    // Should resolve to the first occurrence in deterministic extraction order
    const expected = DATA[0].skills.find((sk) => sk.presentation === "react");

    expect(s).toStrictEqual(expected);
  });
});
