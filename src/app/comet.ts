export type CometStatus = "flying" | "waiting";

export type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tailLength: number;
  status: CometStatus;
  waitRemaining: number;
};

const SPEED = 600; // px/s
const MIN_WAIT = 4000; // ms
const MAX_WAIT = 12000; // ms
const MIN_TAIL = 120; // px
const MAX_TAIL = 180; // px

type Edge = "top" | "right" | "bottom" | "left";

const EDGES: Edge[] = ["top", "right", "bottom", "left"];

export function spawnComet(width: number, height: number): Comet {
  const edge = EDGES[Math.floor(Math.random() * EDGES.length)];

  // Diagonal angle offset from the "straight across" direction,
  // biased so the comet always goes away from its spawning edge.
  const angleSpread = Math.PI / 4; // ±45°
  const angleJitter = (Math.random() - 0.5) * 2 * angleSpread;

  let x: number;
  let y: number;
  let baseAngle: number;

  switch (edge) {
    case "top":
      x = Math.random() * width;
      y = 0;
      baseAngle = Math.PI / 2; // straight down
      break;
    case "right":
      x = width;
      y = Math.random() * height;
      baseAngle = Math.PI; // straight left
      break;
    case "bottom":
      x = Math.random() * width;
      y = height;
      baseAngle = -Math.PI / 2; // straight up
      break;
    case "left":
    default:
      x = 0;
      y = Math.random() * height;
      baseAngle = 0; // straight right
      break;
  }

  const angle = baseAngle + angleJitter;
  const tailLength = MIN_TAIL + Math.random() * (MAX_TAIL - MIN_TAIL);

  return {
    x,
    y,
    vx: Math.cos(angle) * SPEED,
    vy: Math.sin(angle) * SPEED,
    tailLength,
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
    if (next <= 0) {
      return spawnComet(width, height);
    }
    return { ...comet, waitRemaining: next };
  }

  const deltaS = deltaMs / 1000;
  const nx = comet.x + comet.vx * deltaS;
  const ny = comet.y + comet.vy * deltaS;

  // Check if the head has fully exited the canvas
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

  const { x, y, vx, vy, tailLength } = comet;

  // Unit vector pointing from head back along the tail
  const speed = Math.sqrt(vx * vx + vy * vy);
  const ux = -vx / speed;
  const uy = -vy / speed;

  const tailX = x + ux * tailLength;
  const tailY = y + uy * tailLength;

  const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
  gradient.addColorStop(0, "rgba(180, 210, 255, 0)");
  gradient.addColorStop(1, "rgba(220, 235, 255, 0.85)");

  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = gradient;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Glowing head
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(200, 225, 255, 0.9)";
  ctx.fillStyle = "rgba(235, 245, 255, 1)";
  ctx.beginPath();
  ctx.arc(x, y, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
