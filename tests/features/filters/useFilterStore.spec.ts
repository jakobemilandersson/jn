import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from '../../../src/features/filters/model/useFilterStore'

describe('useFilterStore', () => {
  beforeEach(() => {
    // reset state between tests
    useFilterStore.getState().clear()
  })

  it('initializes with null stackType and empty skills', () => {
    const state = useFilterStore.getState()
    expect(state.stackType).toBeNull()
    expect(state.skills).toEqual([])
  })

  it('setStackType updates the stackType', () => {
    useFilterStore.getState().setStackType('frontend')
    expect(useFilterStore.getState().stackType).toBe('frontend')
  })

  it('toggleSkill adds and removes a skill', () => {
    const { toggleSkill } = useFilterStore.getState()

    toggleSkill('React')
    expect(useFilterStore.getState().skills).toContain('React')

    toggleSkill('React')
    expect(useFilterStore.getState().skills).not.toContain('React')
  })

  it('setSkills replaces the skills array', () => {
    useFilterStore.getState().setSkills(['A', 'B'])
    expect(useFilterStore.getState().skills).toEqual(['A', 'B'])
  })

  it('clear resets both stackType and skills', () => {
    const state = useFilterStore.getState()
    state.setStackType('backend')
    state.setSkills(['x'])

    state.clear()

    expect(useFilterStore.getState().stackType).toBeNull()
    expect(useFilterStore.getState().skills).toEqual([])
  })
})
