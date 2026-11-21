import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "vue",
  framework: "Vue 3",
  title: "Add a Loading Animation to a Vue 3 App",
  seoTitle: "Vue 3 Loading Animation: Component, Composable, Teleport",
  description: "Build a Vue 3 loading component from a CuteLoader export, share loading state with a useLoader composable, wire it to fetch and show a Teleport overlay.",
  intro: "A CuteLoader export is plain SVG and CSS, which maps neatly onto a Vue single-file component. This guide turns the export into a DemoRingLoader component with props for colors, size and speed, adds a useLoader composable that counts requests across the whole app, wires it to fetch, and renders a full-screen overlay with Teleport. The overlay waits 200 ms before appearing, so fast responses never flash it.",
  summary: "SFC + composable + Teleport",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "A Vue 3 project with `<script setup>` and TypeScript, such as one created by `npm create vue@latest`. Plain JavaScript works too; drop the type annotations.",
        "A loader exported with CuteLoader's **HTML/CSS** tab. The examples use a demo ring; any loader works the same way, because every export shares one structure.",
      ],
    },
    { type: "h2", text: "Step 1: Turn the export into a component" },
    { type: "p", text: "Paste the exported `<svg>` into the template and the exported CSS into a `<style>` block, then bind the parts you want to control. Colors and speed are CSS custom properties on the SVG, so a computed style object is all it takes:" },
    {
      type: "code",
      lang: "vue",
      filename: "src/components/DemoRingLoader.vue",
      code: `<script setup lang="ts">
import { computed } from "vue";

const {
  size = 64,
  primary = "#8b5cf6",
  secondary = "#f472b6",
  speed = 1,
  label = "Loading…",
} = defineProps<{
  size?: number;
  primary?: string;
  secondary?: string;
  speed?: number;
  label?: string;
}>();

// 1.4s is the demo ring's cycle at normal speed (its --d in the exported CSS).
const vars = computed(() => ({
  "--c1": primary,
  "--c2": secondary,
  "--d": \`\${1.4 / speed}s\`,
}));
</script>

<template>
  <div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-demo-ring" viewBox="0 0 100 100" :width="size" :height="size" :style="vars" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    <span class="cl-sr-only">{{ label }}</span>
  </div>
</template>

<style>
/* The exported CSS, unchanged. It isn't scoped: its class names are already prefixed with cl-. */
.cl-demo-ring {
  --c1: #8b5cf6;
  --c2: #f472b6;
  --d: 1.4s;
  --sw: 6;
  display: block;
  overflow: visible;
}
.cl-demo-ring .track { fill: none; stroke: var(--c1); stroke-width: var(--sw); opacity: .25; }
.cl-demo-ring .spin { transform-origin: 50px 50px; animation: cl-demo-ring-spin calc(var(--d) * var(--rm,1)) linear infinite; }
.cl-demo-ring .dot { fill: var(--c2); transform-box: fill-box; transform-origin: center; animation: cl-demo-ring-pulse calc(calc(var(--d) * var(--rm,1)) / 2) ease-in-out infinite; }
@keyframes cl-demo-ring-spin { to { transform: rotate(360deg); } }
@keyframes cl-demo-ring-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(.7); } }
@media (prefers-reduced-motion: reduce) { .cl-demo-ring { --rm: 3; } }
.cl-wrap { display: inline-grid; place-items: center; }
.cl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
</style>`,
    },
    { type: "p", text: "Destructuring `defineProps` with default values keeps the props reactive in Vue 3.5 and later; the compiler rewrites each access as `props.primary` and so on. On Vue 3.4 or earlier, declare the defaults with `withDefaults(defineProps<…>(), { … })` and read `props.size` instead. Vue sets keys that start with `--` through `style.setProperty`, so custom properties in a style binding just work." },
    { type: "p", text: "If you switch loaders later, replace the SVG content, the CSS and the `1.4` (the new loader's `--d` value in seconds)." },
    { type: "loader", slug: "blooming-flower", caption: "Blooming Flower, a gentler choice for friendly apps, converts into a component exactly the same way." },
    { type: "h2", text: "Step 2: A useLoader composable with a shared counter" },
    { type: "p", text: "The state lives at module level, outside the function, so every component that calls `useLoader()` shares one counter and one overlay:" },
    {
      type: "code",
      lang: "ts",
      filename: "src/composables/useLoader.ts",
      code: `import { computed, readonly, ref } from "vue";

const SHOW_DELAY = 200; // ms: requests faster than this never show the overlay

// Module-level state, shared by every component that calls useLoader().
const pending = ref(0);
const visible = ref(false);
let showTimer: ReturnType<typeof setTimeout> | undefined;

function start() {
  pending.value += 1;
  if (pending.value === 1) {
    showTimer = setTimeout(() => {
      visible.value = true;
    }, SHOW_DELAY);
  }
}

function stop() {
  if (pending.value === 0) return; // ignore unbalanced calls
  pending.value -= 1;
  if (pending.value === 0) {
    clearTimeout(showTimer);
    visible.value = false;
  }
}

async function track<T>(work: Promise<T>): Promise<T> {
  start();
  try {
    return await work;
  } finally {
    stop();
  }
}

const isLoading = computed(() => pending.value > 0);

export function useLoader() {
  return { isLoading, visible: readonly(visible), start, stop, track };
}`,
    },
    { type: "p", text: "The counter keeps the overlay up while any request is still running, however many start and finish in between. `track()` pairs `start()` and `stop()` with `try`/`finally`, so a failed request can't leave the overlay stuck on screen." },
    { type: "h2", text: "Step 3: Wire it to fetch" },
    { type: "p", text: "Track the whole operation, including reading the body, and turn bad HTTP statuses into errors, because `fetch()` only rejects when the network fails:" },
    {
      type: "code",
      lang: "vue",
      filename: "src/components/TeamList.vue",
      code: `<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLoader } from "../composables/useLoader";

type Member = { id: number; name: string };

const members = ref<Member[]>([]);
const error = ref("");
const loading = ref(false);
const { track } = useLoader();

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(\`\${url} responded with \${res.status}\`);
  return (await res.json()) as T;
}

async function loadTeam() {
  if (loading.value) return; // aria-disabled doesn't block clicks by itself
  loading.value = true;
  error.value = "";
  try {
    members.value = await track(getJson<Member[]>("/api/team"));
  } catch (err) {
    console.error(err);
    error.value = "Couldn't load the team. Please try again.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadTeam);
</script>

<template>
  <section aria-labelledby="team-heading" :aria-busy="loading">
    <h2 id="team-heading">Team</h2>
    <ul>
      <li v-for="member in members" :key="member.id">{{ member.name }}</li>
    </ul>
    <p v-if="error" role="alert">{{ error }}</p>
    <button type="button" :aria-disabled="loading" @click="loadTeam">Reload</button>
  </section>
</template>`,
    },
    { type: "p", text: "The local `loading` ref drives `aria-busy` on the section and guards the button, while `track()` drives the shared overlay. To show the loader inline instead, skip `track()` and render `<DemoRingLoader v-if=\"loading\" :size=\"48\" label=\"Loading team members\" />` inside the section." },
    { type: "h3", text: "Using axios?" },
    { type: "p", text: "Call `start()` in a request interceptor and `stop()` in both response handlers, so every request is counted in and out exactly once:" },
    {
      type: "code",
      lang: "ts",
      filename: "src/plugins/axios-loader.ts",
      code: `import axios from "axios";
import { useLoader } from "../composables/useLoader";

const { start, stop } = useLoader();

axios.interceptors.request.use((config) => {
  start();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    stop();
    return response;
  },
  (error) => {
    stop();
    return Promise.reject(error);
  },
);`,
    },
    { type: "p", text: "Import this file once in `main.ts`. If other request interceptors can reject before this one runs, wrap individual calls in `track()` instead, which pairs the two calls exactly." },
    { type: "h3", text: "Lazy components with a built-in delay" },
    { type: "p", text: "For components loaded on demand, `defineAsyncComponent` can show the loader for you. Its `delay` option, 200 ms by default, already prevents the flash:" },
    {
      type: "code",
      lang: "vue",
      filename: "src/components/ReportsSection.vue",
      code: `<script setup lang="ts">
import { defineAsyncComponent, h } from "vue";
import DemoRingLoader from "./DemoRingLoader.vue";

const ReportsPanel = defineAsyncComponent({
  loader: () => import("./ReportsPanel.vue"),
  loadingComponent: DemoRingLoader,
  delay: 200, // the loader appears only if loading takes longer than this
  timeout: 10000,
  errorComponent: { render: () => h("p", { role: "alert" }, "The reports couldn't be loaded.") },
});
</script>

<template>
  <ReportsPanel />
</template>`,
    },
    { type: "p", text: "If the download fails or takes longer than `timeout`, Vue swaps in the error component, so the loader never stays on screen indefinitely." },
    { type: "h2", text: "Step 4: A Teleport overlay" },
    { type: "p", text: "`<Teleport to=\"body\">` renders the overlay at the end of `<body>`, outside any parent with `overflow: hidden` or a stacking context that would clip it:" },
    {
      type: "code",
      lang: "vue",
      filename: "src/App.vue",
      code: `<script setup lang="ts">
import DemoRingLoader from "./components/DemoRingLoader.vue";
import TeamList from "./components/TeamList.vue";
import { useLoader } from "./composables/useLoader";

const { visible } = useLoader();
</script>

<template>
  <main>
    <TeamList />
  </main>
  <Teleport to="body">
    <div v-if="visible" class="cl-overlay">
      <DemoRingLoader :size="72" label="Loading…" />
    </div>
  </Teleport>
</template>

<style>
.cl-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: rgba(255, 255, 255, 0.75); }
.cl-overlay[hidden] { display: none; }
</style>`,
    },
    { type: "p", text: "Because `visible` only turns true after 200 ms, quick requests never show anything, and the counter hides the overlay only after the last request settles." },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "The component keeps the export's `role=\"status\"`, `aria-live=\"polite\"` and visually hidden label. Pass a `label` that names what is loading.",
        "Bind `aria-busy` on the region being updated, as `TeamList` does, and show errors in a `role=\"alert\"` element.",
        "The overlay never receives focus and doesn't trap it. Guard buttons with `aria-disabled` and an early return rather than `disabled`, which drops keyboard focus to the start of the page.",
        "Reduced motion is built into the exported CSS: the animation runs three times slower.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "**Nuxt:** module-level refs are shared by every request on the server, so in a Nuxt app keep the counter in `useState()` instead. Nuxt server-renders teleports only to `#teleports`; use `<Teleport to=\"#teleports\">` or wrap a body teleport in `<ClientOnly>`. For route changes, Nuxt's built-in `<NuxtLoadingIndicator>` shows a progress bar.",
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Compare the same patterns in the [Angular guide](/guides/angular/) and the [React guide](/guides/react/).",
        "Customize colors and dark mode with plain CSS in the [CSS guide](/guides/css/).",
        "Pick another loader from the [animation library](/animations/) or the [SVG loaders](/svg-loaders/), and tune it in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["blooming-flower", "orbiting-dots", "three-dot-pulse"],
  faqs: [
    {
      q: "Should the loader CSS be scoped?",
      a: "It doesn't need to be. Every class and keyframe name in the export is prefixed with `cl-` and the loader's slug, so a global `<style>` block won't collide with your own styles, and the keyframes keep the exact names the export uses.",
    },
    {
      q: "Why does the composable keep its state outside the function?",
      a: "So that every component shares one counter. If the refs were created inside `useLoader()`, each component would get its own copy, and one component finishing its request would have no idea that another is still waiting.",
    },
    {
      q: "Can I use the CuteLoader JavaScript export in Vue instead?",
      a: "Yes. `CuteLoader.track(promise)` and `show()`/`hide()` work from any component, and its reference counting matches the composable here. A component is the more natural fit when you want props and templates, and it renders during server-side rendering too.",
    },
    {
      q: "How do I show the loader inside a button?",
      a: "Render a small `DemoRingLoader` inside the button, wrapped in `<span aria-hidden=\"true\">`, and change the button text to something like \"Saving…\". The button text tells everyone what is happening, so the spinner doesn't need to announce itself.",
    },
  ],
};

export default guide;
