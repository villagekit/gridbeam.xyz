# 07 — Cutting planner hardening (URL decode clamp + small fixes)

**Status:** TODO

## Why

The planner's URL-state feature (a genuine improvement over legacy — keep it) shipped without input bounds:

- **`decodeQuotas` is unclamped** (`app/tools/cutting-planner/CuttingPlanner.tsx:498-511`, 2026-08-03): validates only `size >= 2 && count >= 1` — no upper bounds, no row cap. The page **auto-runs the planner on mount** when URL state exists (lines ~79-85). A shared/crafted link like `?r=2-99999999` materialises tens of millions of objects in `beamQuotasToBeams` and freezes the tab. Legacy had no URL state, but its UI capped size ≤ 60 and count ≤ 50.
- **Summary math doesn't reconcile when cuts are infeasible**: `CuttingPlanner.tsx:425-450` and `app/_components/design/DesignCuttingPlan.tsx:54-56,87-91` compute `totalRequiredLength` over the *full* input including infeasible cuts, so "required total X + off-cut waste Y" won't equal stock used whenever `infeasibleBeams` is non-empty. Sum placed cuts from `result.cutBeams` instead.
- Small slop, same files: dead `typeof window !== 'undefined'` guard inside an onClick in a `'use client'` component (~lines 100-102); hardcoded `var(--chakra-colors-gray-600)` inline style (dark-mode blind, ~line 139); missing legacy section aria-labels ("Controls" / "Cut beams" / "Uncut beams") on the three `Section`s (~lines 108, 173, 199); redundant deps on the run-once mount effect.

## What

URL decode clamped to the same bounds the UI enforces (size and count caps + a max row count); a summary that reconciles arithmetically in the infeasible case; the small slop cleaned.

## Steps

- [ ] Reproduce the freeze cheaply first (e.g. `?r=2-9999999` locally — one order of magnitude down if you don't want to kill the tab) to confirm decode → auto-plan is still unbounded.
- [ ] Establish the canonical bounds: find what the UI inputs actually enforce today (legacy was size ≤ 60, count ≤ 50) and apply the identical bounds in `decodeQuotas`, plus a row cap (legacy UI had a practical row limit; something like ≤ 50 rows is more than any real plan). Out-of-range entries: clamp or drop — pick one, note why.
- [ ] Check the `u` (unit) and `d` (design/stock) params for the same class of hole while in there.
- [ ] Fix the summary: compute placed-cut totals from `result.cutBeams` so `placed + waste = stock used`, and surface infeasible cuts separately. Same fix in both `CuttingPlanner.tsx` and `DesignCuttingPlan.tsx` — consider extracting one shared summary helper if it stays duplicated.
- [ ] Clean the small slop items listed above (guard, inline style → theme token, section aria-labels, effect deps).
- [ ] Add the decode bounds + summary reconciliation to the test suite if `./08-tests.md` has landed (URL codec round-trip + clamp cases; infeasible-summary case).

## Notes

- The planner's URL *write* already moved off `router.replace` onto `replaceUrl`
  (`app/_lib/url-state.ts`) in [task 05](./05-design-viewer-url-state.md) — "Plan" no longer
  refetches the page from the worker. The decode side is untouched and still this task's job.
- Wiggle room: exact line numbers will have drifted; the shapes to look for are the `decodeQuotas` regex/parse block, the auto-run mount effect, and the two summary computations.
- Do NOT touch `algorithm.ts` logic — the FFD port was verified faithful (all four legacy Jest cases byte-identical) and its infeasibility fix is correct and properly cited. The only algorithm-adjacent note: `beamsToBeamQuotas` lists quotas in Map insertion order vs legacy's ascending-size order — cosmetic, fix only if trivial.
- UI copy/default deviations (button text, default quantities, Switch→Select with the 30 gu option) are handled in `./11-copy-reconciliation.md`, not here.

## Depends on

- Nothing. `./08-tests.md` pairs well after.

## Files

- `app/tools/cutting-planner/CuttingPlanner.tsx`, `app/_components/design/DesignCuttingPlan.tsx`
- Legacy: `../node-modules/packages/applet-cutting-planner/src/` (page + shared helpers)
