import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "aspnet-mvc",
  framework: "ASP.NET MVC (MVC 5, .NET Framework)",
  title: "Add a Loading Animation to ASP.NET MVC 5",
  seoTitle: "ASP.NET MVC 5 Loading Animation with jQuery AJAX",
  description: "Add a loading animation to ASP.NET MVC 5: markup in _Layout, jQuery $.ajax and ajaxStart/ajaxStop, Ajax.BeginForm with LoadingElementId, and partial views.",
  intro: "Classic ASP.NET MVC 5 apps load data in a few familiar ways: jQuery AJAX calls to controller actions, Ajax.BeginForm with unobtrusive AJAX, and partial views fetched on demand. This guide adds a CuteLoader animation to each. You'll put the loader in _Layout.cshtml, show it while an asynchronous request runs, hide it as soon as the data has loaded or the request has failed, and keep the page usable with a keyboard and a screen reader.",
  summary: "_Layout + jQuery AJAX + Ajax.BeginForm",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "An ASP.NET MVC 5 project on .NET Framework with jQuery, as created by the Visual Studio template.",
        "For step 5, the `Microsoft.jQuery.Unobtrusive.Ajax` NuGet package, which adds `jquery.unobtrusive-ajax.js`, and `UnobtrusiveJavaScriptEnabled` set to `true` in `Web.config` (the template's default).",
        "A loader exported from CuteLoader with the **HTML/CSS** tab. The examples use a demo ring; any loader works the same way, because every export shares one structure.",
      ],
    },
    { type: "h2", text: "Step 1: Add the CSS and register it" },
    { type: "p", text: "Save the export, the overlay helper and two small rules for inline loaders as `Content/cuteloader.css`:" },
    {
      type: "code",
      lang: "css",
      filename: "Content/cuteloader.css",
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
.inline-loader[hidden] { display: none; }

/* Fade in after 200 ms, so quick responses never flash the loader */
.loader-delay { animation: loader-delay-in 0.2s ease-out 0.2s both; }
@keyframes loader-delay-in { from { opacity: 0; } }`,
    },
    { type: "p", text: "Register it in `BundleConfig`. Use a plain `Bundle` rather than a `StyleBundle`: the export is already compact, and the minifier behind `StyleBundle` was built before CSS custom properties were widely supported." },
    {
      type: "code",
      lang: "csharp",
      filename: "App_Start/BundleConfig.cs",
      code: `using System.Web.Optimization;

namespace ShopAdmin
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // ...your existing bundles

            // No minification: the file is already small.
            bundles.Add(new Bundle("~/Content/cuteloader").Include("~/Content/cuteloader.css"));
        }
    }
}`,
    },
    { type: "p", text: "A plain `<link href=\"~/Content/cuteloader.css\" rel=\"stylesheet\" />` works just as well; Razor resolves `~/` in attributes." },
    { type: "h2", text: "Step 2: Put the loader in _Layout.cshtml" },
    { type: "p", text: "Add the overlay right after `<body>`, so every view shares one loader, and load the scripts at the end:" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Shared/_Layout.cshtml",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewBag.Title</title>
    @Styles.Render("~/Content/css")
    @Styles.Render("~/Content/cuteloader")
</head>
<body>
    <div id="page-loader" class="cl-overlay" hidden>
        <div class="cl-wrap" role="status" aria-live="polite">
            <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
            <span class="cl-sr-only">Loading…</span>
        </div>
    </div>

    <div class="container body-content">
        @RenderBody()
    </div>

    @Scripts.Render("~/bundles/jquery")
    <script src="~/Scripts/jquery.unobtrusive-ajax.min.js"></script>
    <script src="~/Scripts/page-loader.js"></script>
    @RenderSection("scripts", required: false)
</body>
</html>`,
    },
    { type: "p", text: "The overlay starts with the `hidden` attribute, and the `.cl-overlay[hidden]` rule from the helper keeps it hidden even though the overlay itself uses `display: grid`." },
    { type: "h2", text: "Step 3: One overlay for every request with ajaxStart and ajaxStop" },
    { type: "p", text: "jQuery raises `ajaxStart` when a request begins while no others are running, and `ajaxStop` when every request has finished, successfully or not. That makes them a ready-made request counter:" },
    {
      type: "code",
      lang: "js",
      filename: "Scripts/page-loader.js",
      code: `// One loading overlay for every jQuery AJAX request on the page.
(function ($) {
  "use strict";
  var $overlay = $("#page-loader");
  var timer = null;

  // Show after 200 ms, so quick responses never flash the overlay.
  function show() {
    if (timer || !$overlay.prop("hidden")) return;
    timer = setTimeout(function () {
      timer = null;
      // A request that shows its own inline loader doesn't need the overlay too.
      if ($(".inline-loader:visible").length) return;
      $overlay.prop("hidden", false);
    }, 200);
  }

  function hide() {
    clearTimeout(timer);
    timer = null;
    $overlay.prop("hidden", true);
  }

  window.pageLoader = { show: show, hide: hide };
  $(document).ajaxStart(show).ajaxStop(hide);
})(jQuery);`,
    },
    { type: "p", text: "Because `ajaxStop` waits for every request, the overlay stays up through overlapping calls, and a failed request counts as finished just like a successful one. Requests made with `global: false` don't trigger these events, which is how a request with its own loader opts out, as in the next step." },
    { type: "h2", text: "Step 4: An inline loader with $.ajax, beforeSend and complete" },
    { type: "p", text: "The controller returns JSON for a list and HTML partials for the other examples:" },
    {
      type: "code",
      lang: "csharp",
      filename: "Controllers/OrdersController.cs",
      code: `using System.Web.Mvc;
using ShopAdmin.Models;

namespace ShopAdmin.Controllers
{
    public class OrdersController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        // GET /Orders/Recent: JSON. MVC 5 refuses JSON for GET unless you allow it.
        [HttpGet]
        public JsonResult Recent()
        {
            return Json(OrderData.GetRecentOrders(), JsonRequestBehavior.AllowGet);
        }

        // GET /Orders/Details?id=1001: an HTML partial view
        [HttpGet]
        public ActionResult Details(int id)
        {
            var order = OrderData.Find(id);
            if (order == null) return HttpNotFound();
            return PartialView("_OrderDetails", order);
        }

        // POST /Orders/Search from Ajax.BeginForm: an HTML partial view
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Search(string query)
        {
            return PartialView("_OrderList", OrderData.Search(query));
        }
    }
}`,
    },
    { type: "p", text: "The view puts an inline loader in each section. `beforeSend` runs just before the request is sent and `complete` runs after it finishes, whether it succeeded or failed, so `complete` is where the loader is hidden:" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/Index.cshtml",
      code: `@{
    ViewBag.Title = "Orders";
}
<h1>Orders</h1>

<section id="recent" aria-labelledby="recent-title">
    <h2 id="recent-title">Recent orders</h2>
    <button type="button" id="load-recent">Load recent orders</button>
    <div id="recent-loader" class="inline-loader" hidden>
        <div class="cl-wrap" role="status" aria-live="polite">
            <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
            <span class="cl-sr-only">Loading recent orders…</span>
        </div>
    </div>
    <ul id="recent-list"></ul>
    <p id="recent-status" role="status"></p>
</section>

<section aria-labelledby="search-title">
    <h2 id="search-title">Search orders</h2>
    @using (Ajax.BeginForm("Search", "Orders", new AjaxOptions
    {
        HttpMethod = "POST",
        UpdateTargetId = "search-results",
        InsertionMode = InsertionMode.Replace,
        LoadingElementId = "search-loader",
        OnBegin = "searchBegin",
        OnComplete = "searchComplete",
        OnFailure = "searchFailed"
    }))
    {
        @Html.AntiForgeryToken()
        <label for="query">Customer name</label>
        <input type="search" id="query" name="query" />
        <button type="submit">Search</button>
    }
    <div id="search-loader" class="inline-loader" style="display: none">
        <div class="cl-wrap loader-delay" role="status" aria-live="polite">
            <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
            <span class="cl-sr-only">Searching…</span>
        </div>
    </div>
    <div id="search-results"></div>
    <p id="search-status" role="status"></p>
</section>

<section aria-labelledby="details-title">
    <h2 id="details-title">Order details</h2>
    <button type="button" class="show-details" data-id="1001">Show order 1001</button>
    <div id="order-details"></div>
</section>

@section scripts {
    <script>
        (function ($) {
            "use strict";

            // 1. $.ajax with its own inline loader (global: false skips the page overlay)
            $("#load-recent").on("click", function () {
                var $button = $(this);
                if ($button.attr("aria-disabled") === "true") return;
                var showTimer = null;
                $.ajax({
                    url: "@Url.Action("Recent", "Orders")",
                    dataType: "json",
                    global: false,
                    beforeSend: function () {
                        $button.attr("aria-disabled", "true");
                        $("#recent").attr("aria-busy", "true");
                        $("#recent-status").text("");
                        showTimer = setTimeout(function () { $("#recent-loader").prop("hidden", false); }, 200);
                    },
                    complete: function () {
                        clearTimeout(showTimer);
                        $("#recent-loader").prop("hidden", true);
                        $("#recent").removeAttr("aria-busy");
                        $button.removeAttr("aria-disabled");
                    }
                })
                    .done(function (orders) {
                        var items = $.map(orders, function (order) {
                            return $("<li>").text(order.Customer + ": " + order.Total.toFixed(2));
                        });
                        $("#recent-list").empty().append(items);
                        $("#recent-status").text(orders.length + " orders loaded.");
                    })
                    .fail(function () {
                        $("#recent-status").text("Sorry, the orders couldn't be loaded.");
                    });
            });

            // 2. Ajax.BeginForm callbacks (named in AjaxOptions)
            window.searchBegin = function () {
                $("#search-status").text("");
                $("#search-results").attr("aria-busy", "true");
            };
            window.searchComplete = function () {
                $("#search-results").removeAttr("aria-busy");
            };
            window.searchFailed = function () {
                $("#search-status").text("Sorry, the search failed. Please try again.");
            };

            // 3. A partial view under the page overlay (a global request)
            $(".show-details").on("click", function () {
                var $target = $("#order-details").attr("aria-busy", "true");
                $.get("@Url.Action("Details", "Orders")", { id: $(this).data("id") })
                    .done(function (html) { $target.html(html); })
                    .fail(function () { $target.text("Sorry, that order couldn't be loaded."); })
                    .always(function () { $target.removeAttr("aria-busy"); });
            });
        })(jQuery);
    </script>
}`,
    },
    { type: "p", text: "MVC 5's `Json()` keeps your C# property names, so the script reads `order.Customer` and `order.Total`. The list is built with `.text()`, never by concatenating HTML, so customer names can't inject markup." },
    { type: "h2", text: "Step 5: Ajax.BeginForm with LoadingElementId" },
    { type: "p", text: "`Ajax.BeginForm` renders a normal form with `data-ajax-*` attributes, and `jquery.unobtrusive-ajax.js` turns its submission into an AJAX request. `LoadingElementId = \"search-loader\"` becomes `data-ajax-loading=\"#search-loader\"`: the script shows that element just before the request is sent and hides it when the request completes, success or failure. Give the loading element `style=\"display: none\"` so it starts hidden." },
    { type: "p", text: "Unobtrusive AJAX shows the element immediately, so the `loader-delay` class keeps the animation transparent for its first 200 ms. The `OnBegin`, `OnComplete` and `OnFailure` callbacks set `aria-busy` and report errors. `@Html.AntiForgeryToken()` inside the form is posted with the serialized fields, which satisfies `[ValidateAntiForgeryToken]`. Unobtrusive AJAX requests are global jQuery requests, so they also start the overlay timer; the visible-inline-loader check in `page-loader.js` keeps the overlay from appearing on top." },
    { type: "h2", text: "Step 6: The partial views and sample data" },
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/_OrderList.cshtml",
      code: `@model IEnumerable<ShopAdmin.Models.Order>
@if (!Model.Any())
{
    <p>No matching orders.</p>
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
    {
      type: "code",
      lang: "cshtml",
      filename: "Views/Orders/_OrderDetails.cshtml",
      code: `@model ShopAdmin.Models.Order
<dl>
    <dt>Order</dt>
    <dd>#@Model.Id</dd>
    <dt>Customer</dt>
    <dd>@Model.Customer</dd>
    <dt>Total</dt>
    <dd>@Model.Total.ToString("C")</dd>
</dl>`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Models/Order.cs",
      code: `using System;
using System.Collections.Generic;
using System.Linq;

namespace ShopAdmin.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public decimal Total { get; set; }
    }

    // Sample data: replace with your own data access.
    public static class OrderData
    {
        private static readonly List<Order> Orders = new List<Order>
        {
            new Order { Id = 1001, Customer = "Ada Lovelace", Total = 129.00m },
            new Order { Id = 1002, Customer = "Grace Hopper", Total = 54.50m },
            new Order { Id = 1003, Customer = "Katherine Johnson", Total = 18.25m },
        };

        public static List<Order> GetRecentOrders()
        {
            return Orders.OrderByDescending(o => o.Id).ToList();
        }

        public static Order Find(int id)
        {
            return Orders.FirstOrDefault(o => o.Id == id);
        }

        public static List<Order> Search(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return GetRecentOrders();
            return Orders.Where(o => o.Customer.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
        }
    }
}`,
    },
    { type: "loader", slug: "elegant-spinner", caption: "Elegant Spinner keeps a business app looking calm, and uses the same markup and classes as the demo ring." },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "Each loader keeps the export's `role=\"status\"`, `aria-live=\"polite\"` and hidden label; name what is loading, such as \"Searching…\".",
        "Set `aria-busy` on the region being updated and remove it in `complete`, `OnComplete` or `always`, and report results and errors in a `role=\"status\"` paragraph that stays on the page.",
        "The overlay doesn't take focus or trap it. The button uses `aria-disabled` and an early return instead of `disabled`, which would drop keyboard focus to the start of the page.",
        "Reduced motion is built into the exported CSS, which slows the animation three times.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Moving to .NET Core? See the [ASP.NET Core MVC guide](/guides/aspnet-core-mvc/); maintaining Web Forms pages too? See the [Web Forms guide](/guides/aspnet-webforms/).",
        "Explore loaders suited to business apps on the [ASP.NET loaders](/aspnet-loaders/) page or in the [animation library](/animations/).",
        "Restyle the loader for dark mode with the [CSS guide](/guides/css/), or tune it in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["elegant-spinner", "minimal-ring", "three-dot-pulse"],
  faqs: [
    {
      q: "Why does my JSON action return an error for GET requests?",
      a: "MVC 5 blocks JSON responses to GET requests by default, to protect against JSON hijacking in old browsers. Pass `JsonRequestBehavior.AllowGet` to `Json()` for read-only data, or call the action with POST.",
    },
    {
      q: "Ajax.BeginForm reloads the whole page. What's wrong?",
      a: "`jquery.unobtrusive-ajax.js` isn't loaded, or it loads before jQuery, or `UnobtrusiveJavaScriptEnabled` is `false`. Without the script, the form falls back to a normal postback, and the loading element is never shown.",
    },
    {
      q: "Should I use ajaxStart and ajaxStop or beforeSend and complete?",
      a: "Use the global events for one overlay that covers every request on the page. Use `beforeSend` and `complete` (with `global: false`) when one request deserves its own inline loader. Mixing them is fine, as long as each request is covered by only one loader.",
    },
    {
      q: "Do I need jQuery to use CuteLoader in MVC 5?",
      a: "No. The loader itself is HTML and CSS, and plain `fetch()` with `try`/`finally` works in any MVC view, as shown in the [JavaScript guide](/guides/javascript/). jQuery is used here because MVC 5 projects usually include it, and unobtrusive AJAX depends on it.",
    },
  ],
};

export default guide;
