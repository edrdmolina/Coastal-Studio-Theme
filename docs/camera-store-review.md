# Camera store redesign — review notes

Branch: `feature/camera-store-redesign`, based on `dev`.

Draft theme: **Camera Store Redesign - Review 2026-10-30** (ID `158931484726`, unpublished).

[Open the camera store draft](https://www.coastalfilmlab.com/pages/cameras?preview_theme_id=158931484726)

[Desktop screenshot](camera-store-desktop.png) · [Mobile screenshot](camera-store-mobile.png) · [Product components](camera-store-products.png)

## Shared design system

The camera page uses the site's Seawave display headings, Filicudi subheadings and buttons, native Studio button and price components, theme page-width gutters, product-card alignment/radius settings, square product photography, variant-style camera filters, and native FAQ accordions. The reassurance strip uses the homepage's shared `cfl-trust` component. Surfaces follow the theme color variables, with the cream `accent-2` scheme for the confidence panel.

The shopping improvements remain in place. Decorative numbered category markers, floating image arrows, the photo label, and the separate dark confidence surface were removed. Teal buttons keep brown labels, following the existing shared components' contrast correction.

Verified computed Seawave headings, Filicudi button text, and the theme's 12px outer button radius. Updated desktop, product, and mobile screenshots reflect this design. Finder combinations, sorting, 320px/390px layouts, and the no-JavaScript fallback still pass, with no runtime exceptions or added Theme Check findings.

## What changed

- Compact, authentic camera photography and a clear primary shopping action.
- Available camera inventory on the landing page, ahead of the format guide.
- Expandable beginner finder combining shooting style and a budget in the shopper's presentment currency.
- Camera-type controls, multiword title search, price/name/newest sorting, result counts, clear filters, and progressive loading.
- Shareable filter URLs preserve Shopify preview parameters. Returning from a product restores the selection.
- Explicit listing condition labels, lens-included labels where the title states it, and warnings for known limitations.
- Accessories mixed into the camera collection are excluded. Explicit AS-IS and display pieces require opting in.
- Available lenses replace sold-out slots. Real film, accessories, and processing links complete the shopping route.
- Inspection and warranty context appears early, with the AS-IS exclusion beside the warranty claim. The FAQ follows the full repair-or-replace policy rather than the old replacement-only summary.
- Camera-page processing turnaround announcements are identified as film processing. The unrelated floating processing order bar is suppressed on this template.
- Responsive grids, readable button contrast, native disclosure controls, focus states, reduced-motion support, and a footer email wrap fix scoped to the camera storefront.
- Five Shopify sections keep the hero, catalog, format guide, lens shelf, and confidence content independently editable.

## Link overlay regression

The custom cards retain the theme's `h4` typography class but use `cs-product__title` instead of `card__heading`. The latter generates an absolutely positioned full-card link in Studio. Outside the native card container it stretched over the page, making a lens link intercept hero clicks.

Reproduced on the unpublished public draft: a point in the hero resolved to the Prospec lens. After removing that behavioral class, browser hit testing passed 54 targets: hero heading, description, photograph, both hero actions, a type filter, and the title/photo/details links on all 16 rendered camera and lens cards. All product-title `::after` overlays now compute to `none`.

## Validation

- Shopify-rendered preview with the real store's products, collections, photography, prices, and policies.
- At review time the collection contained 105 products, 91 available; camera classification yielded 75 available cameras, of which seven were explicit AS-IS/display pieces. The default view showed 68 cameras. These are observations, not hard-coded claims.
- Finder: point-and-shoot plus under $100 yielded 12 matching cameras, all within the selected budget.
- Price ascending, no-match recovery, reset, AS-IS inclusion, and load-more keyboard focus verified in the browser.
- Filter query restoration verified on a fresh navigation and return from a product.
- Camera product opened, added to cart, verified in cart, and removed. Cart confirmed empty; no checkout or order.
- Desktop, 390px, and 320px mobile layouts inspected, including enlarged text at 390px. Mobile camera content and document have no horizontal overflow after the footer fix.
- One H1; primary controls labeled; result count announced; no processing order bar on the camera template.
- An isolated headless browser verified 320px and 390px widths and the JavaScript-disabled fallback; no runtime exceptions occurred.
- Additional inventory cards stay in inert templates until displayed, avoiding requests for their product images on initial load. The initial 12 products and full-collection links work without JavaScript.
- `node --check assets/camera-store.js` and `git diff --check` pass.
- Theme Check adds no findings relative to the baseline. The existing error in `sections/email-signup-banner.liquid` remains (`Property templates is not allowed`).
- Local preview console showed Shopify analytics/wallet metric fetch failures; no errors attributable to `camera-store.js` were observed. No Core Web Vitals or conversion-lift claim is made.

## Data and implementation limits

- The finder renders up to 250 collection products with Liquid, filtering the full rendered selection, rather than only the first 12 visible cards. If the collection exceeds that limit, an additional full-collection notice appears. Collection links remain available throughout.
- A 35mm SLR is a distinct shopping choice from a point-and-shoot; format collection links still include overlapping film formats. Digital tags take precedence over film-style membership.
- The existing catalog has inconsistent product types and tags. Explicit camera types are preferred; blank types use conservative title exclusions. Unclassified cameras stay under Other film. This should eventually be replaced by normalized product metafields.
- Condition uses `custom.condition` when present, then a recognized explicit `Condition:` prefix in the description. Unknown condition stays unknown. Limitations are warnings, not a substitute for reading the description.
- Availability means the item can be purchased, not that every function works. AS-IS/display recognition uses explicit listing language; unmarked legacy issues still require reading the listing.
- The lens shelf considers the first 50 collection products to fill four available positions.

## Next opportunities from the subagent audit

1. Normalize camera format, shooting style, condition, known defects, lens/mount, manufacturer, required battery, and included components in Shopify metafields.
2. Replace film chemistry/ISO filters on camera collection pages with camera-specific filters through Shopify Search & Discovery.
3. Review camera product templates: purchase controls currently follow long descriptions. A structured condition/kit summary beside purchase controls would make a useful next change.
4. Reconcile existing service-page promises with the actual warranty and item condition policies. A camera-repair page still has an old preview-domain shopping link.
5. Add compatibility-based film/battery/lens recommendations only after structured data exists.
6. Measure click-through, finder usage, product-to-cart rate, and actual purchase conversion before claiming improved performance.

The live storefront has not been published or updated by this work.
