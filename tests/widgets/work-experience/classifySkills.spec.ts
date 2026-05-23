import { describe, it, expect } from 'vitest'
import { classifySkills } from '@widgets/work-experience/lib/classifySkills'
import type { WorkExperience, YearMonth } from '@entities/resume/types'

const experience: WorkExperience = {
  id: '1',
  kind: 'work',
  role: 'Frontend Dev',
  company: 'Acme',
  stackType: 'frontend',
  start: '2022-01' as YearMonth,
  skills: [
    { presentation: 'React', stackType: 'frontend' },
    { presentation: 'TypeScript', stackType: 'frontend' },
    { presentation: 'PostgreSQL', stackType: 'backend' },
  ],
}

describe('classifySkills', () => {
  it('classifies matched skills first', () => {
    const result = classifySkills({
      experience,
      selectedSkills: ['React'],
      selectedStackTypes: [],
    })

    expect(result.matched.map((s) => s.presentation)).toEqual(['React'])
    expect(result.related.map((s) => s.presentation)).toEqual(['TypeScript'])
    expect(result.other.map((s) => s.presentation)).toEqual(['PostgreSQL'])
  })

  it('treats skills as related when matching selected stack type', () => {
    const result = classifySkills({
      experience,
      selectedSkills: [],
      selectedStackTypes: ['backend'],
    })

    expect(result.matched).toHaveLength(0)
    expect(result.related.map((s) => s.presentation)).toEqual([
      'React',
      'TypeScript',
      'PostgreSQL',
    ])
    expect(result.other).toHaveLength(0)
  })

  it('treats skills as related when matching experience stack type', () => {
    const result = classifySkills({
      experience: {
        ...experience,
        stackType: 'backend',
      },
      selectedSkills: [],
      selectedStackTypes: [],
    })

    expect(result.matched).toHaveLength(0)
    expect(result.related.map((s) => s.presentation)).toEqual([
      'PostgreSQL',
    ])
    expect(result.other.map((s) => s.presentation)).toEqual([
      'React',
      'TypeScript',
    ])
  })
})

it('provides match strength only when multiple skills are selected', () => {
  const result = classifySkills({
    experience,
    selectedSkills: ['React', 'TypeScript'],
    selectedStackTypes: [],
  })

  expect(result.matchStrength).toEqual({
    matched: 2,
    total: 2,
  })
})

it('does not provide match strength when one or fewer skills are selected', () => {
  const result = classifySkills({
    experience,
    selectedSkills: ['React'],
    selectedStackTypes: [],
  })

  expect(result.matchStrength).toBeNull()
})
