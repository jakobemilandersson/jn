import { useEffect, useRef } from "react";
import { type Comet, spawnComet, tickComet, drawComet, sampleSpawnInterval } from "./comet";
import { useSpaceSettingsStore } from "./spaceSettingsStore";

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

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settings = useSpaceSettingsStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = window.devicePixelRatio || 1;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const stars: Star[] = Array.from({ length: settings.starCount }, () => {
      const r =
        settings.starSizeMin +
        Math.random() * (settings.starSizeMax - settings.starSizeMin);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        baseOpacity: 1.0,
        cycle: 4000 + Math.random() * 6000,
        off: 300 + Math.random() * 400,
        fade: 250 + Math.random() * 250,
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

    // Parallel comet scheduler: spawn countdown starts when a comet is created,
    // not when it exits the screen. Multiple comets may be alive simultaneously.
    let comets: Comet[] = [];
    // Start the first countdown at a random interval so the first comet doesn't
    // always appear at t=0.
    let spawnCountdown = reducedMotion ? Infinity : sampleSpawnInterval(settings);

    let prevTime: number | null = null;
    let rafId = 0;

    const animate = (time: number) => {
      const delta = prevTime !== null ? time - prevTime : 0;
      prevTime = time;

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
          const p = (t - visibleEnd) / s.fade;
          opacity = s.baseOpacity * (1 - p);
        } else if (t > fadeOutEnd && t <= darkEnd) {
          opacity = 0;
        } else if (t > darkEnd) {
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

      if (!reducedMotion) {
        // Tick countdown and spawn when it fires
        spawnCountdown -= delta;
        if (spawnCountdown <= 0) {
          comets.push(spawnComet(width, height, settings));
          spawnCountdown = sampleSpawnInterval(settings);
        }

        // Tick all live comets, discard ones that exited
        const next: Comet[] = [];
        for (const c of comets) {
          const ticked = tickComet(c, delta, width, height);
          if (ticked !== null) next.push(ticked);
        }
        comets = next;

        for (const c of comets) {
          drawComet(ctx, c);
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  // Re-run when star-related settings change so count/sizes are regenerated.
  // Comet settings (speed, size, spawn interval) are read live from `settings`
  // inside the animation loop and take effect on the next spawn naturally.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.starSizeMin,
    settings.starSizeMax,
    settings.starCount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
