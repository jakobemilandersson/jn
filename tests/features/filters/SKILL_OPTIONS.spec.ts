import { describe, it, expect } from 'vitest'
import { SKILL_OPTIONS } from '../../../src/features/filters/lib/getSkillOptions'
import { RESUME } from '../../../src/entities/resume'

describe('SKILL_OPTIONS', () => {
  it('contains all unique skills sorted alphabetically', () => {
    const expected = Array.from(new Set(RESUME.flatMap((r) => r.skills))).sort()
    expect(SKILL_OPTIONS).toEqual(expected)
  })

  it('is sorted', () => {
    const manuallySorted = [...SKILL_OPTIONS].sort()
    expect(SKILL_OPTIONS).toEqual(manuallySorted)
  })

  it('remains stable across imports (cached once)', async () => {
    const { SKILL_OPTIONS: SKILL_OPTIONS_2 } = await import(
      '../../../src/features/filters/lib/getSkillOptions'
    )
    expect(SKILL_OPTIONS).toBe(SKILL_OPTIONS_2)
  })
})
