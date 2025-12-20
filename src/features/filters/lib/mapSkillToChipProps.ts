import type { Skill } from "@entities/resume";

export type SkillChipView = {
    label: string;
    variant: "frontend" | "backend" | "fullstack";
};

export function mapSkillToChipProps(
    skill: Skill | null,
    fallbackLabel: string
): SkillChipView {
    if (!skill) {
        return {
            label: fallbackLabel,
            variant: "fullstack",
        };
    }

    return {
        label: skill.presentation,
        variant: skill.stackType,
    };
}
