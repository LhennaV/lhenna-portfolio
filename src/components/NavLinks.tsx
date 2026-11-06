"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

// One lavender pill slides between links: it follows the hovered link, and
// otherwise rests on the section currently in view (homepage only).
export default function NavLinks() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Track which section is in view.
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(nav.findIndex((n) => n.id === e.target.id));
        }
      },
      // A section counts as "current" when it crosses the middle of the screen.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    // Above the first section (hero), nothing is active.
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onHome]);

  // Move the pill to the hovered link, else the active one.
  const target = hovered ?? active;
  useLayoutEffect(() => {
    const el = target === null ? null : linkRefs.current[target];
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [target]);

  return (
    <div className="relative flex items-center gap-1 sm:gap-2" onMouseLeave={() => setHovered(null)}>
      <span
        aria-hidden
        className="nav-pill absolute inset-y-0 rounded-full bg-accent-soft"
        style={{
          left: pill?.left ?? 0,
          width: pill?.width ?? 0,
          opacity: pill ? 1 : 0,
        }}
      />
      {nav.map((item, i) => (
        <Link
          key={item.id}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
          href={`/#${item.id}`}
          aria-current={active === i ? "location" : undefined}
          onMouseEnter={() => setHovered(i)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          onClick={() => setActive(i)}
          className={`nav-link relative rounded-full px-3 py-1.5 transition-colors ${
            target === i ? "text-ink" : "text-muted"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
