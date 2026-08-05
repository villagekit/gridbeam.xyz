# 07 — Cutting planner tool

**Status:** DONE

## Why
The cutting planner is one of the most useful things on the legacy site — you give it a list of cuts you need and the stock lengths you have, and it tells you how to cut to minimise waste. Self-contained and immediately useful.

## What
- `app/tools/cutting-planner/page.tsx` — port of the legacy `applet-cutting-planner` as a standalone tool

## Steps
- [x] Lifted (not workspace-dep). The legacy applet had no other live consumers and depended on Chakra v2; lifting frees us to rebuild on Chakra v3 cleanly.
- [x] **Algorithm + types** at `app/tools/cutting-planner/algorithm.ts`. Pure first-fit-decreasing port. Dropped the `lodash-es` `partition` dep (replaced with a small inline split). Replaced `Record<number, BeamQuota>` with `Map<number, BeamQuota>` for `noUncheckedIndexedAccess` cleanliness. Added totals helpers (`totalRequiredLength`, `totalCutLength`, `totalRemainderLength`) for the result summary. **Edge-case fix:** legacy version produced a beam with negative remainder when a required cut exceeded the unlimited-stock length (e.g. 50 gu cut + unlimited 30 gu = `{cuts:[50], size:30, remainder:-20}`). Now those cuts go to `infeasibleBeams`. Verified all four legacy test cases still pass byte-for-byte via `pnpm dlx tsx -e …`.
- [x] **Interactive component** at `app/tools/cutting-planner/CuttingPlanner.tsx` (`'use client'`). State, BeamsTable inputs (required + stock), unlimited-stock `Select`, `DisplayUnitToggle` (gu/mm), `Plan it` button, ResultSummary, inline `CutBeamSvg`, infeasible/unused tables (read-only — no add/delete/stepper), `Print plan` button.
  - All inputs in **gu only** — the display toggle affects only the result rendering. Trying to drive the inputs in mm via continuous rounding ate keystrokes (e.g. typing `50` with `step=40` snapped to `40` mid-type). Sticking with gu matches the legacy applet's behaviour and keeps the algorithm domain pure.
  - Uses Chakra v3 namespace API: `<NumberInput.Root> / <NumberInput.Input> / <NumberInput.Control> / <NumberInput.IncrementTrigger> / <NumberInput.DecrementTrigger>`, `<Table.Root> / .Header / .Body / .Row / .Cell / .ColumnHeader`, `<Switch.Root> / .HiddenInput / .Control / .Thumb`, `<Select.Root> / .Field / .Indicator`, `<FormLabel>`. Read-only `BeamsTable` instances (infeasible / unused) skip rendering `<NumberInput.Control>` so steppers don't appear greyed-out next to non-interactive values.
  - Section indexes are sequential under `<Main>`: `0` page intro, `1` controls, `2` cutting plan (when result), `3` problems (when infeasible or unused). Combined infeasible + unused into one Section with inner `vk-cutting-infeasible` / `vk-cutting-unused` classes so the `useAssertChildIndexes` dev warning never fires.
- [x] **Page wrapper** at `app/tools/cutting-planner/page.tsx`. Server component, `<Title>` + intro + `<Suspense fallback={null}><CuttingPlanner /></Suspense>`. Suspense is required because `useSearchParams()` would otherwise deopt the whole route to dynamic — the boundary scopes the dynamic part so the rest static-prerenders.
- [x] **URL-shareable state.** Compact codec at the bottom of `CuttingPlanner.tsx`: `r=size-count~size-count` for required, same shape for `s=` stock, `u=30|60|false` (omitted when default `60`), `d=mm` (omitted when default `gu`). On `Plan it`, `router.replace('/tools/cutting-planner?…', { scroll: false })`. On mount with URL state present (`r` or `s` set), auto-runs the planner so a shared link shows the result without a second click. Empty-state replace uses the absolute pathname (not bare `?`) so the URL doesn't end in a stray query mark.
- [x] **Print stylesheet.** Inline `<style>{PRINT_STYLES}</style>` rendered alongside the component. Hides controls + unused-stock; preserves the cutting plan and infeasible-cuts (most useful pieces of a printed plan); strips Section padding/border for a cleaner page; adds `figure { page-break-inside: avoid; break-inside: avoid }` so a single beam visualisation can't split across pages.
- [x] **Reusable as a component, not just a route.** The exported `CuttingPlanner` is a self-contained client component, ready to drop into a designs-detail page (Stream 01 task 06) without modification. The pure `firstFitDecreasing` is independently importable for non-React consumers.
- [x] Already linked from `/tools-and-resources` (`app/tools-and-resources/page.tsx:43-45`) — no nav change needed.

## Verification
- `pnpm -w run typecheck` — clean.
- `pnpm -w run lint` — clean (Biome reformatted long lines on the first pass).
- `pnpm -w run build` — `/tools/cutting-planner` static-prerenders at 8.13 kB; all 12 routes generate; no errors or new warnings.
- **Algorithm parity** verified via `pnpm dlx tsx -e …` against the four legacy test cases (`first-fit-decreasing.test.ts`):
  - simple unlimited (60gu reference): `{cuts:[15,15,10], remainder:20, size:60}` ✓
  - with stock: `{cuts:[10],...,size:10}, {cuts:[15,15],remainder:30,size:60}` + unused 5gu ✓
  - complex (35×2 + 23×4 + 13×4 + 11×1 with 35+23 stock): 5 beams, all cuts placed ✓
  - infeasible mode (`hasUnlimitedStock: false`): infeasible 15gu pair ✓
  - **edge-case fix**: 50gu required + unlimited 30gu now reports `infeasibleBeams: [{count:1, size:50}]` instead of producing a beam with negative remainder.
- Dev server SSR — page renders HTTP 200, h1 "Cutting planner" + footer h2s present; the interactive subtree hydrates from the Suspense boundary on the client, no SSR errors.

## Notes
- **`<CutGridBeamSvg>` deferred.** Legacy applet rendered cuts via `@villagekit/part-gridbeam`'s SVG component, which depends on the engine submodule (still on Chakra v2 per Stream 03 task 08). Building an inline visualisation here unblocks the website without dragging the engine port forward. Once Stream 03 ships, swapping the inline `<CutBeamSvg>` for the engine's `<CutGridBeamSvg>` is a one-component substitution — both take roughly the same shape (`{ size, cuts, remainder }`).
- ~~**No test runner yet.**~~ Done 2026-08-06 in [../07-code-review/08-tests.md](../07-code-review/08-tests.md): Vitest is wired up (`pnpm test`) and both legacy suites are ported. The one-shot verification recorded above is now a committed suite — and the ported legacy helper test caught an ordering divergence the one-shots had missed.
- **Defaults match legacy on screen.** Initial example: `[8 × 10 gu] + [4 × 15 gu]`, no stock, unlimited 60 gu. Same totals + same on-screen ordering as the legacy applet so a returning user sees what they remember.
- **Unit conversion.** 1 gu = 40 mm. The intro paragraph states this; the display toggle changes the rendered units in the result section (SVG labels, ResultSummary, beam captions, aria-labels). Inputs stay gu — pinning input precision to the algorithm's native unit avoids the round-trip-rounding bug.

## Follow-ups (separate tasks)
- ~~**Set up Vitest**~~ — done, [../07-code-review/08-tests.md](../07-code-review/08-tests.md).
- **Reuse the `CuttingPlanner` component on designs-detail pages** when Stream 01 task 06 lands — designs page should embed it pre-populated with that design's cut list.
- **Swap inline `<CutBeamSvg>` for engine's `<CutGridBeamSvg>`** once Stream 03 task 08 (engine on Chakra v3) is done. The inline version is correct but stylistically simpler than the engine's; the engine renders true-to-spec gridbeam holes + size markers.
- ~~**Real-browser visual QA.**~~ Covered by [../07-code-review/05-design-viewer-url-state.md](../07-code-review/05-design-viewer-url-state.md), [../07-code-review/07-cutting-planner-hardening.md](../07-code-review/07-cutting-planner-hardening.md) and [../07-code-review/08-tests.md](../07-code-review/08-tests.md), which drove the full flow (input → clamp → Plan it → URL → result → share link back in) against a production build in Playwright. Print preview specifically is still untested.
- **Consider a `step={5}` shortcut on Beam size input** for the common case of cuts in 5 gu increments (5 gu = 200 mm — typical shelf depth, panel width). Currently `step={1}`, which works but takes more clicks for big sizes. Could be a UX-only NumberInput tweak.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — for form components in v3
