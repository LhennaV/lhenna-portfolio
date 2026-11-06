import Link from "next/link";
import { site } from "@/content/site";
import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="logo-link font-display text-lg">
          {site.shortName}
          <span className="logo-dot inline-block text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm sm:gap-2">
          <NavLinks />
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn ml-1 hidden rounded-full bg-ink px-4 py-1.5 font-medium text-bg sm:inline-block"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
