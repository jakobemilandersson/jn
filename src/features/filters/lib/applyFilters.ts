import { RESUME } from '../../../entities/resume'
import type { StackType, Skill, WorkExperience } from '../../../entities/resume'

export const applyFilter = (stackType: StackType | null, skills: string[]): WorkExperience[] => {
    return RESUME.filter((r) => {
        if (stackType && r.stackType !== stackType) return false
        if (skills.length > 0) {
            const rSkills = r.skills.map(s => s.presentation);
            return skills.every((s) => rSkills.includes(s))
        }
        return true
    })
}