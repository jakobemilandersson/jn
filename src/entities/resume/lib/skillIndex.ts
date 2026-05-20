import type { WorkExperience, Skill } from "../types";
import { RESUME } from "../data";

export const extractSkills = (data: WorkExperience[]): Skill[] => {
  const seen = new Map<string, Skill>();
  for (const entry of data) {
    for (const skill of entry.skills) {
      if (!seen.has(skill.presentation)) {
        seen.set(skill.presentation, skill);
      }
    }
  }
  return Array.from(seen.values());
};

export const getAllSkills = (): Skill[] => extractSkills(RESUME);

export const resolveSkill = (
  presentation: string,
  data: WorkExperience[] = RESUME
): Skill | null => {
  const map = new Map(
    data.flatMap((r) => r.skills).map((s) => [s.presentation, s])
  );
  return map.get(presentation) ?? null;
};
