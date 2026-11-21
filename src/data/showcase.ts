/**
 * Approved showcase projects. Submissions arrive as GitHub issues (see
 * /showcase/), are reviewed by a maintainer, and are added here by hand.
 * Only add projects whose owners opted in through the submission form.
 */
export interface ShowcaseProject {
  name: string;
  description: string;
  url: string;
  github?: string;
  loader: string; // animation slug
  addedAt: string; // YYYY-MM-DD
}

export const SHOWCASE: ShowcaseProject[] = [];
