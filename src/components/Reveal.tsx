"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Marks its children as "pending" once JS loads, then "shown" when scrolled into view.
// CSS in globals.css does the actual animation, so without JS everything stays visible.
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      // Fire once the top edge is ~10% into the viewport. A ratio threshold could
      // never be met by blocks taller than the screen, leaving them hidden.
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
