export type CometStatus = "flying" | "waiting";

export type CometColor = {
  /** Tail fade-in rgba string (fully transparent end) */
  tailFade: string;
  /** Tail opaque rgba string (head end) */
  tail: string;
  /** Glow shadow rgba string */
  glow: string;
  /** Head fill rgba string */
  head: string;
};

export type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  tailLength: number;
  headRadius: number;
  color: CometColor;
  status: CometStatus;
  waitRemaining: number;
};

const MIN_WAIT = 4000; // ms
const MAX_WAIT = 12000; // ms
const MIN_TRAVEL = 400; // px

// --- Presets ---

const SPEED_PRESETS = [350, 600, 950] as const; // px/s: slow, normal, fast

const SIZE_PRESETS = [
  { tailMin: 80,  tailMax: 100, headRadius: 1.2 }, // small
  { tailMin: 120, tailMax: 180, headRadius: 1.8 }, // normal
  { tailMin: 220, tailMax: 280, headRadius: 2.6 }, // large
] as const;

const COLOR_PRESETS: CometColor[] = [
  // Ice blue (default)
  {
    tailFade: "rgba(180, 210, 255, 0)",
    tail:     "rgba(220, 235, 255, 0.85)",
    glow:     "rgba(200, 225, 255, 0.9)",
    head:     "rgba(235, 245, 255, 1)",
  },
  // Warm gold
  {
    tailFade: "rgba(255, 220, 130, 0)",
    tail:     "rgba(255, 210, 100, 0.85)",
    glow:     "rgba(255, 200, 80, 0.9)",
    head:     "rgba(255, 240, 180, 1)",
  },
  // Soft white
  {
    tailFade: "rgba(230, 230, 230, 0)",
    tail:     "rgba(245, 245, 245, 0.85)",
    glow:     "rgba(255, 255, 255, 0.85)",
    head:     "rgba(255, 255, 255, 1)",
  },
];

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Edge = "top" | "right" | "bottom" | "left";
const EDGES: Edge[] = ["top", "right", "bottom", "left"];

/**
 * Returns the distance (in px) the comet will travel from (x, y) in direction
 * (vx, vy) before its head exits the canvas bounds.
 * Pure function — no side effects.
 */
export function travelDistance(
  x: number,
  y: number,
  vx: number,
  vy: number,
  width: number,
  height: number
): number {
  const speed = Math.sqrt(vx * vx + vy * vy);
  if (speed === 0) return 0;

  const ux = vx / speed;
  const uy = vy / speed;

  const ts: number[] = [];
  if (ux > 0) ts.push((width - x) / ux);
  else if (ux < 0) ts.push(-x / ux);
  if (uy > 0) ts.push((height - y) / uy);
  else if (uy < 0) ts.push(-y / uy);

  const positiveTs = ts.filter((t) => t > 0);
  if (positiveTs.length === 0) return 0;
  return Math.min(...positiveTs);
}

export function spawnComet(width: number, height: number): Comet {
  const edge = pickRandom(EDGES);
  const speedPreset = pickRandom(SPEED_PRESETS);
  const sizePreset  = pickRandom(SIZE_PRESETS);
  const colorPreset = pickRandom(COLOR_PRESETS);

  const angleSpread = Math.PI / 4;
  const angleJitter = (Math.random() - 0.5) * 2 * angleSpread;

  let x: number;
  let y: number;
  let baseAngle: number;

  switch (edge) {
    case "top":
      x = Math.random() * width;
      y = 0;
      baseAngle = Math.PI / 2;
      break;
    case "right":
      x = width;
      y = Math.random() * height;
      baseAngle = Math.PI;
      break;
    case "bottom":
      x = Math.random() * width;
      y = height;
      baseAngle = -Math.PI / 2;
      break;
    case "left":
    default:
      x = 0;
      y = Math.random() * height;
      baseAngle = 0;
      break;
  }

  // Nudge angle toward straight-across until MIN_TRAVEL is satisfied.
  // Uses per-spawn speedPreset so the guarantee holds at all speeds.
  let jitter = angleJitter;
  let angle  = baseAngle + jitter;
  const maxIterations = 16;

  for (let i = 0; i < maxIterations; i++) {
    const vx = Math.cos(angle) * speedPreset;
    const vy = Math.sin(angle) * speedPreset;
    if (travelDistance(x, y, vx, vy, width, height) >= MIN_TRAVEL) break;
    jitter *= 0.5;
    angle   = baseAngle + jitter;
  }

  const tailLength =
    sizePreset.tailMin +
    Math.random() * (sizePreset.tailMax - sizePreset.tailMin);

  return {
    x,
    y,
    vx: Math.cos(angle) * speedPreset,
    vy: Math.sin(angle) * speedPreset,
    speed: speedPreset,
    tailLength,
    headRadius: sizePreset.headRadius,
    color: colorPreset,
    status: "flying",
    waitRemaining: 0,
  };
}

export function tickComet(
  comet: Comet,
  deltaMs: number,
  width: number,
  height: number
): Comet {
  if (comet.status === "waiting") {
    const next = comet.waitRemaining - deltaMs;
    if (next <= 0) return spawnComet(width, height);
    return { ...comet, waitRemaining: next };
  }

  const deltaS = deltaMs / 1000;
  const nx = comet.x + comet.vx * deltaS;
  const ny = comet.y + comet.vy * deltaS;

  const margin = comet.tailLength;
  const exited =
    nx < -margin ||
    nx > width + margin ||
    ny < -margin ||
    ny > height + margin;

  if (exited) {
    return {
      ...comet,
      x: nx,
      y: ny,
      status: "waiting",
      waitRemaining: MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT),
    };
  }

  return { ...comet, x: nx, y: ny };
}

export function drawComet(
  ctx: CanvasRenderingContext2D,
  comet: Comet
): void {
  if (comet.status === "waiting") return;

  const { x, y, vx, vy, tailLength, headRadius, color } = comet;

  const speed = Math.sqrt(vx * vx + vy * vy);
  const ux = -vx / speed;
  const uy = -vy / speed;

  const tailX = x + ux * tailLength;
  const tailY = y + uy * tailLength;

  const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
  gradient.addColorStop(0, color.tailFade);
  gradient.addColorStop(1, color.tail);

  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = gradient;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.shadowBlur = 10;
  ctx.shadowColor = color.glow;
  ctx.fillStyle = color.head;
  ctx.beginPath();
  ctx.arc(x, y, headRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
