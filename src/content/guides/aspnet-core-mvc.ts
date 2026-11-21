import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "aspnet-core-mvc",
  framework: "ASP.NET Core MVC",
  title: "Add a Loading Animation to ASP.NET Core MVC",
  seoTitle: "ASP.NET Core MVC Loading Animation with a Razor Partial",
  description: "Add a loading animation to ASP.NET Core MVC: a reusable _Loader partial, fetch calls to JSON and partial-view actions, and antiforgery-safe form posts.",
  intro: "ASP.NET Core MVC pairs naturally with plain fetch(): controller actions return JSON or rendered partial views, and a few lines of JavaScript swap them into the page. This guide puts a CuteLoader animation in a reusable _Loader partial, shows it while each asynchronous request runs, hides it once the data has loaded or the request has failed, and posts a form with the antiforgery token. A short note at the end covers Razor Pages.",
  summary: "Razor partial + fetch",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "An ASP.NET Core MVC project, such as one created with `dotnet new mvc`. The examples use file-scoped namespaces and nullable reference types, as in the current templates.",
        "A loader exported from CuteLoader with the **HTML/CSS** tab. The examples use a demo ring; any loader works the same way, because every export shares one structure.",
      ],
    },
    { type: "h2", text: "Step 1: Add the CSS to wwwroot" },
    { type: "p", text: "Save the export, the overlay helper and two rules for inline loaders as `wwwroot/css/cuteloader.css`:" },
    {
      type: "code",
      lang: "css",
      filename: "wwwroot/css/cuteloader.css",
      code: `.cl-demo-ring {
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
.cl-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: rgba(255, 255, 255, 0.75); }
.cl-overlay[hidden] { display: none; }

/* Inline loaders inside a section */
.inline-loader { display: grid; place-items: center; min-height: 6rem; }
.inline-loader[hidden] { display: none; }`,
    },
    { type: "h2", text: "Step 2: A reusable _Loader partial" },
    { type: "p", text: "Put the exported markup in a shared partial, so every view renders the same loader. The label comes from view data, with a sensible default:" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Shared/_Loader.cshtml",
      code: `@{
    // Optional: pass a label with
    // <partial name="_Loader" view-data='new ViewDataDictionary(ViewData) { ["LoaderLabel"] = "Loading orders…" }' />
    var label = ViewData["LoaderLabel"] as string ?? "Loading…";
}
<div class="cl-wrap" role="status" aria-live="polite">
    <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
    <span class="cl-sr-only">@label</span>
</div>`,
    },
    { type: "p", text: "The partial deliberately declares no `@model`. A `<partial>` tag without a `model` attribute passes along the parent view's model, and a typed partial would throw whenever that model has a different type." },
    { type: "p", text: "Link the stylesheet in the layout and add a full-screen overlay that uses the partial:" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Shared/_Layout.cshtml",
      code: `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"]</title>
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/css/cuteloader.css" asp-append-version="true" />
</head>
<body>
    <div id="page-loader" class="cl-overlay" hidden>
        <partial name="_Loader" />
    </div>

    <main class="container">
        @RenderBody()
    </main>

    @await RenderSectionAsync("Scripts", required: false)
</body>`,
    },
    { type: "p", text: "`asp-append-version` adds a hash of the file to its URL, so browsers fetch the new stylesheet when you swap the export for another loader. `<partial>` is a tag helper, enabled by the `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers` line that the templates put in `Views/_ViewImports.cshtml`." },
    { type: "h2", text: "Step 3: The controller and data" },
    { type: "p", text: "One action returns JSON, one returns a partial view, and one accepts a JSON post protected by `[ValidateAntiForgeryToken]`:" },
    {
      type: "code",
      lang: "csharp",
      filename: "Controllers/OrdersController.cs",
      code: `using Microsoft.AspNetCore.Mvc;
using ShopAdmin.Models;
using ShopAdmin.Services;

namespace ShopAdmin.Controllers;

public class OrdersController : Controller
{
    private readonly IOrderService _orders;

    public OrdersController(IOrderService orders)
    {
        _orders = orders;
    }

    public IActionResult Index() => View();

    // GET /Orders/Recent: JSON with camelCase property names
    [HttpGet]
    public async Task<IActionResult> Recent(CancellationToken cancellationToken)
    {
        return Json(await _orders.GetRecentAsync(cancellationToken));
    }

    // GET /Orders/List: HTML rendered by a partial view
    [HttpGet]
    public async Task<IActionResult> List(CancellationToken cancellationToken)
    {
        return PartialView("_OrderList", await _orders.GetRecentAsync(cancellationToken));
    }

    // POST /Orders/AddNote: a JSON body plus the RequestVerificationToken header
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddNote([FromBody] NoteRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        await _orders.AddNoteAsync(request.OrderId, request.Text, cancellationToken);
        return Json(new { message = "Note saved." });
    }
}`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Models/Orders.cs",
      code: `using System.ComponentModel.DataAnnotations;

namespace ShopAdmin.Models;

public record Order(int Id, string Customer, decimal Total);

public class NoteRequest
{
    [Range(1, int.MaxValue)]
    public int OrderId { get; set; }

    [Required, StringLength(500)]
    public string Text { get; set; } = "";
}`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Services/OrderService.cs",
      code: `using ShopAdmin.Models;

namespace ShopAdmin.Services;

public interface IOrderService
{
    Task<IReadOnlyList<Order>> GetRecentAsync(CancellationToken cancellationToken = default);
    Task AddNoteAsync(int orderId, string text, CancellationToken cancellationToken = default);
}

// Sample data: replace with your own data access, such as Entity Framework Core.
public class InMemoryOrderService : IOrderService
{
    private readonly List<Order> _orders =
    [
        new(1003, "Katherine Johnson", 18.25m),
        new(1002, "Grace Hopper", 54.50m),
        new(1001, "Ada Lovelace", 129.00m),
    ];

    public Task<IReadOnlyList<Order>> GetRecentAsync(CancellationToken cancellationToken = default) =>
        Task.FromResult<IReadOnlyList<Order>>(_orders);

    public Task AddNoteAsync(int orderId, string text, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;
}`,
    },
    { type: "p", text: "The `CancellationToken` parameters are bound to the request's abort signal, so when the browser gives up on a request (for example when the script's `AbortSignal.timeout()` fires), your data access can stop too." },
    { type: "p", text: "Register the service in `Program.cs`, next to `AddControllersWithViews()`:" },
    {
      type: "code",
      lang: "csharp",
      filename: "Program.cs",
      code: `using ShopAdmin.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IOrderService, InMemoryOrderService>();

// ...the rest of Program.cs stays as it is`,
    },
    { type: "h2", text: "Step 4: The view and its partial" },
    { type: "p", text: "Each section holds its own inline loader. The URLs come from Razor through `data-url` attributes, so the script can live in a static file:" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/Index.cshtml",
      code: `@{
    ViewData["Title"] = "Orders";
}
<h1>Orders</h1>

<section id="recent" aria-labelledby="recent-title">
    <h2 id="recent-title">Recent orders</h2>
    <button type="button" id="load-recent" data-url="@Url.Action("Recent")">Load recent orders</button>
    <div id="recent-loader" class="inline-loader" hidden>
        <partial name="_Loader" view-data='new ViewDataDictionary(ViewData) { ["LoaderLabel"] = "Loading recent orders…" }' />
    </div>
    <ul id="recent-list"></ul>
    <p id="recent-status" role="status"></p>
</section>

<section id="orders" aria-labelledby="orders-title">
    <h2 id="orders-title">All orders</h2>
    <button type="button" id="load-orders" data-url="@Url.Action("List")">Show all orders</button>
    <div id="orders-loader" class="inline-loader" hidden>
        <partial name="_Loader" view-data='new ViewDataDictionary(ViewData) { ["LoaderLabel"] = "Loading orders…" }' />
    </div>
    <div id="orders-list"></div>
    <p id="orders-status" role="status"></p>
</section>

<section aria-labelledby="note-title">
    <h2 id="note-title">Add a note to order 1001</h2>
    <form id="note-form" asp-action="AddNote" method="post">
        <input type="hidden" name="orderId" value="1001" />
        <label for="note-text">Note</label>
        <input id="note-text" name="text" required maxlength="500" />
        <button type="submit">Save note</button>
    </form>
    <p id="note-status" role="status"></p>
</section>

@section Scripts {
    <script src="~/js/orders.js" asp-append-version="true"></script>
}`,
    },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/_OrderList.cshtml",
      code: `@model IReadOnlyList<ShopAdmin.Models.Order>
@if (Model.Count == 0)
{
    <p>No orders yet.</p>
}
else
{
    <ul>
        @foreach (var order in Model)
        {
            <li>#@order.Id, @order.Customer: @order.Total.ToString("C")</li>
        }
    </ul>
}`,
    },
    { type: "p", text: "The partial view returns only a fragment of HTML, with no layout, which is exactly what the script needs to drop into the page. The form tag helper adds a hidden `__RequestVerificationToken` field to every `method=\"post\"` form automatically. Outside such a form, render one with `@Html.AntiForgeryToken()`." },
    { type: "h2", text: "Step 5: Show the loader around each fetch" },
    {
      type: "code",
      lang: "js",
      filename: "wwwroot/js/orders.js",
      code: `// Shows a loader while work runs: only after 200 ms, and always hidden in finally.
async function withLoader(loader, region, work) {
  region.setAttribute("aria-busy", "true");
  const timer = setTimeout(() => { loader.hidden = false; }, 200);
  try {
    return await work();
  } finally {
    clearTimeout(timer);
    loader.hidden = true;
    region.removeAttribute("aria-busy");
  }
}

async function request(url, options, read) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), ...options });
  if (!response.ok) throw new Error(\`\${url} responded with \${response.status}\`);
  return read(response);
}

// 1. JSON from Recent(), rendered with textContent
const recentButton = document.getElementById("load-recent");
recentButton.addEventListener("click", async () => {
  const status = document.getElementById("recent-status");
  status.textContent = "";
  try {
    const orders = await withLoader(
      document.getElementById("recent-loader"),
      document.getElementById("recent"),
      () => request(recentButton.dataset.url, { headers: { Accept: "application/json" } }, (r) => r.json()),
    );
    document.getElementById("recent-list").replaceChildren(...orders.map((order) => {
      const item = document.createElement("li");
      item.textContent = \`\${order.customer}: \${order.total.toFixed(2)}\`;
      return item;
    }));
    status.textContent = \`\${orders.length} orders loaded.\`;
  } catch (error) {
    console.error(error);
    status.textContent = "Sorry, the orders couldn't be loaded.";
  }
});

// 2. HTML from the _OrderList partial view
const ordersButton = document.getElementById("load-orders");
ordersButton.addEventListener("click", async () => {
  const status = document.getElementById("orders-status");
  status.textContent = "";
  try {
    const html = await withLoader(
      document.getElementById("orders-loader"),
      document.getElementById("orders"),
      () => request(ordersButton.dataset.url, {}, (r) => r.text()),
    );
    document.getElementById("orders-list").innerHTML = html; // markup your own Razor partial encoded
  } catch (error) {
    console.error(error);
    status.textContent = "Sorry, the orders couldn't be loaded.";
  }
});

// 3. A form posted as JSON, with the antiforgery token in a header
const form = document.getElementById("note-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  if (button.getAttribute("aria-disabled") === "true") return;
  button.setAttribute("aria-disabled", "true");
  const status = document.getElementById("note-status");
  status.textContent = "";
  const fields = new FormData(form);
  try {
    const result = await withLoader(document.getElementById("page-loader"), form, () =>
      request(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          RequestVerificationToken: fields.get("__RequestVerificationToken"),
        },
        body: JSON.stringify({ orderId: Number(fields.get("orderId")), text: fields.get("text") }),
      }, (r) => r.json()),
    );
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "Sorry, the note couldn't be saved. Please try again.";
  } finally {
    button.removeAttribute("aria-disabled");
  }
});`,
    },
    { type: "p", text: "Every request goes through `withLoader()`, so the pattern stays the same each time: mark the region busy, show the loader only if the work takes longer than 200 ms, and clean up in `finally` whatever happens. `request()` turns HTTP errors into exceptions, because `fetch()` only rejects when the network fails, and gives up after 15 seconds instead of waiting indefinitely." },
    { type: "p", text: "`RequestVerificationToken` is the header name that ASP.NET Core's antiforgery system checks by default, alongside the form field. Posting `new FormData(form)` as the body instead also works without the header, because the hidden field travels with the form. JSON from `Json()` uses camelCase names, so the script reads `order.customer`, not `order.Customer`." },
    { type: "loader", slug: "minimal-ring", caption: "Minimal Ring is a clean default for dashboards and admin pages, and it drops into `_Loader.cshtml` without other changes." },
    { type: "h2", text: "A note on Razor Pages" },
    { type: "p", text: "The same partial and script work in Razor Pages. Point `data-url` at a named handler, such as `@Url.Page(\"/Orders\", \"List\")` for an `OnGetListAsync` method that returns `Partial(\"_OrderList\", orders)` or `new JsonResult(orders)`. Razor Pages validate antiforgery tokens on every POST handler automatically, so `[ValidateAntiForgeryToken]` isn't needed; keep sending the header or the form field." },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "The partial keeps the export's `role=\"status\"`, `aria-live=\"polite\"` and hidden label; pass a label that names what is loading.",
        "`withLoader()` sets `aria-busy` on the region being updated, and each section reports results and errors in a persistent `role=\"status\"` paragraph.",
        "The overlay never takes focus or traps it. The submit button uses `aria-disabled` and an early return, because disabling a focused button drops keyboard focus to the start of the page.",
        "Reduced motion is built into the exported CSS, which slows the animation three times.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Maintaining an older app? See the [ASP.NET MVC 5 guide](/guides/aspnet-mvc/) or the [Web Forms guide](/guides/aspnet-webforms/).",
        "Find loaders that suit business apps on the [ASP.NET loaders](/aspnet-loaders/) page, or browse the [animation library](/animations/).",
        "Reuse the same fetch patterns anywhere with the [JavaScript guide](/guides/javascript/), and tune colors in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["minimal-ring", "elegant-spinner", "orbiting-dots"],
  faqs: [
    {
      q: "Why does my POST return 400 Bad Request?",
      a: "Usually the antiforgery check failed. Make sure the request carries the token, in the `RequestVerificationToken` header or the `__RequestVerificationToken` form field, and that the antiforgery cookie is sent too; `fetch()` includes cookies for same-origin requests by default.",
    },
    {
      q: "Why are the JSON property names lowercase?",
      a: "ASP.NET Core serializes with System.Text.Json's web defaults, which use camelCase. Read `order.customer` in JavaScript, or change the naming policy in `AddJsonOptions` if you need C# names.",
    },
    {
      q: "Can I pass a model to the _Loader partial?",
      a: "You can, but then every call must pass one, because a `<partial>` tag without a `model` attribute hands the partial the parent view's model, and a typed partial throws if the types differ. View data keeps the simple `<partial name=\"_Loader\" />` working everywhere.",
    },
    {
      q: "Should I return JSON or a partial view?",
      a: "Return a partial view when the server already knows how to render the markup, which keeps the HTML in Razor and the script tiny. Return JSON when the client renders the data itself or other clients consume the same endpoint.",
    },
  ],
};

export default guide;
