import type { Article } from "@/types/content";
import freeLoadingAnimationsForWebsites from "./free-loading-animations-for-websites";
import howToCreateCssLoadingAnimation from "./how-to-create-css-loading-animation";
import addLoadingAnimationToAspnetWebsite from "./add-loading-animation-to-aspnet-website";
import howToUseSvgLoadingAnimations from "./how-to-use-svg-loading-animations";
import howToAddLoadingAnimationsInReact from "./how-to-add-loading-animations-in-react";
import cssSpinnerVsSvgLoader from "./css-spinner-vs-svg-loader";
import howToCustomizeWebsiteLoadingAnimations from "./how-to-customize-website-loading-animations";
import howToCreateACuteWebsitePreloader from "./how-to-create-a-cute-website-preloader";
import websiteLoadingAnimationBestPractices from "./website-loading-animation-best-practices";
import improvePerceivedLoadingSpeedWithAnimations from "./improve-perceived-loading-speed-with-animations";
import howToBuildAReusableCssLoader from "./how-to-build-a-reusable-css-loader";
import addLoaderToAjaxRequest from "./add-loader-to-ajax-request";

/** Published articles in display order (the first one is featured on /blog/). */
const ORDERED: Article[] = [
  freeLoadingAnimationsForWebsites,
  howToCreateCssLoadingAnimation,
  addLoadingAnimationToAspnetWebsite,
  howToUseSvgLoadingAnimations,
  howToAddLoadingAnimationsInReact,
  cssSpinnerVsSvgLoader,
  howToCustomizeWebsiteLoadingAnimations,
  howToCreateACuteWebsitePreloader,
  websiteLoadingAnimationBestPractices,
  improvePerceivedLoadingSpeedWithAnimations,
  howToBuildAReusableCssLoader,
  addLoaderToAjaxRequest,
];

/** Newest first; articles published the same day keep the editorial order above. */
export const ARTICLES: Article[] = ORDERED.map((a, i) => ({ a, i }))
  .sort((x, y) => y.a.publishedAt.localeCompare(x.a.publishedAt) || x.i - y.i)
  .map(({ a }) => a);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
