"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { asset } from "@/lib/asset";

// Hover (or tap) the portrait: it turns into a "photo dump" sticker (white cut-out
// outline) covered in marker doodles + handwritten captions that keep swapping.
// Lines wobble like stop-motion so they read as hand-drawn, not vector-clean.
//
// Coordinates are % of the square photo (viewBox 0..100). Face landmarks: eyes
// y≈35 (x≈41.5 and 60), nose tip ≈ (50.5, 46.5), mouth ≈ (51, 54), head top ≈ y 4.
// Face skin is light, so doodles ON the face use coral/dark; everything around
// her (hair, jacket, background) uses white marker.

const INK = {
  white: "#ffffff",
  pink: "#ffb3cf",
  coral: "#ff8a80",
  sun: "#ffd166",
  sky: "#7cc4ff",
  dark: "#1b1625",
};
type Ink = keyof typeof INK;

type Stroke = { d: string; c: Ink; fill?: Ink; w?: number; fo?: number };
type Caption = { text: string; x: number; y: number; rot: number; size?: number; c?: Ink };
type DoodleSet = { strokes: Stroke[]; captions: Caption[] };

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;

const heart = (x: number, y: number, s: number) =>
  `M${x} ${y + 0.3 * s} C${x} ${y - 0.2 * s} ${x + 0.5 * s} ${y - 0.2 * s} ${x + 0.5 * s} ${y + 0.3 * s} ` +
  `C${x + 0.5 * s} ${y - 0.2 * s} ${x + s} ${y - 0.2 * s} ${x + s} ${y + 0.3 * s} ` +
  `C${x + s} ${y + 0.65 * s} ${x + 0.5 * s} ${y + 0.85 * s} ${x + 0.5 * s} ${y + s} ` +
  `C${x + 0.5 * s} ${y + 0.85 * s} ${x} ${y + 0.65 * s} ${x} ${y + 0.3 * s} Z`;

// 4-point sparkle
const sparkle = (x: number, y: number, s: number) =>
  `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;

// Hand-drawn asterisk star
const star = (x: number, y: number, s: number) =>
  `M${x} ${y - s} L${x} ${y + s} M${x - s * 0.9} ${y - s * 0.5} L${x + s * 0.9} ${y + s * 0.5} M${x - s * 0.9} ${y + s * 0.5} L${x + s * 0.9} ${y - s * 0.5}`;

const blush: Stroke[] = [
  { d: circle(38.5, 48, 3), c: "pink", fill: "pink", w: 0, fo: 0.6 },
  { d: circle(62.5, 48, 3), c: "pink", fill: "pink", w: 0, fo: 0.6 },
];

const SETS: DoodleSet[] = [
  {
    // Stormi mode
    strokes: [
      { d: "M32 19 L35 3 L45 12", c: "white", w: 1.5 },
      { d: "M56 12 L66 3 L69 19", c: "white", w: 1.5 },
      { d: "M35.5 11 L37 6.5 L40.5 10", c: "pink", w: 1 },
      { d: "M60 10 L64 6.5 L65.5 11", c: "pink", w: 1 },
      { d: "M40 48 L28 46", c: "coral" },
      { d: "M40 50.5 L28 51.5", c: "coral" },
      { d: "M61 48 L73 46", c: "coral" },
      { d: "M61 50.5 L73 51.5", c: "coral" },
      { d: "M48.8 44.6 L52.2 44.6 L50.5 46.9 Z", c: "coral", fill: "coral", w: 0.6 },
      { d: star(14, 14, 3), c: "white" },
      { d: heart(80, 12, 6), c: "white", w: 1 },
    ],
    captions: [
      { text: "stormi mode", x: 22, y: 86, rot: -8 },
      { text: "meow.", x: 84, y: 30, rot: 10, size: 7.5 },
    ],
  },
  {
    // Too cool
    strokes: [
      { d: "M34.5 31.5 H48 V36 Q48 41 41.25 41 Q34.5 41 34.5 36 Z", c: "white", fill: "dark", w: 0.9 },
      { d: "M53 31.5 H66.5 V36 Q66.5 41 59.75 41 Q53 41 53 36 Z", c: "white", fill: "dark", w: 0.9 },
      { d: "M48 33 Q50.5 31.5 53 33", c: "dark", w: 1.2 },
      { d: "M34.5 32.5 L29 31", c: "dark", w: 1.2 },
      { d: "M66.5 32.5 L72 31", c: "dark", w: 1.2 },
      { d: "M37 33.5 L39.5 36.5", c: "white", w: 0.8 },
      { d: "M55.5 33.5 L58 36.5", c: "white", w: 0.8 },
      { d: sparkle(84, 16, 4.5), c: "white", fill: "white", w: 0.5 },
      { d: sparkle(14, 26, 3), c: "white", fill: "white", w: 0.5 },
      { d: "M10 70 Q20 64 26 72", c: "white" },
      { d: "M23 68 L26 72 L21 73", c: "white" },
    ],
    captions: [{ text: "too cool 4 u", x: 76, y: 82, rot: -6 }],
  },
  {
    // Queen of Figma
    strokes: [
      { d: "M37 15 L39 3 L44.5 9.5 L50 1 L55.5 9.5 L61 3 L63 15 Z", c: "white", fill: "sun", w: 1 },
      { d: circle(50, 11.5, 1.3), c: "coral", fill: "coral", w: 0 },
      { d: circle(43.5, 12.5, 1), c: "sky", fill: "sky", w: 0 },
      { d: circle(56.5, 12.5, 1), c: "pink", fill: "pink", w: 0 },
      ...blush,
      { d: star(18, 12, 3), c: "white" },
      { d: star(83, 10, 2.5), c: "white" },
      { d: "M8 92 Q30 88 52 93", c: "pink", w: 1.2 },
    ],
    captions: [{ text: "queen of figma", x: 30, y: 86, rot: -4 }],
  },
  {
    // Very serious designer
    strokes: [
      { d: circle(41.5, 35, 6.5), c: "dark", w: 1.3 },
      { d: circle(60, 35, 6.5), c: "dark", w: 1.3 },
      { d: "M48 34.5 Q50.75 32.5 53.5 34.5", c: "dark", w: 1.3 },
      { d: "M35 34 L30 33", c: "dark", w: 1.2 },
      { d: "M66.5 34 L71.5 33", c: "dark", w: 1.2 },
      { d: "M50.5 49.8 Q46 46.8 42.5 49.8 Q41 51.3 39.3 49.3", c: "dark", w: 1.6 },
      { d: "M50.5 49.8 Q55 46.8 58.5 49.8 Q60 51.3 61.7 49.3", c: "dark", w: 1.6 },
      { d: star(82, 12, 3.5), c: "white" },
      { d: star(16, 20, 2.5), c: "white" },
      { d: "M6 90 Q24 86 44 90", c: "white", w: 0.9 },
    ],
    captions: [
      { text: "very serious", x: 24, y: 78, rot: -7 },
      { text: "designer", x: 26, y: 86, rot: -7 },
    ],
  },
  {
    // Lovestruck
    strokes: [
      { d: heart(8, 18, 10), c: "white", w: 1.1 },
      { d: heart(78, 6, 9), c: "pink", fill: "pink", w: 0.8 },
      { d: heart(84, 36, 6), c: "white", w: 1 },
      { d: heart(10, 46, 5), c: "pink", fill: "pink", w: 0.8 },
      { d: heart(80, 54, 4), c: "white", w: 0.9 },
      ...blush,
      { d: star(22, 6, 2.5), c: "white" },
    ],
    captions: [{ text: "hi there ♡", x: 74, y: 84, rot: 6 }],
  },
  {
    // Lowkey evil
    strokes: [
      { d: "M39 15 Q31 9 34 1 Q37 8 44 11 Z", c: "white", fill: "coral", w: 0.9 },
      { d: "M61 15 Q69 9 66 1 Q63 8 56 11 Z", c: "white", fill: "coral", w: 0.9 },
      { d: "M35 27.5 L46.5 30.5", c: "dark", w: 1.6 },
      { d: "M66 27.5 L54.5 30.5", c: "dark", w: 1.6 },
      { d: "M74 78 Q88 76 85 63 Q83 55 88 51", c: "white", w: 1.4 },
      { d: "M85.5 48 L92 50 L87.5 55 Z", c: "white", fill: "coral", w: 0.9 },
      { d: star(14, 18, 3), c: "white" },
    ],
    captions: [{ text: "lowkey evil", x: 24, y: 86, rot: -6 }],
  },
  {
    // Angel (mostly)
    strokes: [
      { d: "M37 5 A13 3.5 0 1 0 63 5 A13 3.5 0 1 0 37 5", c: "white", w: 1.6 },
      { d: "M38.5 5.5 A11.5 2.5 0 1 0 61.5 5.5", c: "sun", w: 0.8 },
      { d: sparkle(18, 16, 3.5), c: "white", fill: "white", w: 0.5 },
      { d: sparkle(82, 22, 4), c: "white", fill: "white", w: 0.5 },
      { d: star(12, 40, 2.2), c: "white" },
      { d: star(88, 44, 2.5), c: "pink" },
      ...blush,
    ],
    captions: [
      { text: "angel", x: 22, y: 80, rot: -8 },
      { text: "(mostly)", x: 26, y: 88, rot: -8, size: 6, c: "pink" },
    ],
  },
];

// Timeline: hover → doodle sets keep swapping while the photo grows and shakes
// harder → BOOM (flash, shockwave, flying confetti) → back to the plain photo.
// Doodle swaps speed up as the photo grows: SWAP_START_MS between swaps at first,
// down to SWAP_END_MS right before the boom.
const SWAP_START_MS = 600;
const SWAP_END_MS = 70;
const CHARGE_MS = 3500;
const BOOM_MS = 900;

type Phase = "idle" | "charging" | "boom" | "rest";

type Particle = { d: string; color: string; tx: number; ty: number; r: number; size: number; delay: number };

const CONFETTI_SHAPES = [
  heart(2, 3, 16),
  sparkle(10, 10, 9),
  star(10, 10, 8),
  circle(10, 10, 5),
];
const CONFETTI_COLORS = ["#ffffff", INK.pink, INK.coral, INK.sun, INK.sky, "var(--accent)", "var(--mint)"];

function makeConfetti(count = 22): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 110 + Math.random() * 120; // px
    return {
      d: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length],
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      r: (Math.random() - 0.5) * 540,
      size: 12 + Math.random() * 14,
      delay: Math.random() * 60,
    };
  });
}

const randomOther = (prev: number) => {
  if (prev < 0) return Math.floor(Math.random() * SETS.length);
  const next = Math.floor(Math.random() * (SETS.length - 1));
  return next >= prev ? next + 1 : next;
};

export default function HeroPhoto() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [set, setSet] = useState(-1);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [calm, setCalm] = useState(false); // prefers-reduced-motion
  const hovered = useRef(false);

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // While charging: swap doodle sets faster and faster, then explode.
  // Reduced motion: swap at a slow steady pace and never explode.
  useEffect(() => {
    if (phase !== "charging") return;
    const startedAt = performance.now();
    let swap: ReturnType<typeof setTimeout>;
    const tick = () => {
      setSet(randomOther);
      const progress = Math.min((performance.now() - startedAt) / CHARGE_MS, 1);
      const delay = calm
        ? SWAP_START_MS * 2
        : SWAP_END_MS + (SWAP_START_MS - SWAP_END_MS) * Math.pow(1 - progress, 2);
      swap = setTimeout(tick, delay);
    };
    tick();
    const boom = calm
      ? undefined
      : setTimeout(() => {
          setConfetti(makeConfetti());
          setPhase("boom");
        }, CHARGE_MS);
    return () => {
      clearTimeout(swap);
      clearTimeout(boom);
    };
  }, [phase, calm]);

  // After the explosion settle back to the plain photo. While the mouse is still
  // on it, stay plain ("rest") until it leaves and comes back.
  useEffect(() => {
    if (phase !== "boom") return;
    const t = setTimeout(() => setPhase(hovered.current ? "rest" : "idle"), BOOM_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const start = () => setPhase((p) => (p === "idle" ? "charging" : p));
  const current = phase === "charging" ? SETS[set] : undefined;

  return (
    <div
      data-phase={phase}
      className="hero-photo relative w-40 sm:w-48 md:w-64 lg:w-72"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hovered.current = true;
        start();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hovered.current = false;
        setPhase((p) => (p === "boom" ? p : "idle"));
      }}
      onPointerUp={(e) => e.pointerType !== "mouse" && start()}
      style={{ "--charge": `${CHARGE_MS}ms` } as CSSProperties}
    >
      {/* The square frame stays put; only the cut-out photo (and its doodles) grows and shakes. */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-coral"
        aria-hidden
      />
      <div className="hero-photo-frame relative aspect-square overflow-hidden rounded-3xl bg-accent-soft">
        <span aria-hidden className="hero-flash" />
      </div>
      <div className="hero-cutout-layer absolute inset-0">
        <div className="hero-shake absolute inset-0">
          <Image
            src={asset("/images/about/lhenna.png")}
            alt="Portrait of Lhenna-Marie Velasco"
            fill
            priority
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 192px"
            className="hero-cutout object-cover object-bottom"
          />
          <svg viewBox="0 0 100 100" aria-hidden className="doodles">
            <defs>
              {/* Re-rolls a slight jitter 3x per cycle so lines "boil" like hand-drawn animation */}
              <filter id="doodle-wobble" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="1">
                  {!calm && (
                    <animate
                      attributeName="seed"
                      values="1;7;13"
                      dur="0.45s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  )}
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="1.3" />
              </filter>
            </defs>
            {current && (
              <g filter="url(#doodle-wobble)">
                {current.strokes.map((s, i) => (
                  <path
                    key={i}
                    d={s.d}
                    stroke={INK[s.c]}
                    strokeWidth={s.w ?? 1.1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={s.fill ? INK[s.fill] : "none"}
                    fillOpacity={s.fo ?? 1}
                  />
                ))}
                {current.captions.map((t) => (
                  <text
                    key={t.text}
                    x={t.x}
                    y={t.y}
                    textAnchor="middle"
                    fill={INK[t.c ?? "white"]}
                    fontSize={t.size ?? 8}
                    className="doodle-caption"
                    style={{ rotate: `${t.rot}deg` }}
                  >
                    {t.text}
                  </text>
                ))}
              </g>
            )}
          </svg>
        </div>
      </div>

      {phase === "boom" && (
        <div aria-hidden className="hero-boom">
          <span className="hero-ring" />
          {confetti.map((p, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className="hero-confetti"
              style={
                {
                  width: p.size,
                  height: p.size,
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  "--r": `${p.r}deg`,
                  animationDelay: `${p.delay}ms`,
                } as CSSProperties
              }
            >
              <path d={p.d} fill={p.color} stroke={p.color} strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
}
