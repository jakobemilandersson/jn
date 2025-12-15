import type { WorkExperience, Skill } from "../types";
import { RESUME } from "../data";

export const extractSkills = (data: WorkExperience[]): Skill[] => {
  const duplicateSkills = data.flatMap((r) => r.skills);//.map((s) => [s.presentation, s])
  let uniqueSkills: Skill[] = []
  duplicateSkills.forEach((s) => {
    const skillPresentation = s.presentation
    const uniqueSkillPresentations = uniqueSkills.map((s) => s.presentation)
    if(!(uniqueSkillPresentations.includes(skillPresentation))) {
      uniqueSkills.push(s);
    }
  });

  return uniqueSkills;
  return Array.from(
    new Map(
      data.flatMap((r) => r.skills).map((s) => [s.presentation, s])
    ).values()
  );
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
