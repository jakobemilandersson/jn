import type { Skill } from "@entities/resume";
import { getAllSkills } from "@entities/resume";

export const SKILL_OPTIONS: readonly Skill[] = Object.freeze(
  getAllSkills().sort((a, b) =>
    a.presentation.localeCompare(b.presentation)
  )
);

export function getSkillOptions(): string[] {
  return SKILL_OPTIONS.map(s => s.presentation);
}
