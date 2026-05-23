import { describe, it, expect } from "vitest";
import { spawnComet, tickComet } from "../../src/app/comet";

const W = 1280;
const H = 800;

describe("spawnComet", () => {
  it("returns a comet with status 'flying'", () => {
    const comet = spawnComet(W, H);
    expect(comet.status).toBe("flying");
  });

  it("spawns with x on the canvas width range or at an edge", () => {
    // Run many times to exercise all edges
    for (let i = 0; i < 200; i++) {
      const comet = spawnComet(W, H);
      const onHorizontalEdge = comet.x >= 0 && comet.x <= W;
      const onVerticalEdge = comet.y >= 0 && comet.y <= H;
      const atLeft = comet.x === 0;
      const atRight = comet.x === W;
      const atTop = comet.y === 0;
      const atBottom = comet.y === H;
      expect(
        atLeft || atRight || atTop || atBottom ||
        (onHorizontalEdge && (atTop || atBottom)) ||
        (onVerticalEdge && (atLeft || atRight))
      ).toBe(true);
    }
  });

  it("velocity is directed away from the top edge when spawned there", () => {
    // Force top-edge spawn by mocking Math.random deterministically
    // We test the contract: when y===0, vy must be positive (downward)
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => {
      calls++;
      // First call selects edge index: 0 → top
      if (calls === 1) return 0;
      // Remaining calls: midpoint values
      return 0.5;
    };
    try {
      const comet = spawnComet(W, H);
      expect(comet.y).toBe(0);
      expect(comet.vy).toBeGreaterThan(0);
    } finally {
      Math.random = origRandom;
    }
  });

  it("velocity is directed away from the right edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => {
      calls++;
      if (calls === 1) return 1 / 4 + 0.01; // → index 1 → right
      return 0.5;
    };
    try {
      const comet = spawnComet(W, H);
      expect(comet.x).toBe(W);
      expect(comet.vx).toBeLessThan(0);
    } finally {
      Math.random = origRandom;
    }
  });

  it("velocity is directed away from the bottom edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => {
      calls++;
      if (calls === 1) return 2 / 4 + 0.01; // → index 2 → bottom
      return 0.5;
    };
    try {
      const comet = spawnComet(W, H);
      expect(comet.y).toBe(H);
      expect(comet.vy).toBeLessThan(0);
    } finally {
      Math.random = origRandom;
    }
  });

  it("velocity is directed away from the left edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => {
      calls++;
      if (calls === 1) return 3 / 4 + 0.01; // → index 3 → left
      return 0.5;
    };
    try {
      const comet = spawnComet(W, H);
      expect(comet.x).toBe(0);
      expect(comet.vx).toBeGreaterThan(0);
    } finally {
      Math.random = origRandom;
    }
  });
});

describe("tickComet", () => {
  it("advances position by velocity × delta", () => {
    const comet = { x: 100, y: 200, vx: 600, vy: 300, tailLength: 150, status: "flying" as const, waitRemaining: 0 };
    const next = tickComet(comet, 100, W, H); // 100ms delta
    expect(next.x).toBeCloseTo(100 + 600 * 0.1);
    expect(next.y).toBeCloseTo(200 + 300 * 0.1);
  });

  it("transitions to 'waiting' when head exits canvas bounds", () => {
    // Place comet just off the right edge
    const comet = { x: W + 200, y: H / 2, vx: 600, vy: 0, tailLength: 150, status: "flying" as const, waitRemaining: 0 };
    const next = tickComet(comet, 16, W, H);
    expect(next.status).toBe("waiting");
  });

  it("waitRemaining is between 4000 and 12000 ms after transition to waiting", () => {
    const comet = { x: W + 200, y: H / 2, vx: 600, vy: 0, tailLength: 150, status: "flying" as const, waitRemaining: 0 };
    const next = tickComet(comet, 16, W, H);
    expect(next.waitRemaining).toBeGreaterThanOrEqual(4000);
    expect(next.waitRemaining).toBeLessThanOrEqual(12000);
  });

  it("does not change position while waiting", () => {
    const comet = { x: 999, y: 888, vx: 600, vy: 300, tailLength: 150, status: "waiting" as const, waitRemaining: 5000 };
    const next = tickComet(comet, 100, W, H);
    expect(next.x).toBe(999);
    expect(next.y).toBe(888);
  });

  it("decrements waitRemaining while waiting", () => {
    const comet = { x: 0, y: 0, vx: 0, vy: 0, tailLength: 150, status: "waiting" as const, waitRemaining: 5000 };
    const next = tickComet(comet, 200, W, H);
    expect(next.waitRemaining).toBeCloseTo(4800);
  });

  it("spawns a new flying comet when waitRemaining reaches zero", () => {
    const comet = { x: 0, y: 0, vx: 0, vy: 0, tailLength: 150, status: "waiting" as const, waitRemaining: 100 };
    const next = tickComet(comet, 200, W, H);
    expect(next.status).toBe("flying");
  });
});
