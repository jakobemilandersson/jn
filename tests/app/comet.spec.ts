import { describe, it, expect, vi } from 'vitest'
import {
  spawnComet,
  tickComet,
  travelDistance,
  sampleSpawnInterval,
  type Comet,
} from '@app/comet'
import { SPACE_SETTINGS_DEFAULTS } from '@app/spaceSettingsStore'

const W = 1280
const H = 800
const S = SPACE_SETTINGS_DEFAULTS

// ─── travelDistance ──────────────────────────────────────────────────────────

describe('travelDistance', () => {
  it('returns 0 when speed is 0', () => {
    expect(travelDistance(100, 100, 0, 0, W, H)).toBe(0)
  })

  it('returns 0 when there are no positive-t intersections', () => {
    // Moving away from canvas (already outside-ish or degenerate)
    expect(travelDistance(W + 10, H + 10, 1, 1, W, H)).toBe(0)
  })

  it('correctly computes travel to right edge', () => {
    const dist = travelDistance(0, H / 2, 1, 0, W, H)
    expect(dist).toBeCloseTo(W)
  })

  it('correctly computes travel to bottom edge from top', () => {
    const dist = travelDistance(W / 2, 0, 0, 1, W, H)
    expect(dist).toBeCloseTo(H)
  })
})

// ─── sampleSpawnInterval ─────────────────────────────────────────────────────

describe('sampleSpawnInterval', () => {
  it('returns a value in [cometSpawnMin * 1000, cometSpawnMax * 1000]', () => {
    for (let i = 0; i < 50; i++) {
      const ms = sampleSpawnInterval(S)
      expect(ms).toBeGreaterThanOrEqual(S.cometSpawnMin * 1000)
      expect(ms).toBeLessThanOrEqual(S.cometSpawnMax * 1000)
    }
  })

  it('returns exactly min*1000 when min === max', () => {
    const settings = { ...S, cometSpawnMin: 5, cometSpawnMax: 5 }
    expect(sampleSpawnInterval(settings)).toBe(5000)
  })
})

// ─── spawnComet ──────────────────────────────────────────────────────────────

describe('spawnComet', () => {
  it('returns a Comet with numeric position and velocity', () => {
    const comet = spawnComet(W, H, S)
    expect(typeof comet.x).toBe('number')
    expect(typeof comet.y).toBe('number')
    expect(typeof comet.vx).toBe('number')
    expect(typeof comet.vy).toBe('number')
  })

  it('tailLength is within [cometSizeMin, cometSizeMax]', () => {
    for (let i = 0; i < 50; i++) {
      const c = spawnComet(W, H, S)
      expect(c.tailLength).toBeGreaterThanOrEqual(S.cometSizeMin)
      expect(c.tailLength).toBeLessThanOrEqual(S.cometSizeMax)
    }
  })

  it('speed is within [cometSpeedMin, cometSpeedMax]', () => {
    for (let i = 0; i < 50; i++) {
      const c = spawnComet(W, H, S)
      expect(c.speed).toBeGreaterThanOrEqual(S.cometSpeedMin)
      expect(c.speed).toBeLessThanOrEqual(S.cometSpeedMax)
    }
  })

  it('has no status or waitRemaining field', () => {
    const c = spawnComet(W, H, S) as Record<string, unknown>
    expect(c['status']).toBeUndefined()
    expect(c['waitRemaining']).toBeUndefined()
  })

  it('produces a comet that will travel at least MIN_TRAVEL px', () => {
    for (let i = 0; i < 20; i++) {
      const c = spawnComet(W, H, S)
      const dist = travelDistance(c.x, c.y, c.vx, c.vy, W, H)
      expect(dist).toBeGreaterThanOrEqual(400)
    }
  })
})

// ─── tickComet ───────────────────────────────────────────────────────────────

describe('tickComet', () => {
  function makeComet(overrides: Partial<Comet> = {}): Comet {
    return {
      x: 100, y: 100,
      vx: 500, vy: 0,
      speed: 500,
      tailLength: 100,
      headRadius: 2,
      color: { tailFade: '', tail: '', glow: '', head: '' },
      ...overrides,
    }
  }

  it('advances position by deltaMs', () => {
    const c = makeComet({ x: 0, y: 400, vx: 500, vy: 0 })
    const result = tickComet(c, 100, W, H)
    expect(result).not.toBeNull()
    expect(result!.x).toBeCloseTo(50)   // 500 px/s × 0.1 s
    expect(result!.y).toBeCloseTo(400)
  })

  it('returns null when comet exits right edge + margin', () => {
    const c = makeComet({ x: W + 200, y: H / 2, vx: 500, vy: 0 })
    expect(tickComet(c, 16, W, H)).toBeNull()
  })

  it('returns null when comet exits top edge', () => {
    const c = makeComet({ x: W / 2, y: -200, vx: 0, vy: -500 })
    expect(tickComet(c, 16, W, H)).toBeNull()
  })

  it('returns updated comet (not null) while still on screen', () => {
    const c = makeComet({ x: W / 2, y: H / 2, vx: 100, vy: 0 })
    const result = tickComet(c, 16, W, H)
    expect(result).not.toBeNull()
    expect(result!.x).toBeGreaterThan(W / 2)
  })
})
