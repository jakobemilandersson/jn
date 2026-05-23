import { describe, it, expect } from "vitest";
import { extractSkills, resolveSkill } from "@entities/resume/lib/skillIndex";
import type { Resume, WorkExperience, YearMonth, StackType, Skill } from "@entities/resume/types";

// -----------------------------------------------------
// Mock factories (same pattern as skillIndex.spec.ts)
// -----------------------------------------------------

const skill = (presentation: string, stackType: StackType = "backend"): Skill => ({
  presentation,
  stackType,
});

const exp = (overrides: Partial<WorkExperience>): WorkExperience => ({
  id: "id",
  kind: "work",
  role: "Dev",
  company: "Corp",
  description: null,
  start: "2020-01" as YearMonth,
  end: "2021-01" as YearMonth,
  stackType: "backend",
  skills: [],
  ...overrides,
});

const mockResume = (): Resume => ({
  profile: {
    name: "Jane Doe",
    title: "Fullstack Engineer",
    bio: "Builds things.",
    contact: {
      email: "jane@example.com",
      linkedin: "https://linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
    },
  },
  experiences: [
    exp({ id: "a", skills: [skill("react", "frontend"), skill("docker", "fullstack")] }),
    exp({ id: "b", skills: [skill("react", "frontend"), skill("node", "backend")] }),
  ],
});

// -----------------------------------------------------
// Resume.profile shape
// -----------------------------------------------------

describe("Resume — profile shape", () => {
  it("has a non-empty name", () => {
    const { profile } = mockResume();
    expect(typeof profile.name).toBe("string");
    expect(profile.name.length).toBeGreaterThan(0);
  });

  it("has a non-empty title", () => {
    const { profile } = mockResume();
    expect(typeof profile.title).toBe("string");
    expect(profile.title.length).toBeGreaterThan(0);
  });

  it("has a non-empty bio", () => {
    const { profile } = mockResume();
    expect(typeof profile.bio).toBe("string");
    expect(profile.bio.length).toBeGreaterThan(0);
  });

  it("has non-empty contact fields", () => {
    const { profile } = mockResume();
    expect(profile.contact.email.length).toBeGreaterThan(0);
    expect(profile.contact.linkedin.length).toBeGreaterThan(0);
    expect(profile.contact.github.length).toBeGreaterThan(0);
  });
});

// -----------------------------------------------------
// Resume.experiences — regression guard for array→object migration
// -----------------------------------------------------

describe("Resume — experiences", () => {
  it("is a non-empty array", () => {
    const { experiences } = mockResume();
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("each entry has required WorkExperience fields", () => {
    const { experiences } = mockResume();
    for (const entry of experiences) {
      expect(typeof entry.id).toBe("string");
      expect(typeof entry.role).toBe("string");
      expect(typeof entry.company).toBe("string");
      expect(Array.isArray(entry.skills)).toBe(true);
    }
  });
});

// -----------------------------------------------------
// skillIndex regression — must still work with experiences array
// -----------------------------------------------------

describe("skillIndex — regression against Resume.experiences", () => {
  it("extractSkills returns deduplicated skills from experiences", () => {
    const { experiences } = mockResume();
    const result = extractSkills(experiences).map((s) => s.presentation);
    expect(result.sort()).toEqual(["react", "docker", "node"].sort());
  });

  it("resolveSkill resolves a known skill from experiences", () => {
    const { experiences } = mockResume();
    const result = resolveSkill("docker", experiences);
    expect(result).not.toBeNull();
    expect(result!.stackType).toBe("fullstack");
  });

  it("resolveSkill returns null for an unknown skill", () => {
    const { experiences } = mockResume();
    const result = resolveSkill("not-a-skill", experiences);
    expect(result).toBeNull();
  });
});
