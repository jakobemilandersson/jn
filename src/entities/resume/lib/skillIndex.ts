import type { WorkExperience, Skill } from "../types";
import { RESUME } from "../data";

export const extractSkills = (data: WorkExperience[]): Skill[] => {
  return data.flatMap((r) => r.skills).filter((s, i, arr) =>
    arr.findIndex(s2 => (s2.presentation === s.presentation)) === i
  )
}

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
