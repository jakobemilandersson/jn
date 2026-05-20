import { useMemo } from "react";
import { applyFilters } from "./applyFilters";
import { useFilterStore } from "@features/filters";
import type { WorkExperience } from "@entities/resume";

export function useFilteredResume(data: WorkExperience[]) {
    const stackTypes = useFilterStore((s) => s.stackTypes);
    const skills = useFilterStore((s) => s.skills);
    const strictSkills = useFilterStore((s) => s.strictSkillsMatch);
    const dateFrom = useFilterStore((s) => s.dateFrom);
    const dateTo = useFilterStore((s) => s.dateTo);

    return useMemo(
        () => applyFilters(data, stackTypes, skills, strictSkills, dateFrom, dateTo),
        [data, stackTypes, skills, strictSkills, dateFrom, dateTo]
    );
}
