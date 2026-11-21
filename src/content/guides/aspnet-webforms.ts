import type { Guide } from "@/types/content";

const guide: Guide = {
  slug: "aspnet-webforms",
  framework: "ASP.NET Web Forms",
  title: "Add a Loading Animation to ASP.NET Web Forms",
  seoTitle: "ASP.NET Web Forms Loading Animation: UpdatePanel and More",
  description: "Show a CuteLoader loading animation in ASP.NET Web Forms: UpdateProgress for UpdatePanels, a PageRequestManager overlay, full postbacks and WebMethod calls.",
  intro: "Web Forms pages wait in three different ways: partial updates through an UpdatePanel, full postbacks that reload the page, and AJAX calls to page methods. This guide adds a CuteLoader animation to all three with the HTML/CSS export, the ScriptManager your site probably already has, and one small script. You'll add the loader to a page, show it while an asynchronous operation runs, hide it once the data has loaded, and keep it accessible throughout.",
  summary: "UpdatePanel + PageRequestManager",
  blocks: [
    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "An ASP.NET Web Forms site on .NET Framework 4.x whose pages use a master page with `<form runat=\"server\">`. ScriptManager, UpdatePanel and UpdateProgress ship with the framework.",
        "A loader exported from CuteLoader with the **HTML/CSS** tab. The examples use a demo ring; any loader works the same way, because every export shares one structure.",
      ],
    },
    { type: "h2", text: "Step 1: Add the CSS to the site" },
    { type: "p", text: "Save the export, plus the overlay helper and two rules for an inline panel loader, as `Content/cuteloader.css`:" },
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

/* Inline loader that covers an UpdatePanel while it refreshes */
.panel-host { position: relative; min-height: 8rem; }
.panel-loader { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(255, 255, 255, 0.8); }`,
    },
    { type: "h2", text: "Step 2: Add the overlay to the master page" },
    { type: "p", text: "Link the stylesheet, and put the overlay and a status message inside the server form, after the ScriptManager. Keep the ScriptManager you already have; a page can only contain one." },
    {
      type: "code",
      lang: "aspx",
      filename: "Site.Master",
      code: `<head runat="server">
    <meta charset="utf-8" />
    <title><%: Page.Title %></title>
    <%-- "~/" is resolved here because the head has runat="server". --%>
    <link href="~/Content/cuteloader.css" rel="stylesheet" />
</head>
<body>
    <form runat="server">
        <asp:ScriptManager runat="server" EnablePageMethods="true" />

        <div id="page-loader" class="cl-overlay" hidden>
            <div class="cl-wrap" role="status" aria-live="polite">
                <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
                <span class="cl-sr-only">Loading…</span>
            </div>
        </div>
        <p id="page-message" role="status"></p>

        <asp:ContentPlaceHolder ID="MainContent" runat="server" />

        <script src="<%: ResolveUrl("~/Scripts/page-loader.js") %>"></script>
    </form>
</body>`,
    },
    { type: "p", text: "The script goes after the ScriptManager because it needs the ASP.NET AJAX client library, which the ScriptManager renders at the start of the form." },
    { type: "h2", text: "Step 3: An inline loader with UpdatePanel and UpdateProgress" },
    { type: "p", text: "For a partial update, an `UpdateProgress` control is the simplest loader: ASP.NET shows its template during an asynchronous postback from the associated panel and hides it when the response has been applied." },
    {
      type: "code",
      lang: "aspx",
      filename: "Orders.aspx",
      code: `<%@ Page Title="Orders" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Orders.aspx.cs" Inherits="ShopAdmin.Orders" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Orders</h1>

    <div class="panel-host" data-loader-region>
        <asp:UpdatePanel ID="OrdersPanel" runat="server">
            <ContentTemplate>
                <asp:Button ID="RefreshButton" runat="server" Text="Refresh orders" OnClick="RefreshButton_Click" />
                <asp:GridView ID="OrdersGrid" runat="server" AutoGenerateColumns="false">
                    <Columns>
                        <asp:BoundField DataField="Id" HeaderText="Order" />
                        <asp:BoundField DataField="Customer" HeaderText="Customer" />
                        <asp:BoundField DataField="Total" HeaderText="Total" DataFormatString="{0:C}" />
                    </Columns>
                </asp:GridView>
            </ContentTemplate>
        </asp:UpdatePanel>

        <asp:UpdateProgress ID="OrdersProgress" runat="server" AssociatedUpdatePanelID="OrdersPanel" DisplayAfter="200">
            <ProgressTemplate>
                <div class="panel-loader">
                    <div class="cl-wrap" role="status" aria-live="polite">
                        <svg class="cl-demo-ring" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" focusable="false"><circle class="track" cx="50" cy="50" r="34"/><g class="spin"><circle class="dot" cx="50" cy="16" r="7"/></g></svg>
                        <span class="cl-sr-only">Loading orders…</span>
                    </div>
                </div>
            </ProgressTemplate>
        </asp:UpdateProgress>
    </div>

    <p>
        <button type="button" id="count-button">How many open orders?</button>
        <span id="count-result" role="status"></span>
    </p>

    <script>
        (() => {
            const button = document.getElementById("count-button");
            const result = document.getElementById("count-result");

            button.addEventListener("click", async () => {
                if (button.getAttribute("aria-disabled") === "true") return;
                button.setAttribute("aria-disabled", "true");
                result.textContent = "";
                pageLoader.show();
                try {
                    const response = await fetch("<%: ResolveUrl("~/Orders.aspx/GetOpenOrderCount") %>", {
                        method: "POST",
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: JSON.stringify({ customerId: 42 })
                    });
                    if (!response.ok) throw new Error("HTTP " + response.status);
                    const data = await response.json();
                    result.textContent = data.d + " open orders."; // page methods wrap results in "d"
                } catch (error) {
                    console.error(error);
                    result.textContent = "Sorry, the count couldn't be loaded.";
                } finally {
                    pageLoader.hide();
                    button.removeAttribute("aria-disabled");
                }
            });
        })();
    </script>
</asp:Content>`,
    },
    { type: "p", text: "`DisplayAfter` is the delay in milliseconds before the template appears. It defaults to 500; 200 still skips quick responses while feeling more responsive. `DynamicLayout`, true by default, hides the template with `display: none`; set it to false to reserve the template's space with `visibility: hidden` instead. That isn't needed here, because the template is absolutely positioned. The template covers the panel without changing its size, so nothing jumps. The `data-loader-region` attribute is for the script in the next step: it marks the wrapper that should get `aria-busy` and tells the script that this panel has its own loader." },
    {
      type: "code",
      lang: "csharp",
      filename: "Orders.aspx.cs",
      code: `using System;
using System.Web.Services;
using System.Web.UI;

namespace ShopAdmin
{
    public partial class Orders : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindOrders();
            }
        }

        protected void RefreshButton_Click(object sender, EventArgs e)
        {
            BindOrders();
            // The panel's HTML is replaced, so move focus to the new button.
            ScriptManager.GetCurrent(this).SetFocus(RefreshButton);
        }

        private void BindOrders()
        {
            OrdersGrid.DataSource = OrderData.GetRecentOrders();
            OrdersGrid.DataBind();
        }

        [WebMethod]
        public static int GetOpenOrderCount(int customerId)
        {
            return OrderData.CountOpenOrders(customerId);
        }
    }
}`,
    },
    {
      type: "code",
      lang: "csharp",
      filename: "Models/OrderData.cs",
      code: `using System.Collections.Generic;
using System.Linq;

namespace ShopAdmin
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Customer { get; set; }
        public decimal Total { get; set; }
        public bool IsOpen { get; set; }
    }

    // Sample data: replace with your own data access.
    public static class OrderData
    {
        private static readonly List<Order> Orders = new List<Order>
        {
            new Order { Id = 1003, CustomerId = 42, Customer = "Ada Lovelace", Total = 18.25m, IsOpen = true },
            new Order { Id = 1002, CustomerId = 7, Customer = "Grace Hopper", Total = 54.50m, IsOpen = false },
            new Order { Id = 1001, CustomerId = 42, Customer = "Ada Lovelace", Total = 129.00m, IsOpen = true },
        };

        public static List<Order> GetRecentOrders()
        {
            return Orders.OrderByDescending(o => o.Id).ToList();
        }

        public static int CountOpenOrders(int customerId)
        {
            return Orders.Count(o => o.CustomerId == customerId && o.IsOpen);
        }
    }
}`,
    },
    { type: "p", text: "In a Web Site project, which compiles pages from `CodeFile=` instead of `CodeBehind=`, put `OrderData.cs` in `App_Code` instead. `ScriptManager.SetFocus` restores keyboard focus after the partial update; without it, focus is lost when the panel's HTML is replaced." },
    { type: "h2", text: "Step 4: A site-wide overlay with PageRequestManager" },
    { type: "p", text: "`Sys.WebForms.PageRequestManager` raises `beginRequest` and `endRequest` around every asynchronous postback. This script uses them for the overlay, also covers full postbacks, and exposes `pageLoader.show()` and `pageLoader.hide()` for your own AJAX calls:" },
    {
      type: "code",
      lang: "js",
      filename: "Scripts/page-loader.js",
      code: `// Loading overlay for Web Forms: async postbacks, full postbacks and AJAX calls.
(() => {
  const overlay = document.getElementById("page-loader");
  const message = document.getElementById("page-message");
  if (!overlay) return;
  const form = overlay.closest("form");
  let timer = null;
  let region = null;

  // Show after 200 ms, so quick responses never flash the overlay.
  function show() {
    if (timer || !overlay.hidden) return;
    timer = setTimeout(() => {
      timer = null;
      overlay.hidden = false;
    }, 200);
  }

  function hide() {
    clearTimeout(timer);
    timer = null;
    overlay.hidden = true;
  }

  window.pageLoader = { show, hide };

  // 1. Async postbacks (UpdatePanel)
  if (window.Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {
    const prm = Sys.WebForms.PageRequestManager.getInstance();

    prm.add_beginRequest((sender, args) => {
      if (message) message.textContent = "";
      const source = args.get_postBackElement();
      region = source && source.closest ? source.closest("[data-loader-region]") : null;
      if (region) region.setAttribute("aria-busy", "true"); // it has its own UpdateProgress
      else show();
    });

    prm.add_endRequest((sender, args) => {
      if (region) region.removeAttribute("aria-busy");
      region = null;
      hide();
      if (args.get_error()) {
        if (message) message.textContent = "Sorry, something went wrong. Please try again.";
        args.set_errorHandled(true); // we've told the user; skip the default script error
      }
    });
  }

  // 2. Full postbacks
  if (form) {
    // Buttons fire a submit event. It's already cancelled when validation fails
    // or when the PageRequestManager turns it into an async postback.
    form.addEventListener("submit", (event) => {
      if (!event.defaultPrevented) show();
    });

    // LinkButtons and AutoPostBack controls post back through __doPostBack(),
    // which calls form.submit() and fires no submit event.
    const nativeSubmit = HTMLFormElement.prototype.submit;
    form.submit = function () {
      show();
      nativeSubmit.call(form);
    };
  }

  // A page restored from the back/forward cache must not keep its overlay.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) hide();
  });
})();`,
    },
    { type: "p", text: "How the pieces fit together:" },
    {
      type: "ul",
      items: [
        "**Async postbacks.** `endRequest` fires after every asynchronous postback, including failed and aborted ones, so the overlay can't get stuck. `args.get_error()` reports a server error; `set_errorHandled(true)` stops ASP.NET from turning it into a script error once you've shown your own message.",
        "**Full postbacks.** The PageRequestManager handles the form's `submit` event before this script does and cancels it for asynchronous postbacks, and client-side validators cancel it when the form is invalid. Checking `event.defaultPrevented` therefore shows the overlay only for real full postbacks. The page then navigates, so there's nothing to hide.",
        "**Page methods.** The `[WebMethod]` above is a `public static` method on the page. Posting JSON to `Orders.aspx/GetOpenOrderCount` calls it, and ASP.NET wraps the return value in a `d` property. The click handler shows the overlay, checks `response.ok`, and hides the overlay in `finally`.",
      ],
    },
    { type: "p", text: "With `EnablePageMethods=\"true\"` on the ScriptManager you can call the generated `PageMethods` proxy instead of `fetch()`. It takes callbacks rather than returning a promise, so hide the overlay in both of them:" },
    {
      type: "code",
      lang: "js",
      code: `pageLoader.show();
PageMethods.GetOpenOrderCount(42,
  (count) => { pageLoader.hide(); result.textContent = count + " open orders."; },
  (error) => { pageLoader.hide(); result.textContent = error.get_message(); });`,
    },
    { type: "loader", slug: "processing-gears", caption: "Processing Gears suits admin screens and back-office tools, and drops into the same markup." },
    { type: "h2", text: "Accessibility" },
    {
      type: "ul",
      items: [
        "Each loader keeps the export's `role=\"status\"`, `aria-live=\"polite\"` and hidden label. Write labels that say what is loading, such as \"Loading orders…\".",
        "The script sets `aria-busy` on the panel's wrapper while it refreshes, and reports errors in the persistent `#page-message` status element.",
        "The overlay never takes focus or traps it. After a partial update, use `ScriptManager.SetFocus` so keyboard users don't lose their place.",
        "Reduced motion is built into the exported CSS, which slows the animation three times.",
      ],
    },
    { type: "h2", text: "Next steps" },
    {
      type: "ul",
      items: [
        "Using MVC as well? See the [ASP.NET MVC guide](/guides/aspnet-mvc/) and the [ASP.NET Core MVC guide](/guides/aspnet-core-mvc/).",
        "Browse loaders picked for server-rendered apps on the [ASP.NET loaders](/aspnet-loaders/) page, or the whole [animation library](/animations/).",
        "Customize colors and dark mode in the [CSS guide](/guides/css/), or before exporting in the [loading animation generator](/loading-animation-generator/).",
      ],
    },
  ],
  relatedAnimations: ["processing-gears", "minimal-ring", "smooth-progress-ring"],
  faqs: [
    {
      q: "Why does my page method return 401 or never run?",
      a: "Projects created from the Visual Studio Web Forms template use FriendlyUrls with `AutoRedirectMode = RedirectMode.Permanent`, which redirects `Orders.aspx/GetOpenOrderCount` and breaks the JSON call. Set `settings.AutoRedirectMode = RedirectMode.Off;` in `App_Start/RouteConfig.cs`, and make sure the method is `public static` with the `[WebMethod]` attribute.",
    },
    {
      q: "Do I still need UpdateProgress if I use the PageRequestManager overlay?",
      a: "No. The script alone covers every asynchronous postback with the overlay. Use `UpdateProgress` when a loader inside the panel is a better fit than a full-screen overlay, and mark its wrapper with `data-loader-region` so the two don't both appear.",
    },
    {
      q: "Why doesn't the overlay appear for my LinkButton?",
      a: "LinkButtons and AutoPostBack controls post back by calling `form.submit()`, which fires no `submit` event. The script wraps the form's `submit()` method to cover them; if you removed that part, add it back or call `pageLoader.show()` from `OnClientClick`.",
    },
    {
      q: "Can I use CuteLoader's JavaScript export instead?",
      a: "Yes. Replace the overlay markup with the exported script and call `CuteLoader.show({ delay: 200 })` and `CuteLoader.hide()`, or `CuteLoader.track(promise)` for fetch calls. Its calls are reference-counted, so pair every `show()` with exactly one `hide()`; `endRequest` fires once for each `beginRequest`, which keeps them balanced.",
    },
  ],
};

export default guide;
