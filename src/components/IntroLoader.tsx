"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Full-screen intro: "Lhenna." + a 000 → 100 counter with Stormi walking along the
// progress bar, then the panel slides up and the hero reveals start.
//
// Whether it plays is decided before paint by the inline script in layout.tsx,
// which sets <html data-intro="playing" | "skip">. It plays once per browser
// session and never with reduced motion. Without JS it never shows (CSS only
// displays it while data-intro="playing").
const FILL_MS = 1300;
const EXIT_MS = 800;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "playing") {
      setGone(true);
      return;
    }
    // A plain ~60fps timer (not requestAnimationFrame) so the count still finishes
    // if the page loads in a background tab.
    const start = Date.now();
    let exit: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      const t = Math.min((Date.now() - start) / FILL_MS, 1);
      setProgress(Math.round(easeInOutCubic(t) * 100));
      if (t >= 1) {
        clearInterval(timer);
        exit = setTimeout(() => setLeaving(true), 200);
      }
    }, 16);
    return () => {
      clearInterval(timer);
      clearTimeout(exit);
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    // Start the hero reveals as the panel lifts, and unlock scrolling.
    document.documentElement.dataset.intro = "done";
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    const t = setTimeout(() => setGone(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  if (gone) return null;

  return (
    <div aria-hidden className={`intro ${leaving ? "is-leaving" : ""}`}>
      <div className="intro-content flex flex-col items-center gap-3 text-center">
        <p className="font-display text-5xl sm:text-6xl">
          Lhenna<span className="text-coral">.</span>
        </p>
        <p className="max-w-[28ch] text-sm opacity-75">I design it, I build it, and then I nap.</p>
      </div>

      <div className="intro-content w-[min(22rem,72vw)]">
        <div className="relative h-0.5 rounded-full bg-current/20">
          <div className="h-full rounded-full bg-coral" style={{ width: `${progress}%` }} />
          <Image
            src={asset("/images/about/stormi-sit.png")}
            alt=""
            width={21}
            height={27}
            priority
            className="pixelated absolute bottom-0.5 -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-wider opacity-70">
          <span>Loading</span>
          <span className="tabular-nums">{String(progress).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
