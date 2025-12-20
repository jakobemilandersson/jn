import { describe, it, expect } from "vitest";
import { mapSkillToChipProps } from "@features/filters/lib/mapSkillToChipProps";
import type { Skill } from "@entities/resume";

describe("mapSkillToChipProps", () => {
    it("maps a Skill to label + variant", () => {
        const skill: Skill = {
            presentation: "React",
            stackType: "frontend",
        };

        const result = mapSkillToChipProps(skill, "fallback");

        expect(result).toEqual({
            label: "React",
            variant: "frontend",
        });
    });

    it("falls back to fullstack when skill is null", () => {
        const result = mapSkillToChipProps(null, "UnknownSkill");

        expect(result).toEqual({
            label: "UnknownSkill",
            variant: "fullstack",
        });
    });
});
