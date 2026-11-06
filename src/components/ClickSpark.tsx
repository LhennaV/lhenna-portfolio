"use client";

import { useEffect, useRef } from "react";

// Idea from React Bits' "Click Spark": short lines burst out from every click.
// Drawn on one full-screen canvas that never blocks clicks.
const COLORS = ["--coral", "--sun", "--mint", "--sky", "--accent"];
const SPARKS = 8;
const DURATION = 450; // ms
const RADIUS = 22; // how far sparks travel, px
const LENGTH = 9; // spark line length, px

type Spark = { x: number; y: number; angle: number; color: string; start: number };

export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const palette = COLORS.map((c) => styles.getPropertyValue(c).trim() || "#b69cff");
    let sparks: Spark[] = [];
    let frame = 0;
    let burst = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((s) => now - s.start < DURATION);
      for (const s of sparks) {
        const t = (now - s.start) / DURATION;
        const eased = 1 - Math.pow(1 - t, 3); // ease-out
        const dist = eased * RADIUS;
        const len = LENGTH * (1 - eased);
        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x + dist * cos, s.y + dist * sin);
        ctx.lineTo(s.x + (dist + len) * cos, s.y + (dist + len) * sin);
        ctx.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      // Each burst gets one color, cycling through the palette.
      const color = palette[burst++ % palette.length];
      for (let i = 0; i < SPARKS; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, angle: (2 * Math.PI * i) / SPARKS, color, start: now });
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
    />
  );
}
