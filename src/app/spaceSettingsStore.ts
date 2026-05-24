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
  setCometSpeedMin: (v) => set((s) => ({ cometSpeedMin: Math.min(v, s.cometSpeedMax) })),
  setCometSpeedMax: (v) => set((s) => ({ cometSpeedMax: Math.max(v, s.cometSpeedMin) })),
  setCometSizeMin: (v) => set((s) => ({ cometSizeMin: Math.min(v, s.cometSizeMax) })),
  setCometSizeMax: (v) => set((s) => ({ cometSizeMax: Math.max(v, s.cometSizeMin) })),
  setCometSpawnMin: (v) => set((s) => ({ cometSpawnMin: Math.min(v, s.cometSpawnMax) })),
  setCometSpawnMax: (v) => set((s) => ({ cometSpawnMax: Math.max(v, s.cometSpawnMin) })),
  setStarSizeMin: (v) => set((s) => ({ starSizeMin: Math.min(v, s.starSizeMax) })),
  setStarSizeMax: (v) => set((s) => ({ starSizeMax: Math.max(v, s.starSizeMin) })),
  setStarCount: (starCount) => set({ starCount }),
  reset: () => set({ ...SPACE_SETTINGS_DEFAULTS }),
}))
