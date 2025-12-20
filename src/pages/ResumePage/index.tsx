import { FiltersPanel, useFilteredResume, useFilterStore } from "@features/filters";
import { RESUME } from "@entities/resume";
import { WorkExperienceCard } from "@widgets/work-experience";

export default function ResumePage() {
  const results = useFilteredResume(RESUME);
  const skills = useFilterStore((s) => s.skills);
  const stackType = useFilterStore((s) => s.stackType);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <FiltersPanel />

      <section>
        <h2 className="text-xl font-semibold">Results ({results.length})</h2>
        <div className="mt-4 space-y-4">
          {results.map((r) => (
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
