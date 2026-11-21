import { notFound } from "next/navigation";
import { getTechPage } from "@/data/tech-pages";
import { TechPageView } from "@/components/content/TechPageView";
import { pageMetadata } from "@/lib/seo";

const page = getTechPage("/javascript-loaders/");

export const metadata = page
  ? pageMetadata({ title: page.seoTitle, description: page.seoDescription, path: page.path })
  : {};

export default function Page() {
  if (!page) notFound();
  return <TechPageView page={page} />;
}
