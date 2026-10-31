# Camera catalog classification audit

Audited 2026-10-31T01:37:21.233074+00:00. Store: `d61956-2.myshopify.com`. Canonical public collection: [Cameras](https://www.coastalfilmlab.com/collections/cameras).

All **105** public listings were inspected: **92 actual cameras**, including **14 sold-out camera listings**, and **13 noncamera accessories/lenses**. **87 cameras** receive at least one requested label; **5 real cameras** remain outside this taxonomy. Categories overlap. This subagent audit was read-only. Subsequent Shopify application and filter verification are recorded in [the implementation notes](camera-store-review.md).

## Counts

| Exact label | Listings |
| --- | ---: |
| Point and Shoot | 43 |
| SLR | 34 |
| Rangefinder | 4 |
| Medium Format | 8 |
| Compact Camera | 37 |
| Large Format | 1 |

Confidence: {'high': 102, 'medium': 3}. 15 products have metadata conflicts and 8 have unresolved identity/detail ambiguities; see the product records. Confidence describes classification, not camera condition.

## Scope and method

The collection JSON returned 105 unique products and the next page returned zero. The rendered collection also said 105. Full titles, complete descriptions, vendor/type/tags, variant SKUs, public product.js, and product-page/JSON-LD metadata were inspected for every listing. All 105 product.js descriptions matched the collection snapshot. Selected identity and body-form photographs were visually inspected for 24 products. Public endpoints do not expose private Admin metafield values. Generic “Sold out” template strings were not treated as inventory evidence.

Primary sources are manufacturer manuals/catalogs/specifications (including original scans hosted by archives) and the store’s own item descriptions and photographs. Secondary pages were used only to locate original documents, not as the final basis for uncertain construction/format claims. No raw HTML is committed.

## Classification rules

- **overlap:** Categories are independent attributes; each array may contain multiple exact labels. Arrays are not mutually exclusive and totals do not sum to camera count.
- **Point and Shoot:** Consumer fixed-lens snapshot workflow with fixed or automatic focus and simple fixed/automatic exposure. Includes disposables, simple instant snapshots, and fixed-focus snapshot box cameras. Does not automatically include every AE/AF SLR, manually focused rangefinder, or focusing TLR.
- **SLR:** Real single-lens reflex optical construction, including DSLR and medium-format SLR. Excludes TLR, mirrorless and camcorders.
- **Rangefinder:** A real coupled optical rangefinder used to focus. Excludes simple optical framing finders, sonar AF and rangefinder-styled mirrorless bodies.
- **Medium Format:** Conventional medium-format roll-film/system shopping class (e.g. 120/220/620, 6x4.5 through 6x9). Neither 127 spool identity alone nor the physical area of integral instant film establishes this shopping class. The miniature 3x4 cm Vollenda is not automatically medium format.
- **Compact Camera:** A positive body-form judgment: pocketable miniature cameras, normal small snapshot compacts, genuinely small rangefinders and documented small compact-system bodies. Not a synonym for fixed-lens, folding, mirrorless or lightweight relative to a large format. M50 II and E-PL2 included; larger X-Pro1 and Pony bodies conservatively withheld. No universal industry size cutoff is implied.
- **Large Format:** Large image format including old large roll-film cameras; not restricted to contemporary sheet-film loading. No.4A qualifies by 4.25x6.5 inch frame.
- **TLR:** Construction is recorded in camera_kind/evidence only. TLR is not added to the six allowed labels.
- **instant_boundary:** Integral instant cameras do not acquire Medium Format just because the image area overlaps medium-format negative sizes. TL70 remains outside these six under this explicit shopping policy.
- **empty_arrays:** Noncamera accessories and real cameras outside the six both have empty arrays. Always consult is_camera/classification_status to distinguish them.
- **condition:** Sold-out, body-only, broken, display and repair camera listings remain cameras and retain construction/format labels.

The compact-body and instant/medium-format boundaries are explicit retail judgments. The arrays below are the recommended consistent policy; a broader policy should be changed deliberately across the relevant models, not inferred from old tags. Small mirrorless bodies may have Compact Camera without becoming SLR or Rangefinder.

## Important corrections and unresolved details

- **9326967947318 — [Polaroid Sonar OneStep Land Camera](https://www.coastalfilmlab.com/products/polaroid-sonar-one-step-instant-film-camera):** Description incorrectly calls this a folding SX-70-family SLR. Tags say 600 film while the Pronto Sonar is an SX-70-film model. Confirm physical-unit identity and any film-speed modification before correcting film compatibility. Classification follows the pictured rigid Pronto Sonar.
- **7861351710774 — [Bosley B1 35mm Rangefinder Camera - For Display/Repair](https://www.coastalfilmlab.com/products/bosley-b1-35mm-rangefinder-camera-for-96067):** Title says Bosley B1; description claims Japanese manufacture and a 45mm f/2.8 lens. The photograph instead shows a Bolsey B2 with Wollensak 44mm f/3.2. Parent should confirm that the photographed Bolsey B2 is the physical unit being sold and correct the title/model facts. The recommended categories follow the photographed item.
- **8617675227190 — [Kodak Vollenda](https://www.coastalfilmlab.com/products/kodak-vollenda):** Store description and tag call it medium format without identifying the variant; the photographed lens/body match the miniature 127 Vollenda. Exact model suffix and internal film gate cannot be certified from the generic title alone. Confirm the stamped model and film gate before writing an exact film-size metafield.
- **7688092745782 — [Kodak 4a Folding Large Format 126 Roll Film Camera - Early 1906 model!](https://www.coastalfilmlab.com/products/kodak-4a-folding-large-format-126-roll-film-camera-early-1906-model):** 4x5 and sheet film tags do not establish the actual format or included back. Old 126 roll film must not be confused with Instamatic 126. Exact production year/early subvariant is not independently established; 1906 is the seller claim. No plate/sheet-film adapter is assumed included.
- **7671113285686 — [Kodak Brownie Folding No 2 Camera Vintage!](https://www.coastalfilmlab.com/products/kodak-brownie-folding-no-2-camera-vintage-1):** Tags for 127, 1a, junior and vest pocket describe different cameras; use the photographed No.2 identification. Exact production subvariant is not certified, but the photographed No.2 identity supports the 120 / medium-format category.
- **7622474989622 — [Sears & Roebuck Tower 21 Toy Vintage Film Camera - Display Piece](https://www.coastalfilmlab.com/products/sears-roebuck-tower-21-toy-vintage-film-camera-display-piece):** Title says Tower 21; image says One-Twenty Flash. Tags include 35mm and 6x6; these do not establish its format. No exact-model primary manual/catalog was located. Inspect film gate to certify 6x9, and confirm that the photograph is the physical unit. Medium Format does not depend on choosing between 6x6 and 6x9.
- **7722854318134 — [Panasonic Lumix DMC-LS75 Compact Digital Camera Digicam Starter Kit](https://www.coastalfilmlab.com/products/panasonic-lumix-dmc-ls75-compact-digital-17693):** Title and pictured 3x-zoom Lumix body match LS75; body copy claims 12.1MP/4x and condition paragraph names FS10. LS75 manual specifies 7.2MP/3x. Confirm the rear/base model label before correcting the listing. Either LS75 or FS10 remains Point and Shoot plus Compact Camera.
- **8992453066806 — [Nikon Zoom 210 AF 35mm Point and Shoot Film Camera](https://www.coastalfilmlab.com/products/nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy-1):** Reused Nikon Lite Touch 120AF handle does not match the full current title and photographed model. Categories follow the actual title/photo. Description incorrectly expands the lens range to 38-210mm; the photographed Zoom 210 AF lens reads 38-70mm.
- **8992447627318 — [Canon Prima Super 115 35mm Point and Shoot Film Camera](https://www.coastalfilmlab.com/products/nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy):** Reused Nikon Lite Touch 120AF handle does not match the full current title and photographed model. Categories follow the actual title/photo.
- **9573454610486 — [Canon AE-1 35mm SLR Film Camera + 50mm f/1.8 Lens](https://www.coastalfilmlab.com/products/canon-ae-1-program-35mm-slr-film-camera-50mm-f-1-8-lens-1):** Handle says AE-1 Program, while title, description and photograph say plain AE-1. Both are SLRs.
- **9327457894454 — [Polaroid One Step Flash Instant Film Camera](https://www.coastalfilmlab.com/products/polaroid-impulse-600-instant-camera):** Handle says Impulse; title, description and photograph say One Step Flash. Both are instant Point and Shoot cameras.
- **7904222281782 — [Reto Pano - Ultra Wide 35mm Point and Shoot Film Camera](https://www.coastalfilmlab.com/products/reto-ultra-wide-and-slim-35mm-point-and-shoot-film-camera-copy):** Description and copy handle were inherited from Ultra Wide & Slim; photo and full title identify the distinct PANO model with flash and panorama selector. Categories coincide, but model facts should be corrected.
- **7710793891894 — [Taron 35 III MX 35mm Rangefinder Film Camera Kit Shelf Piece](https://www.coastalfilmlab.com/products/taron-35-iii-mx-35mm-rangefinder-film-73993):** Point and Shoot tag conflicts with the actual manual rangefinder construction.
- **7699937394742 — [Kodak Pony 135 Camera - Shelf Piece](https://www.coastalfilmlab.com/products/kodak-pony-135-camera-shelf-piece):** Rangefinder tag is false; the photographed Model C still uses a separate framing finder and scale focus.
- **7622474956854 — [Anscoflex II 620 TLR Medium Format Camera - Display Piece](https://www.coastalfilmlab.com/products/anscoflex-ii-620-tlr-medium-format-camera-display-piece):** 35mm tag is false; the manual specifies 620 medium-format film.
- **7699404619830 — [Bell & Howell 35mm Point and Shoot Film Camera](https://www.coastalfilmlab.com/products/bell-howell-35mm-point-and-shoot-film-camera):** Exact Bell & Howell model number is not stated; do not infer Canon Owl/Snappy model identity from unrelated tags.

## Real cameras outside the requested six labels

- **9287008583734 — [Fujifilm X-Pro1 APS-C Mirrorless Camera - X Mount (read)](https://www.coastalfilmlab.com/products/fujifilm-x-pro1-aps-c-mirrorless-camera-x-mount-read):** Mirrorless construction has no reflex mirror and no coupled optical rangefinder. Sensor-based autofocus and an optical-looking body do not support SLR or Rangefinder; interchangeable lenses do not support the Point and Shoot shopping class. The X-Pro1 is a full-width 139.5 mm system body; conservatively leave categories empty rather than infer Compact Camera from rangefinder-like styling.
- **8898184052790 — [Sony Handycam HDR-CX405 Digital Camcorder](https://www.coastalfilmlab.com/products/sony-handycam-hdr-cx405-digital-camcorder):** Sony identifies the HDR-CX405 as a dedicated Handycam camcorder. It is an actual camera, but it fits none of the six requested still-camera filter classes. Compact camcorder marketing does not make it a Compact Camera still-camera type.
- **7861351743542 — [Kodak Pony 135 35mm Film Camera - For Display](https://www.coastalfilmlab.com/products/kodak-pony-135-35mm-film-camera-for-91952):** Kodak Pony 135 has a simple framing viewfinder and manually estimated scale focusing, with manual aperture/shutter controls. It is not a coupled rangefinder or reflex camera and is not a simple Point and Shoot. Conservatively withhold Compact Camera from this substantial Bakelite viewfinder body instead of labeling every fixed-lens camera compact.
- **7699937394742 — [Kodak Pony 135 Camera - Shelf Piece](https://www.coastalfilmlab.com/products/kodak-pony-135-camera-shelf-piece):** Kodak Pony 135 has a simple framing viewfinder and manually estimated scale focusing, with manual aperture/shutter controls. It is not a coupled rangefinder or reflex camera and is not a simple Point and Shoot. Conservatively withhold Compact Camera from this substantial Bakelite viewfinder body instead of labeling every fixed-lens camera compact.
- **7539087835190 — [MiNT InstantFlex TL70 2.0 Instax Mini Instant Film TLR Camera](https://www.coastalfilmlab.com/products/mint-instantflex-tl70-2-0-instax-mini-instant-film-tlr-camera):** MiNT specifies a genuine TLR with separate viewing/taking lenses, manual focus, aperture selection and Instax Mini film. It is not SLR or Rangefinder; the tall deep body is not Compact Camera and the manual photographic workflow is not Point and Shoot. Under the conventional roll-film shopping definition used here, leave categories empty instead of silently treating every large-area instant frame as Medium Format.

## Metafield handoff

The local `.shopify/metafields.json` snapshot contains `custom.film_size` (single line), `custom.condition_rating`, `custom.serial_number`, `custom.remarks`, and Shopify camera/film metaobject references, but no relevant camera-category list definition. This local September snapshot is not proof of the live Admin schema. Recommend a separate `custom.camera_categories` definition of type `list.single_line_text_field`, restricted to the exact six labels. Parent owns live Admin inspection, definition creation, writes and UI/filter registration.

Use product IDs/GIDs to apply the reviewed arrays. Preserve overlap, keep sold-out and display/repair bodies, and exclude accessories using `is_camera`. Keep unclassified cameras in the default camera view. An empty category list cannot distinguish a camera from a noncamera. Do not infer eligibility from `product_type`, old tags, handles or the presence of a camera in an accessory photograph.

## Complete listing inventory

Each item below includes the full observed title, product ID, handle, camera/noncamera flag, exact category array, confidence, rationale, sources and unresolved details. JSON is the machine-readable source for all 105 records.

### 1. 9608087044150 — Canon Powershot G7X Mark III New in Box

- Handle: `canon-powershot-g7x-mark-iii-new-in-box-copy`; [public product](https://www.coastalfilmlab.com/products/canon-powershot-g7x-mark-iii-new-in-box-copy).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: digital.
- Additional primary evidence: [Canon Camera Museum: PowerShot G7 X Mark III](https://global.canon/en/c-museum/product/dcc884.html).
- Unresolved ambiguities: none affecting this classification.

### 2. 9573627985974 — Nikon F 35mm SLR Film Camera + Photomic prism + Nikkor 50mm f/1.4 Ai-s Lens

- Handle: `nikon-f-35mm-slr-film-camera-photoprism-nikkor-50mm-f-1-4-ai-s-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-f-35mm-slr-film-camera-photoprism-nikkor-50mm-f-1-4-ai-s-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 3. 9573625954358 — Vivitar Series 1 Power Zoom 480pz 35mm Point and Shoot Film Camera

- Handle: `vivitar-series-1-power-zoom-480pz-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/vivitar-series-1-power-zoom-480pz-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 4. 9573624152118 — Vivitar Big Viewfinder BV35 35mm Point and Shoot Film Camera

- Handle: `vivitar-big-viewfinder-bv35-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/vivitar-big-viewfinder-bv35-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 5. 9573457723446 — Bell and Howell BF 906SVD Big Viewfinder 35mm Point and Shoot Film Camera

- Handle: `bell-and-howell-bf-906svd-big-viewfinder-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/bell-and-howell-bf-906svd-big-viewfinder-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 6. 9573457592374 — Kodak Star 735 35mm Point and Shoot Film Camera

- Handle: `kodak-star-735-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/kodak-star-735-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 7. 9573454610486 — Canon AE-1 35mm SLR Film Camera + 50mm f/1.8 Lens

- Handle: `canon-ae-1-program-35mm-slr-film-camera-50mm-f-1-8-lens-1`; [public product](https://www.coastalfilmlab.com/products/canon-ae-1-program-35mm-slr-film-camera-50mm-f-1-8-lens-1).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Additional primary evidence: [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL04073.jpg?v=1792853496).
- Metadata conflicts: Handle says AE-1 Program, while title, description and photograph say plain AE-1. Both are SLRs.
- Unresolved ambiguities: none affecting this classification.

### 8. 9573452480566 — Minolta Capios 20 35mm Point and Shoot Film Camera

- Handle: `minolta-capios-20-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/minolta-capios-20-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 9. 9573450055734 — Minolta Capios 25 35mm Point and Shoot Film Camera

- Handle: `minolta-capios-25-35mm-point-and-shoot-film-camera-1`; [public product](https://www.coastalfilmlab.com/products/minolta-capios-25-35mm-point-and-shoot-film-camera-1).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 10. 9573447172150 — Minolta Capios 160A 35mm Point and Shoot Film Camera

- Handle: `minolta-capios-160a-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/minolta-capios-160a-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 11. 9573427118134 — Konica K-mini 35mm Point and Shoot Film Camera

- Handle: `konica-k-mini-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/konica-k-mini-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 12. 9573425872950 — Fuji Cardia Travel Mini Dual-P 35mm Point and Shoot Film Camera

- Handle: `fuji-cardia-travel-mini-dual-p-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/fuji-cardia-travel-mini-dual-p-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 13. 9573425774646 — Olympus AF-1 Twin 35mm Point and Shoot Film Camera

- Handle: `olympus-af-1-twin-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/olympus-af-1-twin-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 14. 9573425676342 — Olympus AF-10 Super 35mm Point and Shoot Film Camera

- Handle: `olympus-af-10-super-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/olympus-af-10-super-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 15. 9573424103478 — Olympus AFL-T QD 35mm Point and Shoot Film Camera

- Handle: `olympus-afl-t-qd-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/olympus-afl-t-qd-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 16. 9573422759990 — Ricoh KR-10M 35mm SLR Film Camera + Quantaray 28mm f/2.8 Lens

- Handle: `ricoh-kr-10m-35mm-slr-film-camera-quantaray-28mm-f-2-8-lens`; [public product](https://www.coastalfilmlab.com/products/ricoh-kr-10m-35mm-slr-film-camera-quantaray-28mm-f-2-8-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 17. 9573422202934 — Canon FTb QL 35mm SLR Film Camera + 50mm f/1.8 FD Lens

- Handle: `canon-ftb-ql-35mm-slr-film-camera-50mm-f-1-8-fd-lens`; [public product](https://www.coastalfilmlab.com/products/canon-ftb-ql-35mm-slr-film-camera-50mm-f-1-8-fd-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 18. 9573420630070 — Pentax Auto 110 + 18mm f/2.8 Lens + AF100 P Flash

- Handle: `pentax-auto-110-18mm-f-2-8-lens-af100-p-flash`; [public product](https://www.coastalfilmlab.com/products/pentax-auto-110-18mm-f-2-8-lens-af100-p-flash).
- Camera: **true**; categories: `["SLR", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class. The Auto 110 is specifically a pocketable miniature SLR, so Compact Camera also applies. 110 film is not medium format.
- Film/sensor format: 110 cartridge film.
- Additional primary evidence: [Asahi Pentax Auto 110 original instruction manual (archived scan)](https://vintagecameradigest.com/wp-content/uploads/2022/09/pentax-auto-110-system-opt.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL04193.jpg?v=1792850583).
- Unresolved ambiguities: none affecting this classification.

### 19. 9573227003958 — Canon A-1 35mm SLR Film Camera + 50mm f/1.8 nFD Lens

- Handle: `canon-a-1-35mm-slr-film-camera-50mm-f-1-8-nfd-lens-1`; [public product](https://www.coastalfilmlab.com/products/canon-a-1-35mm-slr-film-camera-50mm-f-1-8-nfd-lens-1).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 20. 9486933033014 — Canon FTb QL 35mm SLR Film Camera + FL 50mm f/1.8 Lens

- Handle: `canon-ftb-ql-35mm-slr-film-camera-fl-50mm-f-1-8-lens-copy`; [public product](https://www.coastalfilmlab.com/products/canon-ftb-ql-35mm-slr-film-camera-fl-50mm-f-1-8-lens-copy).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 21. 9486766932022 — Olympus 35 RC 35mm Rangefinder Film Camera

- Handle: `olympus-35-rc-35mm-rangefinder-film-camera`; [public product](https://www.coastalfilmlab.com/products/olympus-35-rc-35mm-rangefinder-film-camera).
- Camera: **true**; categories: `["Rangefinder", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: A real coupled optical rangefinder is used for manual focusing. Fixed-lens construction alone does not make it a Point and Shoot or compact; the body form is evaluated separately. The Olympus 35 RC is a genuinely small compact rangefinder; the listing explicitly describes this body form and the photo confirms the model. Assign Rangefinder and Compact Camera, but not Point and Shoot.
- Film/sensor format: 35mm.
- Additional primary evidence: [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL03916.jpg?v=1791672615).
- Unresolved ambiguities: none affecting this classification.

### 22. 9448472805430 — Pentax Auto 110 + 18mm f/2.8 Lens

- Handle: `pentax-auto-110-18mm-f-2-8-lens`; [public product](https://www.coastalfilmlab.com/products/pentax-auto-110-18mm-f-2-8-lens).
- Camera: **true**; categories: `["SLR", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class. The Auto 110 is specifically a pocketable miniature SLR, so Compact Camera also applies. 110 film is not medium format.
- Film/sensor format: 110 cartridge film.
- Additional primary evidence: [Asahi Pentax Auto 110 original instruction manual (archived scan)](https://vintagecameradigest.com/wp-content/uploads/2022/09/pentax-auto-110-system-opt.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL03842.jpg?v=1791036431).
- Unresolved ambiguities: none affecting this classification.

### 23. 9429838856246 — Pentax K1000 35mm SLR Film Camera + Pentax-M 50mm f/1.7 Lens

- Handle: `pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-1-7-lens`; [public product](https://www.coastalfilmlab.com/products/pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-1-7-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 24. 9429837807670 — Pentax K1000 35mm SLR Film Camera + Pentax-A 50mm f/2 Lens

- Handle: `pentax-k1000-35mm-slr-film-camera-pentax-a-50mm-f-2-lens-2`; [public product](https://www.coastalfilmlab.com/products/pentax-k1000-35mm-slr-film-camera-pentax-a-50mm-f-2-lens-2).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 25. 9429778530358 — Pentax K1000 35mm SLR Film Camera + Pentax-M 50mm f/2 Lens

- Handle: `pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-2-lens-1`; [public product](https://www.coastalfilmlab.com/products/pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-2-lens-1).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 26. 9389486997558 — Nikon N2020 AF 35mm SLR Film Camera + AF Nikkor 35-105mm f/3.5-4.5 Zoom Lens

- Handle: `nikon-n2020-af-35mm-slr-film-camera-af-nikkor-35-105mm-f-3-5-4-5-zoom-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-n2020-af-35mm-slr-film-camera-af-nikkor-35-105mm-f-3-5-4-5-zoom-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 27. 9389138772022 — Rollei Rolleiflex 6008 Intergral Medium Format Camera + Rollei HFT 80mm f/2.8 Planar Lens + 45 Prism Viewfinder + Handle Grip

- Handle: `rollei-rolleifelx-6008-intergral-medium-format-camera-rollei-hft-80mm-f-2-8-planar-lens-45-prism-viewfinder-handle-grip`; [public product](https://www.coastalfilmlab.com/products/rollei-rolleifelx-6008-intergral-medium-format-camera-rollei-hft-80mm-f-2-8-planar-lens-45-prism-viewfinder-handle-grip).
- Camera: **true**; categories: `["SLR", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class. This is also a medium-format system, so both SLR and Medium Format apply. It is a substantial system body, not a Compact Camera.
- Film/sensor format: 6x6 on 120/220 film.
- Additional primary evidence: [Rollei Rolleiflex 6008 Integral original instruction manual](https://www.cameramanuals.org/rolleiflex/rolleiflex_6008_integral.pdf).
- Unresolved ambiguities: none affecting this classification.

### 28. 9369180307510 — Polaroid Impulse 600 Instant Film Camera

- Handle: `polaroid-impulse-600-instant-film-camera`; [public product](https://www.coastalfilmlab.com/products/polaroid-impulse-600-instant-film-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 29. 9368882708534 — Yashica Mat 124 TLR 6x6 Medium Format FIlm Camera

- Handle: `yashica-mat-124-tlr-6x6-medium-format-film-camera`; [public product](https://www.coastalfilmlab.com/products/yashica-mat-124-tlr-6x6-medium-format-film-camera).
- Camera: **true**; categories: `["Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Yashica Mat-124 is a 6x6 medium-format TLR on 120/220 roll film, with separate viewing and taking lenses and manual focusing. Assign Medium Format; TLR is construction evidence, not a seventh filter label. A TLR is not an SLR or a rangefinder; this body is not a pocket compact.
- Film/sensor format: 6x6 on 120/220 film.
- Unresolved ambiguities: none affecting this classification.

### 30. 9368629477430 — Nikon Nikkormat FTN 35mm SLR Film Camera + Nikkor 50mm f/1.8 Ai Lens

- Handle: `nikon-nikkormat-ftn-35mm-slr-film-camera-nikkor-50mm-f-1-8-ai-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-nikkormat-ftn-35mm-slr-film-camera-nikkor-50mm-f-1-8-ai-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 31. 9368417730614 — Nikon Nikkormat FTN 35mm SLR Film Camera (Body Only)

- Handle: `nikon-nikkormat-ftn-35mm-slr-film-camera-body-only`; [public product](https://www.coastalfilmlab.com/products/nikon-nikkormat-ftn-35mm-slr-film-camera-body-only).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 32. 9327704047670 — Polaroid One Step Close Up Instant Film Camera

- Handle: `polaroid-one-step-close-up-instant-film-camera-2`; [public product](https://www.coastalfilmlab.com/products/polaroid-one-step-close-up-instant-film-camera-2).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 33. 9327703851062 — Polaroid One Step Close Up Instant Film Camera

- Handle: `polaroid-one-step-close-up-instant-film-camera-1`; [public product](https://www.coastalfilmlab.com/products/polaroid-one-step-close-up-instant-film-camera-1).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 34. 9327482142774 — Polaroid One Step Close Up Instant Film Camera

- Handle: `polaroid-one-step-close-up-instant-film-camera`; [public product](https://www.coastalfilmlab.com/products/polaroid-one-step-close-up-instant-film-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 35. 9327474901046 — Polaroid One Step Flash Instant Film Camera

- Handle: `polaroid-one-step-flash-instant-film-camera`; [public product](https://www.coastalfilmlab.com/products/polaroid-one-step-flash-instant-film-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 36. 9327457894454 — Polaroid One Step Flash Instant Film Camera

- Handle: `polaroid-impulse-600-instant-camera`; [public product](https://www.coastalfilmlab.com/products/polaroid-impulse-600-instant-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL03219.jpg?v=1789223348).
- Metadata conflicts: Handle says Impulse; title, description and photograph say One Step Flash. Both are instant Point and Shoot cameras.
- Unresolved ambiguities: none affecting this classification.

### 37. 9327438626870 — Canon EOS Rebel T7i 24.2mp APS-C Digital Camera + 18-55mm IS STM Lens

- Handle: `canon-eos-rebel-t7i-24-2mp-aps-c-digital-camera-18-55mm-is-stm-lens`; [public product](https://www.coastalfilmlab.com/products/canon-eos-rebel-t7i-24-2mp-aps-c-digital-camera-18-55mm-is-stm-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: APS-C digital.
- Unresolved ambiguities: none affecting this classification.

### 38. 9327154987062 — Canon 7D 18mp APS-C CMOS DSLR Camera + 18-135mm f/3.5-5.6 EF-S IS Lens

- Handle: `canon-7d-18mp-aps-c-cmos-dslr-camera-18-135mm-f-3-5-5-6-ef-s-is-lens`; [public product](https://www.coastalfilmlab.com/products/canon-7d-18mp-aps-c-cmos-dslr-camera-18-135mm-f-3-5-5-6-ef-s-is-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: APS-C digital.
- Unresolved ambiguities: none affecting this classification.

### 39. 9326971420726 — Canon EOS Rebel X 35mm SLR Film Camera (Body Only)

- Handle: `canon-eos-rebel-x-35mm-slr-film-camera-body-only`; [public product](https://www.coastalfilmlab.com/products/canon-eos-rebel-x-35mm-slr-film-camera-body-only).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 40. 9326967947318 — Polaroid Sonar OneStep Land Camera

- Handle: `polaroid-sonar-one-step-instant-film-camera`; [public product](https://www.coastalfilmlab.com/products/polaroid-sonar-one-step-instant-film-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The photo is clearly marked POLAROID PRONTO LAND CAMERA and SONAR OneStep and shows a separate viewfinder in a rigid body. The original hardbody guide covers Pronto Sonar autofocus. Assign Point and Shoot. It is not the folding SX-70 Sonar SLR described in the listing, and sonar distance measurement is not a coupled optical rangefinder.
- Film/sensor format: SX-70 integral instant film.
- Model identification: Polaroid Pronto Sonar OneStep rigid-body camera (photographed).
- Additional primary evidence: [Polaroid OneStep & Pronto hardbody original user guide (archived reproduction)](https://www.manualslib.com/manual/1408150/Polaroid-Pronto.html); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL03384.jpg?v=1789215183).
- Metadata conflicts: Description incorrectly calls this a folding SX-70-family SLR. Tags say 600 film while the Pronto Sonar is an SX-70-film model.
- Unresolved ambiguities: Confirm physical-unit identity and any film-speed modification before correcting film compatibility. Classification follows the pictured rigid Pronto Sonar.

### 41. 9326967521334 — Polaroid 600 Business Edition Instant Camera

- Handle: `polaroid-600-business-edition-1`; [public product](https://www.coastalfilmlab.com/products/polaroid-600-business-edition-1).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 42. 9287009108022 — Miranda DR 1.9 35mm SLR Film Camera + 5cm f/1.9 Lens - Miranda Mount

- Handle: `miranda-dr-1-9-35mm-slr-film-camera-5cm-f-1-9-lens-miranda-mount`; [public product](https://www.coastalfilmlab.com/products/miranda-dr-1-9-35mm-slr-film-camera-5cm-f-1-9-lens-miranda-mount).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 43. 9287008583734 — Fujifilm X-Pro1 APS-C Mirrorless Camera - X Mount (read)

- Handle: `fujifilm-x-pro1-aps-c-mirrorless-camera-x-mount-read`; [public product](https://www.coastalfilmlab.com/products/fujifilm-x-pro1-aps-c-mirrorless-camera-x-mount-read).
- Camera: **true**; categories: `[]`; status: `outside_requested_taxonomy`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Mirrorless construction has no reflex mirror and no coupled optical rangefinder. Sensor-based autofocus and an optical-looking body do not support SLR or Rangefinder; interchangeable lenses do not support the Point and Shoot shopping class. The X-Pro1 is a full-width 139.5 mm system body; conservatively leave categories empty rather than infer Compact Camera from rangefinder-like styling.
- Film/sensor format: APS-C digital.
- Additional primary evidence: [Fujifilm X-Pro1 original owner manual](https://dl.fujifilm-x.com/support/manual/x/fujifilm_xpro1_manual_en.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL03075.jpg?v=1788613606).
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Compactness has no universal size boundary. This conservative audit withholds Compact Camera from the larger X-Pro1 while including the positively documented small M50 II and E-PL2 bodies.

### 44. 9251272097846 — Pentax K1000 35mm SLR Film Camera + Pentax-M 50mm f/2 Lens

- Handle: `pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-2-lens`; [public product](https://www.coastalfilmlab.com/products/pentax-k1000-35mm-slr-film-camera-pentax-m-50mm-f-2-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 45. 9235923468342 — Nikon F 35mm SLR Film Camera + Nikkor-H 50mm f/2 Lens

- Handle: `nikon-f-35mm-slr-film-camera-nikkor-h-50mm-f-2-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-f-35mm-slr-film-camera-nikkor-h-50mm-f-2-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 46. 9235703824438 — Minolta SRT101 35mm SLR + 50mm f/1.4 Rokkor PF Lens

- Handle: `minolta-srt101-35mm-slr-50mm-f-1-4-rokkor-pf-lens`; [public product](https://www.coastalfilmlab.com/products/minolta-srt101-35mm-slr-50mm-f-1-4-rokkor-pf-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 47. 9235701661750 — Canon EOS M50 MKII APSC Mirrorless Camera + EF-M 15-45mm f/3.5-6.3 Lens

- Handle: `canon-eos-m50-mkii-apsc-mirrorless-camera-ef-m-15-45mm-f-3-5-6-3-lens`; [public product](https://www.coastalfilmlab.com/products/canon-eos-m50-mkii-apsc-mirrorless-camera-ef-m-15-45mm-f-3-5-6-3-lens).
- Camera: **true**; categories: `["Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Mirrorless construction has no reflex mirror and no coupled optical rangefinder. Sensor-based autofocus and an optical-looking body do not support SLR or Rangefinder; interchangeable lenses do not support the Point and Shoot shopping class. Canon explicitly identifies the M50 Mark II as a Compact System Camera, supporting Compact Camera as a body-form overlap.
- Film/sensor format: APS-C digital.
- Additional primary evidence: [Canon EOS M50 Mark II original specifications](https://cam.start.canon/fa/C007/manual/html/UG-11_Reference_0090.html); [Canon Camera Museum: EOS M50 Mark II](https://global.canon/en/c-museum/product/dslr897.html); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL02275.jpg?v=1787780110).
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Compact Camera refers to the small still-camera body here; it does not imply a fixed lens. No dedicated Mirrorless label was requested.

### 48. 9235472678966 — Nikon N50 35mm SLR Film Camera + AF Nikkor 28-80mm f/3.3-5.6 Lens

- Handle: `nikon-n50-35mm-slr-film-camera-af-nikkor-28-80mm-f-3-3-5-6-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-n50-35mm-slr-film-camera-af-nikkor-28-80mm-f-3-3-5-6-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 49. 9235308347446 — Olympus Pen EPL2 Micro 4/3 Mirrorless Camera w/ 14-42mm Zoom Lens

- Handle: `olympus-pen-epl2-micro-4-3-mirrorless-camera-w-14-42mm-zoom-lens`; [public product](https://www.coastalfilmlab.com/products/olympus-pen-epl2-micro-4-3-mirrorless-camera-w-14-42mm-zoom-lens).
- Camera: **true**; categories: `["Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Mirrorless construction has no reflex mirror and no coupled optical rangefinder. Sensor-based autofocus and an optical-looking body do not support SLR or Rangefinder; interchangeable lenses do not support the Point and Shoot shopping class. The 115.4x72.7x42 mm PEN body is a small compact system design, supporting Compact Camera as a body-form overlap.
- Film/sensor format: Micro Four Thirds digital.
- Additional primary evidence: [Olympus E-PL2 original instruction manual](https://learnandsupport.getolympus.com/sites/default/files/media/files/2018/04/E-PL2_Instruction_Manual_EN.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL02483.jpg?v=1787773130).
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Compact Camera refers to the small still-camera body here; it does not imply a fixed lens. No dedicated Mirrorless label was requested.

### 50. 9226889035830 — Nikon FM 35mm SLR Film Camera + Nikkor 50mm f/1.4 Ai-S Lens

- Handle: `nikon-fm-35mm-slr-film-camera-nikkor-50mm-f-1-4-ai-s-lens`; [public product](https://www.coastalfilmlab.com/products/nikon-fm-35mm-slr-film-camera-nikkor-50mm-f-1-4-ai-s-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 51. 9124374708278 — Pentax K1000 35mm SLR Film Camera + Pentax-A 50mm f/2 Lens

- Handle: `pentax-k1000-35mm-slr-film-camera-pentax-a-50mm-f-2-lens-1`; [public product](https://www.coastalfilmlab.com/products/pentax-k1000-35mm-slr-film-camera-pentax-a-50mm-f-2-lens-1).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 52. 9124148838454 — Canon AE-1 35mm SLR Film Camera + 50mm f/1.4 S.S.C Lens

- Handle: `canon-ae-1-35mm-slr-film-camera-50mm-f-1-4-s-s-c-lens`; [public product](https://www.coastalfilmlab.com/products/canon-ae-1-35mm-slr-film-camera-50mm-f-1-4-s-s-c-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 53. 9066742546486 — Minolta X-370 35mm SLR Film Camera + 50mm f/1.7 Lens

- Handle: `minolta-x-370-35mm-slr-film-camera-50mm-f-1-7-lens`; [public product](https://www.coastalfilmlab.com/products/minolta-x-370-35mm-slr-film-camera-50mm-f-1-7-lens).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 54. 9066574413878 — Canon AE-1 35mm SLR Film Camera + 50mm f/1.8 Lens

- Handle: `canon-ae-1-35mm-slr-film-camera-50mm-f-1-8-lens-2`; [public product](https://www.coastalfilmlab.com/products/canon-ae-1-35mm-slr-film-camera-50mm-f-1-8-lens-2).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 55. 8992629588022 — Canon AE-1 35mm SLR Film Camera + 50mm f/1.8 Lens

- Handle: `canon-ae-1-35mm-slr-film-camera-50mm-f-1-8-lens-1`; [public product](https://www.coastalfilmlab.com/products/canon-ae-1-35mm-slr-film-camera-50mm-f-1-8-lens-1).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 56. 8992624377910 — Samsung AF Zoom 700 35mm Point and Shoot Film Camera

- Handle: `samsung-af-zoom-700-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/samsung-af-zoom-700-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 57. 8992453066806 — Nikon Zoom 210 AF 35mm Point and Shoot Film Camera

- Handle: `nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy-1`; [public product](https://www.coastalfilmlab.com/products/nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy-1).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Additional primary evidence: [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL01615.jpg?v=1784051663).
- Metadata conflicts: Reused Nikon Lite Touch 120AF handle does not match the full current title and photographed model. Categories follow the actual title/photo. Description incorrectly expands the lens range to 38-210mm; the photographed Zoom 210 AF lens reads 38-70mm.
- Unresolved ambiguities: none affecting this classification.

### 58. 8992447627318 — Canon Prima Super 115 35mm Point and Shoot Film Camera

- Handle: `nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy`; [public product](https://www.coastalfilmlab.com/products/nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera-copy).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Additional primary evidence: [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL01585.jpg?v=1784050568).
- Metadata conflicts: Reused Nikon Lite Touch 120AF handle does not match the full current title and photographed model. Categories follow the actual title/photo.
- Unresolved ambiguities: none affecting this classification.

### 59. 8992447430710 — Nikon Lite Touch Zoom 120AF 35mm Point and Shoot Film Camera

- Handle: `nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/nikon-lite-touch-zoom-120af-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 60. 8898184052790 — Sony Handycam HDR-CX405 Digital Camcorder

- Handle: `sony-handycam-hdr-cx405-digital-camcorder`; [public product](https://www.coastalfilmlab.com/products/sony-handycam-hdr-cx405-digital-camcorder).
- Camera: **true**; categories: `[]`; status: `outside_requested_taxonomy`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: Sony identifies the HDR-CX405 as a dedicated Handycam camcorder. It is an actual camera, but it fits none of the six requested still-camera filter classes. Compact camcorder marketing does not make it a Compact Camera still-camera type.
- Film/sensor format: digital video / small digital sensor.
- Additional primary evidence: [Sony HDR-CX405 official specifications](https://www.sony.com/electronics/support/camcorders-interchangeable-lens-camcorders/hdr-cx405/specifications).
- Unresolved ambiguities: none affecting this classification.

### 61. 8844604997686 — Fujifilm GF670 6x6 6x7 Medium Format Rangefinder Film Camera

- Handle: `fujifilm-gf670-6x6-6x7-medium-format-33179`; [public product](https://www.coastalfilmlab.com/products/fujifilm-gf670-6x6-6x7-medium-format-33179).
- Camera: **true**; categories: `["Rangefinder", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: A real coupled optical rangefinder is used for manual focusing. Fixed-lens construction alone does not make it a Point and Shoot or compact; the body form is evaluated separately. Its selectable 6x6/6x7 roll-film format also supports Medium Format. The 178 mm wide, approximately 1 kg body is portable for medium format but is not assigned the general Compact Camera label merely because it folds.
- Film/sensor format: 6x6 / 6x7 on 120/220 film.
- Additional primary evidence: [Fujifilm GF670 / GF670W original manufacturer brochure](https://rangefinder.ru/manual/2/Fuji_GF670%2C_GF670W_brochure.pdf); [Fujifilm GF670 original Japanese instruction manual](https://asset.fujifilm.com/www/jp/files/2019-12/260441dacc0eef43c2a209c2105f2f82/filmcamera_gf670_manual_01.pdf).
- Unresolved ambiguities: none affecting this classification.

### 62. 8707951263798 — Polaroid One Step Flash

- Handle: `polaroid-one-step-flash`; [public product](https://www.coastalfilmlab.com/products/polaroid-one-step-flash).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 63. 8617675227190 — Kodak Vollenda

- Handle: `kodak-vollenda`; [public product](https://www.coastalfilmlab.com/products/kodak-vollenda).
- Camera: **true**; categories: `["Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **medium**.
- Evidence/rationale: The photo matches the miniature Vollenda with 5 cm Radionar, rather than the 10.5 cm-lens Vollenda 620. Kodak documents miniature 3x4 cm-class frames on 127 and a thin folding body. Assign Compact Camera; do not inherit Medium Format from the store tag. This manually set scale-focus model is neither a coupled rangefinder nor Point and Shoot.
- Film/sensor format: 127 roll film, approximately 3x4 cm half-size frames.
- Model identification: Kodak/Nagel Vollenda 48 family, inferred from photographed Radionar 5 cm f/3.5 lens, Compur shutter and small body.
- Additional primary evidence: [Eastman Kodak Continental Kodaks original catalog, Vollenda section](https://www.pacificrimcamera.com/rl/00154/00154.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL00705.jpg?v=1778078218).
- Metadata conflicts: Store description and tag call it medium format without identifying the variant; the photographed lens/body match the miniature 127 Vollenda.
- Unresolved ambiguities: Exact model suffix and internal film gate cannot be certified from the generic title alone. Confirm the stamped model and film gate before writing an exact film-size metafield.

### 64. 8493861634102 — Minolta Capios 140 35mm Point and Shoot Film Camera

- Handle: `minolta-capios-140-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/minolta-capios-140-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 65. 8493665878070 — Fuji Zoom Cardia Supreme OP 35mm Point and Shoot Film Camera

- Handle: `fuji-zoom-cardia-supreme-op-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/fuji-zoom-cardia-supreme-op-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: sold out; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 66. 8159536807990 — Canon IX240 ELPH Jr. APS Point and Shoot Camera

- Handle: `canon-ix240-elph-jr-aps-point-and-shoot-68231`; [public product](https://www.coastalfilmlab.com/products/canon-ix240-elph-jr-aps-point-and-shoot-68231).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: APS (IX240).
- Unresolved ambiguities: none affecting this classification.

### 67. 8148628471862 — Minolta Silver Streak Zoom 35mm Point and Shoot

- Handle: `minolta-silver-streak-zoom-35mm-point-and-81845`; [public product](https://www.coastalfilmlab.com/products/minolta-silver-streak-zoom-35mm-point-and-81845).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 68. 7967201067062 — Leitz Leicaflex 35mm SLR OEM Leather Half Case

- Handle: `leitz-leicaflex-35mm-slr-oem-leather-half-02244`; [public product](https://www.coastalfilmlab.com/products/leitz-leicaflex-35mm-slr-oem-leather-half-02244).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Leather half case only; Leicaflex SLR name describes compatibility.
- Unresolved ambiguities: none affecting this classification.

### 69. 7917895516214 — Kyocera Zoomtec Wide 35mm Point and Shoot

- Handle: `kyocera-zoomtec-wide-35mm-point-and-shoot-39713`; [public product](https://www.coastalfilmlab.com/products/kyocera-zoomtec-wide-35mm-point-and-shoot-39713).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 70. 7904222281782 — Reto Pano - Ultra Wide 35mm Point and Shoot Film Camera

- Handle: `reto-ultra-wide-and-slim-35mm-point-and-shoot-film-camera-copy`; [public product](https://www.coastalfilmlab.com/products/reto-ultra-wide-and-slim-35mm-point-and-shoot-film-camera-copy).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Additional primary evidence: [RETO PANO official model specifications](https://retoproject.com/products/reto-pano-35mm-film-camera); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/CFL01548.jpg?v=1754321788).
- Metadata conflicts: Description and copy handle were inherited from Ultra Wide & Slim; photo and full title identify the distinct PANO model with flash and panorama selector. Categories coincide, but model facts should be corrected.
- Unresolved ambiguities: none affecting this classification.

### 71. 7861351743542 — Kodak Pony 135 35mm Film Camera - For Display

- Handle: `kodak-pony-135-35mm-film-camera-for-91952`; [public product](https://www.coastalfilmlab.com/products/kodak-pony-135-35mm-film-camera-for-91952).
- Camera: **true**; categories: `[]`; status: `outside_requested_taxonomy`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Kodak Pony 135 has a simple framing viewfinder and manually estimated scale focusing, with manual aperture/shutter controls. It is not a coupled rangefinder or reflex camera and is not a simple Point and Shoot. Conservatively withhold Compact Camera from this substantial Bakelite viewfinder body instead of labeling every fixed-lens camera compact.
- Film/sensor format: 35mm.
- Additional primary evidence: [Eastman Kodak Pony 135 original instruction manual](https://www.cameramanuals.org/kodak_pdf/kodak_pony_135.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6964128452_j3h6.jpg?v=1750704219).
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Compact is a body-form judgment; broad historical miniature-camera usage could justify a broader retail policy, but is not silently applied in these arrays.

### 72. 7861351710774 — Bosley B1 35mm Rangefinder Camera - For Display/Repair

- Handle: `bosley-b1-35mm-rangefinder-camera-for-96067`; [public product](https://www.coastalfilmlab.com/products/bosley-b1-35mm-rangefinder-camera-for-96067).
- Camera: **true**; categories: `["Rangefinder", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The photographed body is marked MODEL B2 and the lens is marked BOLSEY / Wollensak 44 mm f/3.2. Bolsey original instructions confirm a coupled rangefinder. The small body supports Compact Camera as well as Rangefinder; manual exposure/focus does not support Point and Shoot.
- Film/sensor format: 35mm.
- Model identification: Bolsey B2 (photographed), contrary to Bosley B1 title.
- Additional primary evidence: [Bolsey B2 original operating instructions](https://www.cameramanuals.org/pdf_files/bolsey_b2.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.7012128591_j654.jpg?v=1750704208).
- Metadata conflicts: Title says Bosley B1; description claims Japanese manufacture and a 45mm f/2.8 lens. The photograph instead shows a Bolsey B2 with Wollensak 44mm f/3.2.
- Unresolved ambiguities: Parent should confirm that the photographed Bolsey B2 is the physical unit being sold and correct the title/model facts. The recommended categories follow the photographed item.

### 73. 7853625770038 — Hasselblad H2 645 Medium Format Camera - Body + Viewfinder

- Handle: `hasselblad-h2-645-medium-format-camera-93715`; [public product](https://www.coastalfilmlab.com/products/hasselblad-h2-645-medium-format-camera-93715).
- Camera: **true**; categories: `["SLR", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class. This is also a medium-format system, so both SLR and Medium Format apply. It is a substantial system body, not a Compact Camera.
- Film/sensor format: 6x4.5 medium-format system (film/digital back).
- Additional primary evidence: [Hasselblad H2 user manual](https://cdn.hasselblad.com/manuals/h2/H2_user_manual.pdf).
- Unresolved ambiguities: none affecting this classification.

### 74. 7839866519606 — Rollei Rolleiflex SLX Mk I Medium Format Film Camera - Body Only

- Handle: `rollei-rolleiflex-slx-mk-i-medium-format-58428`; [public product](https://www.coastalfilmlab.com/products/rollei-rolleiflex-slx-mk-i-medium-format-58428).
- Camera: **true**; categories: `["SLR", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class. This is also a medium-format system, so both SLR and Medium Format apply. It is a substantial system body, not a Compact Camera.
- Film/sensor format: 6x6 on 120/220 film.
- Additional primary evidence: [Rollei Rolleiflex SLX original instruction manual](https://www.cameramanuals.org/rolleiflex/rolleiflex_slx.pdf).
- Unresolved ambiguities: none affecting this classification.

### 75. 7828705214518 — Pentax Auto 110 50mm f/2.8 Telephoto Prime Lens

- Handle: `pentax-auto-110-50mm-f28-telephoto-34520`; [public product](https://www.coastalfilmlab.com/products/pentax-auto-110-50mm-f28-telephoto-34520).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Pentax Auto 110 50mm lens only; the Auto 110 camera body is not included.
- Unresolved ambiguities: none affecting this classification.

### 76. 7824565731382 — Konica Hexar RF Custom Leather Half Case - Conganc

- Handle: `konica-hexar-rf-custom-leather-half-case-92304`; [public product](https://www.coastalfilmlab.com/products/konica-hexar-rf-custom-leather-half-case-92304).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Konica Hexar RF half case only; description expressly says the pictured camera is illustrative.
- Unresolved ambiguities: none affecting this classification.

### 77. 7822720073782 — Polaroid 600 Barbie Throwback Instant Film Camera

- Handle: `polaroid-600-barbie-throwback-instant-film-camera-1`; [public product](https://www.coastalfilmlab.com/products/polaroid-600-barbie-throwback-instant-film-camera-1).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Polaroid 600 integral instant film.
- Additional primary evidence: [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera).
- Unresolved ambiguities: none affecting this classification.

### 78. 7811476881462 — Leitz Wetzlar 35mm Round Slotted Lens Hood

- Handle: `leitz-wetzlar-35mm-round-slotted-lens-hood-83690`; [public product](https://www.coastalfilmlab.com/products/leitz-wetzlar-35mm-round-slotted-lens-hood-83690).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Leitz lens hood only.
- Unresolved ambiguities: none affecting this classification.

### 79. 7811113353270 — Mamiya C330/C220 Lens Hood

- Handle: `mamiya-c330c220-lens-hood-57088`; [public product](https://www.coastalfilmlab.com/products/mamiya-c330c220-lens-hood-57088).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Mamiya C330/C220 lens hood only; TLR and medium-format keywords refer to compatible cameras.
- Unresolved ambiguities: none affecting this classification.

### 80. 7811070623798 — Tokina SD 70-210 F/4-5.6 Ai F-Mount

- Handle: `tokina-sd-70-210-f4-56-ai-f-mount-89385`; [public product](https://www.coastalfilmlab.com/products/tokina-sd-70-210-f4-56-ai-f-mount-89385).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Tokina telephoto zoom lens only.
- Unresolved ambiguities: none affecting this classification.

### 81. 7810689302582 — Formula 5 135mm f/2.8 Multicoated m42 Prime Lens

- Handle: `formula-5-135mm-f28-multicoated-m42-54300`; [public product](https://www.coastalfilmlab.com/products/formula-5-135mm-f28-multicoated-m42-54300).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Formula 5 telephoto prime lens only.
- Unresolved ambiguities: none affecting this classification.

### 82. 7776412794934 — Ricoh XR-P 35mm SLR - AS IS

- Handle: `ricoh-xr-p-35mm-slr-as-is`; [public product](https://www.coastalfilmlab.com/products/ricoh-xr-p-35mm-slr-as-is).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 83. 7749755142198 — Rollei Magazin 4560 for 6000 Series Cameras - 14987 + Adapter 6000

- Handle: `rollei-magazin-4560-for-6000-series-36771`; [public product](https://www.coastalfilmlab.com/products/rollei-magazin-4560-for-6000-series-36771).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Rollei 4560 film magazine and adapter only; not a camera body.
- Unresolved ambiguities: none affecting this classification.

### 84. 7742686134326 — Rollei Rolleiflex Magazin 6000 220 6x6/220 Film Back 6000 Series

- Handle: `rollei-rolleiflex-magazin-6000-220-01913`; [public product](https://www.coastalfilmlab.com/products/rollei-rolleiflex-magazin-6000-220-01913).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Rollei 6000-series 220 film back only; not a complete camera.
- Unresolved ambiguities: none affecting this classification.

### 85. 7725284327478 — Ricoh Singlex T.L.S 35mm SLR M42 Mount - Read Description

- Handle: `ricoh-singlex-tls-35mm-slr-m42-mount-47375`; [public product](https://www.coastalfilmlab.com/products/ricoh-singlex-tls-35mm-slr-m42-mount-47375).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 86. 7722854318134 — Panasonic Lumix DMC-LS75 Compact Digital Camera Digicam Starter Kit

- Handle: `panasonic-lumix-dmc-ls75-compact-digital-17693`; [public product](https://www.coastalfilmlab.com/products/panasonic-lumix-dmc-ls75-compact-digital-17693).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: digital.
- Additional primary evidence: [Panasonic DMC-LS75 / LS70 / LS60 original operating instructions](https://help.na.panasonic.com/wp-content/uploads/2023/02/DMCLS60_LS70_LS75_VQT1C63-1_ENG.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6504432336_cfve.jpg?v=1735942677).
- Metadata conflicts: Title and pictured 3x-zoom Lumix body match LS75; body copy claims 12.1MP/4x and condition paragraph names FS10. LS75 manual specifies 7.2MP/3x.
- Unresolved ambiguities: Confirm the rear/base model label before correcting the listing. Either LS75 or FS10 remains Point and Shoot plus Compact Camera.

### 87. 7710793924662 — Ricoh XF-30 35mm Point and Shoot Film Camera \| Please Read

- Handle: `ricoh-xf-30-35mm-point-and-shoot-film-87734`; [public product](https://www.coastalfilmlab.com/products/ricoh-xf-30-35mm-point-and-shoot-film-87734).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 88. 7710793891894 — Taron 35 III MX 35mm Rangefinder Film Camera Kit Shelf Piece

- Handle: `taron-35-iii-mx-35mm-rangefinder-film-73993`; [public product](https://www.coastalfilmlab.com/products/taron-35-iii-mx-35mm-rangefinder-film-73993).
- Camera: **true**; categories: `["Rangefinder"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Taron 35 Model III uses a coupled optical rangefinder and manually selected focus, aperture and shutter settings, confirmed by the original manual and photographed model. Rangefinder applies. Ignore its Point and Shoot tag; this full-size fixed-lens rangefinder is not assigned Compact Camera merely because its lens is fixed.
- Film/sensor format: 35mm.
- Additional primary evidence: [Nihon Kosokki Taron 35 Model III original instructions](https://www.cameramanuals.org/pdf_files/taron_iii.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6163437363_ctue.jpg?v=1733809700).
- Metadata conflicts: Point and Shoot tag conflicts with the actual manual rangefinder construction.
- Unresolved ambiguities: none affecting this classification.

### 89. 7703158128694 — Canon FT 35mm SLR Film Camera *Read Description*

- Handle: `canon-ft-35mm-slr-film-camera-read-99464`; [public product](https://www.coastalfilmlab.com/products/canon-ft-35mm-slr-film-camera-read-99464).
- Camera: **true**; categories: `["SLR"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The listing identifies a true single-lens reflex body, rather than a lens or accessory. A kit lens or a body-only sale does not alter SLR construction. Automatic exposure or autofocus does not turn an interchangeable-lens SLR into the Point and Shoot shopping class.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

### 90. 7699937394742 — Kodak Pony 135 Camera - Shelf Piece

- Handle: `kodak-pony-135-camera-shelf-piece`; [public product](https://www.coastalfilmlab.com/products/kodak-pony-135-camera-shelf-piece).
- Camera: **true**; categories: `[]`; status: `outside_requested_taxonomy`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Kodak Pony 135 has a simple framing viewfinder and manually estimated scale focusing, with manual aperture/shutter controls. It is not a coupled rangefinder or reflex camera and is not a simple Point and Shoot. Conservatively withhold Compact Camera from this substantial Bakelite viewfinder body instead of labeling every fixed-lens camera compact.
- Film/sensor format: 35mm.
- Additional primary evidence: [Eastman Kodak Pony 135 original instruction manual](https://www.cameramanuals.org/kodak_pdf/kodak_pony_135.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.5895353084_56sk.jpg?v=1732396638).
- Metadata conflicts: Rangefinder tag is false; the photographed Model C still uses a separate framing finder and scale focus.
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Compact is a body-form judgment; broad historical miniature-camera usage could justify a broader retail policy, but is not silently applied in these arrays.

### 91. 7699404619830 — Bell & Howell 35mm Point and Shoot Film Camera

- Handle: `bell-howell-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/bell-howell-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **medium**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Unresolved ambiguities: Exact Bell & Howell model number is not stated; do not infer Canon Owl/Snappy model identity from unrelated tags.

### 92. 7688094351414 — Nikon F4-F4s B Focusing Screen

- Handle: `nikon-f4-f4s-b-focusing-screen`; [public product](https://www.coastalfilmlab.com/products/nikon-f4-f4s-b-focusing-screen).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Nikon focusing screen only; SLR tags refer to camera compatibility.
- Unresolved ambiguities: none affecting this classification.

### 93. 7688092745782 — Kodak 4a Folding Large Format 126 Roll Film Camera - Early 1906 model!

- Handle: `kodak-4a-folding-large-format-126-roll-film-camera-early-1906-model`; [public product](https://www.coastalfilmlab.com/products/kodak-4a-folding-large-format-126-roll-film-camera-early-1906-model).
- Camera: **true**; categories: `["Large Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The No.4A Folding Kodak makes 4.25x6.5 inch negatives on the original large No.126 roll film, documented in Kodak's catalog. This is Large Format despite using roll film. It is not the 1963 Instamatic 126 cartridge, not Medium Format, and not automatically a 4x5 sheet-film camera.
- Film/sensor format: old No.126 roll film, 4.25x6.5 inch image.
- Additional primary evidence: [Canadian Kodak Co., Kodaks and Kodak Supplies (1914), original catalog](https://www.gutenberg.org/files/33183/33183-h/33183-h.htm); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.5697833531_lbts.jpg?v=1730317024).
- Metadata conflicts: 4x5 and sheet film tags do not establish the actual format or included back. Old 126 roll film must not be confused with Instamatic 126.
- Unresolved ambiguities: Exact production year/early subvariant is not independently established; 1906 is the seller claim. No plate/sheet-film adapter is assumed included.

### 94. 7688092221494 — Brass Screw On Viewfinder - Late 1800s - Standard Focal Length 4x5

- Handle: `brass-screw-on-viewfinder-late-1800s-standard-focal-length-4x5`; [public product](https://www.coastalfilmlab.com/products/brass-screw-on-viewfinder-late-1800s-standard-focal-length-4x5).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Antique screw-on finder only; 4x5 describes compatible camera format.
- Unresolved ambiguities: none affecting this classification.

### 95. 7671113285686 — Kodak Brownie Folding No 2 Camera Vintage!

- Handle: `kodak-brownie-folding-no-2-camera-vintage-1`; [public product](https://www.coastalfilmlab.com/products/kodak-brownie-folding-no-2-camera-vintage-1).
- Camera: **true**; categories: `["Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The photographed shutter plate reads No.2 Folding Pocket Brownie. Kodak documents 2.25x3.25 inch (6x9-class) frames on 120 film. Assign Medium Format. Its long folding body is not assigned Compact Camera merely because the historical name says Pocket. It requires camera setup and manually selected settings, rather than contemporary Point and Shoot operation.
- Film/sensor format: 6x9 on 120 film.
- Additional primary evidence: [Canadian Kodak Co., Kodaks and Kodak Supplies (1914), original catalog](https://www.gutenberg.org/files/33183/33183-h/33183-h.htm); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6281862200_itqc.jpg?v=1727404759).
- Metadata conflicts: Tags for 127, 1a, junior and vest pocket describe different cameras; use the photographed No.2 identification.
- Unresolved ambiguities: Exact production subvariant is not certified, but the photographed No.2 identity supports the 120 / medium-format category.

### 96. 7668835876918 — Canon Extension Tube EF25 Close Up Adapter

- Handle: `canon-extension-tube-ef25`; [public product](https://www.coastalfilmlab.com/products/canon-extension-tube-ef25).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Canon EF25 extension tube only.
- Unresolved ambiguities: none affecting this classification.

### 97. 7634841829430 — Carl Zeiss Rollei Mutar 1.7x Teleconverter for Rollei 16 Cameras

- Handle: `carl-zeiss-rollei-mutar-1-7x-teleconverter-for-rollei-16-cameras`; [public product](https://www.coastalfilmlab.com/products/carl-zeiss-rollei-mutar-1-7x-teleconverter-for-rollei-16-cameras).
- Camera: **false**; categories: `[]`; status: `excluded_non_camera`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Rollei 16 teleconverter only; description explicitly excludes a camera.
- Unresolved ambiguities: none affecting this classification.

### 98. 7622474989622 — Sears & Roebuck Tower 21 Toy Vintage Film Camera - Display Piece

- Handle: `sears-roebuck-tower-21-toy-vintage-film-camera-display-piece`; [public product](https://www.coastalfilmlab.com/products/sears-roebuck-tower-21-toy-vintage-film-camera-display-piece).
- Camera: **true**; categories: `["Point and Shoot", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **medium**.
- Evidence/rationale: The photo reads Tower One-Twenty Flash and 110 MM TOWER LENS; the listing description also identifies a medium-format box camera. Assign Medium Format and Point and Shoot for its simple fixed-focus snapshot workflow; do not add Compact Camera to the deep box body.
- Film/sensor format: 120 roll film, likely 6x9 (frame size not verified by an original manual).
- Model identification: Sears Tower One-Twenty Flash box camera (photographed), not a 35mm toy.
- Additional primary evidence: [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6090483586_8bjc.jpg?v=1722296714).
- Metadata conflicts: Title says Tower 21; image says One-Twenty Flash. Tags include 35mm and 6x6; these do not establish its format.
- Unresolved ambiguities: No exact-model primary manual/catalog was located. Inspect film gate to certify 6x9, and confirm that the photograph is the physical unit. Medium Format does not depend on choosing between 6x6 and 6x9.
- Policy boundary: Point and Shoot includes simple fixed-focus snapshot box cameras in this audit; it does not imply a compact body or automatic film advance.

### 99. 7622474956854 — Anscoflex II 620 TLR Medium Format Camera - Display Piece

- Handle: `anscoflex-ii-620-tlr-medium-format-camera-display-piece`; [public product](https://www.coastalfilmlab.com/products/anscoflex-ii-620-tlr-medium-format-camera-display-piece).
- Camera: **true**; categories: `["Point and Shoot", "Medium Format"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Ansco's manual specifies 12 square frames on 620 film. The camera has separate taking and reflex viewing lenses but no focusing-screen focusing system like a Yashica Mat. Assign Medium Format and Point and Shoot for its fixed-focus snapshot workflow. Record TLR-type construction only in evidence; do not label SLR or add a seventh TLR filter.
- Film/sensor format: 6x6 on 620 film.
- Additional primary evidence: [Ansco Anscoflex II original instruction manual](https://www.cameramanuals.org/agfa_ansco/anscoflex_ii.pdf); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/il_fullxfull.6138566729_91lh.jpg?v=1722296698).
- Metadata conflicts: 35mm tag is false; the manual specifies 620 medium-format film.
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Point and Shoot includes simple fixed-focus snapshot box cameras; this assignment does not turn the reflex viewing system into SLR.

### 100. 7570924044342 — Reto - Ultra Wide and Slim 35mm Point and Shoot Film Camera

- Handle: `reto-ultra-wide-and-slim-35mm-point-and-shoot-film-camera`; [public product](https://www.coastalfilmlab.com/products/reto-ultra-wide-and-slim-35mm-point-and-shoot-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm.
- Additional primary evidence: [RETO Project official products](https://retoproject.com/).
- Unresolved ambiguities: none affecting this classification.

### 101. 7546611335222 — Kodak Ektar H35-N Half Frame Film Camera

- Handle: `kodak-ektar-h35-n-half-frame-film-camera`; [public product](https://www.coastalfilmlab.com/products/kodak-ektar-h35-n-half-frame-film-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: The actual item is a small consumer fixed-lens snapshot camera. Its simple focus/exposure workflow supports Point and Shoot, and its compact body independently supports Compact Camera. It has neither reflex viewing nor a manually coupled optical rangefinder.
- Film/sensor format: 35mm half-frame.
- Unresolved ambiguities: none affecting this classification.

### 102. 7546580631606 — Fujifilm Instax Mini 12 Instant Film Camera

- Handle: `fujifilm-instax-mini-12-instant-film-camera`; [public product](https://www.coastalfilmlab.com/products/fujifilm-instax-mini-12-instant-film-camera).
- Camera: **true**; categories: `["Point and Shoot"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: Simple fixed-lens instant snapshot operation supports Point and Shoot. The substantial rigid instant-film body is not a pocket compact. Integral instant film is treated separately from the conventional Medium Format shopping class; neither SLR nor Rangefinder applies.
- Film/sensor format: Instax Mini.
- Additional primary evidence: [Fujifilm Instax Mini 12 official model specifications](https://www.instax-ap.com/ph/cameras/instax-mini-12/); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/3967087021.jpg?v=1717857675).
- Unresolved ambiguities: none affecting this classification.

### 103. 7539087835190 — MiNT InstantFlex TL70 2.0 Instax Mini Instant Film TLR Camera

- Handle: `mint-instantflex-tl70-2-0-instax-mini-instant-film-tlr-camera`; [public product](https://www.coastalfilmlab.com/products/mint-instantflex-tl70-2-0-instax-mini-instant-film-tlr-camera).
- Camera: **true**; categories: `[]`; status: `outside_requested_taxonomy`.
- Availability: available; confidence: **high**.
- Evidence/rationale: MiNT specifies a genuine TLR with separate viewing/taking lenses, manual focus, aperture selection and Instax Mini film. It is not SLR or Rangefinder; the tall deep body is not Compact Camera and the manual photographic workflow is not Point and Shoot. Under the conventional roll-film shopping definition used here, leave categories empty instead of silently treating every large-area instant frame as Medium Format.
- Film/sensor format: Instax Mini, 46x62 mm image on integral instant film.
- Additional primary evidence: [MiNT InstantFlex TL70 official specifications](https://www.mint-camera.jp/tl70/specifications/index.html); [MiNT TL70 official support: film and picture dimensions](https://www.mint-camera.jp/tl70/support.html); [inspected product photograph](https://cdn.shopify.com/s/files/1/0585/6093/8038/files/4202905779.jpg?v=1717608171).
- Unresolved ambiguities: none affecting this classification.
- Policy boundary: Physical Instax image dimensions overlap 645, but Instant and Medium Format are different retail classes in this audit. A deliberate size-only Medium Format policy would also affect all Instax/Polaroid cameras; do not special-case TL70 solely because it looks like a traditional TLR.

### 104. 7268976754742 — Ilford XP2 Super 400 Black & White Disposable 27exp Camera

- Handle: `ilford-xp2-super-400-black-white-disposable-27exp-camera`; [public product](https://www.coastalfilmlab.com/products/ilford-xp2-super-400-black-white-disposable-27exp-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: This listing sells a complete small fixed-focus single-use camera preloaded with 35mm film, not film alone. Assign Point and Shoot and Compact Camera despite Shopify product_type Film.
- Film/sensor format: 35mm.
- Additional primary evidence: [Harman / Ilford XP2 single-use camera original instructions](https://www.ilfordphoto.com/amfile/file/download/file/175/product/510/).
- Unresolved ambiguities: none affecting this classification.

### 105. 7268976361526 — Ilford HP5 400 Black & White Disposable 27exp Camera

- Handle: `ilford-hp5-400-black-white-disposable-27exp-camera`; [public product](https://www.coastalfilmlab.com/products/ilford-hp5-400-black-white-disposable-27exp-camera).
- Camera: **true**; categories: `["Point and Shoot", "Compact Camera"]`; status: `classified`.
- Availability: available; confidence: **high**.
- Evidence/rationale: This listing sells a complete small fixed-focus single-use camera preloaded with 35mm film, not film alone. Assign Point and Shoot and Compact Camera despite Shopify product_type Film.
- Film/sensor format: 35mm.
- Unresolved ambiguities: none affecting this classification.

## External primary-source register

- `pentax110` — [Asahi Pentax Auto 110 original instruction manual (archived scan)](https://vintagecameradigest.com/wp-content/uploads/2022/09/pentax-auto-110-system-opt.pdf): Opening system description identifies a pocketable interchangeable-lens 110 SLR.
- `rollei6008` — [Rollei Rolleiflex 6008 Integral original instruction manual](https://www.cameramanuals.org/rolleiflex/rolleiflex_6008_integral.pdf): Specifications and reflex-mirror operation; 6x6 and 4.5x6 formats, 120/220 film.
- `rolleislx` — [Rollei Rolleiflex SLX original instruction manual](https://www.cameramanuals.org/rolleiflex/rolleiflex_slx.pdf): Facts and figures, printed p.36: 6x6 single-lens reflex system, 120/220 roll film.
- `h2` — [Hasselblad H2 user manual](https://cdn.hasselblad.com/manuals/h2/H2_user_manual.pdf): Printed p.85 identifies an SLR; film-magazine specifications document 6x4.5 on 120/220.
- `gf670` — [Fujifilm GF670 / GF670W original manufacturer brochure](https://rangefinder.ru/manual/2/Fuji_GF670%2C_GF670W_brochure.pdf): 6x7 rangefinder with selectable 6x6, 120/220 film; GF670 folded size 178x109x64 mm, 1000 g.
- `gf670manual` — [Fujifilm GF670 original Japanese instruction manual](https://asset.fujifilm.com/www/jp/files/2019-12/260441dacc0eef43c2a209c2105f2f82/filmcamera_gf670_manual_01.pdf): Manufacturer-hosted original GF670 operating instructions.
- `kodakcontinental` — [Eastman Kodak Continental Kodaks original catalog, Vollenda section](https://www.pacificrimcamera.com/rl/00154/00154.pdf): PDF pp.9-11: small Vollenda with Radionar f/3.5 5 cm, direct-view finder, 16 miniature frames on 127; closed body about 1 inch thick.
- `kodak1914` — [Canadian Kodak Co., Kodaks and Kodak Supplies (1914), original catalog](https://www.gutenberg.org/files/33183/33183-h/33183-h.htm): No.4A: 4.25x6.5 inch pictures on old No.126 roll film. No.2 Folding Pocket Brownie: 2.25x3.25 inch pictures on No.120 film; No.2A is a different 116-film camera.
- `pony` — [Eastman Kodak Pony 135 original instruction manual](https://www.cameramanuals.org/kodak_pdf/kodak_pony_135.pdf): Focus instructions require estimating/measuring distance and setting the lens scale; separate framing viewfinder; manual exposure.
- `bolsey` — [Bolsey B2 original operating instructions](https://www.cameramanuals.org/pdf_files/bolsey_b2.pdf): Manufacturer instructions identify a built-in coupled rangefinder and manual controls.
- `taron` — [Nihon Kosokki Taron 35 Model III original instructions](https://www.cameramanuals.org/pdf_files/taron_iii.pdf): PDF pp.4-5 describe the coupled rangefinder, double-image focusing, manual aperture and shutter settings.
- `anscoflex` — [Ansco Anscoflex II original instruction manual](https://www.cameramanuals.org/agfa_ansco/anscoflex_ii.pdf): 12 square 2.25-inch frames on 620 film; separate reflex viewing lens and taking lens; simple snapshot operation.
- `pronto` — [Polaroid OneStep & Pronto hardbody original user guide (archived reproduction)](https://www.manualslib.com/manual/1408150/Polaroid-Pronto.html): Explicitly separates non-folding Pronto Sonar/Autofocus from folding SX-70 SLR; SX-70 film and automatic sonar focusing.
- `polaroid` — [Polaroid official archive of original camera user manuals](https://support.polaroid.com/hc/en-us/articles/115012460048-Where-can-I-find-a-user-manual-for-my-Polaroid-camera): Distinct 600, Impulse, Barbie and SX-70 families; original instructions available by camera family.
- `mint` — [MiNT InstantFlex TL70 official specifications](https://www.mint-camera.jp/tl70/specifications/index.html): Twin-lens reflex instant camera, manual focus, selectable aperture; 141x102x80.2 mm body; Instax Mini film.
- `mintsize` — [MiNT TL70 official support: film and picture dimensions](https://www.mint-camera.jp/tl70/support.html): Instax Mini picture area 62x46 mm; film sheet 86x54 mm.
- `xpro1` — [Fujifilm X-Pro1 original owner manual](https://dl.fujifilm-x.com/support/manual/x/fujifilm_xpro1_manual_en.pdf): Interchangeable X-mount lenses, hybrid optical/electronic viewfinder and sensor-based focusing; body 139.5x81.8x42.5 mm.
- `m50` — [Canon EOS M50 Mark II original specifications](https://cam.start.canon/fa/C007/manual/html/UG-11_Reference_0090.html): Digital non-reflex interchangeable-lens camera, EF-M mount and electronic viewfinder.
- `m50compact` — [Canon Camera Museum: EOS M50 Mark II](https://global.canon/en/c-museum/product/dslr897.html): Canon explicitly places this mirrorless model under Compact System Cameras.
- `epl2` — [Olympus E-PL2 original instruction manual](https://learnandsupport.getolympus.com/sites/default/files/media/files/2018/04/E-PL2_Instruction_Manual_EN.pdf): Micro Four Thirds interchangeable lenses and live-view operation; printed p.113 dimensions 115.4x72.7x42 mm.
- `sony` — [Sony HDR-CX405 official specifications](https://www.sony.com/electronics/support/camcorders-interchangeable-lens-camcorders/hdr-cx405/specifications): Dedicated Handycam camcorder; no SLR mirror or coupled optical rangefinder.
- `ls75` — [Panasonic DMC-LS75 / LS70 / LS60 original operating instructions](https://help.na.panasonic.com/wp-content/uploads/2023/02/DMCLS60_LS70_LS75_VQT1C63-1_ENG.pdf): Small fixed-zoom digital still camera with simple automatic mode; LS75 is 7.2 MP and 3x optical zoom, unlike the copied store specifications.
- `reto` — [RETO Project official products](https://retoproject.com/): Ultra Wide & Slim is a pocket camera; PANO is a separate compact model with panorama selector and flash.
- `retopano` — [RETO PANO official model specifications](https://retoproject.com/products/reto-pano-35mm-film-camera): 35mm fixed-exposure snapshot camera, 22mm lens, flash, panorama selector, body 110x62x32 mm.
- `instax` — [Fujifilm Instax Mini 12 official model specifications](https://www.instax-ap.com/ph/cameras/instax-mini-12/): Instax Mini instant camera with automatic exposure and flash; body 104x122x66.6 mm.
- `ilford` — [Harman / Ilford XP2 single-use camera original instructions](https://www.ilfordphoto.com/amfile/file/download/file/175/product/510/): A complete single-use camera, rather than a film-only SKU.
- `g7x` — [Canon Camera Museum: PowerShot G7 X Mark III](https://global.canon/en/c-museum/product/dcc884.html): PowerShot compact digital still camera; fixed zoom lens.
