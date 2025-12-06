import { RESUME } from '../../../entities/resume'
import type { StackType, Skill, WorkExperience } from '../../../entities/resume'

export const applyFilter = (stackType: StackType | null, skills: Skill[]): WorkExperience[] => {
    return RESUME.filter((r) => {
        if (stackType && r.stackType !== stackType) return false
        if (skills.length > 0) {
        return skills.every((s) => r.skills.includes(s))
        }
        return true
    })
}