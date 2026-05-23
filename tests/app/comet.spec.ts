import { describe, it, expect } from "vitest";
import { spawnComet, tickComet, travelDistance } from "../../src/app/comet";

const W = 1280;
const H = 800;

describe("travelDistance", () => {
  it("returns the distance to the right edge for a rightward ray from the left", () => {
    expect(travelDistance(0, 400, 1, 0, W, H)).toBeCloseTo(W);
  });

  it("returns the distance to the bottom edge for a downward ray from the top", () => {
    expect(travelDistance(640, 0, 0, 1, W, H)).toBeCloseTo(H);
  });

  it("returns the shorter of two exit distances for a diagonal ray", () => {
    // vx=vy=1 → speed=√2, unit=(1/√2,1/√2). Bottom (H=800) closer than right (W=1280).
    expect(travelDistance(0, 0, 1, 1, W, H)).toBeCloseTo(H * Math.SQRT2);
  });

  it("returns 0 for zero velocity", () => {
    expect(travelDistance(640, 400, 0, 0, W, H)).toBe(0);
  });

  it("handles a corner spawn aimed diagonally inward", () => {
    expect(travelDistance(0, 0, 600, 600, W, H)).toBeGreaterThan(0);
  });
});

describe("spawnComet", () => {
  it("returns a comet with status 'flying'", () => {
    expect(spawnComet(W, H).status).toBe("flying");
  });

  it("speed is one of the three defined presets", () => {
    const VALID_SPEEDS = [350, 600, 950];
    for (let i = 0; i < 300; i++) {
      const comet = spawnComet(W, H);
      const actualSpeed = Math.sqrt(comet.vx ** 2 + comet.vy ** 2);
      expect(VALID_SPEEDS.some((s) => Math.abs(actualSpeed - s) < 0.01)).toBe(true);
    }
  });

  it("headRadius is one of the three defined presets", () => {
    const VALID_RADII = [1.2, 1.8, 2.6];
    for (let i = 0; i < 300; i++) {
      const comet = spawnComet(W, H);
      expect(VALID_RADII.some((r) => Math.abs(comet.headRadius - r) < 0.001)).toBe(true);
    }
  });

  it("color is a valid CometColor object with required keys", () => {
    for (let i = 0; i < 100; i++) {
      const { color } = spawnComet(W, H);
      expect(color).toHaveProperty("tailFade");
      expect(color).toHaveProperty("tail");
      expect(color).toHaveProperty("glow");
      expect(color).toHaveProperty("head");
    }
  });

  it("tailLength is within the bounds of the picked size preset", () => {
    // All presets have tailMin >= 80 and tailMax <= 280
    for (let i = 0; i < 300; i++) {
      const { tailLength } = spawnComet(W, H);
      expect(tailLength).toBeGreaterThanOrEqual(80);
      expect(tailLength).toBeLessThanOrEqual(280);
    }
  });

  it("always travels at least 400px before exiting the canvas", () => {
    for (let i = 0; i < 500; i++) {
      const comet = spawnComet(W, H);
      const dist = travelDistance(comet.x, comet.y, comet.vx, comet.vy, W, H);
      expect(dist).toBeGreaterThanOrEqual(400);
    }
  });

  it("spawns with head on one of the four canvas edges", () => {
    for (let i = 0; i < 200; i++) {
      const comet = spawnComet(W, H);
      const onEdge =
        comet.x === 0 || comet.x === W || comet.y === 0 || comet.y === H;
      expect(onEdge).toBe(true);
    }
  });

  it("velocity is directed away from the top edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => { calls++; return calls === 1 ? 0 : 0.5; };
    try {
      const comet = spawnComet(W, H);
      expect(comet.y).toBe(0);
      expect(comet.vy).toBeGreaterThan(0);
    } finally { Math.random = origRandom; }
  });

  it("velocity is directed away from the right edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => { calls++; return calls === 1 ? 1 / 4 + 0.01 : 0.5; };
    try {
      const comet = spawnComet(W, H);
      expect(comet.x).toBe(W);
      expect(comet.vx).toBeLessThan(0);
    } finally { Math.random = origRandom; }
  });

  it("velocity is directed away from the bottom edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => { calls++; return calls === 1 ? 2 / 4 + 0.01 : 0.5; };
    try {
      const comet = spawnComet(W, H);
      expect(comet.y).toBe(H);
      expect(comet.vy).toBeLessThan(0);
    } finally { Math.random = origRandom; }
  });

  it("velocity is directed away from the left edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => { calls++; return calls === 1 ? 3 / 4 + 0.01 : 0.5; };
    try {
      const comet = spawnComet(W, H);
      expect(comet.x).toBe(0);
      expect(comet.vx).toBeGreaterThan(0);
    } finally { Math.random = origRandom; }
  });
});

describe("tickComet", () => {
  const baseComet = {
    x: 100, y: 200, vx: 600, vy: 300,
    speed: 600, tailLength: 150, headRadius: 1.8,
    color: { tailFade: "", tail: "", glow: "", head: "" },
    status: "flying" as const,
    waitRemaining: 0,
  };

  it("advances position by velocity × delta", () => {
    const next = tickComet(baseComet, 100, W, H);
    expect(next.x).toBeCloseTo(100 + 600 * 0.1);
    expect(next.y).toBeCloseTo(200 + 300 * 0.1);
  });

  it("transitions to 'waiting' when head exits canvas bounds", () => {
    const comet = { ...baseComet, x: W + 200, y: H / 2, vy: 0 };
    expect(tickComet(comet, 16, W, H).status).toBe("waiting");
  });

  it("waitRemaining is between 4000 and 12000 ms after transition to waiting", () => {
    const comet = { ...baseComet, x: W + 200, y: H / 2, vy: 0 };
    const next = tickComet(comet, 16, W, H);
    expect(next.waitRemaining).toBeGreaterThanOrEqual(4000);
    expect(next.waitRemaining).toBeLessThanOrEqual(12000);
  });

  it("does not change position while waiting", () => {
    const comet = { ...baseComet, x: 999, y: 888, status: "waiting" as const, waitRemaining: 5000 };
    const next = tickComet(comet, 100, W, H);
    expect(next.x).toBe(999);
    expect(next.y).toBe(888);
  });

  it("decrements waitRemaining while waiting", () => {
    const comet = { ...baseComet, status: "waiting" as const, waitRemaining: 5000 };
    expect(tickComet(comet, 200, W, H).waitRemaining).toBeCloseTo(4800);
  });

  it("spawns a new flying comet when waitRemaining reaches zero", () => {
    const comet = { ...baseComet, status: "waiting" as const, waitRemaining: 100 };
    expect(tickComet(comet, 200, W, H).status).toBe("flying");
  });
});
