// src/entities/resume/lib/skillIndex.ts
import { RESUME } from "../data";
import type { Skill } from "../types";

const index = new Map<string, Skill>();

// Build a flat index for fast lookup
RESUME.forEach(exp => {
  exp.skills.forEach(skill => {
    // presentation name is the unique key
    index.set(skill.presentation, skill);
  });
});

export function resolveSkill(presentation: string): Skill | null {
  return index.get(presentation) ?? null;
}

export function getAllSkills(): Skill[] {
  return Array.from(index.values());
}
