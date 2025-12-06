import { describe, it, expect } from 'vitest'
import { applyFilter } from '../../../src/features/filters/lib/applyFilters'
import { RESUME } from '../../../src/entities/resume'

describe('applyFilter', () => {
  it('returns all entries when stackType=null and no skills selected', () => {
    const res = applyFilter(null, [])
    expect(res.length).toBe(RESUME.length)
  })

  it('filters by stackType', () => {
    const target = 'backend'
    const expected = RESUME.filter((r) => r.stackType === target)
    const res = applyFilter(target as any, [])
    expect(res.length).toBe(expected.length)
    expect(res.every((r) => r.stackType === target)).toBe(true)
  })

  it('filters by a single selected skill', () => {
    const skill = RESUME.flatMap((r) => r.skills)[0]
    const res = applyFilter(null, [skill])
    expect(res.every((r) => r.skills.includes(skill))).toBe(true)
  })

  it('requires all selected skills to be present (AND filtering)', () => {
    const skills = Array.from(new Set(RESUME.flatMap((r) => r.skills)))
    const pair = skills.slice(0, 2)

    const expected = RESUME.filter((r) => pair.every((s) => r.skills.includes(s)))
    const res = applyFilter(null, pair)

    expect(res.length).toBe(expected.length)
    expect(res.every((r) => pair.every((s) => r.skills.includes(s)))).toBe(true)
  })
})
