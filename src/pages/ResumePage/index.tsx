import { useMemo } from "react";
import { FiltersPanel, applyFilters, useFilterStore } from "@features/filters";
import { RESUME } from "@entities/resume";
import { WorkExperienceCard } from "@widgets/work-experience";
import type { WorkExperience } from "@entities/resume";

export default function ResumePage() {
  const stackType = useFilterStore((s) => s.stackType);
  const skills = useFilterStore((s) => s.skills);
  const strictSkills = useFilterStore((s) => s.strictSkillsMatch);

  const results = useMemo(
    () => applyFilters(RESUME, stackType, skills, strictSkills),
    [stackType, skills, strictSkills]
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <FiltersPanel />

      <section>
        <h2 className="text-xl font-semibold">Results ({results.length})</h2>
        <div className="mt-4 space-y-4">
          {results.map((r: WorkExperience) => (
            <WorkExperienceCard
              key={r.id}
              experience={r}
              selectedSkills={skills}
              selectedStackType={stackType}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
