import Link from "next/link";
import { ANIMATIONS, getAnimation, pathFor } from "@/animations";
import { SHOWCASE } from "@/data/showcase";
import { Breadcrumbs, Container } from "@/components/common/ui";
import { ShowcaseForm } from "@/components/common/ShowcaseForm";
import { LoaderPreview } from "@/components/animations/LoaderPreview";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Showcase: Projects Using CuteLoader",
  description:
    "Websites and apps built with CuteLoader loading animations. Using a loader in your project? Submit it for review and get featured in the showcase.",
  path: "/showcase/",
});

export default function ShowcasePage() {
  const loaders = [...ANIMATIONS].sort((a, b) => a.name.localeCompare(b.name)).map((a) => ({ slug: a.slug, name: a.name }));
  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Showcase", path: "/showcase/" },
        ]}
      />
      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Showcase</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Real projects using CuteLoader animations. Every entry was submitted by its owner and reviewed by a person before
          being published.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby="projects">
          <h2 id="projects" className="text-xl font-extrabold tracking-tight">
            Featured projects
          </h2>
          {SHOWCASE.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-dashed border-border-strong bg-surface p-8 text-center">
              <p className="text-lg font-bold">Be the first!</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                The showcase just opened. Submit your project with the form and it could be the first one featured here.
              </p>
            </div>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {SHOWCASE.map((p) => {
                const loader = getAnimation(p.loader);
                return (
                  <li key={p.url} className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
                    <div className="flex items-start gap-4">
                      {loader && <LoaderPreview def={loader} size={48} />}
                      <div className="min-w-0">
                        <h3 className="font-bold">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted">{p.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                      <a href={p.url} target="_blank" rel="noopener noreferrer nofollow ugc" className="text-brand-strong hover:underline">
                        Visit site
                      </a>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer nofollow ugc" className="text-brand-strong hover:underline">
                          Source
                        </a>
                      )}
                      {loader && (
                        <Link href={pathFor(loader)} className="text-muted hover:text-text">
                          Uses {loader.name}
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <section aria-labelledby="submit">
          <h2 id="submit" className="mb-4 text-xl font-extrabold tracking-tight">
            Submit your project
          </h2>
          <ShowcaseForm loaders={loaders} />
        </section>
      </div>
    </Container>
  );
}
