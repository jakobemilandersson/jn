import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  cycle: number;
  off: number;
  fade: number;
  offset: number;
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

    const dpr = window.devicePixelRatio || 1;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const starCount = Math.floor(width * height * DENSITY);

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const r =
        Math.random() < 0.5 ? 0.6 : Math.random() < 0.7 ? 1.0 : 1.4;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        baseOpacity: 1.0,
        cycle: 4000 + Math.random() * 6000, // 4–10s
        off: 300 + Math.random() * 400,     // fully dark duration
        fade: 250 + Math.random() * 250,    // fade in/out duration
        offset: Math.random() * 10000,
        color: STAR_COLORS[Math.random() < 0.75 ? 0 : 1],
      };
    });

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

    let rafId = 0;

    const animate = (time: number) => {
      ctx.fillStyle = BASE_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawBackground();

      for (const s of stars) {
        const t = (time + s.offset) % s.cycle;

        const visibleEnd = s.cycle - (s.off + s.fade * 2);
        const fadeOutEnd = visibleEnd + s.fade;
        const darkEnd = fadeOutEnd + s.off;

        let opacity = s.baseOpacity;

        if (t > visibleEnd && t <= fadeOutEnd) {
          // fade out
          const p = (t - visibleEnd) / s.fade;
          opacity = s.baseOpacity * (1 - p);
        } else if (t > fadeOutEnd && t <= darkEnd) {
          // fully dark
          opacity = 0;
        } else if (t > darkEnd) {
          // fade in
          const p = (t - darkEnd) / s.fade;
          opacity = s.baseOpacity * p;
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
