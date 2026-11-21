import Link from "next/link";
import type { Metadata } from "next";
import { getAnimation } from "@/animations";
import { LoaderPreview } from "@/components/animations/LoaderPreview";
import { ButtonLink, Container } from "@/components/common/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const ghost = getAnimation("waving-ghost");
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        {ghost && <LoaderPreview def={ghost} size={140} label="A friendly ghost waving" />}
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-brand-strong">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">This page is still loading… forever.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We couldn&apos;t find what you were looking for. It may have moved, or the link might be mistyped.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/animations/">Browse loaders</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-subtle">
          Or try the <Link href="/loading-animation-generator/" className="font-semibold text-brand-strong hover:underline">generator</Link>.
        </p>
      </div>
    </Container>
  );
}
