import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "react",
  framework: "React",
  title: "Add a Loading Animation to a React App",
  seoTitle: "React Loading Animation: Suspense, Transitions and Buttons",
  description: "Use a CuteLoader React loading component: conditional rendering while data loads, Suspense fallbacks with React.lazy, useTransition pending states and buttons.",
  intro: "CuteLoader's React export is one typed component with no dependencies and no hooks, so it drops into any React project, whichever bundler or framework you use. This guide covers the four places a React app most often needs a loader: while data is being fetched, as a Suspense fallback for lazy-loaded code, while a transition is pending, and inside a button during a save. Along the way it adds a tiny Delayed component, so fast responses never flash a spinner.",
  summary: "Suspense, useTransition, buttons",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "React 18 or later. The async transition in step 5 uses React 19, which accepts async functions in `startTransition`.",
        "A loader exported with CuteLoader's **React** tab. The examples use `DemoRingLoader.tsx`; every loader's component has the same shape, named after the loader (for example `OrbitingDotsLoader`).",
        "The export is a `.tsx` file. In a JavaScript-only project, enable TypeScript for that file or delete its type annotations.",
      ],
    },
    { type: "h2", text: "Step 1: Add the component" },
    { type: "p", text: "Save the export as `src/components/DemoRingLoader.tsx`. It renders a `span.cl-wrap` with `role=\"status\"` and `aria-live=\"polite\"`, its own `<style>` element, the SVG and a visually hidden label. Every prop is optional, and the defaults are the settings you chose before exporting:" },
    {
      type: "table",
      head: ["Prop", "What it controls"],
      rows: [
        ["`size`", "Width in pixels; the height follows the loader's aspect ratio"],
        ["`primary`, `secondary`", "The two main colors (`--c1`, `--c2`)"],
        ["`accent`", "A third color, on loaders that have one"],
        ["`speed`", "Speed multiplier: `2` is twice as fast"],
        ["`stroke`", "Stroke width in SVG units, on loaders drawn with strokes"],
        ["`intensity`", "Motion intensity, on loaders that support it"],
        ["`background`", "Only present if you exported with a background color; `\"transparent\"` removes it"],
        ["`label`", "Text announced to screen readers (default `\"Loading\"`)"],
        ["`className`", "Extra classes for the wrapper"],
      ],
    },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/Example.tsx",
      code: `import { DemoRingLoader } from "./DemoRingLoader";

export function Example() {
  return <DemoRingLoader size={48} primary="#0ea5e9" secondary="#f97316" label="Loading orders" />;
}`,
    },
    { type: "p", text: "Colors and speed are passed to the SVG as inline CSS custom properties, so two instances on one page can look completely different." },
    { type: "loader", slug: "orbiting-dots", caption: "Orbiting Dots, like every loader in the library, exports as a component with this same set of props." },
    { type: "h2", text: "Step 2: A Delayed wrapper to prevent flashing" },
    { type: "p", text: "A loader that appears for 80 ms and disappears again reads as a glitch. Render it only once a wait has lasted 200 ms:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/Delayed.tsx",
      code: `import { useEffect, useState, type ReactNode } from "react";

/** Renders its children only after \`ms\` milliseconds. */
export function Delayed({ ms = 200, children }: { ms?: number; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), ms);
    return () => clearTimeout(id);
  }, [ms]);
  return visible ? children : null;
}`,
    },
    { type: "p", text: "Because it starts hidden every time it mounts, you never have to reset it: when loading ends it unmounts, and the next load starts a fresh timer." },
    { type: "h2", text: "Step 3: Show the loader while data loads" },
    { type: "p", text: "Model the request as a small state machine. With a single `status` field, the loader disappears on every path, success or error, and the \"loading forever\" bug becomes hard to write:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/TeamList.tsx",
      code: `import { useEffect, useState } from "react";
import { DemoRingLoader } from "./DemoRingLoader";
import { Delayed } from "./Delayed";

type Member = { id: number; name: string };
type State = { status: "loading" } | { status: "error" } | { status: "ready"; members: Member[] };

export function TeamList() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/team", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json() as Promise<Member[]>;
      })
      .then((members) => setState({ status: "ready", members }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return; // unmounted, or a newer attempt started
        console.error(error);
        setState({ status: "error" });
      });
    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }

  const loading = state.status === "loading";
  return (
    <section aria-labelledby="team-heading" aria-busy={loading}>
      <h2 id="team-heading">Team</h2>
      {loading && (
        <Delayed>
          <DemoRingLoader size={48} label="Loading team members" />
        </Delayed>
      )}
      {state.status === "error" && (
        <p role="alert">
          Couldn't load the team. <button type="button" onClick={retry}>Try again</button>
        </p>
      )}
      {state.status === "ready" && (
        <ul>
          {state.members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}`,
    },
    { type: "p", text: "`fetch()` doesn't reject on a 404 or 500, so the first `then` turns a bad status into an error. The `AbortController` cancels the request when the component unmounts, which also keeps React's development-mode double effects from racing each other. If you use a data library such as TanStack Query or SWR, its loading flag replaces this state, and the same `Delayed` pattern applies." },
    { type: "h2", text: "Step 4: A Suspense fallback for lazy-loaded code" },
    { type: "p", text: "`React.lazy` splits a component into its own bundle and downloads it the first time it renders. Until then, the nearest `<Suspense>` boundary shows its fallback:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/App.tsx",
      code: `import { lazy, Suspense, useState } from "react";
import { DemoRingLoader } from "./components/DemoRingLoader";
import { Delayed } from "./components/Delayed";
import { ErrorBoundary } from "./components/ErrorBoundary";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));

export default function App() {
  const [showReports, setShowReports] = useState(false);
  return (
    <main>
      <button type="button" onClick={() => setShowReports(true)}>Open reports</button>
      {showReports && (
        <ErrorBoundary fallback={<p role="alert">The reports couldn't be loaded. Please reload the page.</p>}>
          <Suspense
            fallback={
              <Delayed>
                <div className="page-loading">
                  <DemoRingLoader size={72} label="Loading reports" />
                </div>
              </Delayed>
            }
          >
            <ReportsPage />
          </Suspense>
        </ErrorBoundary>
      )}
    </main>
  );
}`,
    },
    { type: "p", text: "`ReportsPage` must be a default export. If the download fails, the error goes to the nearest error boundary rather than leaving the fallback on screen forever. React has no hook for error boundaries, so this is still a small class component:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/ErrorBoundary.tsx",
      code: `import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };

export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}`,
    },
    {
      type: "code",
      lang: "css",
      filename: "src/index.css",
      code: `.page-loading {
  display: grid;
  place-items: center;
  min-height: 40vh;
}`,
    },
    { type: "h2", text: "Step 5: Pending state with useTransition" },
    { type: "p", text: "`useTransition` gives you an `isPending` flag for updates that may take a while, and React keeps the current UI interactive in the meantime. In React 19 you can pass an async function. State updates after an `await` currently need their own `startTransition` call, as below:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/StatsPanel.tsx",
      code: `import { useState, useTransition } from "react";
import { DemoRingLoader } from "./DemoRingLoader";
import { Delayed } from "./Delayed";

type Stats = { visitors: number; signups: number };

export function StatsPanel({ initial }: { initial: Stats }) {
  const [stats, setStats] = useState(initial);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function refresh() {
    if (isPending) return;
    startTransition(async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const next = (await res.json()) as Stats;
        startTransition(() => {
          setStats(next);
          setError("");
        });
      } catch (err) {
        console.error(err);
        startTransition(() => setError("Couldn't refresh the stats."));
      }
    });
  }

  return (
    <section aria-labelledby="stats-heading" aria-busy={isPending}>
      <header className="panel-header">
        <h2 id="stats-heading">Today</h2>
        <button type="button" onClick={refresh} aria-disabled={isPending}>Refresh</button>
        {isPending && (
          <Delayed>
            <DemoRingLoader size={20} stroke={9} label="Refreshing stats" />
          </Delayed>
        )}
      </header>
      <p>
        {stats.visitors} visitors, {stats.signups} sign-ups
      </p>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}`,
    },
    { type: "p", text: "The same flag helps when a transition renders something that suspends, such as a lazy tab: instead of replacing visible content with a Suspense fallback, React keeps showing the current screen, and `isPending` is your cue to show a small inline loader. Catch errors inside the action as shown; an error that escapes it goes to the nearest error boundary." },
    { type: "h2", text: "Step 6: A button loading state" },
    { type: "p", text: "Inside a button, the loader is decoration: the button's text already says what is happening. Wrap it in `aria-hidden=\"true\"` and report the outcome in a status element next to the button:" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/components/SaveButton.tsx",
      code: `import { useState } from "react";
import { DemoRingLoader } from "./DemoRingLoader";

export function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    if (saving) return; // aria-disabled doesn't block clicks by itself
    setSaving(true);
    setMessage("");
    try {
      await onSave();
      setMessage("Saved.");
    } catch (error) {
      console.error(error);
      setMessage("Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="save-row">
      <button type="button" className="btn" onClick={handleClick} aria-disabled={saving}>
        {saving && (
          <span aria-hidden="true">
            <DemoRingLoader size={18} stroke={10} primary="#ffffff" secondary="#ffffff" />
          </span>
        )}
        {saving ? "Saving…" : "Save"}
      </button>
      <p role="status" className="save-status">{message}</p>
    </div>
  );
}`,
    },
    { type: "p", text: "`finally` resets the button whether the save succeeds or fails. The button uses `aria-disabled` and an early return instead of `disabled`: disabling a button while it has focus sends keyboard focus back to the start of the page. Here the spinner appears immediately because the text change already gives instant feedback; add `Delayed` if you prefer." },
    { type: "h2", text: "Accessibility recap" },
    {
      type: "ul",
      items: [
        "The component announces its `label` through `role=\"status\"` and `aria-live=\"polite\"`. Pass a label that names what is loading.",
        "Set `aria-busy` on the region being updated, as the examples do, and keep error messages in `role=\"alert\"` elements.",
        "Never move focus to a loader or trap it; keep controls focusable and guard repeated clicks in code.",
        "Reduced motion is built in: the exported CSS slows the animation to a third of its speed.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Using the App Router? The [Next.js guide](/guides/nextjs/) covers `loading.tsx`, streaming and form pending states with the same component.",
        "For non-React parts of a site, see the [JavaScript guide](/guides/javascript/).",
        "Pick another style from the [React loaders](/react-loaders/) or the full [animation library](/animations/), and adjust it in the [loading animation generator](/loading-animation-generator/) before exporting.",
      ],
    },
  ],
  relatedAnimations: ["orbiting-dots", "three-dot-pulse", "minimal-ring"],
  faqs: [
    {
      q: "Do I need to install a package to use the React loader?",
      a: "No. The export is a single `.tsx` file with no dependencies beyond React itself. Copy it into your components folder and import it like any other component.",
    },
    {
      q: "Why not show the loader the moment loading starts?",
      a: "Many requests finish in well under 200 ms, and a spinner that blinks on and off makes an app feel slower and jumpier than one that simply updates. The `Delayed` wrapper skips the loader for quick operations and still shows it for anything slow enough to notice.",
    },
    {
      q: "Can I use the component in React Server Components?",
      a: "Yes. It has no hooks, no state and no event handlers, so it renders on the server as well as the client. The [Next.js guide](/guides/nextjs/) uses it directly in `loading.tsx` and Suspense fallbacks.",
    },
    {
      q: "Each loader includes its own style element. Is that a problem?",
      a: "No. Every instance renders the same small `<style>` block with identical rules, so several loaders on one page simply repeat them. Colors, speed and size come from props as inline custom properties, so instances never interfere with each other.",
    },
  ],
};

export default guide;
