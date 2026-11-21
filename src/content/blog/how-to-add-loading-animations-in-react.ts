import type { Article } from "@/types/content";

const article: Article = {
  slug: "how-to-add-loading-animations-in-react",
  title: "How to Add Loading Animations in React",
  seoTitle: "How to Add Loading Animations in React: 7 Patterns",
  description:
    "React loading animation patterns beyond the basic spinner: delayed display, Suspense and lazy, useTransition, pending buttons, skeletons and status regions.",
  excerpt:
    "A React loading spinner is easy to render and surprisingly easy to get wrong. These seven patterns decide when it appears, what stays on screen, and what screen readers hear.",
  publishedAt: "2026-11-21",
  tags: ["React", "Spinners", "Suspense", "Accessibility", "Skeleton screens"],
  relatedAnimations: ["minimal-ring", "three-dot-pulse", "elegant-spinner", "line-loader"],
  blocks: [
    {
      type: "p",
      text: "Adding a loading animation in React takes three decisions, not one. Build the loader as a small component with props. Decide **when** it appears: after a short delay, so fast responses never flash a spinner. And let React's own primitives tell you what is pending: `Suspense` and `lazy` for code and data that isn't ready, `useTransition` for updates that shouldn't blank the screen, and `useFormStatus` for submit buttons.",
    },
    {
      type: "p",
      text: "The seven patterns below turn those decisions into code. They assume a working React app; if you're setting one up, the [React guide](/guides/react/) and the [Next.js guide](/guides/nextjs/) cover installation and where loader files belong. Every snippet below was type-checked with strict TypeScript against React 19 and run in a browser.",
    },
    { type: "h2", text: "1. A loader component with props" },
    {
      type: "p",
      text: "Give the spinner the props you'll actually change (size, color and the text screen readers hear) and one prop for the case where a parent already announces the loading state:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "Spinner.tsx",
      code: `import type { CSSProperties } from "react";
import "./spinner.css";

type SpinnerProps = {
  /** Width and height in px. */
  size?: number;
  /** Any CSS color. Defaults to the surrounding text color. */
  color?: string;
  /** What screen readers announce. */
  label?: string;
  /** Set when a parent already announces the loading state. */
  decorative?: boolean;
};

export function Spinner({
  size = 24,
  color = "currentColor",
  label = "Loading",
  decorative = false,
}: SpinnerProps) {
  const ring = (
    <svg
      className="spinner"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      aria-hidden="true"
      focusable="false"
      style={{ "--c1": color } as CSSProperties}
    >
      <circle className="spinner-track" cx="25" cy="25" r="20" />
      <circle className="spinner-arc" cx="25" cy="25" r="20" />
    </svg>
  );
  if (decorative) return ring;
  return (
    <span className="spinner-wrap" role="status">
      {ring}
      <span className="visually-hidden">{label}</span>
    </span>
  );
}`,
    },
    {
      type: "code",
      lang: "css",
      filename: "spinner.css",
      code: `.spinner-wrap { display: inline-flex; vertical-align: middle; }
.spinner-track, .spinner-arc { fill: none; stroke: var(--c1); stroke-width: 5; }
.spinner-track { opacity: 0.2; }
.spinner-arc {
  stroke-linecap: round;
  stroke-dasharray: 80 126;
  transform-origin: 25px 25px;
  animation: spinner-turn 0.9s linear infinite;
}
@keyframes spinner-turn { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner-arc { animation-duration: 2.7s; }
}
.visually-hidden {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}`,
    },
    {
      type: "p",
      text: "Defaulting the color to `currentColor` means the same component works inside a dark button, a light card and a link without extra props. The color reaches the SVG through a CSS custom property; React's style type doesn't know about custom properties, hence the `as CSSProperties` cast. For people who have asked their system for less motion, the ring slows down rather than stopping, because a frozen spinner looks like a frozen page.",
    },
    {
      type: "p",
      text: "If you'd rather not draw your own, every design in the library exports as a typed React component with the same kind of props. A Minimal Ring export, for example, accepts `size`, `primary`, `secondary`, `speed`, `stroke`, `background` and `label`, and renders its own `role=\"status\"` wrapper and scoped styles:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `import { MinimalRingLoader } from "./loaders/MinimalRingLoader";

<MinimalRingLoader size={32} primary="#6d28d9" background="transparent" label="Loading orders" />`,
    },
    {
      type: "loader",
      slug: "minimal-ring",
      caption: "Minimal Ring, available as a React + TypeScript component from its loader page.",
    },
    { type: "h2", text: "2. Don't flash it: a useDelayedFlag hook" },
    {
      type: "p",
      text: "A frequent loading bug in React apps is a spinner that blinks on for a few frames when data arrives quickly. Many requests finish in a few hundred milliseconds, and a spinner that appears and vanishes inside that time is just noise. This hook turns a raw `isLoading` flag into \"should a spinner be visible\": it waits before showing, and once shown, it stays up long enough not to look like a glitch.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "useDelayedFlag.ts",
      code: `import { useEffect, useRef, useState } from "react";

/**
 * Turns "is loading" into "should a spinner be visible": waits \`delay\` ms
 * before showing, then keeps it up for at least \`minDuration\` ms.
 */
export function useDelayedFlag(active: boolean, delay = 300, minDuration = 500): boolean {
  const [visible, setVisible] = useState(false);
  const shownAt = useRef(0);

  useEffect(() => {
    if (active === visible) return; // nothing to schedule
    const wait = active ? delay : Math.max(0, minDuration - (Date.now() - shownAt.current));
    const timer = setTimeout(() => {
      if (active) shownAt.current = Date.now();
      setVisible(active);
    }, wait);
    return () => clearTimeout(timer);
  }, [active, visible, delay, minDuration]);

  return visible;
}`,
    },
    {
      type: "code",
      lang: "tsx",
      filename: "OrdersPanel.tsx",
      code: `import { Spinner } from "./Spinner";
import { useDelayedFlag } from "./useDelayedFlag";
import { useOrders } from "./useOrders";
import { OrderList } from "./OrderList";

export function OrdersPanel() {
  const { orders, isLoading } = useOrders(); // React Query, SWR or your own hook
  const showSpinner = useDelayedFlag(isLoading);

  if (showSpinner) return <Spinner label="Loading orders" />;
  if (isLoading) return null; // the first 300 ms: nothing, rather than a flash
  return <OrderList orders={orders} />;
}`,
    },
    {
      type: "p",
      text: "The order of those `if` statements matters. If the data arrives at 320 ms, the spinner has just appeared, and `showSpinner` stays true for the rest of its 500 ms minimum even though `isLoading` is already false. That holds the content back briefly in exchange for never showing a 20 ms flicker. If you'd rather never hold content, pass `0` as the third argument. Either way, give the panel a `min-height` so nothing jumps when the spinner or the content arrives.",
    },
    { type: "h2", text: "3. Code-split screens with Suspense and lazy" },
    {
      type: "p",
      text: "`lazy` loads a component's code on first render, and the nearest [`<Suspense>`](https://react.dev/reference/react/Suspense) boundary shows its `fallback` until it's ready. The fallback is an ordinary component, so the delayed hook works there too. It mounts when loading starts and unmounts when the content is ready, which is exactly the lifetime the timer needs:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "ReportsRoute.tsx",
      code: `import { lazy, Suspense } from "react";
import { Spinner } from "./Spinner";
import { useDelayedFlag } from "./useDelayedFlag";

const ReportsPage = lazy(() => import("./ReportsPage"));

function DelayedFallback({ label }: { label: string }) {
  const show = useDelayedFlag(true, 300, 0);
  return <div className="route-fallback">{show && <Spinner size={40} label={label} />}</div>;
}

export function ReportsRoute() {
  return (
    <Suspense fallback={<DelayedFallback label="Loading reports" />}>
      <ReportsPage />
    </Suspense>
  );
}`,
    },
    {
      type: "p",
      text: "Give `.route-fallback` roughly the height of the page it stands in for, so the footer doesn't jump up and back. In the Next.js App Router, a `loading.tsx` file beside a route's `page.tsx` creates this Suspense boundary for you; the [Next.js guide](/guides/nextjs/) shows a loader in that file.",
    },
    { type: "h2", text: "4. Keep the current screen with useTransition" },
    {
      type: "p",
      text: "Suspense has a side effect that surprises people: if content that is already on screen suspends again, say because a filter changed, React swaps it back to the fallback and the list disappears behind a spinner. Marking the update as a transition tells React to keep showing the old content while the new content loads. [`useTransition`](https://react.dev/reference/react/useTransition) also gives you an `isPending` flag for a quieter, inline indicator:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "FilteredResults.tsx",
      code: `import { Suspense, useState, useTransition } from "react";
import { Spinner } from "./Spinner";
import { useDelayedFlag } from "./useDelayedFlag";
import { ResultsList } from "./ResultsList";

const FILTERS = ["all", "open", "shipped"] as const;
type Filter = (typeof FILTERS)[number];

export function FilteredResults() {
  const [filter, setFilter] = useState<Filter>("all");
  const [isPending, startTransition] = useTransition();
  const showPending = useDelayedFlag(isPending, 200, 300);

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === filter}
            onClick={() => startTransition(() => setFilter(f))}
          >
            {f}
          </button>
        ))}
        {showPending && <Spinner size={16} decorative />}
      </div>
      <Suspense fallback={<Spinner label="Loading results" />}>
        <div className={isPending ? "results is-stale" : "results"} aria-busy={isPending}>
          <ResultsList filter={filter} />
        </div>
      </Suspense>
    </>
  );
}`,
    },
    {
      type: "p",
      text: "The first load still shows the Suspense fallback, because there's nothing old to keep. After that, switching filters keeps the previous results on screen, dimmed by an `.is-stale { opacity: 0.6 }` rule, with a small spinner beside the buttons that only appears if the switch takes longer than 200 ms. In React 19 you can also pass an async function to `startTransition`, and `isPending` stays true until it finishes. State updates after an `await` inside it need their own `startTransition` call, a limitation the React docs call out.",
    },
    { type: "h2", text: "5. Button pending states" },
    {
      type: "p",
      text: "For forms, [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) from `react-dom` reports whether the parent `<form>` is submitting its action. It only works in a component rendered inside the form, which suits a reusable submit button:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "SubmitButton.tsx",
      code: `import type { MouseEvent, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  function blockWhilePending(event: MouseEvent<HTMLButtonElement>) {
    if (pending) event.preventDefault(); // no double submits
  }

  return (
    <>
      <button type="submit" className="submit" aria-disabled={pending} onClick={blockWhilePending}>
        <span className="submit-label">{children}</span>
        {pending && <Spinner size={16} decorative />}
      </button>
      <span className="visually-hidden" role="status">{pending ? "Saving…" : ""}</span>
    </>
  );
}

// Usage: <form action={saveProfile}> … <SubmitButton>Save changes</SubmitButton> </form>`,
    },
    {
      type: "code",
      lang: "css",
      code: `.submit { display: inline-grid; place-items: center; }
.submit > * { grid-area: 1 / 1; } /* label and spinner share one cell */
.submit[aria-disabled="true"] .submit-label { opacity: 0; }`,
    },
    {
      type: "p",
      text: "Three details in there are deliberate. The label and spinner sit in the same grid cell, so the button keeps its width instead of jumping when the text is swapped out. The label fades with `opacity` rather than `visibility: hidden`, which would also remove it from the button's accessible name. And the button uses `aria-disabled` plus a click guard instead of `disabled`: in Chrome, disabling the button that has focus sends focus back to the page body, so keyboard and screen reader users lose their place mid-form.",
    },
    { type: "h2", text: "6. Skeleton or spinner?" },
    {
      type: "p",
      text: "Both say \"wait\", but they suit different situations:",
    },
    {
      type: "table",
      head: ["Situation", "Better choice", "Why"],
      rows: [
        ["First load of a list, card grid or profile", "Skeleton", "The layout is known, so the page can take its final shape before the data arrives"],
        ["Button or inline action", "Small spinner", "There's no layout to preview and very little room"],
        ["Unknown shape: search results, generated content", "Spinner", "A skeleton that doesn't match what arrives causes a jump"],
        ["Refreshing data that's already shown", "Keep the content, add a subtle indicator", "Blanking it loses the user's place"],
      ],
    },
    {
      type: "code",
      lang: "tsx",
      filename: "OrderListSkeleton.tsx",
      code: `export function OrderListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <ul className="order-list" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className="order-row">
          <span className="skeleton" style={{ width: "55%" }} />
          <span className="skeleton" style={{ width: "30%" }} />
        </li>
      ))}
    </ul>
  );
}`,
    },
    {
      type: "code",
      lang: "css",
      code: `.skeleton {
  position: relative;
  display: block;
  height: 0.9em;
  margin: 0.4em 0;
  overflow: hidden;
  border-radius: 4px;
  background: #ece9f3;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.6), transparent);
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}
@keyframes skeleton-shimmer { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) {
  .skeleton::after { animation: none; }
}`,
    },
    {
      type: "p",
      text: "The shimmer moves a pseudo-element with `transform` instead of animating `background-position`, so the browser doesn't repaint every line on every frame. With reduced motion the shimmer simply stops; unlike a spinner, a skeleton still reads as loading when it's static. The skeleton is `aria-hidden` because grey bars mean nothing to a screen reader. The announcement comes from somewhere else, which is the last pattern.",
    },
    { type: "h2", text: "7. Tell screen readers what's happening" },
    {
      type: "p",
      text: "A spinner that only exists visually leaves screen reader users guessing. Keep one live region mounted for the section and change its text, and mark the region being replaced with `aria-busy`:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "OrdersSection.tsx",
      code: `import { useOrders } from "./useOrders";
import { OrderList } from "./OrderList";
import { OrderListSkeleton } from "./OrderListSkeleton";

export function OrdersSection() {
  const { orders, isLoading, error } = useOrders();

  let message = "";
  if (isLoading) message = "Loading orders…";
  else if (error) message = "Couldn't load orders.";
  else message = \`\${orders.length} orders loaded.\`;

  return (
    <>
      <section aria-labelledby="orders-heading" aria-busy={isLoading}>
        <h2 id="orders-heading">Orders</h2>
        {isLoading ? <OrderListSkeleton /> : error ? <p>Couldn't load orders.</p> : <OrderList orders={orders} />}
      </section>
      <p className="visually-hidden" role="status">{message}</p>
    </>
  );
}`,
    },
    {
      type: "p",
      text: "The status paragraph sits **outside** the busy section on purpose: assistive technology may hold back changes inside an element marked `aria-busy=\"true\"` until it clears, which would swallow the very announcement you're making. It is also mounted the whole time. A `role=\"status\"` element that mounts with its text already inside isn't announced reliably, so treat the built-in label of `Spinner` (or of an exported loader) as a fallback, and give important waits a persistent region like this one. The submit button follows the same rule with its own always-mounted status element, which is why its spinner is `decorative`.",
    },
    {
      type: "callout",
      tone: "note",
      text: "`role=\"status\"` already implies `aria-live=\"polite\"` and `aria-atomic=\"true\"`, so the screen reader waits for a pause and reads the whole message. Reserve `role=\"alert\"` for failures that block the task.",
    },
    {
      type: "loader",
      slug: "three-dot-pulse",
      caption: "Three Dot Pulse: compact enough for buttons and inline pending states.",
    },
    {
      type: "p",
      text: "Next step: choose a design from the [React loading animations](/react-loaders/) collection and export it as a component, then wire it in with the patterns above. To make the wait itself feel shorter, read [how to improve perceived loading speed](/blog/improve-perceived-loading-speed-with-animations/).",
    },
  ],
  faqs: [
    {
      q: "Should I use Suspense or an isLoading flag?",
      a: "Use Suspense when the thing that's loading supports it: `lazy` components, frameworks with Suspense-enabled data fetching, or promises read with `use`. It lets you declare the loading state once, at the boundary. Keep an `isLoading` flag for data libraries and hand-written effects that don't suspend. Many apps use both, and the same `useDelayedFlag` hook smooths either one.",
    },
    {
      q: "Why does my Suspense fallback replace content that was already visible?",
      a: "When a component that has already been shown suspends again, React falls back to the nearest boundary. Wrap the update that causes it, such as a tab or filter change, in `startTransition` from `useTransition`, and React keeps the existing content on screen while the new content loads. Use `isPending` for a subtle inline indicator.",
    },
    {
      q: "How long should a React loading spinner wait before appearing?",
      a: "There's no universal number, but a few hundred milliseconds works well for most interfaces: long enough that quick responses never show a spinner, short enough that slower ones get feedback well within a second. This article uses 300 ms, plus a 500 ms minimum once the spinner is visible so it never flickers. Shorten the delay for actions where the user is staring at a button, and set the minimum to zero if holding content back bothers you.",
    },
    {
      q: "Are CuteLoader's React components server-component safe?",
      a: "The exported components are plain function components with no hooks or browser APIs, so they render on the server as well as the client. They include their own scoped `<style>` element and `role=\"status\"` wrapper, and take props such as `size`, `primary`, `speed` and `label`, so you don't need a separate stylesheet.",
    },
  ],
};

export default article;
