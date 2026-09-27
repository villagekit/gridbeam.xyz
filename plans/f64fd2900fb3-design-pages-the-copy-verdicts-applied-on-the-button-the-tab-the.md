---
title: "Design pages: the copy verdicts applied on the button, the tab, the Overview heading, the parts settings and the Plan tab's sentence, heading and footnote"
status: todo
parent: 0bc88eaf5493
derived_from: 0bc88eaf5493
blocked_by: 1f1f9e07cefb
worker: sonnet
---
The design pages' copy is what the design page grilling settled: ten verdicts applied verbatim on the current design components as the removals slice leaves them, before the page is re-ported, so the re-port carries settled text and its review is structure only. Every string comes from the item's last Log line or the legacy line it names, and from nowhere else (`ca677697`); the diff is stated line by line below, so the work is Sonnet's. Record `0bc88eaf5493`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

Read each item (`kipu show <id>`) and write exactly the text its last Log line gives; where the line says `as legacy`, the string in its Legacy section, from `../node-modules` at `fce357d`. Line numbers are the current files' before the removals slice, so search by the current text.

- [[d55dec61f7c7]]: `app/_components/design/DesignViewer.tsx:67` `label: 'View cutting plan'` reads `label: 'View plan'` (`apps/gridkit/pages/designs/[id].tsx:110`).
- [[f8e457c848a3]]: `DesignViewer.tsx:82` `label: 'Cutting plan'` reads `label: 'Plan'` (legacy's `capitalize('plan')`, `components/catalogue-item/catalogue-item.tsx:145`).
- [[ef7e713b9c71]]: `DesignViewer.tsx:93` `Product care` reads `Product Care` (`[id].tsx:135`).
- [[895572491acb]]: `app/_components/design/PartsBreakdown.tsx:75` `Group same size` reads `Group same size parts` (`components/design/parts-breakdown.tsx:27`).
- [[e27c8166150f]]: `PartsBreakdown.tsx:40,54` `gu` and `mm` read `Grid units` and `Millimeters` (`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:25,38`).
- [[fad6353f35e0]]: `PartsBreakdown.tsx:46` `aria-label="Show measurements in millimetres"` reads `aria-label="Display units as millimeters or grid units"` (`display-unit-toggle.tsx:31`).
- [[c8ad9c008da8]]: a `<Text fontWeight="bold">Settings</Text>` above the toggles' `HStack` (`PartsBreakdown.tsx:20`), legacy's `parts-breakdown.tsx:15-17`; the `role="menu"` stack, its `aria-labelledby` and the block's place below the summary are the page re-port's ([[65154690c5d9]], [[711f15837857]]).
- [[eec730fed36a]]: in `app/_components/design/DesignCuttingPlan.tsx`, `<Heading size="md" textAlign="center">Cutting plan</Heading>` as the first child of the returned `VStack`, legacy's `cutting-plan.tsx:19-21`, `Heading` from `@villagekit/ui`; the `Cut beams` region, the list roles and the drawings are the page re-port's.
- [[deb4e98fcb25]]: after the drawings' `VStack`, `<Text fontSize="small">Panels and fasteners not included in estimate. Please <Link as={NextLink} href="/contact">contact us</Link> for any help.</Text>`, legacy's `[id].tsx:214-220` without the leading `* ` (the verdict: the asterisk marked the kit sentence gone under rule 2, `9033e178e57c`); `Link` from `@villagekit/ui`, `NextLink` from `next/link`.
- [[facf2d13aa23]]: the headline `Text` (search `Needs`) reads `Requires {planResult.cutBeams.length}x {stockSize}gu (<Link as={NextLink} href="/stories/whats-a-grid-unit" target="_blank" rel="noopener">grid unit</Link>) beams.`, legacy's `[id].tsx:225-229` with the store clause cut at the closing parenthesis, one sentence for both stock sizes as the verdict says. Legacy's line (`:226`) wrote `isExternal`, which Chakra v2's `Link` rendered as `target="_blank"` and `rel="noopener"` (the packed v2 `@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs:19` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/`); the published `@villagekit/ui@1.2.0` `Link` has no `isExternal` (`dist/components/Link.js`), the sibling restores it at ui commit `6603102` (`2bd0169a6dda`, `upstream`), and no slice waits on a publish (`28c1a536`), so the two attributes are written on the anchor, the DOM legacy rendered, with a note on the bump plan `99f2fe62c62f` naming the line to swap back to `isExternal` at the bump (the home's `58252b32e362` pattern, without its `rel` difference: `noopener` alone is legacy's value). `summariseRequired`, `plural` and the `formatLength` import are then dead: delete them (lint names them). The sentence's size (`fontSize="large"`) and its `maxWidth` stack are legacy's tree and the page re-port's; this slice writes strings and links only.
- Verify first: `grep -c "View cutting plan\|label: 'Cutting plan'\|Product care" app/_components/design/DesignViewer.tsx` prints 3; `grep -c 'Group same size\|millimetres' app/_components/design/PartsBreakdown.tsx` prints 2 and `grep -cw 'gu\|mm' app/_components/design/PartsBreakdown.tsx` prints at least 2; `grep -c 'Needs ' app/_components/design/DesignCuttingPlan.tsx` prints 1.
- Not this slice: every visual, accessibility, interaction and code item on the route (the page re-port and the sibling slices); the planner's own instances of the toggle strings ([[c4a82d72201c]], the cutting planner record's).

## Seams under test

None pure; the proof is the DOM pair and the tabs on `pnpm dev`.

## Done when

- `pnpm audit:dom --routes <a file naming /designs/bed-frame>` against a running `pnpm dev`: `audit/designs__bed-frame/dom/current.aria.yaml` holds `button "View plan"` and the tabs `Overview`, `Parts`, `Plan`, as `legacy.aria.yaml` does, and the Overview panel reads `Product Care`
- A Playwright probe on `pnpm dev` (the tabs mount lazily): the Parts tab reads `Settings`, `Grid units`, `Millimeters` and `Group same size parts`, and the unit switch's `aria-label` attribute reads `Display units as millimeters or grid units` (the name the tree exposes is the page re-port's, whose switch wiring changes; `CuttingPlanner.tsx:447-450` records why an `aria-label` alone may not name a v3 switch); the Plan tab reads the heading `Cutting plan`, then `Requires 9x 60gu (grid unit) beams.` with `grid unit` an anchor to `/stories/whats-a-grid-unit` carrying `target="_blank"` and `rel="noopener"`, the drawings, then `Panels and fasteners not included in estimate. Please contact us for any help.` with `contact us` linking to `/contact`; on `/designs/shelf-tower` the sentence reads `Requires 6x 30gu (grid unit) beams.`
- The note on `99f2fe62c62f` naming the anchor's line for the `isExternal` swap is written, checked after
- `grep -c "'View plan'\|'Plan'\|Product Care" app/_components/design/DesignViewer.tsx` prints 3; `grep -c 'Grid units\|Millimeters\|Display units as millimeters or grid units\|Group same size parts\|>Settings<' app/_components/design/PartsBreakdown.tsx` prints 5; `grep -c 'Cutting plan\|Requires \|Panels and fasteners' app/_components/design/DesignCuttingPlan.tsx` prints 3; `grep -cP '\x{2014}' app/_components/design/DesignCuttingPlan.tsx` prints 0
- The ten items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
