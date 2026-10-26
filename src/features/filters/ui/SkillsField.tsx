import { getGroupedSkillOptions, useFilterStore } from "@features/filters";
import { SearchableMultiSelect } from "@shared/ui";

export function SkillsField() {
  const skills = useFilterStore((s) => s.skills);
  const setSkills = useFilterStore((s) => s.setSkills);

  return (
    <div>
      <SearchableMultiSelect id="skills" label="Skills" grouped={getGroupedSkillOptions()} selected={skills} onChange={setSkills} />
      <p className="mt-2 text-[11px] leading-relaxed text-white/35">{skills.length ? `${skills.length} skill${skills.length === 1 ? "" : "s"} selected` : "Search across the technology stack"}</p>
    </div>
  );
}
