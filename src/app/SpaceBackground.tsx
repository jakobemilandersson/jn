import { useEffect, useRef } from "react";
import { type Comet, spawnComet, tickComet, drawComet, sampleSpawnInterval } from "./comet";
import { useSpaceSettingsStore, type SpaceSettings } from "./spaceSettingsStore";

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

  // Keep a live ref so the animation loop always reads the latest settings
  // without needing to restart the effect (which would reset the comet array).
  const settingsRef = useRef<SpaceSettings>(settings);
  useEffect(() => {
    settingsRef.current = settings;
  });

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

    const buildStars = (): Star[] =>
      Array.from({ length: settingsRef.current.starCount }, () => {
        const s = settingsRef.current;
        const r = s.starSizeMin + Math.random() * (s.starSizeMax - s.starSizeMin);
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

    let stars: Star[] = buildStars();

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

    let comets: Comet[] = [];
    let spawnCountdown = reducedMotion
      ? Infinity
      : sampleSpawnInterval(settingsRef.current);

    // Track star-seeding deps so we can reseed inside the loop when they change
    // without restarting the effect.
    let prevStarCount = settingsRef.current.starCount;
    let prevStarSizeMin = settingsRef.current.starSizeMin;
    let prevStarSizeMax = settingsRef.current.starSizeMax;

    let prevTime: number | null = null;
    let rafId = 0;

    const animate = (time: number) => {
      const s = settingsRef.current;
      const delta = prevTime !== null ? time - prevTime : 0;
      prevTime = time;

      // Reseed stars if star-related settings changed
      if (
        s.starCount !== prevStarCount ||
        s.starSizeMin !== prevStarSizeMin ||
        s.starSizeMax !== prevStarSizeMax
      ) {
        stars = buildStars();
        prevStarCount = s.starCount;
        prevStarSizeMin = s.starSizeMin;
        prevStarSizeMax = s.starSizeMax;
      }

      ctx.fillStyle = BASE_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawBackground();

      for (const star of stars) {
        const t = (time + star.offset) % star.cycle;
        const visibleEnd = star.cycle - (star.off + star.fade * 2);
        const fadeOutEnd = visibleEnd + star.fade;
        const darkEnd = fadeOutEnd + star.off;

        let opacity = star.baseOpacity;
        if (t > visibleEnd && t <= fadeOutEnd) {
          opacity = star.baseOpacity * (1 - (t - visibleEnd) / star.fade);
        } else if (t > fadeOutEnd && t <= darkEnd) {
          opacity = 0;
        } else if (t > darkEnd) {
          opacity = star.baseOpacity * ((t - darkEnd) / star.fade);
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (!reducedMotion) {
        spawnCountdown -= delta;
        if (spawnCountdown <= 0) {
          comets.push(spawnComet(width, height, s));
          spawnCountdown = sampleSpawnInterval(s);
        }

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
    return () => cancelAnimationFrame(rafId);
  // Effect only restarts on canvas resize (no deps) — star/comet settings are
  // handled reactively via settingsRef inside the loop.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
