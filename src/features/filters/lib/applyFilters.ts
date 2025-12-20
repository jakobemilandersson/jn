import type { StackType, WorkExperience } from '@entities/resume'

const countMatchingSkills = (experience: WorkExperience, selectedSkills: string[]): number => {
  if (selectedSkills.length === 0) return 0

  const experienceSkills = new Set(
    experience.skills.map((s) => s.presentation)
  )

  let count = 0
  for (const skill of selectedSkills) {
    if (experienceSkills.has(skill)) count++
  }

  return count
}

export const applyFilters = (
  data: WorkExperience[],
  stackType: StackType | null,
  skills: string[],
  strict: boolean
): WorkExperience[] => {
  const filtered = data.filter((r) => {
    let isMatch = true

    if (stackType) {
      isMatch &&= r.stackType === stackType
    }

    if (skills.length > 0) {
      const rSkills = r.skills.map((s) => s.presentation)

      if (strict) {
        isMatch &&= skills.every((s) => rSkills.includes(s))
      } else {
        isMatch &&= skills.some((s) => rSkills.includes(s))
      }
    }

    return isMatch
  })

  // Order by number of matching skills (descending)
  if (skills.length === 0) return filtered

  return [...filtered].sort((a, b) => {
    const aScore = countMatchingSkills(a, skills)
    const bScore = countMatchingSkills(b, skills)

    // Higher score first
    if (aScore !== bScore) {
      return bScore - aScore
    }

    // Stable fallback: keep original order
    return data.indexOf(a) - data.indexOf(b)
  })
}
