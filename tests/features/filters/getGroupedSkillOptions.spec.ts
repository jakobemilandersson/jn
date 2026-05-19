import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import type { Skill, StackType } from "@entities/resume/types";

vi.mock("@entities/resume/lib/skillIndex", () => ({
  getAllSkills: vi.fn(),
}));

import { getAllSkills } from "@entities/resume/lib/skillIndex";

const skill = (presentation: string, stackType: StackType): Skill => ({
  presentation,
  stackType,
});

describe("getGroupedSkillOptions", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns groups in frontend → backend → fullstack order", async () => {
    (getAllSkills as Mock).mockReturnValue([
      skill("Node.js", "backend"),
      skill("React", "frontend"),
      skill("PostgreSQL", "fullstack"),
    ]);

    const { getGroupedSkillOptions } = await import("@features/filters/lib/getSkillOptions");
    const groups = getGroupedSkillOptions();

    expect(groups.map(g => g.label)).toEqual(["Frontend", "Backend", "Fullstack"]);
  });

  it("each group only contains skills of its matching stackType", async () => {
    (getAllSkills as Mock).mockReturnValue([
      skill("React", "frontend"),
      skill("TypeScript", "frontend"),
      skill("Node.js", "backend"),
      skill("Docker", "fullstack"),
    ]);

    const { getGroupedSkillOptions } = await import("@features/filters/lib/getSkillOptions");
    const groups = getGroupedSkillOptions();

    const frontend = groups.find(g => g.label === "Frontend");
    const backend = groups.find(g => g.label === "Backend");
    const fullstack = groups.find(g => g.label === "Fullstack");

    expect(frontend?.options).toEqual(["React", "TypeScript"]);
    expect(backend?.options).toEqual(["Node.js"]);
    expect(fullstack?.options).toEqual(["Docker"]);
  });

  it("omits groups that have no skills", async () => {
    (getAllSkills as Mock).mockReturnValue([
      skill("React", "frontend"),
      skill("Vue", "frontend"),
    ]);

    const { getGroupedSkillOptions } = await import("@features/filters/lib/getSkillOptions");
    const groups = getGroupedSkillOptions();

    expect(groups.map(g => g.label)).toEqual(["Frontend"]);
    expect(groups).toHaveLength(1);
  });

  it("returns an empty array when there are no skills", async () => {
    (getAllSkills as Mock).mockReturnValue([]);

    const { getGroupedSkillOptions } = await import("@features/filters/lib/getSkillOptions");
    const groups = getGroupedSkillOptions();

    expect(groups).toEqual([]);
  });
});
