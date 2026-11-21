import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/content/guides";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { JsonLd } from "@/components/common/JsonLd";
import { articleLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ title: g.seoTitle, description: g.description, path: `/guides/${g.slug}/` });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const more = GUIDES.filter((x) => x.slug !== g.slug)
    .slice(0, 3)
    .map((x) => ({ href: `/guides/${x.slug}/`, title: x.title, text: x.summary }));
  return (
    <>
      <ArticleLayout
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides/" },
          { name: g.framework, path: `/guides/${g.slug}/` },
        ]}
        eyebrow={`${g.framework} guide`}
        title={g.title}
        intro={g.intro}
        publishedAt={SITE.launchDate}
        blocks={g.blocks}
        faqs={g.faqs}
        relatedAnimations={g.relatedAnimations}
        more={more}
      />
      <JsonLd
        data={articleLd({
          title: g.title,
          description: g.description,
          path: `/guides/${g.slug}/`,
          image: "/og/default.jpg",
          publishedAt: SITE.launchDate,
        })}
      />
    </>
  );
}
