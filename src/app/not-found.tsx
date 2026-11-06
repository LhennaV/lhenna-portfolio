import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <Image
        src={asset("/images/about/stormi-sit.png")}
        alt="Pixel-art drawing of Stormi the cat"
        width={69}
        height={90}
        className="pixelated"
      />
      <h1 className="mt-6 font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">Stormi looked everywhere. This page isn&apos;t here.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </div>
  );
}
