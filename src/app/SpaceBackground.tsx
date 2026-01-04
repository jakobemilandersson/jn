import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  amplitude: number;
  speed: number;
  phase: number;
  color: string;
};

const BASE_COLOR = "#070b14";
const STAR_COLORS = ["#e8eef7", "#cfd8e6"];
const DENSITY = 0.00012;

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(width * height * DENSITY);
      stars = Array.from({ length: count }, () => {
        const r =
          Math.random() < 0.5 ? 0.6 : Math.random() < 0.7 ? 1.0 : 1.4;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          baseOpacity: 0.75,
          amplitude: 0.15,
          speed: 0.05 + Math.random() * 0.1,
          phase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.random() < 0.75 ? 0 : 1],
        };
      });
    };

    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      gradient.addColorStop(0, "#0b1220");
      gradient.addColorStop(1, "#05080f");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = (time: number) => {
      ctx.fillStyle = BASE_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawBackground();

      for (const s of stars) {
        const opacity =
          s.baseOpacity +
          Math.sin(time * 0.001 * s.speed + s.phase) * s.amplitude;

        ctx.globalAlpha = Math.max(0.6, Math.min(0.9, opacity));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
