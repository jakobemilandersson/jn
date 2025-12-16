import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import type { Skill, StackType } from "../../../src/entities/resume/types";

// Mock BEFORE import() calls
vi.mock("../../../src/entities/resume/lib/skillIndex", () => ({
  getAllSkills: vi.fn(),
}));

import { getAllSkills } from "../../../src/entities/resume/lib/skillIndex";

const skill = (presentation: string, stackType: StackType = "backend"): Skill => ({
  presentation,
  stackType,
});

describe("SKILL_OPTIONS", () => {
  beforeEach(() => {
    vi.resetModules();       // Reset cached SKILL_OPTIONS
    vi.clearAllMocks();
  });

  it("returns skills from getAllSkills()", async () => {
    const mockSkills = [skill("react"), skill("docker")];
    (getAllSkills as any).mockReturnValue(mockSkills);

    const { SKILL_OPTIONS } = await import("../../../src/features/filters/lib/getSkillOptions");

    expect(SKILL_OPTIONS.map(s => s.presentation)).toEqual(["docker", "react"]);
  });

  it.todo("deduplicates skills with identical presentation", async () => {
    // 'mockReturnValue from skillIndex#extractSkills instead'
    const mockSkills = [
      skill("react", "frontend"),
      skill("go", "backend"),
    ];

    (getAllSkills as Mock).mockReturnValue(mockSkills);

    const { SKILL_OPTIONS } = await import("../../../src/features/filters/lib/getSkillOptions");

    expect(SKILL_OPTIONS.map(s => s.presentation)).toEqual(["go", "react"]);
    expect(SKILL_OPTIONS[1].stackType).toBe("frontend"); // first occurrence preserved
  });

  it("returns skills sorted alphabetically by presentation", async () => {
    const mockSkills = [
      skill("docker"),
      skill("React"),
      skill("a11y"),
    ];

    (getAllSkills as Mock).mockReturnValue(mockSkills);

    const { SKILL_OPTIONS } = await import("../../../src/features/filters/lib/getSkillOptions");

    expect(SKILL_OPTIONS.map(s => s.presentation)).toEqual(["a11y", "docker", "React"]);
  });

  it("is cached (re-importing returns same reference)", async () => {
    const mockSkills = [skill("react")];
    (getAllSkills as any).mockReturnValue(mockSkills);

    const first = (await import("../../../src/features/filters/lib/getSkillOptions")).SKILL_OPTIONS;
    const second = (await import("../../../src/features/filters/lib/getSkillOptions")).SKILL_OPTIONS;

    expect(first).toBe(second);
  });
});
