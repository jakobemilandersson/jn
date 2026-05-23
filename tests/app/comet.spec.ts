import { describe, it, expect } from "vitest";
import { spawnComet, tickComet, travelDistance } from "../../src/app/comet";

const W = 1280;
const H = 800;

describe("travelDistance", () => {
  it("returns the distance to the right edge for a rightward ray from the left", () => {
    // From (0, 400) going right at speed 1 → exits at x=1280, distance=1280
    expect(travelDistance(0, 400, 1, 0, W, H)).toBeCloseTo(W);
  });

  it("returns the distance to the bottom edge for a downward ray from the top", () => {
    expect(travelDistance(640, 0, 0, 1, W, H)).toBeCloseTo(H);
  });

  it("returns the shorter of two exit distances for a diagonal ray", () => {
    // From (0,0) with vx=vy=1, speed=√2, unit vector=(1/√2, 1/√2)
    // Distance to bottom edge = H / (1/√2) = H√2 ≈ 1131
    // Distance to right edge  = W / (1/√2) = W√2 ≈ 1810
    // Bottom is closer, so result = H√2
    expect(travelDistance(0, 0, 1, 1, W, H)).toBeCloseTo(H * Math.SQRT2);
  });

  it("returns 0 for zero velocity", () => {
    expect(travelDistance(640, 400, 0, 0, W, H)).toBe(0);
  });

  it("handles a corner spawn aimed diagonally inward", () => {
    const dist = travelDistance(0, 0, 600, 600, W, H);
    expect(dist).toBeGreaterThan(0);
  });
});

describe("spawnComet", () => {
  it("returns a comet with status 'flying'", () => {
    const comet = spawnComet(W, H);
    expect(comet.status).toBe("flying");
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
        comet.x === 0 ||
        comet.x === W ||
        comet.y === 0 ||
        comet.y === H;
      expect(onEdge).toBe(true);
    }
  });

  it("velocity is directed away from the top edge when spawned there", () => {
    let calls = 0;
    const origRandom = Math.random;
    Math.random = () => {
      calls++;
      if (calls === 1) return 0;
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
      if (calls === 1) return 1 / 4 + 0.01;
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
      if (calls === 1) return 2 / 4 + 0.01;
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
      if (calls === 1) return 3 / 4 + 0.01;
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
    const next = tickComet(comet, 100, W, H);
    expect(next.x).toBeCloseTo(100 + 600 * 0.1);
    expect(next.y).toBeCloseTo(200 + 300 * 0.1);
  });

  it("transitions to 'waiting' when head exits canvas bounds", () => {
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
