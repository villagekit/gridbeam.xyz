# Rebrand copy audit — gridkit.nz → gridbeam.xyz

Source: every copy-bearing surface in `node-modules/apps/gridkit/`.
Destination: the new top-level Next.js site at this repo's root.

## Legend

- **KEEP** — copy is already framed correctly, port verbatim
- **TWEAK** — minor rewording to drop startup framing, mostly the same shape
- **REWRITE** — needs full new copy
- **DROP** — startup-specific, no replacement on the new site

## Conventions for the new site

- "Grid Kit" → mostly **"grid beam"** (the system) or **the system / the kit / a grid-beam build**. Keep "Grid Kit" only when referring to the historical NZ company in stories that explicitly cover its history.
- "We" / "us" / "our team" / "we sell" → **"the community"**, **"makers"**, **"you can"**, **"anyone can"**. The new site is community/educational, not first-person.
- Pricing / shipping / order language → **"find a supplier"** (link to `/suppliers`), **"build your own"** (link to spec or DIY guides).
- "Made in NZ" → drop entirely or generalise to "open construction".
- "Our store" / "Buy a Grid Kit" → **"Browse designs"** (`/designs`) or **"Find a supplier"** (`/suppliers`).
- "Order from us" / "Add to cart" → drop (no e-commerce). Link out to suppliers.
- "Grid Kit is part of a wider vision (villagekit.com)" → drop the corporate framing; if needed, keep a small footer note "Maintained by Village Kit" with a link.

## Surface-by-surface table

| Surface | File | Action | Notes / proposed replacement |
|---------|------|--------|------------------------------|
| **Homepage hero — heading** | `pages/index.tsx:87` "Anyone can be a maker." | **KEEP** | Already community-framed. Carries over verbatim. |
| **Homepage hero — subhead 1** | `pages/index.tsx:90-96` "Start building custom furniture, no experience needed." | **TWEAK** | "Custom furniture" frames grid beam too narrowly — Phil Jergenson built bicycles, vehicles, trailers. Suggest: "Start building real things — furniture, shelving, workbenches — no experience needed." |
| **Homepage hero — subhead 2** | `pages/index.tsx:97-99` "Eco-friendly, adaptable, and fun for the whole family." | **KEEP** | Universal claim. |
| **Homepage hero — CTA** | `pages/index.tsx:101-103` "Buy a Grid Kit" → `/store/starter_kit` | **REWRITE** | "Browse designs" → `/designs`. (Default; flagged for Mikey if a supplier-first CTA is preferred at launch.) |
| **Homepage hero — image carousel** | 4 cloudinary images at `gridkit.nz/made-with-grid-kit/...` | **TWEAK** | Re-host (Stream 04 task 02). Captions stay; alt text already describes builds, not company. |
| **Homepage testimonials** | `pages/index.tsx:152-172` (Rhona, Mix, Alexander) | **TWEAK** | Replace "Grid Kit is …" with "Grid beam is …" or quote the system; verify quotes are reusable in non-commercial framing — the speakers were quoted about a specific kit they bought, so re-attribution may be needed. Decision: ask Mikey. Default: keep with substitution and caveat in a short editor's note. |
| **Homepage typing-design section — heading** | `pages/index.tsx:412-428` "Build a [design]" | **KEEP** | Universal. |
| **Homepage typing-design — body** | `pages/index.tsx:430-433` "Imagine, build, and rebuild — Grid Kit evolves with your life. From practical furniture to fun family projects, our designs are simple to make and can fit any space." | **TWEAK** | "Grid Kit evolves" → "Your build evolves with your life." Drop "our designs" → "the designs in this catalog". |
| **Homepage typing-design — CTA** | `pages/index.tsx:435-437` "Explore our design catalogue" → `/designs` | **TWEAK** | "Browse the design catalog" — drops "our". |
| **Homepage "One modular kit" — heading** | `pages/index.tsx:186` "One modular kit, unlimited creations" | **REWRITE** | "One simple grid, unlimited builds." (avoid "kit" as a brand word). |
| **Homepage "One modular kit" — body** | `pages/index.tsx:188-192` "Grid Kit uses a 40mm grid to make building easy for beginners. Everything just fits together using only simple tools. Cut to size with a hand saw, connect beams and panels with fasteners and a hex key." | **TWEAK** | "Grid Kit uses" → "Grid beam uses". Rest is purely descriptive — keep. |
| **Homepage "One modular kit" — CTA** | `pages/index.tsx:194-196` "Learn more" → `/about` | **KEEP** | |
| **Homepage "How to get started" — heading** | `pages/index.tsx:215` | **KEEP** | |
| **Homepage "How to get started" — list** | `pages/index.tsx:217-274` (6 list items) | **REWRITE** | Store-centric in the legacy ("Buy from our store", "we'll ship you flat-pack boxes"). Proposed new copy + icon mapping below: <br>1. _(TfiThought)_ "Browse [designs](/designs), or imagine your own." <br>2. _(TfiPencilAlt)_ "See how many beams, panels, and fasteners your build needs." <br>3. _(BsFillBox2HeartFill)_ "[Find a supplier](/suppliers) — or mill your own beams from stock material." <br>4. _(GiHandSaw)_ "Cut your beams and panels to size." <br>5. _(BiHappyHeartEyes)_ "Have fun assembling your build." <br>6. _(FaSeedling)_ "[Share what you made](https://discuss.villagekit.com) with the community." <br>Drops the "* In the future we will offer cut-to-size beams" footnote — that's a supplier promise, not the site's. |
| **Homepage "How to get started" — CTA** | `pages/index.tsx:276-283` "Buy a Grid Kit" → `/store/starter_kit` | **REWRITE** | → "Find a supplier" → `/suppliers`. |
| **Homepage "Our stories" — heading** | `pages/index.tsx:289` | **TWEAK** | Drop "Our" → "Stories". |
| **Homepage "Our stories" — body** | `pages/index.tsx:291-294` "Discover all things Grid Kit in our collection of guides, newsletters, and inspiration." | **REWRITE** | "Guides, newsletters, and inspiration from people building with grid beam." |
| **Homepage "Our stories" — CTA** | `pages/index.tsx:306-313` "See all stories" | **KEEP** | |
| **Homepage "A future without waste"** | `pages/index.tsx:320-325` heading + "Grid Kit helps reduce waste … Made from untreated New Zealand old pine, our grid beams …" | **REWRITE** | Heading "A future without waste" — keep. Body: drop NZ/pine — that's supplier-specific. New body: "Grid beam is built to be reused. The same beams can become a desk, then a shelf, then a workbench — instead of ending up in a landfill." |
| **Homepage "A future without waste" image** | `gridkit.nz/douglas-fir-forest_etzvle` | **DROP** or **TWEAK** | NZ-specific framing. Either drop or retitle as "A renewable resource" with neutral wood imagery. |
| **Homepage "A place to share ideas" — heading** | `pages/index.tsx:343` | **KEEP** | |
| **Homepage "A place to share ideas" — body** | `pages/index.tsx:345-353` "Grid Kit is part of a wider vision … community space …" | **TWEAK** | Drop the "wider vision" link to villagekit.com. New: "Builders share their projects on the community forum — designs, modifications, photos. Anyone can join." |
| **Homepage "A place to share ideas" — CTA** | `pages/index.tsx:355-357` "Join our community" → `discuss.villagekit.com` | **TWEAK** | Verify the discuss.villagekit.com forum still exists and is open to gridbeam.xyz visitors. If not, link to a GitHub Discussions or similar. |
| **About page — title** | `pages/about.tsx:14` "What is Grid Kit?" | **REWRITE** | "What is grid beam?" |
| **About page — body 1** | `pages/about.tsx:18-23` "Grid Kit is a modular system based on a 40mm grid." | **REWRITE** | "Grid beam is a modular construction system based on a 40 mm grid." |
| **About page — grid image** | `gridkit.nz/grid_yvn1om` | **KEEP** | Re-host; alt text is fine. |
| **About page — body 2** | `pages/about.tsx:44-50` "The primary building components are beams, panels, and fasteners." | **KEEP** | |
| **About page — beams + body** | `pages/about.tsx:52-66` body about beam profile (40x40, 8mm holes 40mm apart) | **KEEP** | Pure spec. Verify: 8 mm holes, 40 mm spacing — flagged for fact-check during page build (Stream 01 task 04). |
| **About page — panels + body** | `pages/about.tsx:68-82` "Plywood panels have holes drilled in a 40mm grid." | **KEEP** | |
| **About page — fasteners + body** | `pages/about.tsx:84-98` "Hex-nut fasteners bolt together beams and panels …" | **KEEP** | |
| **About page — tri-joint + body** | `pages/about.tsx:100-115` "When three beams are joined with three connectors a strong connection is created." | **KEEP** | |
| **About page — overall** | | **REWRITE** | Per Stream 04 task 04, the About page expands to include grid history (Phil Jergenson, Box Beam, Open Structures) and a "what next" CTA. The legacy About is concept-only — solid foundation, but not enough. |
| **FAQ — Product / "What is Grid Kit?"** | `pages/faq.tsx:31-46` | **REWRITE** | Q: "What is grid beam?" A: "Grid beam is a modular construction system based on a 40 mm grid of identical beams with regularly-spaced holes. Anyone can mill or buy beams, then assemble them with bolts into furniture or structures. Learn more on the about page." |
| **FAQ — Product / "Do I need any special tools…"** | `pages/faq.tsx:48-58` | **TWEAK** | "Grid Kit" → "grid beam". Rest is universal. |
| **FAQ — Product / "Where are your kits made?"** | `pages/faq.tsx:60-68` | **DROP** | Startup-specific. |
| **FAQ — Product / "What materials do you use?"** | `pages/faq.tsx:70-77` | **REWRITE** | New Q: "What materials are grid beams made from?" New A: "Most commonly aluminium extrusion or wood. Some suppliers use recycled materials. The system is material-agnostic as long as the 40 mm hole spacing is honoured." |
| **FAQ — Product / "Why does it cost so much?"** | `pages/faq.tsx:79-89` | **DROP** | Pricing is supplier-dependent now. |
| **FAQ — Product / "Are the materials durable?"** | `pages/faq.tsx:91-98` | **TWEAK** | Generalise: "Aluminium grid beams are extremely durable. Wood beams (pine, hardwood) are durable indoors but benefit from a finish if used outdoors. Durability ultimately depends on your supplier and material choice." |
| **FAQ — Product / "Is the wood treated?"** | `pages/faq.tsx:100-107` | **DROP** | Wood-and-supplier-specific. (Subsumed by the new "Are the materials durable?" answer above.) |
| **FAQ — Product / "Can you paint or stain the wood?"** | `pages/faq.tsx:109-116` | **TWEAK** | Reframe as "Can I finish my beams?" → "Yes — untreated wood beams take paint, stain, or oil well. Aluminium beams can be powder-coated. Check with your supplier on what finish they recommend or pre-apply." |
| **FAQ — Product / "Is the wood suitable for outdoors?"** | `pages/faq.tsx:118-125` | **DROP** | Subsumed by the new "Are the materials durable?" answer. |
| **FAQ — Product / "How do I use panels with Grid Kit?"** | `pages/faq.tsx:127-134` | **TWEAK** | "Grid Kit structure" → "your grid beam build". |
| **FAQ — Product / "What add-ons are compatible…"** | `pages/faq.tsx:136-147` | **TWEAK** | Drop "We plan to offer …" first paragraph; keep the link to `villagekit/replicad-models` (open-source 3D printable add-ons). |
| **FAQ — Sustainability / "What can I make…"** | `pages/faq.tsx:151-164` | **TWEAK** | "Grid Kit is designed to adapt" → "Grid beam adapts". The Phil Jergenson reference (already cites gridbeam.xyz!) is gold — keep, but update to "the original inventor of grid beam, Phil Jergenson, made bicycles, electric vehicles, trailers, and more." |
| **FAQ — Sustainability / "What do you mean by modular?"** | `pages/faq.tsx:166-171` | **TWEAK** | "every part in the Grid Kit system" → "every part in the grid-beam system". LEGO analogy stays. |
| **FAQ — Sustainability / "Can I recycle or repurpose…"** | `pages/faq.tsx:173-181` | **TWEAK** | "Our kits are built" → "Grid beam parts are designed". |
| **FAQ — Sustainability / "What makes your product sustainable?"** | `pages/faq.tsx:183-209` | **TWEAK** | EPA + Australia stats are useful and reusable. Replace "Grid Kit is designed" → "Grid beam is designed". |
| **FAQ — Orders (entire category, 6 questions)** | `pages/faq.tsx:211-265` | **DROP** | All e-commerce. No replacement. |
| **FAQ — Returns & Support (entire category, 3 questions)** | `pages/faq.tsx:266-303` | **DROP** | All e-commerce. The "How do I contact support?" question may become a single "How do I get help?" → "Ask on the community forum, or open an issue on GitHub" entry under a new General category. |
| **FAQ — Other / "Bulk or business orders?"** | `pages/faq.tsx:305-316` | **DROP** | E-commerce. |
| **FAQ — Other / "I have an idea for a custom design"** | `pages/faq.tsx:318-326` | **REWRITE** | New Q: "How do I author a custom design?" New A: "Designs are TypeScript files that use the open-source [grid-kit engine](https://github.com/villagekit/gridkit). See the [products repo](https://github.com/villagekit/gridkit-products) for examples, fork it, and submit a pull request to share your design." |
| **FAQ — page footer** | `pages/faq.tsx:374-383` "If your question isn't answered, send us an email or ask on the community forum" | **TWEAK** | Drop email path (no support inbox) — leave just "ask on the community forum or open a GitHub issue". |
| **Tools and resources page — title** | `pages/tools-and-resources.tsx:25` "Tools and resources" | **KEEP** | |
| **Tools and resources page — cards** | `pages/tools-and-resources.tsx:11-19` "Cutting planner" card | **KEEP** | The cutting planner is being ported; description stays accurate. |
| **Cutting planner page — title + description** | `pages/tools/cutting-planner.tsx:9-11` "Cutting planner" / "Use this tool to plan how to cut your beams into desired lengths." | **KEEP** | Both lines universal; the applet is being ported in Stream 01 task 07. |
| **Stories listing — title** | `pages/stories.tsx:21` "Stories" | **KEEP** | |
| **Stories listing — description** | `pages/stories.tsx:18-19` "Discover all things Grid Kit in our collection of articles, guides, and newsletters." | **REWRITE** | "Articles, guides, and newsletters about building with grid beam." |
| **Story / 2021 Winter Newsletter** | `pages/stories/2021-winter-newsletter.mdx` (frontmatter title, description, body) | **KEEP** as historical | Keep verbatim; this is the archived voice of the Village Kit team in 2021. Add a small editor's banner: "Originally published 2021 on gridkit.nz." |
| **Story / 2022 Newsletter** | `pages/stories/2022-newsletter.mdx` | **KEEP** as historical | Same treatment. |
| **Story / Building with Grid Kit** | `pages/stories/building-with-grid-kit.mdx` | **KEEP** as historical | Same treatment as the newsletters — keep verbatim with an editor's banner ("Originally published 2021 on gridkit.nz; this guide describes the original Grid Kit but the steps generalise to any grid-beam build."). Cheaper than rewriting and consistent with the other 2021 content. Retitle in the listing only if needed. |
| **Story / How to Cut Grid Beams** | `pages/stories/how-to-cut-grid-beams.mdx` | **KEEP** | "Grid Beams" is correct here (the noun for the part); content is universal. |
| **Story / How to Install Furniture Bolts** | `pages/stories/how-to-furniture-bolts.mdx` | **KEEP** | Universal hardware tutorial. |
| **Story / What's a Grid Unit** | `pages/stories/whats-a-grid-unit.mdx` | **KEEP** | Universal explainer of GU as a unit. |
| **Subscribe page** | `pages/subscribe.tsx` | **REWRITE** | Title "Subscribe" stays. Body must drop "Grid Kit" branding from the applet — the new subscribe page is for gridbeam.xyz updates. Also: this is the entry point for Buttondown integration (Stream 01 task 09). |
| **Contact page — title** | `applet-contact` "Contact us" | **KEEP** | |
| **Contact page — card** | `applet-contact` "Email us" / "Send us a message and we will get back to you as soon as we can." | **TWEAK** | "we will get back to you" → "the maintainer will get back to you" (this is gridbeam.xyz, not a company). The contactEmail prop changes to mikey@mikey.nz. |
| **Legal / Cookie Policy** | `pages/legal/cookie-policy.tsx` (uses `applet-legal` MDX with `websiteName="Grid Kit"`) | **TWEAK** | `websiteName="gridbeam.xyz"`. Re-read the underlying MDX before shipping — the content is generic but may reference cookies the new site doesn't set (e.g. cart cookies). |
| **Legal / Privacy Policy** | `pages/legal/privacy-policy.tsx` | **TWEAK** | Same — `websiteName` change, audit for store-specific clauses (payment data, shipping addresses). The new site has no e-commerce, so privacy surface area shrinks. |
| **Legal / Return Policy** | `pages/legal/return-policy.tsx` | **DROP** | No commerce → no returns. |
| **Legal index** | `pages/legal.tsx` | **TWEAK** | Drop the return-policy link (`hasReturnPolicy: false`). |
| **Footer — "Our product" section** | `components/footer.tsx:23-29` (About, FAQ, Tools and resources) | **KEEP** | All three pages survive. |
| **Footer — "Our policies" section** | `components/footer.tsx:31-38` (4 links) | **TWEAK** | Drop Return Policy. Rename "Our policies" → "Legal". |
| **Footer — "Our company" section** | `components/footer.tsx:40-57` (About us @ villagekit.com, Roadmap, Community, Newsletter, Contact) | **REWRITE** | Drop "Our company" framing entirely. New section: "Community" with Forum (or GitHub Discussions), Newsletter, Contact, GitHub repo. Drop the villagekit.com About-us / Roadmap links. |
| **Footer — social links** | `components/footer.tsx:60-121` (9 social accounts under @madewithgridkit) | **DROP** mostly | These are the dormant @madewithgridkit accounts. Decision: only keep the ones we're actively maintaining (likely none — confirm with Mikey). Default: drop the lot, keep only GitHub + the Mastodon account if it's still active. |
| **Banner above header** | `applets-brand` Banner (currently shows "Closing-down sale" or similar) | **DROP** | Startup-specific. The new site has no banner unless we add one for newsletters / events. |
| **Header brand** | `MainLayout HeaderBrand={Brand}` | **REWRITE** | New brand: "gridbeam.xyz" wordmark or the Grid Kit logo + new wordmark. Brand decision flagged separately. |
| **Header action** | `MainLayout HeaderAction={CartButton}` | **DROP** | No cart. Replace with nothing, or with a "Find a supplier" link. |
| **Nav / top nav** | `nav.ts` (Designs, Store, Stories) | **REWRITE** | New top nav: Designs, Suppliers, Stories. (About + FAQ + Tools live in footer or under a "More" menu — Stream 01 task 02 settles this.) |
| **Page titles / SEO** | every `<NextSeo title="…">` instance | **TWEAK** | Per-page titles ("About", "FAQ", "Stories", "Designs") stay; site title changes via `_app.tsx` (next row). |
| **Site-level SEO defaults** | `pages/_app.tsx:46-72` `DefaultSeo` (titleTemplate, defaultTitle, description, openGraph: locale, site_name, url, images, videos; twitter: site) | **REWRITE** | `titleTemplate: "%s · gridbeam.xyz"`, `defaultTitle: "gridbeam.xyz"`, `description: "An open educational site about grid beam — a 40 mm modular construction system for furniture, structures, and more."`, `openGraph.locale: "en"` (drop `en_NZ`), `site_name: "gridbeam.xyz"`, `url: "https://gridbeam.xyz"`. OG image + video need new gridbeam.xyz-hosted URLs (Stream 04 task 02). Twitter `site` → drop or replace with whatever account stays active (see Mikey decision item 2). |
| **Designs catalog index — header / title** | `pages/designs/index.tsx:69` `<NextSeo title="Designs">` | **KEEP** | Title is fine. Stream 01 task 06 owns the body. |
| **Designs catalog — filter labels** | `pages/designs/index.tsx:25-41` (15 category labels: Bedroom, Cats, Desk, Dining, Garage, Kids, Kitchen, Lounge, Office, Seating, Storage, Tables, Utility, Workbench) | **KEEP** | Universal furniture/use categories. |
| **Design detail page — Product Care** | `pages/designs/[id].tsx:135-136` "Product Care" / "Beams and panels can be safely wiped clean." | **KEEP** | Content-agnostic; works for any supplier/material. (Optional: rename "Product Care" → "Care") |
| **Design detail page — "Requires X beams from Y Starter Kits"** | `pages/designs/[id].tsx:186-188` | **REWRITE** | "Starter Kit" is supplier-specific (the original gridkit.nz SKU). New copy should describe a build's bill of materials in supplier-neutral terms, e.g. "Requires N beams cut from M lengths of 60gu stock." Stream 01 task 06 owns the implementation. |
| **Design detail page — "Requires Nx 60gu …"** | `pages/designs/[id].tsx:225` | **KEEP** | Already supplier-neutral. |
| **Design detail page — apology / inconvenience** | `pages/designs/[id].tsx:236` "We apologize for the inconvenience. Please …" | **REWRITE** | Drops the "we" framing. Suggest: "This design's parts can't currently be packed into the available stock sizes. Try adjusting the parameters, or open an issue if you think this is a bug." (verify the actual condition this displays in before finalising — likely a fallback when the cutting planner can't pack a build.) |
| **Subscribe page** | `pages/subscribe.tsx` | **REWRITE** | Title "Subscribe" stays. Body must drop "Grid Kit" branding from the applet — the new subscribe page is for gridbeam.xyz updates. Also: this is the entry point for Buttondown integration (Stream 01 task 09). |
| **Cart page** | `pages/cart.tsx` | **DROP** | Whole page — no e-commerce. Goes away with Stream 05 (legacy archive); the new site never builds it. |
| **Order-complete page** | `pages/order-complete.tsx` | **DROP** | Same. |
| **Store index page** | `pages/store/index.tsx` | **DROP** | Replaced by `/suppliers` (Stream 01 task 08), which is a different page mechanically — links out instead of selling. |
| **Store product page** | `pages/store/[id].tsx` | **DROP** | Same — supplier links replace product detail pages. |
| **Cart-related context, API, components** | `context/cart.ts`, `components/cart/*`, `pages/api/checkout.ts`, `pages/api/order.ts` etc. | **DROP** | Out of scope for the new site — confirmed by CLAUDE.md "no e-commerce". Listed here so a contributor doing the homepage rewrite knows the cart icons/buttons in the legacy header have nothing to migrate. Retired with `node-modules` in Stream 05 task 01. |

## Things flagged for Mikey

Edit: See decisions below.

1. **Testimonials.** The Rhona, Mix, Alexander quotes were given about a specific bought kit. Are they comfortable being re-quoted in an educational/community context? If not, drop them.
  - Yes re-quote in the new context for now, we can always change later.
2. **Active social accounts — partly answered.** `madewithgridkit.com` is DNS-dead and `sunrise.social/gridkit` (Mastodon) returns 404. Other 8 accounts under `@madewithgridkit` (Bluesky, Instagram, X, Facebook, Threads, YouTube, TikTok, GitHub) unverified. Default plan strengthens to "drop all" unless Mikey confirms specific ones are actively posted to. See `./url-status.md`.
  - Point to @villagekit social media for now
  - Mastodon: https://sunrise.social/villagekit
  - https://instagram.com/village_kit
  - https://x.com/villagekit
  - https://facebook.com/villagekit
  - https://www.youtube.com/@villagekit
  - https://www.github.com/villagekit
3. **Community forum — TLS cert expired.** `discuss.villagekit.com` server is up but its TLS cert has lapsed (browsers will warn). Cheapest fix: renew via Let's Encrypt. Alternatively, point gridbeam.xyz copy at GitHub Discussions for `villagekit/gridkit-products`. Decision: renew or migrate? See `./url-status.md`.
  - I fixed this.
4. **Banner.** Should the new site launch with a "Welcome / new home for gridbeam.xyz" banner, or just go quiet?
  - Quiet, remove the banner code altogether.
5. **Logo + wordmark.** Two questions: (a) Reuse the existing Grid Kit logo, or commission a new mark? (b) Show a wordmark only, logo only, or both? Resolve together.
  - Re-use the existing Grid Kit logo.
6. **Hero CTA.** Default proposal is "Browse designs" → `/designs`. Alternative: "Find a supplier" → `/suppliers`. Which sets the right first impression?
  - Browse designs
7. **`gridkit.nz` ownership.** The domain currently serves a v0.app-generated Next.js page (not the legacy Vercel site). Either Mikey is experimenting elsewhere or the DNS got repointed. Worth confirming before any cross-linking. See `./url-status.md`.
  - gridkit.nz is now run by my ex business partner, not me. the split was amicable, so they can be referred to as a supplier.

## Things to verify (no Mikey input needed)

- **Sustainability stats** (EPA + Australia furniture-waste numbers in `pages/faq.tsx:185-204`). Re-fetch the EPA page and the Handkrafted blog at the time the FAQ rewrite ships and update the numbers. Audit can't pre-do this without a build artefact rotting.
- **Community forum existence.** HEAD `https://discuss.villagekit.com` before assuming it's gone. If 200, leave the links alone (subject to decision item 3 above).
- **Spec facts.** See "Spec facts to verify" section below.

## Spec facts to verify before publishing About + Designs pages

- Beam profile: 40 × 40 mm? (Phil Jergenson's original was different — check.)
- Hole diameter: 8 mm? (Some grid-beam variants use M6 or M8 holes, ~6 / 8 mm.)
- Hole spacing: 40 mm centres? Confirmed in legacy About copy but cross-check with `parts/gridbeam` source.
- Common bolt sizes: M5, M6? Confirm from the fastener schemas.

Cross-check authority: `gridkit/parts/gridbeam/src/schemas.ts` (or similar) and `gridkit/parts/fastener/src/variants.ts`.

## Outputs that depend on this audit

- Stream 01 task 03 (homepage) — uses every "Homepage …" row.
- Stream 01 task 04 (educational pages) — uses About + FAQ rows.
- Stream 01 task 05 (stories) — uses Story rows (decides KEEP-as-historical vs. rewrite).
- Stream 01 task 08 (suppliers) — replaces all DROP'd e-commerce surfaces.
- Stream 01 task 09 (contact + subscribe) — uses Contact + Subscribe rows.
- Stream 01 task 10 (legal) — uses Legal rows.
- Stream 01 task 02 (layout/nav/footer) — uses Footer + Nav + Header rows.
- Stream 04 task 04 (About / explainer rewrite) — extends the About rows.
- Stream 04 task 05 (suppliers content) — replaces the DROP'd commerce content.

## Status

First pass complete on 2026-04-30 by walking every page in `node-modules/apps/gridkit/`. Stream 01 page tasks should pull rows from this table and propose final copy in PRs that touch each page. As decisions resolve (testimonials, socials, forum, banner, logo, stats), update this doc rather than spreading them across multiple task files.
