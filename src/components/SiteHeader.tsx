import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-full bg-ink px-4 py-1.5 font-medium text-bg transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
