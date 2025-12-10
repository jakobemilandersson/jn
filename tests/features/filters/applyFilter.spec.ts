import { describe, it, expect } from 'vitest'
import { applyFilters } from '../../../src/features/filters/lib/applyFilters'
import { RESUME } from '../../../src/entities/resume'

describe('applyFilters', () => {
  it('returns all entries when stackType=null and no skills selected', () => {
    const res = applyFilters(null, [])
    expect(res.length).toBe(RESUME.length)
  })

  it('filters by stackType', () => {
    const target = 'backend'
    const expected = RESUME.filter((r) => r.stackType === target)
    const res = applyFilters(target as any, [])
    expect(res.length).toBe(expected.length)
    expect(res.every((r) => r.stackType === target)).toBe(true)
  })

  it('filters by a single selected skill', () => {
    const skill = RESUME.flatMap((r) => r.skills)[0]
    const res = applyFilters(null, [skill.presentation])
    expect(res.every((r) => r.skills.map(s => s.presentation).includes(skill.presentation))).toBe(true)
  })

  // requires all selected skills to be present (AND filtering)
  it('requires all selected skills to be present (AND filtering)', () => {
    const skills = RESUME.flatMap(r => r.skills.map(s => s.presentation));
    const pair = skills.slice(0, 2);

    const expected = RESUME.filter(r => {
      const rSkills = r.skills.map(s => s.presentation);
      return pair.every(s => rSkills.includes(s));
    });

    const res = applyFilters(null, pair);

    expect(res.length).toBe(expected.length);
    expect(res.every(r => {
      const rSkills = r.skills.map(s => s.presentation);
      return pair.every(s => rSkills.includes(s));
    })).toBe(true);
  });
})
