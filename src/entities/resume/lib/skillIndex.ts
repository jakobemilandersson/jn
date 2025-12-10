import { RESUME } from "../data";
import type { Skill } from "../types";

const index = new Map<string, Skill>();

// Build index
RESUME.forEach(exp => {
  exp.skills.forEach(skill => {
    index.set(skill.presentation, skill);
  });
});

// ❗ compute AFTER index is filled
const ALL_SKILLS = Object.freeze(Array.from(index.values()));

export function resolveSkill(presentation: string): Skill | null {
  return index.get(presentation) ?? null;
}

export function getAllSkills(): readonly Skill[] {
  return ALL_SKILLS;
}
