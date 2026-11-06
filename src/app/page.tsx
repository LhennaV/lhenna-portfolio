import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site, skills } from "@/content/site";
import { asset } from "@/lib/asset";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-20 pt-12 sm:px-6 sm:pt-20 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="relative w-40 sm:w-48 md:order-last md:w-64 lg:w-72">
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-coral"
            aria-hidden
          />
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-accent-soft">
            <Image
              src={asset("/images/about/lhenna.png")}
              alt="Portrait of Lhenna-Marie Velasco"
              fill
              priority
              sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 192px"
              className="object-cover object-bottom"
            />
          </div>
        </div>
        <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-mint" aria-hidden />
          Currently designing and building Trybe
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m Lhenna. I design interfaces in Figma, then{" "}
          <span className="squiggle">build them</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          I&apos;m a UI/UX designer and frontend developer studying BS Information Technology
          at PUP Santa Maria. I care about the small moment when someone just <em>gets</em> an
          interface without having to think about it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-line bg-surface px-6 py-3 font-semibold transition-colors hover:border-accent"
          >
            Get in touch
          </a>
        </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="About" title="Designer first, builder second" />
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                I got into design because I&apos;ve always cared about how things feel, not just
                how they look. I start every project in Figma, mapping flows and edge cases,
                then carry the design into code so nothing gets lost in the handoff.
              </p>
              <p>
                Right now I&apos;m designing and building the frontend of Trybe, a platform for
                trading hobby gear, alongside a backend teammate. Off the clock you&apos;ll find
                me gaming, building in Minecraft, or being closely supervised by my cat, Stormi.
              </p>
            </div>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {s.group}
                  </dt>
                  <dd>
                    <ul className="space-y-1.5 text-sm">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Selected work" title="Projects I've designed and built" />
          <div className="mt-12 flex flex-col gap-20">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} size="large" />
            ))}
          </div>

          <h3 className="mt-24 font-display text-xl font-bold">More design work</h3>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {more.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + featured.length} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
          <SectionHeading eyebrow="Contact" title="Let's make something people enjoy using" centered />
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Have a role, project, or collaboration in mind? The fastest way to
            reach me is email.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block font-display text-2xl font-bold text-accent underline decoration-coral decoration-2 underline-offset-8 transition-colors hover:text-ink sm:text-3xl"
          >
            {site.email}
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[...site.socials, { label: "Résumé", url: site.resumeUrl }].map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-surface px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  centered,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : undefined}>
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
