import type { MetadataRoute } from "next";
import { hasCaseStudy, projects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    ...projects
      .filter(hasCaseStudy)
      .map((p) => ({ url: `${site.url}/work/${p.slug}/`, priority: 0.8 })),
  ];
}
