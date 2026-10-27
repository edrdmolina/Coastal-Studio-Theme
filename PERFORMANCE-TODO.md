<!-- markdownlint-disable MD013 -->

# Performance TODO — Studio theme

Source: PageSpeed Insights run on `https://www.coastalfilmlab.com/` (homepage), 2026-10-26.

## Where things stand

| | Mobile (lab) | Desktop (lab) | Real users (CrUX, 28 days) |
| --- | --- | --- | --- |
| Performance score | **41** | — | Core Web Vitals **passed** |
| FCP | 11.7 s | 0.6 s | 0.8 s |
| LCP | 17.6 s | 1.1 s | 1.0 s |
| TBT / INP | 570 ms TBT | 210 ms TBT | 104 ms INP |
| CLS | 0 | 0.002 | 0 |
| Speed Index | 11.7 s | 1.4 s | — |

Other categories: Accessibility 97, Best Practices 96, SEO 92.

The bad number is the throttled mobile lab test (slow 4G, mid-range phone). Real visitors are currently passing. The lab score still matters because it predicts what slower phones/connections see, and nearly all of the cost is **third-party and app JavaScript** (4,542 KiB total page weight, 5.6 s main-thread work, 20 long tasks), not the theme's own CSS/Liquid.

Per the README's maintenance boundaries: confirm each app's production dependency before removing or deferring anything, test on the DEV theme, and keep each fix narrow.

> **Theme ID update (2026-10-26):** `134028918838` is stale. The GitHub-connected dev theme is **`156880306230`** (branch `dev`); preview at <https://www.coastalfilmlab.com/?preview_theme_id=156880306230>.

---

## P0 — Biggest wins (third-party JavaScript)

- [ ] **Stop reCAPTCHA loading 5× on the homepage.** `recaptcha__en.js` (gstatic.com) is downloaded five times at ~347 KiB each (~1.7 MiB, plus 71 KiB `styles__ltr.css`). It accounts for ~2.4 s of script boot-up, ~1.6 s of evaluation, ~830 KiB of unused JS, and most of the 20 long tasks.
  - Not theme code. The BookEasy app embed (`bookeasy-widget.js`) appends **two** `google.com/recaptcha/enterprise.js?render=…` scripts (two site keys) to `<head>` on every page except `/account/*` and `/challenge`. Each copy pulls `recaptcha__en.js` and its iframes, which accounts for the repeat downloads. **Owner action:** ask BookEasy support to load reCAPTCHA only on booking products or on first interaction with the widget. App embeds are site-wide, so the theme can't scope it.
  - [x] Identify which forms trigger it (likely Shopify's native spam protection on newsletter/contact/customer forms, or the Shopify Forms app embed). Count the `<form>` elements that include it — the WebMCP audit lists 14 forms on the page.
    - Checked: the live home page has 17 `<form>`s: 6 `/localization` (announcement bar, menu drawer, footer; each one plus a noscript twin), search, cart notification, the label quick-add, and 8 featured-collection quick-adds. None is a customer, newsletter or contact form (the footer newsletter is off), so the theme renders nothing that carries reCAPTCHA. (Since 2026-10-26 the footer newsletter is on; it's a native customer form.) Shopify's own storefront captcha in `content_for_header` is hCaptcha, which only binds on submit.
  - [ ] Options, least risky first: remove duplicate/hidden forms from the homepage; load reCAPTCHA only on interaction (focus/submit) instead of page load; or switch spam protection to hCaptcha/Shopify's built-in alternative if available.
    - No duplicate or hidden theme forms to remove. The other options are BookEasy/admin actions (see above).
  - [ ] Verify that the newsletter signup and any contact form still submit and are still protected.
- [x] **Find and cut `assets/index.js` (cdn.shopify.com, 261 KiB, 244 KiB unused).**
  - Done 2026-10-26: the Forms app embed is off, so `index.js` now loads only on Contact Us and Work For Coastal. See "Forms popup → footer signup" below. Trace which app embed injects it (check `config/settings_data.json` app embeds: Globo Product Options, BookEasy, Shopify Forms, Globo Preorder, Judge.me, font app, Microsoft Clarity). If it only serves a specific page (e.g., BookEasy for studio rental), restrict the embed to that template.
  - Not theme code. It's Shopify Forms: `shopify-forms-loader.js` (Forms app embed) rewrites its own URL to `…/forms-2636/assets/index.js` and loads it on every page. **Owner action** (keeping Forms): if the signup form is an inline form rather than a popup, turn off the Forms *app embed* (Theme editor → App embeds) and add the Forms *app block* only to the section/page where the form lives. If it's a popup that has to show site-wide, it stays.
- [ ] **`p-d15c5182.entry.js` (89 KiB, 57 KiB unused)** — Stencil-style bundle from an app; identify and scope it the same way.
  - Not theme code. It's BookEasy's Stencil widget component (`bookeasy-widget.esm.js` maps `p-d15c5182` to `<bookeasy-widget>`), loaded by the BookEasy app embed on every page. **Owner action:** ask BookEasy whether the widget can load only on bookable products / the studio-rental page (app blocks instead of a global embed), together with the reCAPTCHA ask above.
- [ ] **Remove or replace jQuery 1.9.1 from `ajax.googleapis.com`.** Studio does not need jQuery. It adds a third-party connection, 22 KiB of unused JS, and ~95 ms of forced reflow. Find where it is included (`layout/theme.liquid`, a snippet, or an app). If an app genuinely needs it, at least move it off the critical path (`defer`) and off the 2013-era version.
  - Not theme code: the theme has no jQuery and no `$(`/`jQuery` usage. `orderstatus.w3apps.co/js/orderlookup.js` (a ScriptTag in `content_for_header`) checks for jQuery and, finding none, injects `ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js` itself. **Owner action:** see the w3apps item. Removing or scoping that app removes jQuery too.
- [ ] **Audit Globo Preorder on the homepage.** `globo.preorder.min.js` plus 5+ `globo.preorder.bundle.*.min.js` chunks run long tasks (up to ~58 ms each). Limit it to product/collection templates that actually sell preorders, if the app allows.
  - Not theme code: it's the Globo Preorder app embed, site-wide. **Owner action:** in Globo Preorder settings, turn off collection/home-page badges and countdowns if preorders are only sold from product pages, or ask Globo whether the embed can be limited to product templates.
- [ ] **Rise.ai (`rise-ai.com`)** — 54 KiB with 36 KiB unused, 18 KiB of legacy (Babel/polyfilled) JS, and a 2-minute cache TTL. Confirm gift cards/store credit are still used; if so, ask the vendor about lazy loading, otherwise remove the embed.
  - Not theme code: loaded as ScriptTags (`str.rise-ai.com`, `strn.rise-ai.com`) via `content_for_header`. **Owner action:** the plan is to uninstall Rise.ai. Uninstalling the app removes its ScriptTags.
- [ ] **`w3apps.co/js/orderlookup.js`** — served with no cache TTL. Confirm the order-lookup app is still needed; if it is, load it only on the order-status/account page.
  - Not theme code: a ScriptTag loaded on every page via `content_for_header`; it only does anything where a `div.w3-order-lookup` exists. **Owner action:** decide whether the order-lookup app is still needed (there's also an Order Status page). If not, uninstall it, which also removes jQuery 1.9.1. If it is, ask w3apps for an app block on the order-status page instead of a global ScriptTag.
- [ ] **`.flip-clock` CSS (12.7 KiB, 100% unused)** — leftover countdown-timer styles. Find the app or section and remove it if no countdown is running.
  - Not theme code: nothing in the repo mentions `flip-clock`. It's the countdown-timer chunk of Globo Preorder (`globo.preorder.min.js` lazy-loads `flip_clock` / `flipclock` bundles). **Owner action:** turn off the preorder countdown timer in Globo Preorder if no countdown is running.
- [ ] **Shop follow button (`loader.shop-follow-button.en.esm.js`)** — long task on load; disable the Shop app follow button if it isn't wanted.
  - Theme setting, not code: the footer renders it because `enable_follow_on_shop` is on in `sections/footer-group.json`. **Owner action** if it isn't wanted: Theme editor → Footer → untick "Enable Follow on Shop". That's left alone here because the editor owns that JSON.
  - The owner turned it off in the Theme editor on 2026-10-26 (`enable_follow_on_shop: false`, Shopify commit `dec2854` on master, merged into dev).

## Forms popup → footer signup (2026-10-26)

**What changed** (owner-approved, live on master):

- Turned **off** the Shopify Forms app embed (`config/settings_data.json`, block `13768625480086291342`, `"disabled": true`). The "Stay in touch" popup and its button are gone from every page. The Forms script (`shopify-forms-loader.js` + `index.js`, ~277 KB) no longer loads on the home page, product pages or anywhere else.
- Turned **on** the theme's own footer signup "Subscribe to our emails" (`sections/footer-group.json`, `newsletter_enable: true`). It's Shopify's native customer form, needs no app script, and tags signups **`newsletter`** (hidden `contact[tags]` field in `sections/footer.liquid`).
- Not changed: the "Mailing List" form (164230) in the Forms app is still set up as it was, so it can be switched back on. The Contact Us (791579) and Work For Coastal (1047047) inline forms are app blocks and still load Forms on those two pages only. Checked live: both render all their fields.

**Correction to earlier notes:** form **791579 is the Contact Us page form**, not the popup. The "20–30 signups a month" counted on tag `shopify-forms-791579` are contact messages. The popup was **form 164230 ("Mailing List")**, tag `shopify-forms-164230`.

**Why:** the popup brought in about 2 signups a month (Forms analytics, last 365 days: 282 views, 24 submissions, 8.5%; ~15 new customers tagged `shopify-forms-164230` in 2026; 0 submissions in the last 30 days). Meanwhile its script loaded on every page. No Forms setting defers the script: the loader always injects `index.js` straight away, and the delay only affects when the popup shows.

**Old popup settings (for rollback)** — screenshots and the full `form_instances` JSON are in the session scratchpad (`forms-before/`):

- Floating, bottom left. Teaser "Stay in touch", shown "First (before the form) and if the customer closes the form".
- Pages: Home, Blogs, Articles only. Trigger: first page view, after 3 seconds. Exit intent off. All devices.
- Fields: first name, last name, email, phone (all required), birthday. Email + SMS consent, Continue with Shop on. No discount. On success, redirect to coastalfilmlab.com.

**How to roll back:** set the Forms block in `config/settings_data.json` back to `"disabled": false` (or Theme editor → App embeds → Forms on, then pull the Shopify commit into dev). Optionally set `newsletter_enable` back to `false`. The popup reappears with the settings above.

**Before / after (live home page, mobile):**

| | Before | After |
| --- | --- | --- |
| Forms JS on home/product pages | ~277 KB, ~100–165 ms main thread | none |
| Local Lighthouse, median score | 50 (6 runs) | 50 (3 runs) |
| Local Lighthouse, median FCP / LCP / TBT | 4.95 s / 13.5 s / 362 ms | 4.14 s / 17.6 s / 331 ms |
| PageSpeed Insights score | 54–55 | 56, 78, 54 (median 56) |

Lab scores stay noisy and bimodal. Before the change, blocking Forms in Lighthouse moved the median score by 1 point (50 → 51), so no big score jump was expected. The real gain is less download and phone processing on every page. FCP/LCP differences are within run-to-run noise.

- [ ] **Follow-up 2026-11-23:** count customers tagged `shopify-forms-164230` (should be ~0 new now) plus customers tagged **`newsletter`** created since 2026-10-26. Compare with the old popup baseline of **about 2 a month**. If footer signups are clearly below that and the list matters, consider re-enabling the popup (rollback above) or making the footer signup more prominent.
- [ ] **Owner:** submit one real footer signup with your own email to confirm it subscribes and tags `newsletter`.

## BookEasy → in-theme appointment picker (in progress, 2026-10-26)

BookEasy accounts for most of the P0 third-party cost: two reCAPTCHA scripts (~1.7 MiB with repeats), the Stencil widget `p-d15c5182.entry.js` and the cart-validation script, all loaded on every page. Its replacement is built into the theme and costs nothing on pages that don't use it:

- **Appointment picker** block on the product template (`snippets/appointment-picker.liquid`, `assets/appointment-picker.js` ~11 KB unminified, `assets/component-appointment-picker.css`). The JS and CSS load only on products listed in the block. No libraries, and one small availability request once the picker nears the viewport.
- Busy times come from a Google Apps Script and paid orders reach the calendar through Shopify Flow. Code and step-by-step setup: [`booking/README.md`](booking/README.md).
- Status: on for **Take-5 only** on the dev theme. The other services are still on BookEasy, and the BookEasy embed stays on until every service has moved.
- [ ] Owner: one-time setup (script, Flow) and a test booking. See the README, steps 1–7.
- [ ] Owner: take Take-5 out of BookEasy's services (BookEasy removes unbooked Take-5s from the cart, step 6), then publish.
- [ ] Move the remaining services, then turn off the BookEasy app embed and uninstall. That clears the reCAPTCHA and `p-d15c5182` items above.

## P1 — Render path (FCP / LCP)

- [ ] **LCP element is the hero text** (`p.cfl-hero__sub`, "C-41 and black & white film developed daily…") with **2,530 ms element render delay** while TTFB is only 20 ms. The text is waiting on render-blocking CSS, fonts, and main-thread JS. Fixing P0 is the main lever; also:
  - [ ] Preload the hero's display/body fonts (`Filicudi_Solid.woff2`, `OpenSans-Semibold.woff2`) in `layout/theme.liquid` and confirm their `@font-face` rules in `assets/base.css` use `font-display: swap` (the font-display audit currently passes — keep it that way).
    - OpenSans half already done on master: `layout/theme.liquid` preloads `OpenSans-Semibold.woff2` via `asset_url`, and all three `@font-face` rules in `assets/base.css` have `font-display: swap`.
    - **Filicudi half left for the owner.** The theme's `Filicudi Solid` (and `Seawave`) `@font-face` uses `url({{ "./Filicudi_Solid.woff2" }})` inside a plain `.css` file, so Liquid never runs and the font never loads. Headings currently fall back to Bebas Neue. Fixing or preloading it would visibly change every theme heading, so that's a design decision first.
  - [x] Confirm the **font app embed** isn't loading a second copy of the same fonts; remove it if the bundled woff2 files cover everything.
    - Checked; it isn't a plain duplicate. The AnyFont app embed (`az-google-font-custom-fonts`) loads its own copies of Filicudi_Solid, Seawave and OpenSans-Semibold from `cdn.shopify.com/s/files/…`, and its CSS applies **Filicudi_Solid to every h3–h6 site-wide** (`!important`, forced black colour and 35px size), plus Seawave on `.h0` and a couple of selectors pinned to old section IDs. So h3–h6 currently get Filicudi from the app, while h1/h2 show Bebas Neue because the theme's own Filicudi rule is broken. Removing the app would change those headings. **Owner action:** decide together with the Filicudi question above. If the theme's `@font-face` is fixed to `{{ 'Filicudi_Solid.woff2' | asset_url }}` (needs base.css → base.css.liquid or an inline `{% style %}`), the app can go.
- [x] **Render-blocking CSS (est. 450 ms saved).** Seven stylesheets block first paint:
  - `base.css` (13.1 KiB) and `cfl-components.css` (7.1 KiB) — keep blocking; these are critical.
  - `component-localization-form.css` (3.2 KiB), `component-list-social.css` (1.5 KiB), `component-slider.css` (2.6 KiB), `component-slideshow.css` (2.1 KiB) — load non-critically (`media="print" onload="this.media='all'"` pattern Studio already uses elsewhere) since they style footer/below-the-fold or unused components.
  - [x] Check whether the homepage actually uses a slider/slideshow; if not, find which section requests those stylesheets and stop loading them on the index template.
    - Checked: the requests come from `sections/announcement-bar.liquid` (header group), which renders a `slideshow-component` because it has two announcements with auto-rotate. The featured-collection grid also links `component-slider.css`, further down the page. They are in use, so they stay (see above).
  - `accelerated-checkout-backwards-compat.css` (3.1 KiB) — Shopify-injected; leave unless dynamic checkout buttons can be disabled on the homepage.
  - Done (partly, by design): `component-localization-form.css` (`layout/theme.liquid`) now blocks only at ≥990px, where the announcement bar's country selector is on screen, and loads with the print/onload pattern everywhere else (phones see the selectors only in the closed drawer and footer). The announcement bar's `component-list-social.css` now has `media="screen and (min-width: 990px)"`, since those icons are hidden below 990px; the footer still links it for its own icons. On the mobile test, that takes two of the four files off the blocking list without changing what's painted.
  - Kept blocking on purpose: `component-slideshow.css` and `component-slider.css` style the rotating announcement bar, which is the first thing on screen at every width. Loading them late would make the two slides stack and then collapse, a layout shift at the top of every page. `sections/announcement-bar.liquid` now loads them only when there are 2+ announcements, so going down to one announcement (Theme editor → Announcement bar) would drop both. That's the owner's call.
- [ ] **Minify `assets/base.css`** (2.2 KiB saving). Low effort; do it while editing the font rules.
  - Decided not to. The estimated saving is 2.2 KiB before compression. Shopify already serves it brotli/gzip, where the gain from stripping whitespace and comments is a few hundred bytes. A minified `base.css` would make the Studio stylesheet unreadable and turn every future diff into one line. Not worth it for a short-term theme.

## P2 — Images

- [x] **`LongChurchRoad.jpg`** (102 KiB, est. 60 KiB saving): served at 800×534 but displayed at 618×417, and under-compressed. Use `image_url` with a proper `widths`/`sizes` set via `image_tag` so the browser picks the right size; Shopify's CDN will serve WebP/AVIF automatically.
  - Done: `sections/cfl-hero.liquid` already used `image_url | image_tag` with `widths`, but its `sizes` (`(min-width: 750px) 46vw, 92vw`) overstated the drawn width (it ignored the 54rem frame cap, the 36/38 photo-in-frame ratio, and that 1rem is 13px here). `sizes` is now measured from `cfl-components.css`, and 550/700 widths were added so PageSpeed's ~1.75x phone gets a 700w file instead of 800w. Still eager with `fetchpriority=high`. Compression/format is Shopify's CDN (WebP/AVIF automatically); nothing to change there.
- [x] **Popular Services grid images** in `templates/index.json` (`ul.cfl-services__grid … img`): `Buy_Film_4x6-01.jpg` (78 KiB, 51 KiB saving) and `StandardC….jpg` (50 KiB, 23 KiB saving). Check how the custom markup outputs these images; if the URLs are hard-coded or use a single size, switch to `image_url | image_tag` with `widths: '300, 450, 600'` and an accurate `sizes` attribute (4-up desktop, 2-up tablet, 1-up mobile per the README breakpoints). Add `loading="lazy"` to cards below the fold.
  - Already done on master ("Show text sooner and shrink the home page service photos"): the four images in `snippets/cfl-home-services.liquid` (not index.json any more) have a CDN `&width=` 400/600/800 `srcset`, a `sizes`, `loading="lazy"` and explicit dimensions. Kept as plain `<img>` because they're Files-area URLs, not image objects `image_tag` can take.

## P3 — Smaller clean-up

- [x] **Unused preconnects** in `<head>`: `fonts.shopifycdn.com`, `shop.app`, `shopify-extension.getredo.com`, and a `dns-prefetch preconnect` to `cdn.shopify.com`. Remove the ones the theme added; Redo's is app-injected (ask the vendor or leave it). Unused preconnects waste early connection slots on mobile.
  - Done for the theme's own: removed the `fonts.shopifycdn.com` preconnect from `layout/theme.liquid`. Theme-settings fonts (Bebas Neue, Open Sans Condensed) are now served from `www.coastalfilmlab.com/cdn/fonts/`, so the connection was never used. (`layout/password.liquid` still has Studio's copy; it only renders on the password page, so it was left alone.)
  - Not theme code: `shop.app` comes from Shopify's checkout preloads in `content_for_header`; `shopify-extension.getredo.com` from the Redo app embed; there is no theme-added `cdn.shopify.com` preconnect/dns-prefetch (the Judge.me and monorail dns-prefetches are app/Shopify-injected). Leave these, or ask Redo.
- [x] **Forced reflow (~150 ms) from an inline script** at roughly line 7913 of the rendered homepage HTML. View source, find which snippet/app outputs it, and batch its DOM reads before writes (or defer it).
  - Done: it was the theme's own sticky order bar (`sections/cfl-order-bar.liquid`), which read `scrollY`/`innerHeight` mid-parse to decide whether to show. The first check now comes from its IntersectionObserver callback, which runs after layout, so it no longer forces one.
- [ ] **DOM size: 2,086 elements.** Two full country/region lists are rendered (`AnnouncementCountryForm` and `HeaderCountryMobileForm`). If the store only sells in USD/United States, disable the country selector in the announcement bar and header (`sections/header-group.json`) — it also removes `component-localization-form.css` from the blocking list.
  - **Owner decision** (does the store sell outside the US?). The full country list renders in the announcement bar (desktop), the menu drawer and the footer, each with a noscript twin. If it's US-only, turn off the country/language selectors in Theme editor → Announcement bar and → Footer. The drawer copy goes away when the market has only one country (Settings → Markets). That also drops `component-localization-form.css` entirely. No change made here.
- [x] **Cache TTLs** — the flagged short-cache resources are all third-party (Rise.ai, w3apps, Shopify's compat CSS). Nothing to change in the theme; resolved by the P0 app decisions.
  - Agreed: nothing in the theme. Resolved by the Rise.ai / w3apps decisions above.

## Non-performance issues from the same run

- [ ] **Accessibility — color contrast:** the primary "Develop my film" button (`#FFF8EE` on `#7CCAB9`, ~1.81:1) and the service-card titles/descriptions fail. This is the pairing the README already flags. Switch primary button labels to Darkroom brown `#301E17` (or darken the teal) in `config/settings_data.json` schemes, and check the `cfl-service-card` text colors.
  - **Owner/design decision**, not changed. The button label colour lives in `config/settings_data.json` colour schemes (brand palette). Switching `background-1`/`background-2` button labels to `#301E17` is the README's own recommendation; do it in Theme editor → Colors. The service-card titles and descriptions already use the scheme foreground (`#301E17` on `#FCFCFC`, which passes; the AnyFont app forces h3 to `#000`). Their failure is most likely the reveal-on-scroll animation (`scroll-trigger animate--slide-in` starts near zero opacity) being sampled mid-fade, plus the cream-on-teal CTA buttons, so there's no clear-cut card colour fix in theme CSS.
- [x] **SEO — link text:** some links have non-descriptive text. Open the `link-text` audit in PSI to see which ones, then give them specific labels or `aria-label`s.
  - Done: the only generic link label in the home page HTML was the Camera Care card's "Learn more" button (`snippets/cfl-home-services.liquid`), now "See camera care". No other "learn more / read more / click here" labels in sections, snippets or templates. Re-run PSI to confirm the audit is clear; any leftovers would be in app-rendered markup.
- [ ] **Best Practices — console errors:** current errors are Shopify telemetry (`otlp-http-production.shopifysvc.com`, `monorail-edge.shopifysvc.com`) blocked by the test client; likely not actionable. Recheck in a clean browser after the P0 changes.
  - Nothing to change in code. Also seen in the HTML: two stale Microsoft Clarity app-embed entries in `config/settings_data.json` now render as "Failed to render app block … does not exist" comments (harmless). Turn them off in Theme editor → App embeds when convenient.
- [ ] **Theme Check baseline:** the README lists four existing errors (`email-signup-banner.liquid`, `footer.liquid`, `header.liquid`, `product-variant-options.liquid`). Fix them when touching those files so `--strict` can be enabled.
  - Now down to one: `shopify theme check` reports a single error, `sections/email-signup-banner.liquid` ValidSchema ("Property templates is not allowed"). The footer, header and variant-options errors are already gone. This work didn't touch that file, so it was left alone. No new errors or warnings from these changes (34 warnings before and after).

## Verification checklist (after each change)

- [ ] Push to the DEV theme (now `156880306230`, the GitHub-connected `dev` branch; preview <https://www.coastalfilmlab.com/?preview_theme_id=156880306230>) and re-run PageSpeed Insights against the preview URL, mobile and desktop.
- [ ] Re-test other key templates, not just the homepage: film development page, a product page (with Globo options/preorder), cart, studio rental (BookEasy), and account/order lookup.
- [ ] Confirm newsletter/contact forms still submit and spam protection still works.
- [ ] Confirm Judge.me reviews and gift cards (Clarity has been removed from the theme) still function where expected.
- [ ] Track the CrUX field metrics after publishing — the goal is to keep them passing while raising the mobile lab score.
