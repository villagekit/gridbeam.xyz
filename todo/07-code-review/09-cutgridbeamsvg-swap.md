# 09 — Swap hand-rolled CutBeamSvg for CutGridBeamSvg

**Status:** TODO

## Why

`app/_components/cutting-plan/CutBeamSvg.tsx` hand-rolls what the engine already ships. Legacy rendered cutting plans with `CutGridBeamSvg` from `@villagekit/part-gridbeam`: true-to-spec beams (holes, cut markers, grayscale remainder), theme tokens, a carefully worded aria label. The local rewrite was legitimately justified when written — the engine was still Chakra v2 (`todo/01-website/07-cutting-planner.md:37`) — with an explicit follow-up to swap back (`:45`). The blocker is gone: the review verified that installed `@villagekit/part-gridbeam@0.10.0` **exports `CutGridBeamSvg` today** (re-exported via `dist/index.js` → `./svg/index.js`, declared in `dist/index.d.ts`), and all published packages are on Chakra v3.

Swapping also erases three bugs in the local version (2026-08-03 line refs):
- `CutBeamSvg.tsx:33` — aria-label prints the raw gu number with an "mm" suffix when `displayUnit` is mm ("60 mm stock beam" instead of "2,400 mm").
- `CutBeamSvg.tsx:50-52` — `preserveAspectRatio="none"` + fixed 40 px height + fluid width non-uniformly scales the `<text>` labels (~2-3× horizontal stretch at desktop widths).
- Hardcoded hex fills (`#cffafe`…`#dc2626`) that ignore the theme; `role="presentation"` on an SVG that also carries a `<title>`; hardcoded `'en-US'` in `formatLength`.

## What

Both cutting-plan renderers (`CuttingPlanner` results and the design page's `DesignCuttingPlan` tab) drawing beams via `CutGridBeamSvg`; `CutBeamSvg.tsx` deleted.

## Steps

- [ ] Verify the export and its props: read `node_modules/@villagekit/part-gridbeam/dist/index.d.ts` and the source in the `../gridkit` sibling (`part-gridbeam` svg component). Check what inputs it wants (cuts, stock length, display unit?) vs what `CutBeamSvg` currently receives.
- [ ] Compare with how legacy called it: `../node-modules/packages/applet-cutting-planner/src/` tables render — port the call pattern.
- [ ] Swap in both call sites (`CuttingPlanner.tsx`, `DesignCuttingPlan.tsx`); delete `app/_components/cutting-plan/CutBeamSvg.tsx` and its one-file directory.
- [ ] Verify visually at mobile + desktop widths and in the print stylesheet (the planner has print styles — make sure the engine SVG prints acceptably); check the aria output with an accessibility tree inspector.
- [ ] If `CutGridBeamSvg` turns out to be unusable as-is (missing a prop the new UI needs, rendering assumption that breaks in the new layout), the fallback order is: (1) small upstream fix in `../gridkit` + publish (ask Mikey before publishing), (2) keep the local component but fix its three bugs listed above and add a `// Note(cc):` explaining why the engine component didn't fit. Do not silently leave both.

## Notes

- Wiggle room: "exports it today" was verified against `@villagekit/part-gridbeam@0.10.0`; a later version may have moved it. The task stands as long as *some* engine-shipped renderer exists.
- The unit-conversion display (gu ↔ mm at 40 mm/gu) currently lives in `CutBeamSvg`'s `formatLength` — if the engine component doesn't handle mm display, keep that one small formatter (locale-aware, not hardcoded `'en-US'`).

## Depends on

- `./07-cutting-planner-hardening.md` touches the same files — coordinate or sequence to avoid churn (either order).

## Files

- `app/_components/cutting-plan/CutBeamSvg.tsx` (delete), `app/tools/cutting-planner/CuttingPlanner.tsx`, `app/_components/design/DesignCuttingPlan.tsx`
- Engine: `node_modules/@villagekit/part-gridbeam/`, source at `../gridkit` (part-gridbeam svg)
- Legacy call pattern: `../node-modules/packages/applet-cutting-planner/src/`
