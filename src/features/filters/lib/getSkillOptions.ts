// src/features/filters/lib/getSkillOptions.ts
import { Skill } from "../../../entities/resume";
import { getAllSkills } from "../../../entities/resume/lib/skillIndex";

export const SKILL_OPTIONS: readonly Skill[] = getAllSkills() 

export function getSkillOptions(): string[] {
  return getAllSkills()
    .map(s => s.presentation)
    .sort();
}
