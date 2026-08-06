# 09 — Swap hand-rolled CutBeamSvg for CutGridBeamSvg

**Status:** DOING — work is done and verified, on branch `stream-07/09-cutgridbeamsvg`. Blocked on
a `@villagekit/part-gridbeam` publish (see [Blocked on](#blocked-on)); merge the branch once the
new version is out and the dep is bumped.

## Why

`app/_components/cutting-plan/CutBeamSvg.tsx` hand-rolls what the engine already ships. Legacy rendered cutting plans with `CutGridBeamSvg` from `@villagekit/part-gridbeam`: true-to-spec beams (holes, cut markers, grayscale remainder), theme tokens, a carefully worded aria label. The local rewrite was legitimately justified when written — the engine was still Chakra v2 (`todo/01-website/07-cutting-planner.md:37`) — with an explicit follow-up to swap back (`:45`). The blocker is gone: the review verified that installed `@villagekit/part-gridbeam@0.10.0` **exports `CutGridBeamSvg` today** (re-exported via `dist/index.js` → `./svg/index.js`, declared in `dist/index.d.ts`), and all published packages are on Chakra v3.

Swapping also erases three bugs in the local version (2026-08-03 line refs):
- `CutBeamSvg.tsx:33` — aria-label prints the raw gu number with an "mm" suffix when `displayUnit` is mm ("60 mm stock beam" instead of "2,400 mm").
- `CutBeamSvg.tsx:50-52` — `preserveAspectRatio="none"` + fixed 40 px height + fluid width non-uniformly scales the `<text>` labels (~2-3× horizontal stretch at desktop widths).
- Hardcoded hex fills (`#cffafe`…`#dc2626`) that ignore the theme; `role="presentation"` on an SVG that also carries a `<title>`; hardcoded `'en-US'` in `formatLength`.

## What

Both cutting-plan renderers (`CuttingPlanner` results and the design page's `DesignCuttingPlan` tab) drawing beams via `CutGridBeamSvg`; `CutBeamSvg.tsx` deleted.

## Steps

- [x] Verify the export and its props: read `node_modules/@villagekit/part-gridbeam/dist/index.d.ts` and the source in the `../gridkit` sibling (`part-gridbeam` svg component). Check what inputs it wants (cuts, stock length, display unit?) vs what `CutBeamSvg` currently receives.
- [x] Compare with how legacy called it: `../node-modules/packages/applet-cutting-planner/src/` tables render — port the call pattern.
- [x] Swap in both call sites (`CuttingPlanner.tsx`, `DesignCuttingPlan.tsx`); delete `app/_components/cutting-plan/CutBeamSvg.tsx` and its one-file directory.
- [x] Verify visually at mobile + desktop widths and in the print stylesheet (the planner has print styles — make sure the engine SVG prints acceptably); check the aria output with an accessibility tree inspector.
- [x] Two upstream fixes were needed (fallback path 1) — made in `../gridkit`, awaiting publish.
- [ ] After the publish: `pnpm update @villagekit/part-gridbeam --latest`, merge `stream-07/09-cutgridbeamsvg`, flip this task to DONE.

## Notes

Findings from the 2026-08-06 pass:

- **Props map straight across.** `CutGridBeamSvg({ sizeInGrids, cuts, remainder, displayUnit })` takes exactly what `OutputBeam` carries. Theme tokens all resolve in this repo's Chakra v3 setup (`colors.wood.{light,dark}`, `colors.gray.*`, `colors.primary.400`, `colors.accentB.500`) — verified in the SSR'd markup, no `undefined` fills.
- **Legacy's call pattern is a `role="list"` of one SVG per stock beam**, no per-beam text header (`cutting-plan.tsx`). Ported as `app/_components/cutting-plan/CutBeamList.tsx`, shared by both call sites — the local per-beam "60 gu stock beam / cuts: …" header is gone, as legacy had none and the drawing carries its own size and cut markers. The planner's print rule moved from `figure` to `li` to match.
- **`DisplayUnit` + `formatLength` moved to `app/_lib/display-unit.ts`.** Four other modules imported them from `CutBeamSvg` (`DesignViewer`, `PartsBreakdown`, `url-codec`, `DesignCuttingPlan`), so they needed a home that isn't a drawing component. `formatLength` is now `'en'` rather than `'en-US'` — but **not** locale-aware as this task suggested: these components server-render and hydrate, and a runtime-default locale would put a different thousands separator on each side and trip hydration. `'en'` is the document language (`app/layout.tsx` `<html lang="en">`).
- **Mobile legibility is legacy behaviour, not a regression.** At 390 px the beams compress to unreadable ticks — screenshotting the legacy live site at the same width shows the same thing, slightly worse (narrower container). No action taken.
- **Print output is fine** — beams keep their fills, a 8-beam plan fits one A4 page, controls hide. Two pre-existing print nits spotted while checking, both from earlier tasks and left alone: the "Print plan" button prints, and the result section keeps a grey band that `background: white !important` was meant to remove.
- Upstream nit not worth its own release: `CutGridBeamSvg`'s aria-label says "80 unit grid beam**s**" for a single cut.

### Upstream fixes made in `../gridkit` (committed, unpublished)

All surfaced only once the swap was rendering. Mikey chose "fix in `../gridkit`, you publish".

1. `915085f` — **`CutGridBeamSvg` clipped stock past 60 gu.** The canvas was pinned at `40 × 60`, so a 100 gu stock beam drew off the right edge, losing its remainder and total label — reachable from the planner's "Beams you have" table, which is exactly where `sign-board` sends you for custom-length stock. Also keyed the `cuts.map`, which warned on every render.
2. `d4b3e7e` — **added a `./svg` export subpath.** The package root calls `registerPartModule` with the WebGL renderer, so importing `CutGridBeamSvg` from it dragged three.js onto the planner page: first-load JS went 252 kB → 489 kB. The subpath brings it back to 253 kB. Same shape as the package's own `./creator` and `@villagekit/part`'s `./base/grid`.
3. `e58d700` — **`canvasSizeInGrids` prop.** Widening per beam (fix 1) gave each over-long beam its own scale, so a 60 gu and a 100 gu beam in one plan drew the same length. The list now passes its longest beam and holds one scale. Also keyed the cut markers by position rather than value, which collided on a zero-length cut.

### Review round (fresh sub-agent, 2026-08-06)

Caught two regressions the swap introduced, both fixed in the branch's second commit:

- **Drawing cost now scales with beam *length*.** `BeamSvg` emits one `<circle>` per grid unit, so `?s=1000000-1` froze the tab and anything past 2³² threw `RangeError` outright — and `url-codec.ts` had an explicit comment saying no size ceiling was needed because "cost scales with the number of beams, not their length". That stopped being true the moment the engine renderer landed. Added `MAX_SIZE = 200` (8 m) to the decode and the number input, with tests.
- **Mixed-length plans drew to inconsistent scales** — fixed via the upstream `canvasSizeInGrids` prop above.

Verified sound and left alone: props mapping across the whole algorithm output space (zero cuts is unreachable, remainder abuts the last cut exactly, 1 gu beams fine), the list a11y (an upgrade on both legacy's `div role="list"` and the old non-list version), the `./svg` subpath's actual built dependency graph, import grouping, and the ported-code citation.

One accessibility regression accepted for legacy parity: the deleted component's aria-label named the off-cut ("…remainder 4 gu"); the engine's never mentions waste, as legacy's didn't.

## Blocked on

- **A `@villagekit/part-gridbeam` publish.** `app/_components/cutting-plan/CutBeamList.tsx` imports `@villagekit/part-gridbeam/svg`, which does not exist in the published `0.10.0` — the branch does not typecheck against it. Batch with tasks 16 and 17, which also want `../gridkit` releases.

## Depends on

- `./07-cutting-planner-hardening.md` touches the same files — coordinate or sequence to avoid churn (either order).

## Files

- `app/_components/cutting-plan/CutBeamSvg.tsx` (deleted), `app/_components/cutting-plan/CutBeamList.tsx` (new), `app/_lib/display-unit.ts` (new), `app/tools/cutting-planner/CuttingPlanner.tsx`, `app/tools/cutting-planner/url-codec.ts`, `app/_components/design/{DesignCuttingPlan,DesignViewer,PartsBreakdown}.tsx`
- Engine: `node_modules/@villagekit/part-gridbeam/`, source at `../gridkit/parts/gridbeam/src/svg/`
- Legacy call pattern: `../node-modules/packages/applet-cutting-planner/src/`
