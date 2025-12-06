import { MultiSelect } from '../../../shared/ui'
import { useFilterStore } from '../model/useFilterStore'
import { SKILL_OPTIONS } from '../lib/getSkillOptions'

export const SkillsMultiSelect = () => {
    const skills = useFilterStore((s) => s.skills)
    const toggleSkill = useFilterStore((s) => s.toggleSkill)

    return (
        <MultiSelect label="Skills" options={SKILL_OPTIONS} selected={skills} onToggle={toggleSkill} />
    )
}
