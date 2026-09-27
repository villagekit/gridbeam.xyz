---
title: "Designs index: the operator's verdicts"
status: todo
tags:
  - attended
parent: 337e35d86920
derived_from: f901cf9f724d
---
The three differences on `/designs` that the designs index record `f901cf9f724d` cannot close by rule: one `regression` code item whose fix is a hosting change, and two `open` code items the split filed, rule 4 candidates where the upgrade changed a shape. Decision `40abdb2f222a`: the record's split minted this plan beside it, so that a verdict given before the catalog re-port runs shapes it; an item a slice's review files later for the operator is added to the list below by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it. Two accessibility items whose M1 notes offered a rule 5 sanction (`872425d0807d`, `8fae5fd0087e`) are not here: with no verdict the rule answers them, the catalog re-port ships legacy's form and closes each with a note the operator may overturn by a note and a new state.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the designs index record (`--parent 337e35d86920`, `derived_from f901cf9f724d`, tagged `worker:<model>`; a fix in `../ui` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`). No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[abb539b3555e]] (`regression`, code, changed): the designs are read from a committed generated module (`scripts/generate-designs-data.mjs`, `app/_lib/designs-data.generated.ts`) where legacy's `getStaticProps` walked `products/` on disk at build. The data slice `Designs library re-ported from the legacy designs package` gives the module legacy's shape (the id from the product name, `{ code, meta }`, no sort, the image object) and leaves the module itself here. The disk read is not a site-side change alone: `open-next.config.ts` configures no incremental cache, OpenNext's default is `dummy` (`node_modules/@opennextjs/cloudflare/dist/api/config.js:45`, whose `get` throws), so a prerendered page renders again on the Worker on every request and a build-time `readdir` there fails (the generator's header records the incident); serving the prerendered pages from the build needs `staticAssetsIncrementalCache` in `open-next.config.ts` (`dist/api/overrides/incremental-cache/static-assets-incremental-cache.js:11`, "ONLY want to serve prerendered data"), a hosting change under `91cbeac8a3fd`. Sanctioned under rule 5 as the hosting decision's consequence, or `regression` kept with a slice that reads `products/` at build and configures the static-assets cache (the release milestone `a4df2bf79395` being where the hosting is exercised)? The home's [[272613135119]] on the home's verdicts plan `8bb4a4380264` is judged with this one: its sort and nullable image go with the data slice, its module part is this item's.
- The two-file page item filed at the split (`open`, code, changed; its id in the record's Scope): the designs page is two files, the server `app/designs/page.tsx` (the `metadata`, the design index) and the client `app/designs/DesignsPage.tsx` (legacy's page body line for line), where legacy's `pages/designs/index.tsx` was one, because the app router exports `metadata` from a server component only and the page's `useMemo` needs a client one. Sanctioned under rule 4, the same answer as `091a47cb93e7` on `/` and `e3a2d4d66691` on `/stories`, or is another shape wanted?
- The `unoptimized` item filed at the split (`open`, code, changed; its id in the record's Scope): the 37 card images are `unoptimized`, served whole from `/_next/static/media/` with no `srcset` and no `sizes`, because a `local` ui `Image` at 1.2.0 falls through to the site's Cloudinary `loaderFile` (`6c566c2715e0`), where legacy's went through Next's optimizer with a `sizes` attribute from its `sizes` object; the twin of `a704be5b8765` on `/`, judged with it. Sanctioned under rule 4 as the global loader's consequence, or a regression whose fix is a loader for local images in `../ui` or a `loaderFile` that passes `/_next/static/media/` paths through?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=/designs --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-27: From the designs index record's finish (plan [[f901cf9f724d]]): the ids of the two items the body names by description, so the finish of this plan can check them by id: the two-file page item is [[30847e0e3701]] and the unoptimized item is [[2a0840f8087b]] (both open, code, changed, /designs). Added by this note, beside the three in the body: [[105cb9410b89]] (open, interaction, changed, /designs): the list message under the sparkle line is legacy's list.tsx lines (the hideComingSoon toggle on every change of items, the 0.5 s delayed fade-in), which under motion 12 unmount the message and fade a new one in after 500 ms on every filter, sort and search change, where the live legacy site under framer-motion 7 never remounts it (the catalog re-port's probe at 1280, audit/designs/probe2.txt); the library change is the sanctioned [[1504573f72ba]]. Filed by the catalog re-port [[8417428fd88a]] with no owner, the question the operator's: sanctioned under rule 4 with legacy's source intent (the replayed fade) as the baseline, or moved to regression with a slice that keeps the message mounted across a change of items, the live site's behavior being the baseline, a site-side line where the port keeps legacy's verbatim? Every item on this plan is on /designs, so the Done when line's check reads the route whole.

- 2026-09-28: The scripts this plan cites as `scripts/*.mjs` are now `scripts/*.ts` (plan d04ec0d664be), each renamed with the same behavior and typed under strict; read the paths and line numbers against the `.ts` files.
