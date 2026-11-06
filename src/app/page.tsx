import Image from "next/image";
import Arrow from "@/components/Arrow";
import ProjectCard from "@/components/ProjectCard";
import SkillIcon from "@/components/SkillIcon";
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
        <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.2] sm:text-5xl">
          I&apos;m chasing that tiny moment when someone just{" "}
          <span className="squiggle">gets</span> it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          I&apos;m Lhenna, a UI/UX designer and frontend developer studying IT at PUP Santa
          Maria. I design in Figma, then build what I design. Right now that&apos;s Trybe, an app
          for trading hobby gear.
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
            <SectionHeading title="Designer first, builder second" />
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                I got into design because I&apos;ve always cared about how things feel, not just
                how they look. I start every project in Figma, mapping flows and edge cases,
                then carry the design into code so nothing gets lost in the handoff.
              </p>
              <p>
                I used to paint. These days that part of me lives in Minecraft, building worlds
                block by block, which turns out to be not that different from design. The rest of
                the time I&apos;m gaming or being closely supervised by my cat, Stormi.
              </p>
            </div>

            <dl className="mt-10 space-y-8">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="mb-3 font-display text-lg text-accent">{s.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm transition-colors hover:border-accent"
                        >
                          <SkillIcon icon={item.icon} className="h-4 w-4 shrink-0 text-accent" />
                          {item.name}
                        </li>
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
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20">
          <SectionHeading title="Things I've designed and built" />
          <div className="mt-12 flex flex-col gap-20">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} size="large" />
            ))}
          </div>

          <h3 className="mt-24 font-display text-2xl">More projects</h3>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + featured.length} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <SectionHeading title="Work with me" centered />
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted">
            I design it, I build it, and then I nap. That&apos;s usually when the best ideas
            show up. It&apos;s a whole process.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-balance text-muted">
            Have a role, project, or collaboration in mind? The fastest way to reach me is email.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block break-all font-display text-xl text-accent underline decoration-coral decoration-2 underline-offset-8 transition-colors hover:text-ink sm:text-3xl"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
            {[...site.socials, { label: "Résumé", url: site.resumeUrl }].map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:px-5"
              >
                {l.label}
                <Arrow direction="up-right" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title, centered }: { title: string; centered?: boolean }) {
  return (
    <h2 className={`font-display text-3xl sm:text-4xl ${centered ? "text-center" : ""}`}>
      {title}
    </h2>
  );
}
