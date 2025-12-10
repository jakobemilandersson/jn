import { RESUME } from '../../../entities/resume'
import type { StackType, Skill, WorkExperience } from '../../../entities/resume'

export const applyFilters = (stackType: StackType | null, skills: string[]): WorkExperience[] => {
    return RESUME.filter((r) => {
        let isMatch = true;
        // if (stackType && r.stackType !== stackType) return false
        if(stackType) {
            isMatch &&= r.stackType == stackType
            // const rSkills = r.skills.map(s => s.stackType)
            // isMatch &&= skills.every((s) => rSkills.includes(s as "frontend" | "backend" | "fullstack"))
        }
        if (skills.length > 0) {
            const rSkills = r.skills.map(s => s.presentation);
            isMatch &&= skills.every((s) => rSkills.includes(s))
        }
        return isMatch
    })
}