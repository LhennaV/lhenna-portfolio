import Arrow from "@/components/Arrow";
import HeroPhoto from "@/components/HeroPhoto";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SkillIcon from "@/components/SkillIcon";
import Words from "@/components/Words";
import { projects } from "@/content/projects";
import { site, skills } from "@/content/site";

const ABOUT = [
  "I got into design because I've always cared about how things feel, not just how they look. I start every project in Figma, mapping flows and edge cases, then carry the design into code so nothing gets lost in the handoff.",
  "I used to paint. These days that part of me lives in Minecraft, building worlds block by block, which turns out to be not that different from design. The rest of the time I'm gaming or being closely supervised by my cat, Stormi.",
];

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

// Running index across all skill groups so the pop-in stagger flows top to bottom.
const skillOffsets = skills.map((_, g) =>
  skills.slice(0, g).reduce((n, s) => n + s.items.length, 0),
);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 overflow-x-clip px-4 pb-20 pt-12 sm:px-6 sm:pt-20 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="hero-rise md:order-last" style={{ "--l": 2 } as React.CSSProperties}>
          <HeroPhoto />
        </div>
        <div>
        {/* Each line slides up out of a clip once the intro loader leaves (see globals.css) */}
        <h1 className="max-w-2xl font-display text-4xl leading-[1.2] sm:text-5xl">
          <span className="hero-line" style={{ "--l": 0 } as React.CSSProperties}>
            <span>I&apos;m chasing that</span>
          </span>{" "}
          <span className="hero-line" style={{ "--l": 1 } as React.CSSProperties}>
            <span>tiny moment when</span>
          </span>{" "}
          <span className="hero-line" style={{ "--l": 2 } as React.CSSProperties}>
            <span>
              someone just <span className="squiggle">gets</span> it.
            </span>
          </span>
        </h1>
        <p className="hero-rise mt-6 max-w-2xl text-lg text-muted" style={{ "--l": 3 } as React.CSSProperties}>
          I&apos;m Lhenna, a UI/UX designer and frontend developer studying IT at PUP Santa
          Maria. I design in Figma, then build what I design. Right now that&apos;s Trybe, an app
          for trading hobby gear.
        </p>
        <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--l": 4 } as React.CSSProperties}>
          <a
            href="#work"
            className="btn-pop rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
          >
            See my work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="btn-pop rounded-full border border-line bg-surface px-6 py-3 font-semibold hover:border-accent"
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
            <Reveal>
              <SectionHeading title="Designer first, builder second" />
              {/* Paragraph words follow the heading with a quicker stagger */}
              <div className="word-fast mt-6 space-y-4 text-lg text-muted">
                <p>
                  <Words start={4} text={ABOUT[0]} />
                </p>
                <p>
                  <Words start={4 + ABOUT[0].split(" ").length} text={ABOUT[1]} />
                </p>
              </div>
            </Reveal>

            <Reveal>
            <dl className="mt-10 space-y-8">
              {skills.map((s, g) => (
                <div key={s.group}>
                  <dt className="mb-3 font-display text-lg text-accent">{s.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {s.items.map((item, i) => (
                        <li
                          key={item.name}
                          style={{ "--i": skillOffsets[g] + i } as React.CSSProperties}
                          className="skill-chip flex items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm hover:border-accent hover:bg-accent-soft"
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20">
          <Reveal>
            <SectionHeading title="Things I've designed and built" />
          </Reveal>
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
        <Reveal className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <SectionHeading title="Work with me" centered />
          <p style={{ "--i": 1 } as React.CSSProperties} className="reveal-item mx-auto mt-4 max-w-xl text-balance text-lg text-muted">
            I design it, I build it, and then I nap. That&apos;s usually when the best ideas
            show up. It&apos;s a whole process.
          </p>
          <p style={{ "--i": 2 } as React.CSSProperties} className="reveal-item mx-auto mt-3 max-w-xl text-balance text-muted">
            Have a role, project, or collaboration in mind? The fastest way to reach me is email.
          </p>
          {/* Reveal on the wrapper: the link's own hover wave animation would
              otherwise replace the rise-in and replay it on mouse-out. */}
          <div style={{ "--i": 3 } as React.CSSProperties} className="reveal-item mt-8">
            <a
              href={`mailto:${site.email}`}
              className="email-link inline-block break-all font-display text-xl text-accent transition-colors hover:text-ink sm:text-3xl"
            >
              {site.email}
            </a>
          </div>
          <div style={{ "--i": 4 } as React.CSSProperties} className="reveal-item mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
            {[...site.socials, { label: "Résumé", url: site.resumeUrl }].map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pop inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent sm:px-5"
              >
                {l.label}
                <Arrow direction="up-right" />
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

function SectionHeading({ title, centered }: { title: string; centered?: boolean }) {
  return (
    <h2 className={`font-display text-3xl sm:text-4xl ${centered ? "text-center" : ""}`}>
      <Words text={title} />
    </h2>
  );
}
