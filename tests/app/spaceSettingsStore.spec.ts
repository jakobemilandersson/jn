import { describe, it, expect, beforeEach } from 'vitest'
import { useSpaceSettingsStore, SPACE_SETTINGS_DEFAULTS } from '@app/spaceSettingsStore'

const resetStore = () => useSpaceSettingsStore.setState({ ...SPACE_SETTINGS_DEFAULTS })

describe('useSpaceSettingsStore', () => {
  beforeEach(() => {
    resetStore()
  })

  it('initializes with default values', () => {
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
    expect(state.cometSpeedMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
    expect(state.cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
    expect(state.cometSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMax)
    expect(state.cometSpawnMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMin)
    expect(state.cometSpawnMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMax)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
    expect(state.starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
    expect(state.starCount).toBe(SPACE_SETTINGS_DEFAULTS.starCount)
  })

  it('setCometSpeedMin updates only cometSpeedMin', () => {
    useSpaceSettingsStore.getState().setCometSpeedMin(200)
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpeedMin).toBe(200)
    expect(state.cometSpeedMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
    expect(state.cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
  })

  it('setCometSpeedMax updates only cometSpeedMax', () => {
    useSpaceSettingsStore.getState().setCometSpeedMax(1200)
    expect(useSpaceSettingsStore.getState().cometSpeedMax).toBe(1200)
    expect(useSpaceSettingsStore.getState().cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
  })

  it('setCometSizeMin updates only cometSizeMin', () => {
    useSpaceSettingsStore.getState().setCometSizeMin(50)
    expect(useSpaceSettingsStore.getState().cometSizeMin).toBe(50)
    expect(useSpaceSettingsStore.getState().cometSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMax)
  })

  it('setCometSizeMax updates only cometSizeMax', () => {
    useSpaceSettingsStore.getState().setCometSizeMax(400)
    expect(useSpaceSettingsStore.getState().cometSizeMax).toBe(400)
    expect(useSpaceSettingsStore.getState().cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
  })

  it('setCometSpawnMin updates only cometSpawnMin', () => {
    useSpaceSettingsStore.getState().setCometSpawnMin(1)
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpawnMin).toBe(1)
    expect(state.cometSpawnMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMax)
    expect(state.starCount).toBe(SPACE_SETTINGS_DEFAULTS.starCount)
  })

  it('setCometSpawnMax updates only cometSpawnMax', () => {
    useSpaceSettingsStore.getState().setCometSpawnMax(30)
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpawnMax).toBe(30)
    expect(state.cometSpawnMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMin)
  })

  it('setStarSizeMin updates only starSizeMin', () => {
    useSpaceSettingsStore.getState().setStarSizeMin(0.3)
    expect(useSpaceSettingsStore.getState().starSizeMin).toBe(0.3)
    expect(useSpaceSettingsStore.getState().starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
  })

  it('setStarSizeMax updates only starSizeMax', () => {
    useSpaceSettingsStore.getState().setStarSizeMax(3.5)
    expect(useSpaceSettingsStore.getState().starSizeMax).toBe(3.5)
    expect(useSpaceSettingsStore.getState().starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
  })

  it('setStarCount updates only starCount', () => {
    useSpaceSettingsStore.getState().setStarCount(300)
    const state = useSpaceSettingsStore.getState()
    expect(state.starCount).toBe(300)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
    expect(state.cometSpawnMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMin)
  })

  it('reset restores all values to defaults after mutation', () => {
    const s = useSpaceSettingsStore.getState()
    s.setCometSpeedMin(100)
    s.setCometSpeedMax(2000)
    s.setCometSizeMin(10)
    s.setCometSizeMax(500)
    s.setCometSpawnMin(0.5)
    s.setCometSpawnMax(60)
    s.setStarSizeMin(0.1)
    s.setStarSizeMax(5)
    s.setStarCount(500)

    useSpaceSettingsStore.getState().reset()

    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
    expect(state.cometSpeedMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
    expect(state.cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
    expect(state.cometSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMax)
    expect(state.cometSpawnMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMin)
    expect(state.cometSpawnMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpawnMax)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
    expect(state.starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
    expect(state.starCount).toBe(SPACE_SETTINGS_DEFAULTS.starCount)
  })

  // --- Clamping invariant: min <= max must always hold ---

  describe('setCometSpeedMin clamping', () => {
    it('clamps to current max when value exceeds it', () => {
      useSpaceSettingsStore.getState().setCometSpeedMin(9999)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
      expect(state.cometSpeedMin).toBeLessThanOrEqual(state.cometSpeedMax)
    })

    it('clamps to current max when value equals it', () => {
      useSpaceSettingsStore.getState().setCometSpeedMin(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
      expect(state.cometSpeedMin).toBeLessThanOrEqual(state.cometSpeedMax)
    })
  })

  describe('setCometSpeedMax clamping', () => {
    it('clamps to current min when value falls below it', () => {
      useSpaceSettingsStore.getState().setCometSpeedMax(1)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSpeedMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
      expect(state.cometSpeedMax).toBeGreaterThanOrEqual(state.cometSpeedMin)
    })
  })

  describe('setCometSizeMin clamping', () => {
    it('clamps to current max when value exceeds it', () => {
      useSpaceSettingsStore.getState().setCometSizeMin(9999)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSizeMin).toBeLessThanOrEqual(state.cometSizeMax)
    })
  })

  describe('setCometSizeMax clamping', () => {
    it('clamps to current min when value falls below it', () => {
      useSpaceSettingsStore.getState().setCometSizeMax(1)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSizeMax).toBeGreaterThanOrEqual(state.cometSizeMin)
    })
  })

  describe('setCometSpawnMin clamping', () => {
    it('clamps to current max when value exceeds it', () => {
      useSpaceSettingsStore.getState().setCometSpawnMin(9999)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSpawnMin).toBeLessThanOrEqual(state.cometSpawnMax)
    })
  })

  describe('setCometSpawnMax clamping', () => {
    it('clamps to current min when value falls below it', () => {
      useSpaceSettingsStore.getState().setCometSpawnMax(0)
      const state = useSpaceSettingsStore.getState()
      expect(state.cometSpawnMax).toBeGreaterThanOrEqual(state.cometSpawnMin)
    })
  })

  describe('setStarSizeMin clamping', () => {
    it('clamps to current max when value exceeds it', () => {
      useSpaceSettingsStore.getState().setStarSizeMin(9999)
      const state = useSpaceSettingsStore.getState()
      expect(state.starSizeMin).toBeLessThanOrEqual(state.starSizeMax)
    })
  })

  describe('setStarSizeMax clamping', () => {
    it('clamps to current min when value falls below it', () => {
      useSpaceSettingsStore.getState().setStarSizeMax(0)
      const state = useSpaceSettingsStore.getState()
      expect(state.starSizeMax).toBeGreaterThanOrEqual(state.starSizeMin)
    })
  })
})
