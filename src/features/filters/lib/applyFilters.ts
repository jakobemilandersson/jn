import { RESUME } from '../../../entities/resume'
import type { StackType, WorkExperience } from '../../../entities/resume'

export const applyFilters = (stackType: StackType | null, skills: string[], strict: boolean): WorkExperience[] => {
    return RESUME.filter((r) => {
        let isMatch = true;
        if (stackType) isMatch &&= r.stackType == stackType
        if (skills.length > 0) {
            const rSkills = r.skills.map(s => s.presentation);
            if (strict) {
                isMatch &&= skills.every((s) => rSkills.includes(s))
            } else {
                isMatch &&= skills.some((s) => rSkills.includes(s))
            }
        }
        return isMatch
    })
}