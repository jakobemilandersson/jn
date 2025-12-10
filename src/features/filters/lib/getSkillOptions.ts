// src/features/filters/lib/getSkillOptions.ts
import { RESUME, Skill } from "../../../entities/resume";
import { getAllSkills } from "../../../entities/resume/lib/skillIndex";

export const SKILL_OPTIONS: Skill[] = getAllSkills().sort()

export function getSkillOptions(): string[] {
  return getAllSkills()
    .map(s => s.presentation)
    .sort();
}
