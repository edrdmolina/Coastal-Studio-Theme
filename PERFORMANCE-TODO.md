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

Per the README's maintenance boundaries: confirm each app's production dependency before removing or deferring anything, test on the DEV theme (`134028918838`), and keep each fix narrow.

---

## P0 — Biggest wins (third-party JavaScript)

- [ ] **Stop reCAPTCHA loading 5× on the homepage.** `recaptcha__en.js` (gstatic.com) is downloaded five times at ~347 KiB each (~1.7 MiB, plus 71 KiB `styles__ltr.css`). It accounts for ~2.4 s of script boot-up, ~1.6 s of evaluation, ~830 KiB of unused JS, and most of the 20 long tasks.
  - [ ] Identify which forms trigger it (likely Shopify's native spam protection on newsletter/contact/customer forms, or the Shopify Forms app embed). Count the `<form>` elements that include it — the WebMCP audit lists 14 forms on the page.
  - [ ] Options, least risky first: remove duplicate/hidden forms from the homepage; load reCAPTCHA only on interaction (focus/submit) instead of page load; or switch spam protection to hCaptcha/Shopify's built-in alternative if available.
  - [ ] Verify that the newsletter signup and any contact form still submit and are still protected.
- [ ] **Find and cut `assets/index.js` (cdn.shopify.com, 261 KiB, 244 KiB unused).** Trace which app embed injects it (check `config/settings_data.json` app embeds: Globo Product Options, BookEasy, Shopify Forms, Globo Preorder, Judge.me, font app, Microsoft Clarity). If it only serves a specific page (e.g., BookEasy for studio rental), restrict the embed to that template.
- [ ] **`p-d15c5182.entry.js` (89 KiB, 57 KiB unused)** — Stencil-style bundle from an app; identify and scope it the same way.
- [ ] **Remove or replace jQuery 1.9.1 from `ajax.googleapis.com`.** Studio does not need jQuery. It adds a third-party connection, 22 KiB of unused JS, and ~95 ms of forced reflow. Find where it is included (`layout/theme.liquid`, a snippet, or an app). If an app genuinely needs it, at least move it off the critical path (`defer`) and off the 2013-era version.
- [ ] **Audit Globo Preorder on the homepage.** `globo.preorder.min.js` plus 5+ `globo.preorder.bundle.*.min.js` chunks run long tasks (up to ~58 ms each). Limit it to product/collection templates that actually sell preorders, if the app allows.
- [ ] **Rise.ai (`rise-ai.com`)** — 54 KiB with 36 KiB unused, 18 KiB of legacy (Babel/polyfilled) JS, and a 2-minute cache TTL. Confirm gift cards/store credit are still used; if so, ask the vendor about lazy loading, otherwise remove the embed.
- [ ] **`w3apps.co/js/orderlookup.js`** — served with no cache TTL. Confirm the order-lookup app is still needed; if it is, load it only on the order-status/account page.
- [ ] **`.flip-clock` CSS (12.7 KiB, 100% unused)** — leftover countdown-timer styles. Find the app or section and remove it if no countdown is running.
- [ ] **Shop follow button (`loader.shop-follow-button.en.esm.js`)** — long task on load; disable the Shop app follow button if it isn't wanted.

## P1 — Render path (FCP / LCP)

- [ ] **LCP element is the hero text** (`p.cfl-hero__sub`, "C-41 and black & white film developed daily…") with **2,530 ms element render delay** while TTFB is only 20 ms. The text is waiting on render-blocking CSS, fonts, and main-thread JS. Fixing P0 is the main lever; also:
  - [ ] Preload the hero's display/body fonts (`Filicudi_Solid.woff2`, `OpenSans-Semibold.woff2`) in `layout/theme.liquid` and confirm their `@font-face` rules in `assets/base.css` use `font-display: swap` (the font-display audit currently passes — keep it that way).
  - [ ] Confirm the **font app embed** isn't loading a second copy of the same fonts; remove it if the bundled woff2 files cover everything.
- [ ] **Render-blocking CSS (est. 450 ms saved).** Seven stylesheets block first paint:
  - `base.css` (13.1 KiB) and `cfl-components.css` (7.1 KiB) — keep blocking; these are critical.
  - `component-localization-form.css` (3.2 KiB), `component-list-social.css` (1.5 KiB), `component-slider.css` (2.6 KiB), `component-slideshow.css` (2.1 KiB) — load non-critically (`media="print" onload="this.media='all'"` pattern Studio already uses elsewhere) since they style footer/below-the-fold or unused components.
  - [ ] Check whether the homepage actually uses a slider/slideshow; if not, find which section requests those stylesheets and stop loading them on the index template.
  - `accelerated-checkout-backwards-compat.css` (3.1 KiB) — Shopify-injected; leave unless dynamic checkout buttons can be disabled on the homepage.
- [ ] **Minify `assets/base.css`** (2.2 KiB saving). Low effort; do it while editing the font rules.

## P2 — Images

- [x] **`LongChurchRoad.jpg`** (102 KiB, est. 60 KiB saving): served at 800×534 but displayed at 618×417, and under-compressed. Use `image_url` with a proper `widths`/`sizes` set via `image_tag` so the browser picks the right size; Shopify's CDN will serve WebP/AVIF automatically.
  - Done: `sections/cfl-hero.liquid` already used `image_url | image_tag` with `widths`, but its `sizes` (`(min-width: 750px) 46vw, 92vw`) overstated the drawn width (it ignored the 54rem frame cap, the 36/38 photo-in-frame ratio, and that 1rem is 13px here). `sizes` is now measured from `cfl-components.css`, and 550/700 widths were added so PageSpeed's ~1.75x phone gets a 700w file instead of 800w. Still eager with `fetchpriority=high`. Compression/format is Shopify's CDN (WebP/AVIF automatically); nothing to change there.
- [ ] **Popular Services grid images** in `templates/index.json` (`ul.cfl-services__grid … img`): `Buy_Film_4x6-01.jpg` (78 KiB, 51 KiB saving) and `StandardC….jpg` (50 KiB, 23 KiB saving). Check how the custom markup outputs these images; if the URLs are hard-coded or use a single size, switch to `image_url | image_tag` with `widths: '300, 450, 600'` and an accurate `sizes` attribute (4-up desktop, 2-up tablet, 1-up mobile per the README breakpoints). Add `loading="lazy"` to cards below the fold.

## P3 — Smaller clean-up

- [ ] **Unused preconnects** in `<head>`: `fonts.shopifycdn.com`, `shop.app`, `shopify-extension.getredo.com`, and a `dns-prefetch preconnect` to `cdn.shopify.com`. Remove the ones the theme added; Redo's is app-injected (ask the vendor or leave it). Unused preconnects waste early connection slots on mobile.
- [x] **Forced reflow (~150 ms) from an inline script** at roughly line 7913 of the rendered homepage HTML. View source, find which snippet/app outputs it, and batch its DOM reads before writes (or defer it).
  - Done: it was the theme's own sticky order bar (`sections/cfl-order-bar.liquid`), which read `scrollY`/`innerHeight` mid-parse to decide whether to show. The first check now comes from its IntersectionObserver callback, which runs after layout, so it no longer forces one.
- [ ] **DOM size: 2,086 elements.** Two full country/region lists are rendered (`AnnouncementCountryForm` and `HeaderCountryMobileForm`). If the store only sells in USD/United States, disable the country selector in the announcement bar and header (`sections/header-group.json`) — it also removes `component-localization-form.css` from the blocking list.
- [ ] **Cache TTLs** — the flagged short-cache resources are all third-party (Rise.ai, w3apps, Shopify's compat CSS). Nothing to change in the theme; resolved by the P0 app decisions.

## Non-performance issues from the same run

- [ ] **Accessibility — color contrast:** the primary "Develop my film" button (`#FFF8EE` on `#7CCAB9`, ~1.81:1) and the service-card titles/descriptions fail. This is the pairing the README already flags. Switch primary button labels to Darkroom brown `#301E17` (or darken the teal) in `config/settings_data.json` schemes, and check the `cfl-service-card` text colors.
- [ ] **SEO — link text:** some links have non-descriptive text. Open the `link-text` audit in PSI to see which ones, then give them specific labels or `aria-label`s.
- [ ] **Best Practices — console errors:** current errors are Shopify telemetry (`otlp-http-production.shopifysvc.com`, `monorail-edge.shopifysvc.com`) blocked by the test client; likely not actionable. Recheck in a clean browser after the P0 changes.
- [ ] **Theme Check baseline:** the README lists four existing errors (`email-signup-banner.liquid`, `footer.liquid`, `header.liquid`, `product-variant-options.liquid`). Fix them when touching those files so `--strict` can be enabled.

## Verification checklist (after each change)

- [ ] Push to the DEV theme (`134028918838`) and re-run PageSpeed Insights against the preview URL, mobile and desktop.
- [ ] Re-test other key templates, not just the homepage: film development page, a product page (with Globo options/preorder), cart, studio rental (BookEasy), and account/order lookup.
- [ ] Confirm newsletter/contact forms still submit and spam protection still works.
- [ ] Confirm Judge.me reviews, Clarity analytics, and gift cards still function where expected.
- [ ] Track the CrUX field metrics after publishing — the goal is to keep them passing while raising the mobile lab score.
