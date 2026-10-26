import { getGroupedSkillOptions, useFilterStore } from "@features/filters";
import { SearchableMultiSelect } from "@shared/ui";

export function SkillsField() {
  const skills = useFilterStore((s) => s.skills);
  const setSkills = useFilterStore((s) => s.setSkills);

  return (
    <SearchableMultiSelect
      id="skills"
      label="Skills"
      grouped={getGroupedSkillOptions()}
      selected={skills}
      onChange={setSkills}
    />
  );
}
