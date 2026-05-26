import { useState } from "react";
import { FiltersPanel, useFilteredResume, useFilterStore } from "@features/filters";
import { WorkExperienceSkillBinder } from "@widgets/work-experience";
import { ActiveFilters } from "@widgets/filters";
import { RESUME } from "@entities/resume";

export default function ResumePage() {
  const results = useFilteredResume(RESUME.experiences);
  const skills = useFilterStore((s) => s.skills);
  const stackTypes = useFilterStore((s) => s.stackTypes);

  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <FiltersPanel />
      <ActiveFilters />

      <section>
        <h2 className="text-xl font-semibold">Results ({results.length})</h2>
        <div className="mt-4 space-y-4">
          {results.map((r) => (
            <WorkExperienceSkillBinder
              key={r.id}
              experience={r}
              selectedSkills={skills}
              selectedStackTypes={stackTypes}
              isOpen={activeSheetId === r.id}
              onOpen={() => setActiveSheetId(r.id)}
              onClose={() => setActiveSheetId(null)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
