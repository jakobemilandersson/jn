import { create } from 'zustand'

export type SpaceSettings = {
  cometSpeedMin: number
  cometSpeedMax: number
  cometSizeMin: number
  cometSizeMax: number
  cometSpawnMin: number
  cometSpawnMax: number
  starSizeMin: number
  starSizeMax: number
  starCount: number
}

export const SPACE_SETTINGS_DEFAULTS: SpaceSettings = {
  cometSpeedMin: 350,
  cometSpeedMax: 950,
  cometSizeMin: 80,
  cometSizeMax: 280,
  cometSpawnMin: 4,
  cometSpawnMax: 12,
  starSizeMin: 0.6,
  starSizeMax: 2.1,
  starCount: 140,
}

type SpaceSettingsState = SpaceSettings & {
  setCometSpeedMin: (v: number) => void
  setCometSpeedMax: (v: number) => void
  setCometSizeMin: (v: number) => void
  setCometSizeMax: (v: number) => void
  setCometSpawnMin: (v: number) => void
  setCometSpawnMax: (v: number) => void
  setStarSizeMin: (v: number) => void
  setStarSizeMax: (v: number) => void
  setStarCount: (v: number) => void
  reset: () => void
}

export const useSpaceSettingsStore = create<SpaceSettingsState>((set) => ({
  ...SPACE_SETTINGS_DEFAULTS,
  setCometSpeedMin: (cometSpeedMin) => set({ cometSpeedMin }),
  setCometSpeedMax: (cometSpeedMax) => set({ cometSpeedMax }),
  setCometSizeMin: (cometSizeMin) => set({ cometSizeMin }),
  setCometSizeMax: (cometSizeMax) => set({ cometSizeMax }),
  setCometSpawnMin: (cometSpawnMin) => set({ cometSpawnMin }),
  setCometSpawnMax: (cometSpawnMax) => set({ cometSpawnMax }),
  setStarSizeMin: (starSizeMin) => set({ starSizeMin }),
  setStarSizeMax: (starSizeMax) => set({ starSizeMax }),
  setStarCount: (starCount) => set({ starCount }),
  reset: () => set({ ...SPACE_SETTINGS_DEFAULTS }),
}))
