import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content/blog";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { JsonLd } from "@/components/common/JsonLd";
import { articleLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.seoTitle,
    description: a.description,
    path: `/blog/${a.slug}/`,
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
    ogImage: `/og/blog-${a.slug}.jpg`,
  });
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const more = ARTICLES.filter((x) => x.slug !== a.slug)
    .map((x) => ({ x, score: x.tags.filter((t) => a.tags.includes(t)).length }))
    .sort((p, q) => q.score - p.score)
    .slice(0, 3)
    .map(({ x }) => ({ href: `/blog/${x.slug}/`, title: x.title, text: x.excerpt }));
  return (
    <>
      <ArticleLayout
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: a.title, path: `/blog/${a.slug}/` },
        ]}
        eyebrow={a.tags[0]}
        title={a.title}
        intro={a.excerpt}
        publishedAt={a.publishedAt}
        updatedAt={a.updatedAt}
        blocks={a.blocks}
        faqs={a.faqs}
        relatedAnimations={a.relatedAnimations}
        more={more}
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG}
      />
      <JsonLd
        data={articleLd({
          title: a.title,
          description: a.description,
          path: `/blog/${a.slug}/`,
          image: `/og/blog-${a.slug}.jpg`,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
        })}
      />
    </>
  );
}
