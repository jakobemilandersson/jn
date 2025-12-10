import { SKILL_OPTIONS } from "../lib/getSkillOptions";
import { useFilterStore } from "../model/useFilterStore";
import { SearchableMultiSelect } from "../../../shared/ui/SearchableMultiSelect";

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
