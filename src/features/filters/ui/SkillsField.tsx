import { SKILL_OPTIONS, useFilterStore } from "@features/filters";
import { SearchableMultiSelect, SkillChip } from "@shared/ui";
import { resolveSkill } from "@entities/resume";
import { mapSkillToChipProps } from "../lib/mapSkillToChipProps";

export function SkillsField() {
  const skills = useFilterStore((s) => s.skills);
  const setSkills = useFilterStore((s) => s.setSkills);

  return (
    <SearchableMultiSelect
      id="skills"
      label="Skills"
      options={SKILL_OPTIONS.map((s) => s.presentation)}
      selected={skills}
      onChange={setSkills}
      renderSelected={(value) => {
        const skill = resolveSkill(value);
        const { label, variant } = mapSkillToChipProps(skill, value);

        return (
          <SkillChip
            key={value}
            label={label}
            variant={variant}
          />
        );
      }}
    />
  );
}
