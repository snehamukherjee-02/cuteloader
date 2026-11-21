import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "angular",
  framework: "Angular (v17+)",
  title: "Add a Loading Animation to an Angular App",
  seoTitle: "Angular Loading Animation: Signals and an HTTP Interceptor",
  description: "Show a CuteLoader loading animation in Angular 17+: a standalone component, a signal-based LoaderService, a functional HTTP interceptor and @if control flow.",
  intro: "Angular gives you everything an app-wide loader needs: standalone components, signals for shared state, and functional HTTP interceptors that see every request. This guide turns a CuteLoader export into a standalone LoaderComponent, keeps a request counter in a signal-based LoaderService, starts and stops it from an HttpInterceptorFn with finalize(), and shows a full-screen overlay with the @if control flow block. It also shows how a single request can opt out and display an inline loader instead.",
  summary: "Signals + HttpInterceptorFn",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "Angular 17 or later, with standalone components and an `app.config.ts` (the default for new projects). The examples use signal inputs (`input()`), available from Angular 17.1; on 17.0, use `@Input()` instead.",
        "A loader exported with CuteLoader's **HTML/CSS** tab. The examples use a demo ring; any loader works the same way, because every export shares one structure.",
      ],
    },
    { type: "h2", text: "Step 1: A standalone LoaderComponent" },
    { type: "p", text: "Paste the exported SVG into the template and the exported CSS into `styles`, then bind the custom properties to inputs. Angular binds CSS custom properties with the same `[style.--name]` syntax it uses for ordinary styles:" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/loader/loader.component.ts",
      code: `import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

@Component({
  selector: "app-loader",
  standalone: true, // the default from Angular 19; required in 17 and 18
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="cl-wrap" role="status" aria-live="polite">
      <svg class="cl-demo-ring" viewBox="0 0 100 100" [attr.width]="size()" [attr.height]="size()"
           [style.--c1]="primary()" [style.--c2]="secondary()" [style.--d]="duration()"
           aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
      <span class="cl-sr-only">{{ label() }}</span>
    </div>
  \`,
  styles: \`
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
  \`,
})
export class LoaderComponent {
  readonly size = input(64);
  readonly primary = input("#8b5cf6");
  readonly secondary = input("#f472b6");
  readonly speed = input(1);
  readonly label = input("Loading…");

  /** 1.4s is the demo ring's cycle at normal speed (its --d in the exported CSS). */
  protected readonly duration = computed(() => \`\${1.4 / this.speed()}s\`);
}`,
    },
    { type: "p", text: "Use it like any other component: `<app-loader [size]=\"32\" primary=\"#0ea5e9\" label=\"Loading invoices\" />`. String inputs accept plain attributes, and every input has a default, so `<app-loader />` works too. The component's default emulated encapsulation applies the styles to the SVG elements in its own template, so the export's CSS needs no changes. When you switch loaders, replace the SVG content, the CSS and the `1.4` (the new loader's `--d` value in seconds)." },
    { type: "loader", slug: "terminal-typing", caption: "Terminal Typing, a natural fit for developer tools and dashboards, converts into a component exactly the same way." },
    { type: "h2", text: "Step 2: A LoaderService with a signal counter" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/loader/loader.service.ts",
      code: `import { Injectable, computed, signal } from "@angular/core";

const SHOW_DELAY = 200; // ms: requests faster than this never show the overlay

@Injectable({ providedIn: "root" })
export class LoaderService {
  private readonly pending = signal(0);
  private readonly shown = signal(false);
  private showTimer: ReturnType<typeof setTimeout> | undefined;

  /** True while at least one tracked request is running. */
  readonly busy = computed(() => this.pending() > 0);
  /** True once requests have been running for longer than the delay. */
  readonly visible = this.shown.asReadonly();

  start(): void {
    this.pending.update((n) => n + 1);
    if (this.pending() === 1) {
      this.showTimer = setTimeout(() => this.shown.set(true), SHOW_DELAY);
    }
  }

  stop(): void {
    if (this.pending() === 0) return; // ignore unbalanced calls
    this.pending.update((n) => n - 1);
    if (this.pending() === 0) {
      clearTimeout(this.showTimer);
      this.shown.set(false);
    }
  }
}`,
    },
    { type: "p", text: "The counter keeps the overlay up while any request is running, and the overlay only appears once requests have been running for 200 ms, so fast responses never flash it. Because the state lives in signals, templates that read it update on their own, in zone-based and zoneless apps alike." },
    { type: "h2", text: "Step 3: A functional interceptor with finalize()" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/loader/loader.interceptor.ts",
      code: `import { HttpContextToken, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { LoaderService } from "./loader.service";

/** Set to true on a request to keep it from showing the global overlay. */
export const SKIP_LOADER = new HttpContextToken<boolean>(() => false);

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADER)) {
    return next(req);
  }
  const loader = inject(LoaderService);
  loader.start();
  return next(req).pipe(finalize(() => loader.stop()));
};`,
    },
    { type: "p", text: "`finalize()` runs when the request completes, fails or is cancelled (for example by `switchMap` or a component that unsubscribes), so every `start()` gets exactly one `stop()`. `inject()` works here because Angular runs functional interceptors in an injection context. The interceptor deliberately handles only the loader: error messages belong to the code that made the request, which knows what failed and what the visitor can do about it, as step 5 shows." },
    { type: "p", text: "Register it where the app provides `HttpClient`:" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/app.config.ts",
      code: `import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { loaderInterceptor } from "./loader/loader.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor])),
    // ...keep your other providers, such as provideRouter(routes)
  ],
};`,
    },
    { type: "h2", text: "Step 4: Show the overlay with @if" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/app.component.ts",
      code: `import { Component, inject } from "@angular/core";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from "./loader/loader.service";
import { TeamListComponent } from "./team/team-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [LoaderComponent, TeamListComponent],
  template: \`
    <main>
      <app-team-list />
    </main>
    @if (loader.visible()) {
      <div class="cl-overlay">
        <app-loader [size]="72" label="Loading…" />
      </div>
    }
  \`,
})
export class AppComponent {
  protected readonly loader = inject(LoaderService);
}`,
    },
    { type: "p", text: "Add the overlay helper, plus a small fade-in class used in the next step, to your global stylesheet:" },
    {
      type: "code",
      lang: "css",
      filename: "src/styles.css",
      code: `.cl-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: rgba(255, 255, 255, 0.75); }
.cl-overlay[hidden] { display: none; }

/* Fade an inline loader in after 200 ms, so quick responses never flash it. */
.loader-delay {
  animation: loader-delay-in 0.2s ease-out 0.2s both;
}
@keyframes loader-delay-in {
  from { opacity: 0; }
}`,
    },
    { type: "h2", text: "Step 5: An inline loader for one request" },
    { type: "p", text: "Some requests deserve a loader right where the content will appear. This component opts out of the overlay with `SKIP_LOADER` and manages its own state with signals and `@if`:" },
    {
      type: "code",
      lang: "ts",
      filename: "src/app/team/team-list.component.ts",
      code: `import { HttpClient, HttpContext } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { finalize } from "rxjs";
import { LoaderComponent } from "../loader/loader.component";
import { SKIP_LOADER } from "../loader/loader.interceptor";

type Member = { id: number; name: string };

@Component({
  selector: "app-team-list",
  standalone: true,
  imports: [LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <section aria-labelledby="team-heading" [attr.aria-busy]="loading()">
      <h2 id="team-heading">Team</h2>
      @if (loading()) {
        <app-loader class="loader-delay" [size]="48" label="Loading team members" />
      } @else if (error()) {
        <p role="alert">{{ error() }}</p>
      } @else {
        <ul>
          @for (member of members(); track member.id) {
            <li>{{ member.name }}</li>
          } @empty {
            <li>No team members yet.</li>
          }
        </ul>
      }
      <button type="button" (click)="load()" [attr.aria-disabled]="loading()">Reload</button>
    </section>
  \`,
})
export class TeamListComponent {
  private readonly http = inject(HttpClient);
  protected readonly members = signal<Member[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal("");

  constructor() {
    this.load();
  }

  load(): void {
    if (this.loading()) return; // aria-disabled doesn't block clicks by itself
    this.loading.set(true);
    this.error.set("");
    this.http
      .get<Member[]>("/api/team", { context: new HttpContext().set(SKIP_LOADER, true) })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (members) => this.members.set(members),
        error: () => this.error.set("Couldn't load the team. Please try again."),
      });
  }
}`,
    },
    { type: "p", text: "The `error` callback shows a message, and `finalize()` clears the loading state on success, failure and cancellation alike. Every other `HttpClient` request in the app still shows the overlay automatically." },
    { type: "p", text: "There are two flash guards in this guide, one per pattern. The overlay waits for the service's 200 ms timer, because it only exists once `visible` turns true. The inline loader is rendered immediately but stays transparent for its first 200 ms thanks to the `loader-delay` class, so a quick response replaces it before anyone sees it." },
    { type: "h2", text: "Step 6: A button loading state" },
    { type: "p", text: "Inside a button, the loader is decoration; the button text already says what is happening. Hide the loader from assistive technology and swap the text:" },
    {
      type: "code",
      lang: "html",
      filename: "src/app/settings/save-button.html",
      code: `<button type="button" class="btn" (click)="save()" [attr.aria-disabled]="saving()">
  @if (saving()) {
    <span aria-hidden="true"><app-loader [size]="18" primary="#ffffff" secondary="#ffffff" /></span>
    Saving…
  } @else {
    Save
  }
</button>
<p role="status">{{ saveMessage() }}</p>`,
    },
    { type: "p", text: "In the component, return early from `save()` while `saving()` is true, set `saving` back to false in `finalize()`, and put the outcome in `saveMessage` so the persistent status paragraph announces it." },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "`LoaderComponent` keeps the export's `role=\"status\"`, `aria-live=\"polite\"` and hidden label; pass a `label` that names what is loading.",
        "Bind `aria-busy` on the region being updated, as `TeamListComponent` does, and show errors in a `role=\"alert\"` element.",
        "The overlay doesn't take focus or trap it. Guard buttons with `aria-disabled` and an early return; `disabled` would drop keyboard focus to the start of the page.",
        "Reduced motion is handled by the export's CSS, which slows the animation three times.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "See the same architecture in the [Vue guide](/guides/vue/), or with plain fetch in the [JavaScript guide](/guides/javascript/).",
        "Theme the loader for dark mode with the techniques in the [CSS guide](/guides/css/).",
        "Choose another loader in the [animation library](/animations/) or among the [CSS loaders](/css-loaders/), and fine-tune it in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["terminal-typing", "minimal-ring", "processing-gears"],
  faqs: [
    {
      q: "Why use an interceptor instead of showing the loader in each component?",
      a: "An interceptor sees every `HttpClient` request in one place, so no component can forget to show or hide the loader. Components that want different behavior opt out per request with the `SKIP_LOADER` context token.",
    },
    {
      q: "Does the loader work in zoneless Angular apps?",
      a: "Yes. The overlay reads signals, and signal changes schedule change detection on their own, so the timer that sets `visible` updates the view without Zone.js.",
    },
    {
      q: "Why is finalize() better than hiding the loader in subscribe?",
      a: "`finalize()` runs on completion, on error and on unsubscribe. A `next` or `complete` callback misses failures and cancelled requests, which is exactly how loaders end up stuck on screen.",
    },
    {
      q: "Can I keep the component's styles in a separate file?",
      a: "Yes. Move the exported CSS into `loader.component.css` and reference it with `styleUrl: \"./loader.component.css\"`. The result is identical; inline `styles` simply keeps the loader in one file.",
    },
  ],
};

export default guide;
