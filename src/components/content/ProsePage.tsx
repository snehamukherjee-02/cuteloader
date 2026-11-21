import { Breadcrumbs, Container } from "@/components/common/ui";

export function ProsePage({
  title,
  path,
  lead,
  children,
}: {
  title: string;
  path: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="pt-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <article className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
        <div className="prose-cl mt-10">{children}</div>
      </article>
    </Container>
  );
}
