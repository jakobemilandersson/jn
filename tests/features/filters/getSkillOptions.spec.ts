import { describe, it, expect } from "vitest";
import { getSkillOptions, SKILL_OPTIONS } from "@features/filters";

describe("getSkillOptions", () => {
  it("returns an array of presentation strings", () => {
    const result = getSkillOptions();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((s) => expect(typeof s).toBe("string"));
  });

  it("matches the presentation values from SKILL_OPTIONS", () => {
    expect(getSkillOptions()).toEqual(
      SKILL_OPTIONS.map((s) => s.presentation)
    );
  });
});
