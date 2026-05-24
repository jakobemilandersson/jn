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
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
    expect(state.starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
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
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpeedMax).toBe(1200)
    expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
  })

  it('setCometSizeMin updates only cometSizeMin', () => {
    useSpaceSettingsStore.getState().setCometSizeMin(50)
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSizeMin).toBe(50)
    expect(state.cometSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMax)
  })

  it('setCometSizeMax updates only cometSizeMax', () => {
    useSpaceSettingsStore.getState().setCometSizeMax(400)
    const state = useSpaceSettingsStore.getState()
    expect(state.cometSizeMax).toBe(400)
    expect(state.cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
  })

  it('setStarSizeMin updates only starSizeMin', () => {
    useSpaceSettingsStore.getState().setStarSizeMin(0.3)
    const state = useSpaceSettingsStore.getState()
    expect(state.starSizeMin).toBe(0.3)
    expect(state.starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
  })

  it('setStarSizeMax updates only starSizeMax', () => {
    useSpaceSettingsStore.getState().setStarSizeMax(3.5)
    const state = useSpaceSettingsStore.getState()
    expect(state.starSizeMax).toBe(3.5)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
  })

  it('reset restores all values to defaults after mutation', () => {
    const s = useSpaceSettingsStore.getState()
    s.setCometSpeedMin(100)
    s.setCometSpeedMax(2000)
    s.setCometSizeMin(10)
    s.setCometSizeMax(500)
    s.setStarSizeMin(0.1)
    s.setStarSizeMax(5)

    useSpaceSettingsStore.getState().reset()

    const state = useSpaceSettingsStore.getState()
    expect(state.cometSpeedMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMin)
    expect(state.cometSpeedMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSpeedMax)
    expect(state.cometSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMin)
    expect(state.cometSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.cometSizeMax)
    expect(state.starSizeMin).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMin)
    expect(state.starSizeMax).toBe(SPACE_SETTINGS_DEFAULTS.starSizeMax)
  })
})
