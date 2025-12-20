import { useMemo } from "react";
import { applyFilters } from "./applyFilters";
import { useFilterStore } from "@features/filters";
import type { WorkExperience } from "@entities/resume";

export function useFilteredResume(data: WorkExperience[]) {
    const stackType = useFilterStore((s) => s.stackType);
    const skills = useFilterStore((s) => s.skills);
    const strictSkills = useFilterStore((s) => s.strictSkillsMatch);

    return useMemo(
        () => applyFilters(data, stackType, skills, strictSkills),
        [data, stackType, skills, strictSkills]
    );
}
