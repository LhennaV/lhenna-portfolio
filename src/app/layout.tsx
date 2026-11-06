import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Caveat, Young_Serif } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClickSpark from "@/components/ClickSpark";
import IntroLoader from "@/components/IntroLoader";
import { site } from "@/content/site";

const body = Atkinson_Hyperlegible({ variable: "--font-body", subsets: ["latin"], weight: ["400", "700"] });
const display = Young_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400" });
// Handwritten captions on the hero photo doodles
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.shortName} Velasco`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
};

// Runs before first paint: decide whether the intro loader plays (once per
// session, never with reduced motion). See IntroLoader.tsx.
const introScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="skip"}else{d.dataset.intro="playing"}}catch(e){d.dataset.intro="skip"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${hand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ClickSpark />
        <IntroLoader />
      </body>
    </html>
  );
}
