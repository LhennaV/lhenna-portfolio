import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import Reveal from "@/components/Reveal";
import ProcessSection from "@/components/ProcessSection";
import Tag from "@/components/Tag";
import Tilt from "@/components/Tilt";
import { getProject, hasCaseStudy, projects } from "@/content/projects";
import { asset } from "@/lib/asset";

const caseStudies = projects.filter(hasCaseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} case study`,
    description: project.summary,
    openGraph: { images: [project.cover.src] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const idx = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: project.status },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  const phones = project.gallery?.filter((g) => g.height > g.width && g.src !== project.cover.src) ?? [];
  const wides = project.gallery?.filter((g) => g.height <= g.width && g.src !== project.cover.src) ?? [];

  return (
    <article className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <Arrow direction="left" />
        All work
      </Link>

      <Reveal>
      <header className="mt-8">
        <h1 className="reveal-item font-display text-4xl sm:text-6xl">{project.title}</h1>
        {project.formerName && (
          <p className="mt-2 text-sm text-muted">Formerly {project.formerName}</p>
        )}
        <p style={{ "--i": 1 } as React.CSSProperties} className="reveal-item mt-4 max-w-2xl text-xl text-muted">{project.tagline}</p>

        <dl style={{ "--i": 2 } as React.CSSProperties} className="reveal-item mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="mt-1 text-sm">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div style={{ "--i": 3 } as React.CSSProperties} className="reveal-item mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pop inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink"
              >
                {l.label}
                <Arrow direction="up-right" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div style={{ "--i": 4 } as React.CSSProperties} className="reveal-item mt-12">
        <Tilt max={3} className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-accent-soft">
          <Image
            src={asset(project.cover.src)}
            alt={project.cover.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className={`object-cover ${project.cover.position ?? "object-top"}`}
          />
        </Tilt>
      </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-2xl space-y-14">
        {project.problem && (
          <section>
            <h2 className="font-display text-2xl">The problem</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.problem}</p>
          </section>
        )}
      </div>

      {project.process && <ProcessSection process={project.process} />}

      <div className="mx-auto mt-14 max-w-2xl space-y-14">
        {project.sections?.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <ul className="mt-4 space-y-3">
              {s.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-lg leading-relaxed text-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {project.stack && (
          <section>
            <h2 className="font-display text-2xl">Stack</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.stack}</p>
          </section>
        )}
      </div>

      {phones.length > 0 && (
        <section className="mt-20">
          <h2 className="sr-only">Screens</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {phones.map((g) => (
              <figure key={g.src}>
                <Tilt className="relative overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image src={asset(g.src)} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 640px) 33vw, 50vw" className="h-auto w-full" />
                </Tilt>
                {g.caption && <figcaption className="mt-2 text-center text-sm text-muted">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {wides.map((g) => (
        <figure key={g.src} className="mt-12">
          <Tilt max={3} className="relative overflow-hidden rounded-3xl border border-line">
            <Image src={asset(g.src)} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full" />
          </Tilt>
          {g.caption && <figcaption className="mt-2 text-center text-sm text-muted">{g.caption}</figcaption>}
        </figure>
      ))}

      {next && next.slug !== project.slug && (
        <Link
          href={`/work/${next.slug}`}
          className="group mt-24 block rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent"
        >
          <p className="text-sm text-muted">Next project</p>
          <p className="mt-2 flex items-center gap-3 font-display text-3xl">
            {next.title}
            <Arrow direction="right" className="transition-transform group-hover:translate-x-2" />
          </p>
          <p className="mt-2 text-muted">{next.tagline}</p>
        </Link>
      )}
    </article>
  );
}
