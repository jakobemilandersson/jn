import type { StackType, WorkExperience, YearMonth } from '@entities/resume'

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

/**
 * Returns true if the experience's active period overlaps with [dateFrom, dateTo].
 * An experience with no end date is treated as ongoing (open-ended to the future).
 * Comparison is lexicographic over "YYYY-MM" strings.
 */
const matchesDateInterval = (
  experience: WorkExperience,
  dateFrom: YearMonth | null,
  dateTo: YearMonth | null
): boolean => {
  if (dateFrom === null && dateTo === null) return true

  const expStart = experience.start
  // No end date means the role is ongoing; use a far-future sentinel for comparison.
  const expEnd = experience.end ?? ('9999-12' as YearMonth)

  if (dateFrom !== null && expEnd < dateFrom) return false
  if (dateTo !== null && expStart > dateTo) return false

  return true
}

export const applyFilters = (
  data: WorkExperience[],
  stackTypes: StackType[],
  skills: string[],
  strict: boolean,
  dateFrom: YearMonth | null = null,
  dateTo: YearMonth | null = null
): WorkExperience[] => {
  const filtered = data.filter((r) => {
    let isMatch = true

    if (stackTypes.length > 0) {
      isMatch &&= stackTypes.includes(r.stackType)
    }

    if (skills.length > 0) {
      const rSkills = r.skills.map((s) => s.presentation)

      if (strict) {
        isMatch &&= skills.every((s) => rSkills.includes(s))
      } else {
        isMatch &&= skills.some((s) => rSkills.includes(s))
      }
    }

    isMatch &&= matchesDateInterval(r, dateFrom, dateTo)

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
