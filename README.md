<!-- markdownlint-disable MD013 -->

# Coastal Film Lab — Studio Theme

The current Shopify theme for [Coastal Film Lab](https://www.coastalfilmlab.com/). It is a customized copy of Shopify's **Studio 13.0.1** theme and supports the store's film-processing services, film and camera catalog, archival services, studio rental, and account/cart flows.

This is the short-term production theme. A separate project is expected to replace it; changes here should therefore favor safe, focused fixes over broad redesigns or architectural rewrites.

## Store and theme references

| Target | Value |
| --- | --- |
| Storefront | `https://www.coastalfilmlab.com/` |
| Shopify store | `d61956-2.myshopify.com` |
| Live theme | `Studio` — ID `128885489718` |
| Preferred code-testing theme | `Studio - DEV \| For Code Testing \| *DO NOT PUBLISH*` — ID `134028918838` |
| Upstream theme | Shopify Studio `13.0.1` |
| Shopify CLI version used to verify this README | `4.7.1` |

Theme IDs are store-specific and can change when themes are deleted or recreated. Confirm them before every upload:

```sh
shopify theme list --store d61956-2.myshopify.com
```

## Design direction

### Character

The theme should feel like a contemporary neighborhood film lab: knowledgeable and practical, but warm, colorful, and visibly connected to analog photography. It is not luxury-minimal, corporate, or nostalgia for nostalgia's sake. The intended balance is **analog character with modern e-commerce clarity**.

### Design principles

1. **Keep film tactile; keep the interface current.** Use real film, camera, lab, and scanning imagery to create character. Keep navigation, product selection, ordering, and status information familiar and direct.
2. **Lead with the customer's task.** Film processing, buying film, camera care, and camera shopping are the primary paths. Put service names, turnaround information, prices, and calls to action ahead of decorative storytelling.
3. **Let type create the identity.** Condensed display headings provide the bold, poster-like voice. The wider, calmer body face carries explanations and transactional content. Avoid adding unrelated typefaces or using display type for long passages.
4. **Use color as a wayfinding system.** Warm off-white is the default canvas, dark brown is the reading color, seafoam teal marks primary actions, mustard carries notices, and rust is reserved for stronger editorial emphasis. Do not make every section colorful.
5. **Make photography the proof.** Prefer authentic, well-lit images of film, equipment, hands at work, scans, and finished photographs. Use consistent crops within a grid; do not bury imagery under heavy overlays or ornamental effects.
6. **Favor broad, breathable compositions.** The desktop canvas is wide and the grids are generous. Preserve clear separation between the introduction, service routes, and product merchandising instead of stacking dense promotional modules.
7. **Add tactility with restraint.** Slightly rounded corners, outlined secondary buttons, thin borders, and soft shadows are enough. Avoid glass effects, deep shadows, excessive gradients, and pill-shaped controls unless the control's meaning benefits from them.
8. **Write like a helpful lab technician.** Copy should be specific, plainspoken, and encouraging. Explain formats, turnaround, delivery, and next steps. Avoid vague lifestyle slogans when operational information would help the customer act.
9. **Preserve the hierarchy on small screens.** Mobile should keep the same order of message → action → service → product. Stack controls and cards without shrinking type or tap targets into desktop proportions.
10. **Treat accessibility as part of the visual system.** Preserve semantic headings, keyboard focus, alt text, and reduced-motion behavior. High-contrast brown on light backgrounds is the default for text. The current light text on teal is low contrast and should not be extended to smaller or lighter-weight text.

## Design specifications

The values below describe the current committed settings in `config/settings_data.json` and the global overrides in `layout/theme.liquid` and `assets/base.css`.

### Color palette

| Token / role | Value | Intended use |
| --- | --- | --- |
| Paper white | `#FCFCFC` | Primary page and card background |
| Warm cream | `#FFF8EF` | Soft alternate background |
| Darkroom brown | `#301E17` | Primary text, icons, borders, and shadows |
| Seafoam teal | `#7CCAB9` | Primary actions and branded emphasis |
| Processing yellow | `#E8AF21` | Announcement bar and energetic notice areas |
| Terracotta rust | `#BC5631` | Strong accent panels and editorial emphasis |
| Deep blue-black | `#103948` | Shadow/support color on rust surfaces |

Current named Shopify schemes:

| Scheme | Background | Text | Primary button | Button label |
| --- | --- | --- | --- | --- |
| `background-1` | `#FCFCFC` | `#301E17` | `#7CCAB9` | `#FFF8EE` |
| `background-2` | `#E8AF21` | `#301E17` | `#7CCAB9` | `#FFF8EE` |
| `inverse` | `#7CCAB9` | `#FCFCFC` | `#FFFFFF` | `#7CCAB9` |
| `accent-1` | `#BC5631` | `#FCFCFC` | `#FCFCFC` | `#BC5631` |
| `accent-2` | `#FFF8EF` | `#301E17` | `#301E17` | `#301E17` |

Contrast guardrails:

- `#301E17` on `#FCFCFC`, `#FFF8EF`, `#E8AF21`, or `#7CCAB9` comfortably passes WCAG AA for normal text.
- `#FCFCFC` on `#BC5631` passes AA at approximately `4.53:1`.
- `#FFF8EE` on `#7CCAB9` is approximately `1.81:1` and does **not** pass AA. This is the current primary-button pairing. For accessibility-sensitive edits, prefer dark brown text on teal or darken the button background before expanding this treatment.

### Typography

| Role | Theme-defined stack | Current setting / scale |
| --- | --- | --- |
| Display and headings | `"Filicudi Solid"`, then configured heading font and fallbacks | `Bebas Neue 400`; heading scale `150%` |
| Body and UI | `"OpenSans Semibold"`, then configured body font and fallbacks | `Open Sans Condensed 500`; body scale `130%` |
| Decorative asset | `Seawave` | Bundled but not assigned globally |

Font files live in `assets/Filicudi_Solid.woff2`, `assets/OpenSans-Semibold.woff2`, and `assets/Seawave.woff2`. Headings are narrow, uppercase-forward, and high-impact; body copy is spacious and readable. Keep headings short. Use sentence case and normal prose for descriptions.

### Layout and spacing

| Setting | Current value |
| --- | --- |
| Maximum page width | `1600px` |
| Section spacing | `20px` desktop; theme computes a mobile equivalent |
| Grid gap | `40px` horizontal and vertical on desktop; `20px` on mobile |
| Main Studio breakpoint | `750px` |
| Homepage service-grid breakpoints | Four columns above `1024px`, two through `601–1024px`, one at `600px` and below |

The homepage uses a centered introductory statement, paired primary/secondary actions, a four-card service grid, and a four-column featured product collection. On mobile, the navigation collapses, the actions stack full-width, and service cards become a single vertical sequence.

### Shape, depth, and components

| Component | Specification |
| --- | --- |
| Primary button | Teal fill, warm-white label, `2px` border, `10px` radius, subtle `2px 2px 5px` shadow at `10%` opacity |
| Secondary button | Transparent/light fill with teal outline and label; same dimensions as the paired primary action |
| Product card | `card` style, centered text, no image padding, `4px` radius, no visible configured shadow |
| Collection/blog card | `standard` style, centered text, `4px` radius, no visible configured shadow |
| Inputs | `1px` low-opacity border, `4px` radius, subtle `2px 2px 5px` shadow |
| Variant pills | `1px` border, `4px` radius, no shadow |
| Media | No border, `4px` radius, no shadow |
| Popups | No border, `4px` radius, soft `6px 6px 25px` shadow at `10%` opacity |
| Badges | Bottom-left position with a `40px` radius |

Reveal-on-scroll is enabled and the default Studio hover treatment is active. Motion should reinforce state and hierarchy rather than become a visual attraction. Any new animation must remain understandable when motion is reduced or unavailable.

### Imagery

- Service images use a square `1:1` crop with `object-fit: cover` and an `8px` radius in the custom homepage grid.
- Featured products use square media and a clean four-column desktop / two-column mobile grid.
- Favor natural film grain, recognizable film packaging, cameras, lab tools, and hands performing real work.
- Maintain useful `alt` text. Avoid embedding essential instructions or prices inside images.
- Keep image treatment bright enough to identify the product or process; reserve dark, cinematic imagery for occasional editorial contrast.

## Homepage hierarchy

The current live homepage establishes the following order:

1. Mustard announcement bar with turnaround/shipping information.
2. White sticky header with logo, primary navigation, search, account, and cart.
3. Centered positioning statement and two service CTAs.
4. **Popular Services** grid: Film Processing, Buy Film, Camera Care, and Camera Store.
5. **Stock Up (So We Can Keep Developing Film)** featured-product grid.

Preserve this task-first hierarchy during short-term edits. New content should earn its position by helping customers choose, order, prepare, or track a service.

## Theme structure and implementation notes

- `layout/theme.liquid` defines the document shell, generated CSS variables, custom font stacks, analytics, and global app behavior.
- `config/settings_data.json` contains the committed Theme Editor state, color schemes, typography, component settings, and app embeds.
- `config/settings_schema.json` is the Studio settings schema.
- `sections/header-group.json` and `sections/footer-group.json` contain the global header, announcement bar, and footer composition.
- `templates/index.json` contains the homepage configuration and its custom Popular Services markup/styles.
- `templates/` includes many service-, collection-, and product-specific JSON templates. Several include custom Liquid or app blocks; test the affected template rather than checking only the homepage.
- `assets/base.css` is primarily Studio's global stylesheet with custom font declarations appended near the end.
- The theme depends on store-hosted images, navigation menus, products, collections, app blocks, and Shopify settings. Opening the Liquid files without a connected Shopify store is not a representative preview.

Enabled app embeds in the committed settings include Globo Product Options, BookEasy, Shopify Forms, Globo Preorder, Judge.me, a font app, and Microsoft Clarity. A local preview can differ from production if the corresponding app or store data is unavailable.

## Local development preview

### Prerequisites

1. Install a current Node.js release.
2. Install Shopify CLI:

   ```sh
   npm install -g @shopify/cli@latest
   ```

3. Authenticate when prompted. You need theme access to `d61956-2.myshopify.com`. Never commit Theme Access passwords or Admin API tokens.
4. Run commands from this repository's root.

Check the CLI and available themes:

```sh
shopify version
shopify theme list --store d61956-2.myshopify.com
```

Start a development theme and open its browser preview:

```sh
shopify theme dev --store d61956-2.myshopify.com --open
```

The command uploads this directory as a temporary development theme, prints local/editor/share URLs, and hot-reloads CSS and section changes. Stop it with `Ctrl+C`.

Important development-theme behavior:

- Development themes are temporary and are removed by `shopify auth logout`.
- The local preview cannot preview checkout customizations.
- File changes made while `theme dev` runs are synchronized to its development theme, not the live theme.
- Do not pass the live theme ID to `theme dev`. Shopify requires `--allow-live` for live-theme development because it can change production.
- Use `--theme-editor-sync` only when Theme Editor synchronization is intentional; otherwise, avoid editing the same JSON settings locally and in the online editor at the same time.

## Validate before uploading

```sh
shopify theme check
git status --short
git diff --check
```

Preview every changed template at desktop and mobile widths. At minimum, verify navigation, relevant service/product forms, variant selection, add-to-cart, cart, app blocks, and the footer.

At the time this README was written, the existing theme has four baseline Theme Check errors in `sections/email-signup-banner.liquid`, `sections/footer.liquid`, `sections/header.liquid`, and `snippets/product-variant-options.liquid`, plus warnings. Because of that existing debt, the working push commands below do not use `--strict`. Review the complete Theme Check output and do not introduce new errors. Add `--strict` after the baseline errors are fixed.

## Push an unpublished theme

### Update the existing code-testing theme

This is the preferred short-term deployment target:

```sh
shopify theme push \
  --store d61956-2.myshopify.com \
  --theme 134028918838
```

This overwrites the specified unpublished theme and prints its Theme Editor and preview URLs. Confirm the ID with `theme list` first; never rely only on the theme name.

### Create a new unpublished theme

Use a unique, descriptive name:

```sh
shopify theme push \
  --store d61956-2.myshopify.com \
  --unpublished \
  --theme "Coastal Studio - YYYY-MM-DD description"
```

`--unpublished` creates a new theme. Repeatedly running this command creates additional themes, so update the returned theme ID on subsequent pushes instead.

## Publish to the live storefront

### Recommended: preview a draft, then publish it

1. Push and test the unpublished theme as described above.
2. Re-run `shopify theme list --store d61956-2.myshopify.com` and copy the tested draft's exact ID.
3. Publish that tested theme interactively:

   ```sh
   shopify theme publish \
     --store d61956-2.myshopify.com \
     --theme DRAFT_THEME_ID
   ```

4. Confirm the prompt and immediately verify the live storefront. For automation, `--force` skips the confirmation; do not use it casually.

Publishing changes which theme is live. The previously live theme remains in the theme library as a rollback option.

### Directly update the current live theme

Use only for an intentional, reviewed hotfix. This bypasses the draft-preview safety step:

```sh
shopify theme push \
  --store d61956-2.myshopify.com \
  --live \
  --allow-live
```

`--live` targets whichever theme is live at command time; `--allow-live` acknowledges the production write. Prefer it over hard-coding the live theme ID, but always check `theme list` immediately before running it.

## Avoid overwriting remote Theme Editor changes

`shopify theme push` uploads local files and can overwrite remote changes, especially `config/settings_data.json` and JSON templates. Before starting work, decide whether Git or Shopify's Theme Editor is the current source of truth.

If production contains intentional Theme Editor changes that are not in Git, first commit or stash local work, then pull the live theme and review the diff:

```sh
shopify theme pull --store d61956-2.myshopify.com --live
git diff
```

Do not pull over uncommitted local work. Do not add `--nodelete` by habit: it prevents deletion of remote-only files and can leave stale code behind. Use it only when that behavior is explicitly required.

## Post-deployment verification and rollback

After a live deployment:

1. Open `https://www.coastalfilmlab.com/` in a private browser window.
2. Check the changed desktop and mobile templates.
3. Complete a non-payment cart flow: select options, add an item, change quantity, and remove it.
4. Verify app-dependent forms or widgets touched by the change.
5. Check the browser console for new errors and confirm analytics scripts do not block rendering.
6. Run `shopify theme list --store d61956-2.myshopify.com` and confirm the expected theme has role `live`.

To roll back, publish the previously live theme from the Shopify theme library or with `shopify theme publish --theme PREVIOUS_THEME_ID`. Confirm its identity and preview it before publishing.

## Maintenance boundaries

- Keep fixes narrow because this theme is temporary and will be replaced.
- Do not upgrade Studio or perform broad dependency/theme migrations as part of an unrelated short-term fix.
- Do not remove app embeds, tracking code, templates, or store-hosted assets without confirming the production dependency.
- Keep Theme Editor-compatible content in sections and settings when practical; avoid hard-coding new storefront content into Liquid.
- Preserve Shopify's semantic markup, keyboard behavior, localization hooks, and responsive conventions.
- Never commit credentials, generated preview URLs containing sensitive parameters, customer data, or local Shopify session files.
