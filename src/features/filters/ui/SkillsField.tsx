import { SKILL_OPTIONS } from "@features/filters";
import { useFilterStore } from "@features/filters";
import { SearchableMultiSelect } from "@shared/ui";

export function SkillsField() {
  const skills = useFilterStore(s => s.skills);
  const setSkills = useFilterStore(s => s.setSkills);

  return (
    <SearchableMultiSelect
      id="skills"
      label="Skills"
      options={SKILL_OPTIONS.map(s => s.presentation)}
      selected={skills}
      onChange={setSkills}
    />
  );
}
