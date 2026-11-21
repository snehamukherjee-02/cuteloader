import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "nextjs",
  framework: "Next.js (App Router)",
  title: "Loading Animations in Next.js with the App Router",
  seoTitle: "Next.js Loading Animation: loading.tsx, Suspense, Forms",
  description: "Add a CuteLoader loading animation to a Next.js App Router project: loading.tsx route fallbacks, Suspense streaming boundaries and form pending states.",
  intro: "The App Router has loading states built in. A loading.tsx file becomes the Suspense fallback for a whole route segment, any Suspense boundary can stream its own fallback while the rest of the page is already visible, and useFormStatus tells a submit button when a Server Action is running. CuteLoader's React export plugs into all three, and because the exported component uses no hooks, it renders in Server Components as well as Client Components.",
  summary: "loading.tsx, Suspense, useFormStatus",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "A Next.js project that uses the App Router (the `app/` directory). The examples use TypeScript and the default `@/` import alias; adjust the paths if your project is set up differently.",
        "A loader exported with CuteLoader's **React** tab, saved as `components/DemoRingLoader.tsx`. Any loader works; each exports a component with the same props (`size`, `primary`, `secondary`, `speed`, `label` and more), as described in the [React guide](/guides/react/).",
      ],
    },
    { type: "h2", text: "Step 1: Add the component (no \"use client\" needed)" },
    { type: "p", text: "The exported file contains a plain function component that returns markup and a `<style>` element. It has no hooks, no state and no event handlers, so you don't need to add `\"use client\"`: Server Components can render it directly, and Client Components can import it too." },
    { type: "p", text: "Add two small helpers to your global stylesheet. They center the loader and fade it in only after 200 ms, so fast navigations and quick streams never flash it. Server Components can't run timers, so CSS is the right tool for this delay:" },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: `.route-loading,
.panel-loading {
  display: grid;
  place-items: center;
  animation: loader-fade-in 0.2s ease-out 0.2s both;
}
.route-loading {
  min-height: 50vh;
}
.panel-loading {
  min-height: 8rem;
}
@keyframes loader-fade-in {
  from { opacity: 0; }
}`,
    },
    { type: "h2", text: "Step 2: A route-level fallback with loading.tsx" },
    { type: "p", text: "Put a `loading.tsx` file next to a `page.tsx`, and Next.js wraps that page in a `<Suspense>` boundary that uses your component as the fallback:" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/dashboard/loading.tsx",
      code: `import { DemoRingLoader } from "@/components/DemoRingLoader";

export default function Loading() {
  return (
    <div className="route-loading">
      <DemoRingLoader size={72} label="Loading dashboard" />
    </div>
  );
}`,
    },
    { type: "p", text: "The fallback is prefetched with the route, so it appears the instant someone navigates, while shared layouts stay interactive. When the page has rendered, Next.js swaps it in. Note that `loading.tsx` wraps the page and any nested layouts, but not the `layout.tsx` in its own folder: if that layout awaits slow data, navigation waits for it." },
    { type: "loader", slug: "smooth-progress-ring", caption: "Smooth Progress Ring suits route-level fallbacks; its React export takes the same props as the demo ring." },
    { type: "h2", text: "Step 3: Stream sections with Suspense" },
    { type: "p", text: "A route-level fallback hides the whole page. Usually it's better to send the page shell immediately and stream only the slow parts, each behind its own `<Suspense>` boundary:" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/dashboard/page.tsx",
      code: `import { Suspense } from "react";
import { DemoRingLoader } from "@/components/DemoRingLoader";
import { RecentOrders } from "./recent-orders";

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading">Recent orders</h2>
        <Suspense
          fallback={
            <div className="panel-loading">
              <DemoRingLoader size={48} label="Loading recent orders" />
            </div>
          }
        >
          <RecentOrders />
        </Suspense>
      </section>
    </main>
  );
}`,
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/dashboard/recent-orders.tsx",
      code: `type Order = { id: string; customer: string; total: number };

export async function RecentOrders() {
  const res = await fetch("https://api.example.com/orders?limit=5", { cache: "no-store" });
  if (!res.ok) throw new Error(\`Orders request failed with \${res.status}\`);
  const orders = (await res.json()) as Order[];

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.customer}: \${order.total.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}`,
    },
    { type: "p", text: "`RecentOrders` is an async Server Component. While it awaits, the visitor already sees the heading and the loader; when the data arrives, React streams the list into place, and the fallback is removed. Sibling boundaries stream independently, in whatever order their data arrives." },
    { type: "p", text: "If the component throws, the nearest `error.tsx` boundary takes over. Error boundaries must be Client Components:" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/dashboard/error.tsx",
      code: `"use client";

import { useEffect } from "react";

export default function DashboardError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert">
      <p>We couldn't load the dashboard.</p>
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
    </div>
  );
}`,
    },
    {
      type: "callout",
      tone: "note",
      text: "Next.js 16.3 and later pass `retry()`, which re-fetches and re-renders the segment. Earlier versions pass `reset()` instead; it still exists for clearing the error state without re-fetching.",
    },
    { type: "h2", text: "Step 4: Form pending state with useFormStatus" },
    { type: "p", text: "A Server Action runs on the server, and `useFormStatus` from `react-dom` reports whether the surrounding form is submitting. Start with the action, which returns errors as values instead of throwing:" },
    {
      type: "code",
      lang: "ts",
      filename: "app/newsletter/actions.ts",
      code: `"use server";

export type SubscribeState = { ok: boolean; message: string };

export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email.includes("@")) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  try {
    const res = await fetch("https://api.example.com/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(\`Subscribe failed with \${res.status}\`);
    return { ok: true, message: "Thanks! You're subscribed." };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}`,
    },
    { type: "p", text: "The submit button is a separate Client Component, because `useFormStatus` only reports on a form that renders it, never on a form in the same component:" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/newsletter/submit-button.tsx",
      code: `"use client";

import { useFormStatus } from "react-dom";
import { DemoRingLoader } from "@/components/DemoRingLoader";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn"
      aria-disabled={pending}
      onClick={(event) => {
        if (pending) event.preventDefault(); // block double submits, keep focus
      }}
    >
      {pending && (
        <span aria-hidden="true">
          <DemoRingLoader size={18} stroke={10} primary="#ffffff" secondary="#ffffff" />
        </span>
      )}
      {pending ? "Subscribing…" : "Subscribe"}
    </button>
  );
}`,
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/newsletter/newsletter-form.tsx",
      code: `"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "./actions";
import { SubmitButton } from "./submit-button";

const initialState: SubscribeState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribe, initialState);
  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <SubmitButton />
      <p role="status">{state.message}</p>
    </form>
  );
}`,
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/newsletter/page.tsx",
      code: `import { NewsletterForm } from "./newsletter-form";

export default function NewsletterPage() {
  return (
    <main>
      <h1>Newsletter</h1>
      <NewsletterForm />
    </main>
  );
}`,
    },
    { type: "p", text: "`pending` turns false when the action finishes, so the button can't get stuck in its loading state, whether the action succeeds, returns an error or throws. The button uses `aria-disabled` rather than `disabled`, because disabling a focused button drops keyboard focus to the start of the page; the click handler blocks double submissions instead, including submissions started with the Enter key, which the browser routes through the same button. The result message lives in a `role=\"status\"` paragraph that stays on the page." },
    {
      type: "callout",
      tone: "tip",
      text: "For slow client-side navigations to dynamic routes without a `loading.tsx`, `useLinkStatus` from `next/link` reports a pending state for the link that was clicked. Next.js recommends `loading.tsx` and prefetching first; reach for it when you spot a specific slow transition.",
    },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "Every exported loader announces its `label` through `role=\"status\"` and `aria-live=\"polite\"`, so name what is loading: \"Loading recent orders\" beats \"Loading\".",
        "When a Client Component refreshes a region in place, set `aria-busy` on that region until the new content is in; the [React guide](/guides/react/) shows the pattern with `useTransition`.",
        "Fallbacks never take focus, and error UIs use `role=\"alert\"` so failures are announced.",
        "Reduced motion is handled by the exported CSS, which slows the animation down three times.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Client-side data fetching, `React.lazy` and button states are covered in the [React guide](/guides/react/).",
        "Browse more [React loaders](/react-loaders/) and [SVG loaders](/svg-loaders/), or the whole [animation library](/animations/).",
        "Set colors, size and speed before exporting with the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["smooth-progress-ring", "minimal-ring", "elegant-spinner"],
  faqs: [
    {
      q: "Do I need \"use client\" for the loader component?",
      a: "No. The exported component is a plain function with no hooks or browser APIs, so it renders in Server Components, including `loading.tsx` and Suspense fallbacks. Client Components can import it as well.",
    },
    {
      q: "Should I use loading.tsx or Suspense?",
      a: "Use `loading.tsx` when nothing on the page is useful until its data arrives; it's prefetched, so it appears instantly on navigation. Use `<Suspense>` boundaries close to the slow components in most other cases, so the rest of the page streams in right away. The two work together.",
    },
    {
      q: "Why doesn't useFormStatus report pending?",
      a: "It only tracks the form that renders the component calling it. Move the hook into a child component, such as `SubmitButton`, and render that inside the `<form>`.",
    },
    {
      q: "Why doesn't my loading.tsx appear while a layout loads data?",
      a: "`loading.tsx` wraps the page and nested layouts, but not the `layout.tsx` in the same folder. Move slow data fetching from the layout into the page, or wrap that part of the layout in its own `<Suspense>` boundary.",
    },
  ],
};

export default guide;
