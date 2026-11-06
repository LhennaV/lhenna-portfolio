import Image from "next/image";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
        <div className="group flex items-center gap-3">
          <span className="opacity-0 transition-opacity group-hover:opacity-100">
            Quality assurance by Stormi
          </span>
          <Image
            src={asset("/images/about/stormi-sit.png")}
            alt="Pixel-art drawing of Stormi, a tortoiseshell cat"
            width={28}
            height={36}
            className="pixelated hover-wiggle"
          />
        </div>
      </div>
    </footer>
  );
}

