import type { Guide } from "@/types/content";
import html from "./html";
import css from "./css";
import javascript from "./javascript";
import react from "./react";
import nextjs from "./nextjs";
import vue from "./vue";
import angular from "./angular";
import aspnetCoreMvc from "./aspnet-core-mvc";
import aspnetMvc from "./aspnet-mvc";
import aspnetWebforms from "./aspnet-webforms";

/** Integration guides, in the order shown on /guides/. */
export const GUIDES: Guide[] = [html, css, javascript, react, nextjs, vue, angular, aspnetCoreMvc, aspnetMvc, aspnetWebforms];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
