import { describe, it, expect } from "vitest";
import { resolveSkill, getAllSkills } from "../../../src/entities/resume/lib/skillIndex";
import { RESUME } from "../../../src/entities/resume";

describe("skillIndex", () => {
  it("returns all unique skills", () => {
    const skills = getAllSkills();
    const presentations = skills.map(s => s.presentation);

    // Flattened set from actual data
    const expected = Array.from(
      new Set(RESUME.flatMap(r => r.skills.map(s => s.presentation)))
    );

    expect(new Set(presentations)).toEqual(new Set(expected));
  });

  it("resolves a skill by its presentation", () => {
    const skill = resolveSkill("react");
    expect(skill).not.toBeNull();
    expect(skill!.presentation).toBe("react");
  });

  it("returns null for skills that do not exist", () => {
    const missing = resolveSkill("not-a-skill");
    expect(missing).toBeNull();
  });

  it("mapping preserves correct stack type", () => {
    const nodeSkill = resolveSkill("node");
    expect(nodeSkill!.stackType).toBe("backend");
  });
});
