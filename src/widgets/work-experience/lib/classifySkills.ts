// src/widgets/work-experience/lib/classifySkills.ts
import type { Skill, StackType, WorkExperience } from '@entities/resume'

export type MatchStrength =
  | {
    matched: number
    total: number
  }
  | null

export type ClassifiedSkills = {
  matched: Skill[]
  related: Skill[]
  other: Skill[]
  matchStrength: MatchStrength
}

type Params = {
  experience: WorkExperience
  selectedSkills: string[]
  selectedStackTypes: StackType[]
}

export function classifySkills({
  experience,
  selectedSkills,
  selectedStackTypes,
}: Params): ClassifiedSkills {
  const matched: Skill[] = []
  const related: Skill[] = []
  const other: Skill[] = []

  for (const skill of experience.skills) {
    const isMatched = selectedSkills.includes(skill.presentation)

    if (isMatched) {
      matched.push(skill)
      continue
    }

    const isRelated =
      skill.stackType === experience.stackType ||
      (selectedStackTypes.length > 0 && selectedStackTypes.includes(skill.stackType))

    if (isRelated) {
      related.push(skill)
    } else {
      other.push(skill)
    }
  }

  const matchStrength: MatchStrength =
    selectedSkills.length > 1
      ? {
        matched: matched.length,
        total: selectedSkills.length,
      }
      : null

  return {
    matched,
    related,
    other,
    matchStrength,
  }
}
