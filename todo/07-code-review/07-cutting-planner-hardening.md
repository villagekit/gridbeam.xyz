# 07 — Cutting planner hardening (URL decode clamp + small fixes)

**Status:** DONE (2026-08-06)

## Why

The planner's URL-state feature (a genuine improvement over legacy — keep it) shipped without input bounds:

- **`decodeQuotas` is unclamped** (`app/tools/cutting-planner/CuttingPlanner.tsx:498-511`, 2026-08-03): validates only `size >= 2 && count >= 1` — no upper bounds, no row cap. The page **auto-runs the planner on mount** when URL state exists (lines ~79-85). A shared/crafted link like `?r=2-99999999` materialises tens of millions of objects in `beamQuotasToBeams` and freezes the tab. Legacy had no URL state, but its UI capped size ≤ 60 and count ≤ 50.
- **Summary math doesn't reconcile when cuts are infeasible**: `CuttingPlanner.tsx:425-450` and `app/_components/design/DesignCuttingPlan.tsx:54-56,87-91` compute `totalRequiredLength` over the *full* input including infeasible cuts, so "required total X + off-cut waste Y" won't equal stock used whenever `infeasibleBeams` is non-empty. Sum placed cuts from `result.cutBeams` instead.
- Small slop, same files: dead `typeof window !== 'undefined'` guard inside an onClick in a `'use client'` component (~lines 100-102); hardcoded `var(--chakra-colors-gray-600)` inline style (dark-mode blind, ~line 139); missing legacy section aria-labels ("Controls" / "Cut beams" / "Uncut beams") on the three `Section`s (~lines 108, 173, 199); redundant deps on the run-once mount effect.

## What

URL decode clamped to the same bounds the UI enforces (size and count caps + a max row count); a summary that reconciles arithmetically in the infeasible case; the small slop cleaned.

## Steps

- [x] Reproduce the freeze cheaply first (e.g. `?r=2-9999999` locally — one order of magnitude down if you don't want to kill the tab) to confirm decode → auto-plan is still unbounded.
- [x] Establish the canonical bounds: find what the UI inputs actually enforce today (legacy was size ≤ 60, count ≤ 50) and apply the identical bounds in `decodeQuotas`, plus a row cap (legacy UI had a practical row limit; something like ≤ 50 rows is more than any real plan). Out-of-range entries: clamp or drop — pick one, note why. — done, but *not* by mirroring the input bounds; see Notes.
- [x] Check the `u` (unit) and `d` (design/stock) params for the same class of hole while in there.
- [x] Fix the summary: compute placed-cut totals from `result.cutBeams` so `placed + waste = stock used`, and surface infeasible cuts separately. Same fix in both `CuttingPlanner.tsx` and `DesignCuttingPlan.tsx` — consider extracting one shared summary helper if it stays duplicated.
- [x] Clean the small slop items listed above (guard, inline style → theme token, section aria-labels, effect deps).
- [x] Add the decode bounds + summary reconciliation to the test suite if `./08-tests.md` has landed (URL codec round-trip + clamp cases; infeasible-summary case). — done in [task 08](./08-tests.md), which landed next: the codec moved to `url-codec.ts` and every bound below has a unit test.

## Notes

**The freeze held.** Measured against the real algorithm: 20 k beams = 110 ms, 60 k = 1.1 s, and it
is O(n²), so `?r=2-9999999` is hours of blocked main thread. The page plans on mount, so a link is
enough — no interaction needed.

**The bounds are not the input bounds, and that was the interesting part.** The obvious fix —
mirror `min=2 max=60` / `min=1 max=50` into `decodeQuotas` — is wrong in both dimensions, and two
review rounds were needed to land it:

- *Size is now bounded only by what the packing can model — `size >= 1`, no ceiling.* Legacy's
  2–60 window was safe for legacy, which had no pages linking into the planner. Ours do, and they
  emit beams outside it at both ends. `products/sign-board` at full size needs an **80 gu** cut,
  and its own page renders "Some cuts are too long for the 60 gu stock — 2× 80 gu. Open the
  cutting planner to use longer stock." `products/utility-workbench` emits a **1 gu** beam at some
  parameters (`?w=15&d=10&wh=15&sh=29&o=7`). Dropping either made the planner contradict the page
  that sent the reader there. Neither bound bought any safety: cost scales with the number of
  beams, not their length. Only a floor is genuinely needed — a cut of 0 or less always "fits", so
  the packing can't model it.
- *Count is split, never clamped, never truncated.* A design can need more of one length than a
  row holds (`stage` at max parameters wants ~288), encoded as a single `size-count` pair. Counts
  above `MAX_COUNT` **split** across rows — lossless, every row still editable. An entry that
  doesn't fit in the rows remaining is dropped **whole**: half an entry renders just as
  confidently as a correct plan.

**The size ceiling had to come out of the number input too, not just the decoder.** This was the
second review's catch and the sharpest bug in the whole task. With `decodeQuotas` admitting 80 but
`BeamSizeInput` still carrying `max={60}`, Chakra clamps on blur — so *focusing an 80 gu row and
pressing Tab, with no edit at all*, rewrote it to 60, and "Plan it" then wrote `?r=60-2` and
rendered a confident, feasible, wrong plan. The silent rewrite hadn't been fixed, just relocated.
Removing the input's `max` also makes the design page's instruction true for the first time: 80 gu
stock is now actually enterable in "Beams you have", so that cut can be planned rather than merely
reported. The `min` stays, so a typed `0` still clamps to 1.

**Nothing is dropped silently.** Both reviews landed on the same weak point — a decode that
discards entries leaves a table that looks like the whole plan, and a blank planner looks just as
authoritative as a wrong one. `decodeQuotas` now returns `{ quotas, dropped }` and the controls
section says "Some beams in that link were out of range and have been left out."

**Round-trip hole closed.** "Add row" was unbounded while the decoder capped at `MAX_ROWS`, so a
61-row table could produce a share link that silently lost rows on the way back in. The button is
now disabled at the cap (no `title` explaining why — a `disabled` button fires no mouse events, so
it would never show).

**`?u=` had the same class of hole.** `parseUnlimited` fell through to `false` for anything
unrecognised, so a typo'd `?u=` silently meant "use only stock" — a real setting that changes the
plan. Split into `tryParseUnlimited` (null-returning, used for the untrusted URL, falls back to
the default) and `parseUnlimited` (throwing, used for the trusted Select — legacy threw there too,
`cutting-planner.tsx:86-95`). `?d=` was already a safe `=== 'mm'` check.

**Summary reconciliation.** `totalRequiredLength` summed the *input*, so with any infeasible cut
"required total + waste" didn't equal stock used. Replaced by `totalPlacedLength`, which sums the
*output* (`cutBeams[].cuts`). Since `algorithm.ts` builds every output beam with
`remainder = size - Σcuts`, `placed + waste ≡ stock used` now holds identically, for any input.
`totalRequiredLength` was deleted as unused. No shared summary helper was extracted — the two
call sites differ in wording and layout, and the three `algorithm.ts` functions already *are* the
shared layer.

**Float drift, found while verifying the design links.** Parametric designs divide to place beams,
so `lengthInGrids` arrives as `1.9999999999999991` / `2.000000000000001` for what is one beam.
That split a single length into two rows, printed "10× 2.000000000000001 gu" on the page, and —
worse — `Number.parseInt('1.9999999999999991')` is `1`, below `MIN_SIZE`, so the planner link
dropped the row outright. `getRequiredBeamsFromParts` now rounds; beams are cut on the 40 mm grid,
so the whole number is the real length. Visible in `lumber-rack`, whose two drift buckets of 8
now merge into one `16× 2 gu` row.

**`CutBeamSvg` grew a dynamic viewBox.** It hardcoded `viewBox="0 0 60 6"`, so once stock longer
than 60 gu became reachable the bar drew past the right edge of its canvas. Now
`0 0 ${Math.max(60, beam.size)} 6`. Minimal on purpose — [task 09](./09-cutgridbeamsvg-swap.md)
plans to replace this component wholesale.

**Small slop, all done:** dead `typeof window` guard removed; the hardcoded
`var(--chakra-colors-gray-600)` label replaced with legacy's `FormLabel > Text variant="tertiary"`
shape (as `chakra.label`, since Chakra v3's `FieldLabel` needs a `Field.Root`); legacy's section
aria-labels restored ("Controls" / "Cut beams" / "Uncut beams"); the mount effect + `didAutoPlan`
ref replaced with a lazy `useState` initialiser (same run-once semantics, no ref, no empty frame).
Also restored two things legacy had and the port dropped: an accessible name on the display-unit
switch (via `Switch.Label`, because `Switch.Root` unconditionally points the input's
`aria-labelledby` at it) and `aria-hidden` on the flanking "gu"/"mm" text.

**Verification** — `scratchpad/planner-check.mjs` drives thirteen URLs against a production build,
asserting `placed + waste === stock used` and the expected row/notice state on each: hostile count
dropped whole, count at the cap (3000) → 60 rows with no notice, count just over the cap dropped,
overflow entries dropped whole (both mid-table and after a full table), 500 encoded rows → 60,
sign-board's 80 gu cut kept and reported infeasible *and* plannable once 80 gu stock is supplied,
utility-workbench's 1 gu kept and its 0 gu dropped with a notice, 288 split losslessly, infeasible
mix, garbage `?u=`. `scratchpad/clamp-check.mjs` covers the input-clamp bug: 80 survives focus+Tab,
80 gu stock is enterable, 0 clamps to 1, the plan's viewBox grows to 80.
`scratchpad/design-plan-check.mjs` checks five design pages reconcile and emit clean integer
planner links. `pnpm typecheck`, `pnpm lint`, `pnpm build` clean.

**Test cases this implies** are written into [task 08](./08-tests.md) rather than left as "add
tests": the `?r=2-3000` / `?r=2-3001` boundary, split boundaries, sizes outside the old window
surviving decode, the whole-entry overflow drop, `tryParseUnlimited` fallbacks,
`placed + waste === stock used` with non-empty `infeasibleBeams`, and float-drift rounding.

**Follow-up in task 08 (2026-08-06).** Everything above now has unit tests. Two things changed
while writing them: the codec moved out of the component into
`app/tools/cutting-planner/url-codec.ts` (behaviour unchanged, re-verified with this task's
scripts), and pair parsing got stricter. `Number.parseInt` reads leading digits and discards the
rest, so `2-3-4` decoded as 2×3 and `1.9999999999999991-8` as size 1 — the same float-drift string
this task stopped `DesignCuttingPlan` from emitting, silently landing on a wrong plan. Pairs are
now matched whole against `/^(\d+)-(\d+)$/` and anything else is reported through the notice.

**Discovered, not fixed:** `products/utility-workbench` emits a **0 gu** grid beam at some
parameters, and `lumber-rack` can throw `RangeError: Invalid array length` out of
`@villagekit/part-gridbeam`. Both are upstream and predate this task — filed as
[task 20](./20-utility-workbench-degenerate-beams.md). This task only made the first one visible.

- The planner's URL *write* already moved off `router.replace` onto `replaceUrl`
  (`app/_lib/url-state.ts`) in [task 05](./05-design-viewer-url-state.md) — "Plan" no longer
  refetches the page from the worker. The decode side is untouched and still this task's job.
- Wiggle room: exact line numbers will have drifted; the shapes to look for are the `decodeQuotas` regex/parse block, the auto-run mount effect, and the two summary computations.
- Do NOT touch `algorithm.ts` logic — the FFD port was verified faithful (all four legacy Jest cases byte-identical) and its infeasibility fix is correct and properly cited. The only algorithm-adjacent note: `beamsToBeamQuotas` lists quotas in Map insertion order vs legacy's ascending-size order — cosmetic, fix only if trivial. **Not cosmetic, as it turned out:** required beams are packed largest-first, so encounter order reversed the "Infeasible cuts" table against legacy. Caught by the ported legacy helper test and fixed in [task 08](./08-tests.md).
- UI copy/default deviations (button text, default quantities, Switch→Select with the 30 gu option) are handled in `./11-copy-reconciliation.md`, not here.

## Depends on

- Nothing. `./08-tests.md` pairs well after.

## Files

- `app/tools/cutting-planner/CuttingPlanner.tsx`, `app/_components/design/DesignCuttingPlan.tsx`
- Legacy: `../node-modules/packages/applet-cutting-planner/src/` (page + shared helpers)
