import Image from "next/image";
import Link from "next/link";
import { hasCaseStudy, type Project } from "@/content/projects";
import Arrow from "./Arrow";
import Tag from "./Tag";
import { asset } from "@/lib/asset";

const accents = ["bg-accent-soft", "bg-coral/15", "bg-mint/15", "bg-sky/15", "bg-sun/20"];

type Props = { project: Project; index: number; size: "large" | "small" };

export default function ProjectCard({ project, index, size }: Props) {
  const caseStudy = hasCaseStudy(project);
  const href = caseStudy ? `/work/${project.slug}` : project.links[0]?.url;
  const external = !caseStudy;
  const large = size === "large";

  const content = (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl ${accents[index % accents.length]} ${
          large ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={asset(project.cover.src)}
          alt={project.cover.alt}
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          priority={index === 0 && large}
        />
      </div>
      <div className={large ? "flex flex-col justify-center gap-3" : "mt-4 flex flex-col gap-2"}>
        <div className="flex items-baseline gap-2">
          <h3 className={`font-display ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {project.title}
          </h3>
          {project.formerName && (
            <span className="text-xs text-muted">formerly {project.formerName}</span>
          )}
        </div>
        <p className="text-muted">{large ? project.summary : project.tagline}</p>
        {large && <p className="text-sm font-medium">{project.role}</p>}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, large ? 5 : 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {caseStudy ? "Read case study" : "View in Figma"}
          <Arrow
            direction={external ? "up-right" : "right"}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </>
  );

  const className = `group block ${large ? "grid items-center gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10" : ""}`;

  if (!href) return <div className={className}>{content}</div>;

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
