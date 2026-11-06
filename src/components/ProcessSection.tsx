import Image from "next/image";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function ProcessSection({ process }: { process: NonNullable<Project["process"]> }) {
  let imageCount = 0;

  return (
    <section className="mx-auto mt-20 max-w-4xl">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl">From notebook to Figma</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">{process.intro}</p>
      </div>

      <ol className="mt-12 space-y-16">
        {process.steps.map((step, i) => {
          const hasImages = Boolean(step.images?.length);
          return (
            <li
              key={step.title}
              className={hasImages ? "grid items-center gap-8 md:grid-cols-2 md:gap-12" : "mx-auto max-w-2xl"}
            >
              <div className={hasImages && i % 2 === 1 ? "md:order-last" : undefined}>
                <p className="font-display text-sm text-coral">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-2xl">{step.title}</h3>
                {step.quote && (
                  <blockquote className="mt-4 border-l-2 border-coral pl-4 font-display text-lg italic">
                    “{step.quote}”
                  </blockquote>
                )}
                <p className="mt-4 text-lg leading-relaxed text-muted">{step.body}</p>
              </div>

              {hasImages && (
                // With 3+ images, the first spans the full width and the rest pair up (e.g. sketch → final).
                <div className={`grid gap-8 ${step.images!.length > 2 ? "grid-cols-2" : ""}`}>
                  {step.images!.map((img, j) => (
                    <figure key={img.src} className={step.images!.length > 2 && j === 0 ? "col-span-2" : undefined}>
                      <div
                        className={`overflow-hidden rounded-lg bg-white p-2 shadow-lg shadow-black/10 transition-transform duration-300 hover:rotate-0 ${
                          tilts[imageCount++ % tilts.length]
                        }`}
                      >
                        <Image
                          src={asset(img.src)}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes="(min-width: 768px) 420px, 100vw"
                          className="h-auto w-full rounded"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="mt-3 text-center text-sm text-muted">{img.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
