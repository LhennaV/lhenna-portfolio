// Static export doesn't add basePath to next/image or metadata image paths,
// so files from /public go through this to work under /lhenna-portfolio on GitHub Pages.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
