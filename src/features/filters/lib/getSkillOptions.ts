import { RESUME } from "../../../entities/resume";

export const SKILL_OPTIONS: string[] = Array.from(new Set(RESUME.flatMap((r) => r.skills))).sort()