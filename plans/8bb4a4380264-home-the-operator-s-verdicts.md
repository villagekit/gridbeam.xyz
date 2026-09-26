---
title: "Home: the operator's verdicts"
status: todo
parent: 337e35d86920
derived_from: fd9a92bd8abd
tags:
  - attended
---
The six differences on `/` that the home record `fd9a92bd8abd` could not close by rule: five `open` items an agent may not judge (rule 4 candidates where the upgrade changed a shape: the two-file page, the step icons' hiding attribute and their alignment, the design images' optimizer, the hero's fetch priority) and one `regression` whose fix is the designs library's, judged beside its twin on `/designs`. Decision `40abdb2f222a`: the record finished with these handed on here; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the home record (`--parent 337e35d86920`, `derived_from fd9a92bd8abd`, tagged `worker:<model>`; a fix in `../ui` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`). No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[091a47cb93e7]] (`open`, code, changed): the home page is two files, the server `app/page.tsx` (the `metadata`, the design index, the two stories' MDX metadata) and the client `app/HomePage.tsx` (legacy's page body line for line), where legacy's `pages/index.tsx` was one. Sanctioned under rule 4, since the app router exports `metadata` from a server component only and the page's hooks need a client one, the question `1eddda919812` asks for the adapter, or is another shape of the split wanted?
- [[1ea1f9eda079]] (`open`, accessibility, changed): the six step icons carry `aria-hidden="true"` from Chakra v3's `Icon` where legacy's `ListIcon` wrote `role="presentation"`; the accessibility tree is identical on both sides. Sanctioned under rule 4, the mechanism of `89301ca8a1fc` on the shell, or `role="presentation"` written on each `Icon` beside v3's attribute, as `../ui`'s `BlockSection` does?
- [[df46087faa2d]] (`open`, visual, changed): the step icons sit `inline-block` at `vertical-align: middle` (Chakra v3's list and icon recipes) where legacy's were `inline` at `text-bottom`, so each icon sits a few pixels higher against its line. Does the rule 4 sanction of `List.Indicator` for `ListIcon` (`3d21d3543886`) carry the recipe's alignment with it, or is the fix `verticalAlign="text-bottom"` on each indicator on the page, or a list recipe in `../ui`?
- [[a704be5b8765]] (`open`, code, changed): the design carousel's image and the hidden next-design image are `unoptimized`, served whole from `/_next/static/media/` with no `srcset` and no `sizes`, because a `local` ui `Image` has no loader of its own and falls through to the site's Cloudinary `loaderFile` (`6c566c2715e0`), where legacy's went through Next's optimizer with a sixteen-entry `srcset`. Sanctioned under rule 4 as the global loader's consequence, or a regression whose fix is a loader for local images in `../ui` or a `loaderFile` that passes `/_next/static/media/` paths through?
- [[f9729ac7552a]] (`open`, code, removed): no `priority` image on the site carries `fetchpriority="high"`, which Next 14 derived from `priority` and Next 15 passes through from the caller only; the preload links are still written (four in the server HTML on both sides; after hydration six on legacy against four here). Sanctioned under rule 4, or `fetchPriority="high"` written by the site on the hero slides, the design carousel and `StoryImage`, which legacy never wrote?
- [[272613135119]] (`regression`, code, changed): the home reads the designs through `app/_lib/designs.ts` (the generated module sorted by label, a nullable image the page filters and the typing section guards) where legacy's `getStaticProps` walked the products directory in `readdir` order with a never-null image. The fix is the designs library's, the mechanism `abb539b3555e` records on `/designs`: judged with that item: sanctioned, or `regression` kept with the slice for the fix minted under the designs index record `f901cf9f724d` rather than beside the home record, since the library is that route's, the home's filter and guard (and the design carousel's `getDesignImage` pair) going with it?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=/ --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log
