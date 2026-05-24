import { create } from 'zustand'

export type SpaceSettings = {
  cometSpeedMin: number
  cometSpeedMax: number
  cometSizeMin: number
  cometSizeMax: number
  starSizeMin: number
  starSizeMax: number
}

export const SPACE_SETTINGS_DEFAULTS: SpaceSettings = {
  cometSpeedMin: 350,
  cometSpeedMax: 950,
  cometSizeMin: 80,
  cometSizeMax: 280,
  starSizeMin: 0.6,
  starSizeMax: 2.1,
}

type SpaceSettingsState = SpaceSettings & {
  setCometSpeedMin: (v: number) => void
  setCometSpeedMax: (v: number) => void
  setCometSizeMin: (v: number) => void
  setCometSizeMax: (v: number) => void
  setStarSizeMin: (v: number) => void
  setStarSizeMax: (v: number) => void
  reset: () => void
}

export const useSpaceSettingsStore = create<SpaceSettingsState>((set) => ({
  ...SPACE_SETTINGS_DEFAULTS,
  setCometSpeedMin: (cometSpeedMin) => set({ cometSpeedMin }),
  setCometSpeedMax: (cometSpeedMax) => set({ cometSpeedMax }),
  setCometSizeMin: (cometSizeMin) => set({ cometSizeMin }),
  setCometSizeMax: (cometSizeMax) => set({ cometSizeMax }),
  setStarSizeMin: (starSizeMin) => set({ starSizeMin }),
  setStarSizeMax: (starSizeMax) => set({ starSizeMax }),
  reset: () => set({ ...SPACE_SETTINGS_DEFAULTS }),
}))
