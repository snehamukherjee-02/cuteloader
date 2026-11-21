import type { Article } from "@/types/content";

const article: Article = {
  slug: "add-loading-animation-to-aspnet-website",
  title: "How to Add a Loading Animation to an ASP.NET Website",
  seoTitle: "ASP.NET Loading Animation: Web Forms, MVC 5 and Core",
  description:
    "Add a loading animation to any ASP.NET site: UpdateProgress in Web Forms, ajaxStart or LoadingElementId in MVC 5, and fetch with an antiforgery header in Core.",
  excerpt:
    "One loader, three different triggers. Here is where to hook a loading animation into Web Forms, MVC 5 and ASP.NET Core, and how to choose the right hook for each.",
  publishedAt: "2026-11-21",
  tags: ["ASP.NET", "Web Forms", "ASP.NET MVC", "ASP.NET Core", "AJAX"],
  relatedAnimations: ["minimal-ring", "elegant-spinner", "processing-gears", "smooth-progress-ring"],
  blocks: [
    {
      type: "p",
      text: "Every ASP.NET stack can share the same loading animation; only the trigger changes. In **Web Forms**, put the loader in an `<asp:UpdateProgress>` tied to your UpdatePanel, or hook the client-side `PageRequestManager` when you need more control. In **MVC 5**, show it from jQuery's global `ajaxStart` and `ajaxStop` events, or name it in `Ajax.BeginForm`'s `LoadingElementId`. In **ASP.NET Core**, wrap your `fetch` calls in `try`/`finally`, and send the antiforgery token in a header when you post for a partial view.",
    },
    {
      type: "p",
      text: "This article is the overview: one loader you write once, the hook for each stack, and the trade-offs that decide between them. Each stack also has a step-by-step guide, linked from its section. Every snippet here was run against the real framework: Web Forms and MVC 5 on IIS Express, ASP.NET Core on .NET 10.",
    },
    {
      type: "table",
      head: ["Stack", "Simplest hook", "More control", "Built-in delay"],
      rows: [
        ["Web Forms", "`<asp:UpdateProgress>`", "`PageRequestManager` beginRequest / endRequest", "Yes: `DisplayAfter`, 500 ms by default"],
        ["MVC 5", "`AjaxOptions.LoadingElementId`", "`$(document).ajaxStart` / `ajaxStop`", "No, add your own"],
        ["ASP.NET Core", "Show and hide around `fetch`", "One helper with a delay and a request counter", "No, add your own"],
      ],
    },
    { type: "h2", text: "Write the loader once" },
    {
      type: "p",
      text: "Put one overlay in your master page or layout (`Site.Master` in Web Forms, `_Layout.cshtml` in MVC and Core) so every page can use it. The ring below uses the same custom property names as CuteLoader exports (`--c1`, `--c2`, `--d`, `--sw`), so you can swap in a loader from the library later without touching the wiring.",
    },
    {
      type: "code",
      lang: "html",
      filename: "Site.Master or _Layout.cshtml",
      code: `<div id="page-loader" class="page-loader" hidden>
  <svg class="ring" viewBox="0 0 50 50" width="56" height="56" aria-hidden="true" focusable="false">
    <circle class="ring-track" cx="25" cy="25" r="20" />
    <circle class="ring-arc" cx="25" cy="25" r="20" />
  </svg>
</div>
<p id="page-loader-status" class="visually-hidden" role="status"></p>`,
    },
    {
      type: "code",
      lang: "css",
      filename: "loader.css",
      code: `.page-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgb(255 255 255 / 0.65);
}
/* Without this, display: grid above would beat the hidden attribute. */
.page-loader[hidden] { display: none; }

.ring { --c1: #6d28d9; --c2: #e9e3fb; --d: 0.9s; --sw: 5; }
.ring-track, .ring-arc { fill: none; stroke-width: var(--sw); }
.ring-track { stroke: var(--c2); }
.ring-arc {
  stroke: var(--c1);
  stroke-linecap: round;
  stroke-dasharray: 80 126;
  transform-origin: 25px 25px;
  animation: ring-spin var(--d) linear infinite;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .ring-arc { animation-duration: calc(var(--d) * 3); }
}

.visually-hidden {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}`,
    },
    {
      type: "p",
      text: "Two details are easy to get wrong. The `.page-loader[hidden]` rule is load-bearing: an author rule such as `display: grid` beats the browser's built-in style for the `hidden` attribute, so without it the overlay never disappears. And the ring itself is `aria-hidden`, while a separate `role=\"status\"` paragraph carries the words. That paragraph stays in the page permanently, because [MDN's live region guidance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) notes that the most reliable way to get an announcement is to have the region in the initial markup and change its text, rather than inserting a region that already contains it.",
    },
    {
      type: "p",
      text: "Next, a small helper that every stack calls. It waits 300 ms before showing anything, so fast responses never flash an overlay, and it counts overlapping requests so the first one to finish doesn't hide the loader while another is still running.",
    },
    {
      type: "code",
      lang: "js",
      filename: "loader.js",
      code: `// loader.js: one show/hide API for Web Forms, MVC 5 and ASP.NET Core.
// Written in ES5 so older bundling and minification pipelines accept it.
window.pageLoader = (function () {
  var overlay = document.getElementById("page-loader");
  var status = document.getElementById("page-loader-status");
  var pending = 0;
  var timer = null;
  var DELAY = 300; // responses faster than this never show the loader

  function show() {
    pending += 1;
    if (pending > 1) return; // already counting down or visible
    timer = setTimeout(function () {
      overlay.hidden = false;
      status.textContent = "Loading…";
    }, DELAY);
  }

  function hide() {
    if (pending === 0) return;
    pending -= 1;
    if (pending === 0) reset();
  }

  function reset() {
    pending = 0;
    clearTimeout(timer);
    overlay.hidden = true;
    status.textContent = "";
  }

  // Pages restored from the back/forward cache come back exactly as they were left.
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) reset();
  });

  return { show: show, hide: hide, reset: reset };
})();`,
    },
    {
      type: "callout",
      tone: "tip",
      text: "Using CuteLoader's plain JavaScript export instead of your own markup? Its `CuteLoader.show({ delay: 300 })` and `CuteLoader.hide()` are reference-counted the same way, so they drop in wherever `pageLoader.show()` and `pageLoader.hide()` appear below. The helper is ES5 on purpose: Web Forms and MVC 5 projects often push scripts through older bundling tools that may not understand newer syntax.",
    },
    { type: "h2", text: "Web Forms: UpdateProgress or PageRequestManager" },
    {
      type: "p",
      text: "If the slow work happens in UpdatePanel partial postbacks, `UpdateProgress` does the job without any JavaScript of your own. It renders a hidden `div`, shows its `ProgressTemplate` once an async postback has been running for `DisplayAfter` milliseconds, and hides it again when the response arrives.",
    },
    {
      type: "code",
      lang: "aspx",
      filename: "Report.aspx",
      code: `<asp:ScriptManager ID="ScriptManager1" runat="server" />

<asp:UpdatePanel ID="ReportPanel" runat="server" UpdateMode="Conditional">
  <ContentTemplate>
    <asp:Button ID="RefreshButton" runat="server" Text="Refresh report"
        OnClick="RefreshButton_Click" />
    <asp:GridView ID="ReportGrid" runat="server" />
  </ContentTemplate>
</asp:UpdatePanel>

<asp:UpdateProgress ID="ReportProgress" runat="server"
    AssociatedUpdatePanelID="ReportPanel" DisplayAfter="300">
  <ProgressTemplate>
    <div class="page-loader">
      <svg class="ring" viewBox="0 0 50 50" width="56" height="56" aria-hidden="true" focusable="false">
        <circle class="ring-track" cx="25" cy="25" r="20" />
        <circle class="ring-arc" cx="25" cy="25" r="20" />
      </svg>
      <span class="visually-hidden">Loading report&hellip;</span>
    </div>
  </ProgressTemplate>
</asp:UpdateProgress>`,
    },
    {
      type: "p",
      text: "The code-behind doesn't change. The click handler runs exactly as it would for a full postback; ASP.NET simply sends back the panel's new HTML instead of the whole page.",
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Report.aspx.cs",
      code: `protected void RefreshButton_Click(object sender, EventArgs e)
{
    ReportGrid.DataSource = ReportService.LoadMonthlyTotals(); // the slow part
    ReportGrid.DataBind();
}`,
    },
    {
      type: "p",
      text: "Know its limits before you rely on it. With `AssociatedUpdatePanelID` set, the control appears only for postbacks that start inside that panel. A button outside the panel that is registered as an `AsyncPostBackTrigger` updates the panel without showing it, a case the [UpdateProgress documentation](https://learn.microsoft.com/en-us/dotnet/api/system.web.ui.updateprogress) calls out. Leave the property empty and it shows for every async postback on the page. It also has no hook for errors, which is where `PageRequestManager` comes in.",
    },
    { type: "h3", text: "Full control with PageRequestManager" },
    {
      type: "p",
      text: "The client-side `PageRequestManager` raises `beginRequest` and `endRequest` for every async postback, whatever triggered it. Wire the shared helper to those two events, and remove the UpdateProgress so you don't show two loaders:",
    },
    {
      type: "code",
      lang: "aspx",
      filename: "Site.Master (end of the form)",
      code: `<%-- After the ScriptManager and loader.js --%>
<script>
  (function () {
    var prm = Sys.WebForms.PageRequestManager.getInstance();

    prm.add_beginRequest(function () {
      pageLoader.show();
    });

    prm.add_endRequest(function (sender, args) {
      pageLoader.hide();
      if (args.get_error()) {
        args.set_errorHandled(true); // no script error; show our own message
        document.getElementById("report-error").hidden = false;
      }
    });
  })();
</script>`,
    },
    {
      type: "p",
      text: "Placement matters: the `Sys` namespace doesn't exist until the ScriptManager's scripts have loaded, so the same block in `<head>` fails with `Sys is not defined`. Calling `set_errorHandled(true)` suppresses the `PageRequestManagerServerErrorException` that an unhandled server error would otherwise throw, so you can show a friendly message instead. Double clicks are safe too: the first postback is aborted, but its `endRequest` still fires before the second `beginRequest`, so the counter returns to zero.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "Avoid typing the `…` character straight into `.aspx` or MVC 5 `.cshtml` markup. ASP.NET 4.x can misread files saved as UTF-8 without a byte-order mark, and the ellipsis then renders as `â€¦`. Write `&hellip;`, or save those files as UTF-8 with a BOM. Script files and ASP.NET Core views don't have this problem.",
    },
    {
      type: "p",
      text: "The [ASP.NET Web Forms guide](/guides/aspnet-webforms/) covers master pages, several panels on one page and styling the progress template.",
    },
    { type: "h2", text: "MVC 5: global jQuery events or LoadingElementId" },
    {
      type: "p",
      text: "MVC 5 pages usually reach the server through jQuery, either directly with `$.ajax` or through the `Ajax.BeginForm` helper, which `jquery.unobtrusive-ajax.js` turns into AJAX submissions. Both paths go through jQuery, so jQuery's global events see every request:",
    },
    {
      type: "code",
      lang: "js",
      filename: "_Layout.cshtml (after jQuery and loader.js)",
      code: `$(document)
  .ajaxStart(function () { pageLoader.show(); })
  .ajaxStop(function () { pageLoader.hide(); });

// Background polling shouldn't cover the page:
$.ajax({ url: "/notifications/unread", global: false });`,
    },
    {
      type: "p",
      text: "`ajaxStart` fires when a request begins and no other jQuery request is active; `ajaxStop` fires when the last one finishes, whether it succeeded or failed. Requests made with `global: false` skip both, which is how you keep polling and autosave from covering the page. These events only see jQuery: a `fetch` call elsewhere on the page won't trigger them, so call `pageLoader` directly there.",
    },
    { type: "h3", text: "Ajax.BeginForm with LoadingElementId" },
    {
      type: "p",
      text: "For a single form, the helper can manage a loader by itself. `LoadingElementId` names an element that the unobtrusive AJAX script shows when the request starts and hides when it completes:",
    },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Products/Index.cshtml",
      code: `@model IEnumerable<Product>

@using (Ajax.BeginForm("Search", "Products", new AjaxOptions
{
    HttpMethod = "POST",
    UpdateTargetId = "product-results",
    InsertionMode = InsertionMode.Replace,
    LoadingElementId = "search-loader"
}))
{
    @Html.AntiForgeryToken()
    <label for="q">Search products</label>
    <input type="search" id="q" name="q" />
    <button type="submit">Search</button>
}

<div id="search-loader" style="display:none">
    <svg class="ring" viewBox="0 0 50 50" width="32" height="32" aria-hidden="true" focusable="false">
        <circle class="ring-track" cx="25" cy="25" r="20" />
        <circle class="ring-arc" cx="25" cy="25" r="20" />
    </svg>
    Searching&hellip;
</div>

<div id="product-results">
    @if (Model != null) { Html.RenderPartial("_ProductResults", Model); }
</div>`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Controllers/ProductsController.cs",
      code: `public class ProductsController : Controller
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<ActionResult> Search(string q)
    {
        var products = await ProductCatalog.SearchAsync(q); // the slow part
        if (Request.IsAjaxRequest())
            return PartialView("_ProductResults", products);
        return View("Index", products); // still works without JavaScript
    }
}`,
    },
    {
      type: "p",
      text: "This needs the script from the `Microsoft.jQuery.Unobtrusive.Ajax` NuGet package on the page and `UnobtrusiveJavaScriptEnabled` set to `true` in web.config, as the MVC 5 template does. The script serializes the whole form, so the `@Html.AntiForgeryToken()` field travels with it and `[ValidateAntiForgeryToken]` passes; leave the token out and the post fails. `Request.IsAjaxRequest()` lets the same action return the full view when JavaScript is off.",
    },
    {
      type: "p",
      text: "Two caveats. `LoadingElementDuration` is not a delay: it sets the length of jQuery's show and hide animation, so a 100 ms response still flashes the loader. And because jQuery toggles the element's inline `display` style, start it with `style=\"display:none\"` rather than the `hidden` attribute, and don't also drive it from `pageLoader`. Once jQuery has set `display: none` inline, clearing `hidden` won't bring it back. Pick one mechanism per element: `LoadingElementId` for a small loader beside one form, the global events for a site-wide overlay with a delay.",
    },
    {
      type: "p",
      text: "The [ASP.NET MVC guide](/guides/aspnet-mvc/) goes further into bundling, partial views and per-form loaders.",
    },
    { type: "h2", text: "ASP.NET Core: fetch, partial views and the antiforgery header" },
    {
      type: "p",
      text: "ASP.NET Core doesn't ship an AJAX form helper, so you write the request with `fetch` and show the loader around it. A clean pattern: post the form, let the action return a partial view, and swap the returned HTML into the page. These are POSTs, so the antiforgery token has to come along. Render it once in the layout:",
    },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Shared/_Layout.cshtml",
      code: `@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="request-verification-token"
          content="@Antiforgery.GetAndStoreTokens(Context).RequestToken" />`,
    },
    {
      type: "p",
      text: "Then one helper sends the token in the `RequestVerificationToken` header, which is the header the antiforgery system reads unless you configure another name:",
    },
    {
      type: "code",
      lang: "js",
      filename: "wwwroot/js/site.js",
      code: `const token = document.querySelector('meta[name="request-verification-token"]').content;

async function postForHtml(url, body) {
  const headers = { RequestVerificationToken: token };
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);
  return response.text(); // the rendered partial view
}

const form = document.getElementById("order-filter");
const results = document.getElementById("order-results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  pageLoader.show();
  results.setAttribute("aria-busy", "true");
  try {
    results.innerHTML = await postForHtml(form.action, new FormData(form));
  } catch {
    results.innerHTML = '<p class="load-error">Could not load orders. Please try again.</p>';
  } finally {
    results.removeAttribute("aria-busy");
    pageLoader.hide();
  }
});`,
    },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/Index.cshtml",
      code: `<form id="order-filter" asp-action="Filter" method="post">
    <label for="status">Status</label>
    <select id="status" name="Status">
        <option value="">Any</option>
        <option>Open</option>
        <option>Shipped</option>
    </select>
    <button type="submit">Apply filter</button>
</form>

<div id="order-results">
    <partial name="_OrderRows" model="Model.Orders" />
</div>`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Controllers/OrdersController.cs",
      code: `public class OrdersController(IOrderService orders) : Controller
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Filter(OrderFilter filter)
    {
        var rows = await orders.FindAsync(filter); // the slow part
        return PartialView("_OrderRows", rows);
    }
}`,
    },
    {
      type: "p",
      text: "`try`/`finally` is what keeps this honest: the loader hides and `aria-busy` clears whether the request succeeds, fails with a 500, or never reaches the server. `fetch` only rejects on network failures, so the helper checks `response.ok` itself and turns an error status into an exception.",
    },
    {
      type: "p",
      text: "The header is what makes the helper reusable. A form posted as `FormData` already carries the hidden token field that the form tag helper renders, but a JSON body doesn't. Pass a plain object instead, as in `postForHtml(\"/Orders/Filter\", { status: \"Open\" })`, add `[FromBody]` to the action's parameter, and the header carries the token. Without it, `[ValidateAntiForgeryToken]` rejects the request with a 400.",
    },
    {
      type: "p",
      text: "ASP.NET Core in .NET 11 adds automatic CSRF protection based on the browser's `Sec-Fetch-Site` header, but it doesn't change the token flow for apps that use `[ValidateAntiForgeryToken]`, so keep sending the token. The [antiforgery documentation](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery) explains how the two protections interact. The [ASP.NET Core MVC guide](/guides/aspnet-core-mvc/) adds Razor Pages handlers and button-level loaders.",
    },
    { type: "h2", text: "Full page posts, downloads and the Back button" },
    {
      type: "p",
      text: "Classic postbacks and ordinary form posts reload the whole page, and the browser already shows its own progress indicator for those. If you also want the overlay during a slow full-page submit, two problems come with it:",
    },
    {
      type: "ul",
      items: [
        "**The Back button.** Browsers keep recently visited pages in a back/forward cache and restore them exactly as they were left, overlay included. That's why `loader.js` resets itself on `pageshow` when `event.persisted` is true.",
        "**File downloads.** A form that returns a file, such as an \"Export to Excel\" button, never unloads the page, so nothing would ever hide the overlay. Mark those forms and skip them.",
      ],
    },
    {
      type: "code",
      lang: "js",
      filename: "loader.js (optional addition)",
      code: `document.addEventListener("submit", function (event) {
  if (event.defaultPrevented) return;                      // an AJAX handler took it
  if (event.target.hasAttribute("data-no-loader")) return; // e.g. "Export to Excel"
  pageLoader.show();
});`,
    },
    {
      type: "p",
      text: "One Web Forms caveat: LinkButtons post back through `__doPostBack`, which calls `form.submit()`, and that method doesn't fire a submit event. This listener only sees real submit buttons.",
    },
    { type: "h2", text: "Which hook should you use?" },
    {
      type: "ul",
      items: [
        "**Web Forms with a few UpdatePanels:** `UpdateProgress` with `DisplayAfter`. Move to `PageRequestManager` when triggers live outside the panel, when you want one overlay for the whole page, or when you need error handling.",
        "**MVC 5:** the global `ajaxStart`/`ajaxStop` hook for a site-wide overlay with a delay, and `LoadingElementId` for a small inline loader beside a single form.",
        "**ASP.NET Core:** `try`/`finally` around `fetch`, through one helper that adds the antiforgery header.",
        "**Short actions on any stack:** consider a small loader inside the button or panel instead of a full-page overlay. Covering the whole page for a 600 ms save interrupts more than it informs.",
      ],
    },
    {
      type: "loader",
      slug: "minimal-ring",
      caption: "Minimal Ring: a neutral spinner that suits admin screens and line-of-business apps.",
    },
    {
      type: "loader",
      slug: "processing-gears",
      caption: "Processing Gears: a good fit for report generation and back-office jobs.",
    },
    {
      type: "p",
      text: "Next step: pick a design from the [ASP.NET loading animations](/aspnet-loaders/) collection, export it as HTML + CSS or plain JavaScript, and put it inside `#page-loader` in place of the ring. The wiring above stays exactly the same.",
    },
  ],
  faqs: [
    {
      q: "Why doesn't my UpdateProgress appear?",
      a: "Check three things. If `AssociatedUpdatePanelID` is set, the control only shows for postbacks that start inside that panel, so a trigger button outside it won't display it. If the request finishes before `DisplayAfter` (500 ms by default), nothing shows, which is intended. And if the postback isn't asynchronous at all, for example because the control is registered as a `PostBackTrigger`, the page reloads instead and UpdateProgress never runs.",
    },
    {
      q: "Can one loader cover both jQuery and fetch requests?",
      a: "Yes. jQuery's `ajaxStart` and `ajaxStop` only see jQuery requests, so call the same `pageLoader.show()` and `pageLoader.hide()` around your `fetch` code as well. Because the helper counts pending requests, overlapping jQuery and fetch calls keep the overlay up until the last one finishes.",
    },
    {
      q: "Do GET requests for partial views need the antiforgery token?",
      a: "Not if they don't change anything, and GET requests shouldn't. `[AutoValidateAntiforgeryToken]` skips GET, HEAD, OPTIONS and TRACE. Be aware that `[ValidateAntiForgeryToken]` on an action requires a token for every method it receives, including GET, so use it only on actions that change state.",
    },
    {
      q: "How do I keep background requests from showing the loader?",
      a: "In jQuery, pass `global: false` to `$.ajax` for polling and autosave calls. With fetch, simply don't call `pageLoader` for those requests. In Web Forms, inspect `args.get_postBackElement()` in your `beginRequest` handler and skip the loader for the controls that shouldn't trigger it.",
    },
  ],
};

export default article;
