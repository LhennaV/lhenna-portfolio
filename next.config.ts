import type { NextConfig } from "next";

// GitHub Pages serves this repo at /lhenna-portfolio. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH; locally it's empty so `npm run dev` stays at localhost:3000.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
