# 08 — Test infrastructure: Vitest + port legacy cutting-planner suites

**Status:** TODO

## Why

The repo has **no test runner, no test script, zero `*.test.ts` files** — while CLAUDE.md names the cutting planner, designs-catalog logic, and engine math as the highest-value test targets. Legacy had Jest suites: `first-fit-decreasing.test.ts` (4 cases incl. the infeasible path) and `shared.test.ts` (3 helper cases) in `../node-modules/packages/applet-cutting-planner/`. The ported algorithm was *modified* (infeasible-cut fix, configurable 30/60 stock) — exactly the situation where the tests should have come along. `todo/01-website/07-cutting-planner.md:38,43` admits verification was done via throwaway `pnpm dlx tsx` one-shots, and the Vitest follow-up was never actioned.

## What

Vitest wired into the repo (`pnpm test` script, CI-runnable), the legacy suites ported, plus cases for the behavior that changed since legacy.

## Steps

- [ ] Confirm there's still no test setup (`package.json` scripts, any vitest/jest config) before adding one.
- [ ] Add Vitest (devDep) with minimal config — the targets are pure TS functions, no DOM/component testing needed initially; don't add jsdom/testing-library until something needs it.
- [ ] Port `first-fit-decreasing.test.ts` and `shared.test.ts` from `../node-modules/packages/applet-cutting-planner/` against `app/tools/cutting-planner/algorithm.ts`. Cite the source with a SHA-pinned GitHub URL per CLAUDE.md convention. Expect the 4 algorithm cases to pass unchanged (the review hand-traced them to byte-identical output); if one fails, **investigate before "fixing"** — per CLAUDE.md testing rules, the test may be catching a real divergence.
- [ ] Add cases for post-legacy behavior: cut size > unlimited-stock size → lands in `infeasibleBeams` (the new fix; legacy emitted negative remainders); 30 gu stock option; empty required input; zero/negative counts.
- [ ] Add URL-codec tests for the planner: `encodeQuotas`/`decodeQuotas` round-trip, malformed input, and the bounds that [task 07](./07-cutting-planner-hardening.md) added. Specifically (07 verified these end-to-end in a browser; they want to be unit tests):
  - `?r=2-3000` decodes to 60 rows / 3000 beams; `?r=2-3001` decodes to `[]` (over `MAX_BEAMS`, dropped rather than truncated).
  - Split boundaries: count 50 → one row, 51 → 50+1, 100 → 50+50, 192 → 50+50+50+42. Total beams preserved in every case.
  - A size above `MAX_SIZE` survives decode (it must reach `infeasibleBeams`, because the design page links here saying exactly that) — `?r=80-2~60-1~30-2&u=60`.
  - Sizes below `MIN_SIZE`, unparseable pairs, `?r=` empty string, `2-3-4`, `-5-3`.
  - `tryParseUnlimited`: `'30'`/`'60'`/`'false'` parse, anything else → null → caller's default; `parseUnlimited` throws.
- [ ] Add a `placed + waste === stock used` invariant test with a **non-empty** `infeasibleBeams` — that's the case the old `totalRequiredLength` summary got wrong.
- [ ] `getRequiredBeamsFromParts`: a parts fixture with float drift (`1.9999999999999991` and `2.000000000000001`) must group into one row of the rounded size. Task 07 hit this in `lumber-rack`.
- [ ] Second target, if appetite remains: `app/_components/design/designs-to-catalogue.ts` and `getRequiredBeamsFromParts` (the review verified the math against the engine — `spec.lengthInGrids` / `'gridbeam'` type filtering — so tests here lock in verified-correct behavior). Fixture: a small hand-built parts array, not a full engine render.
- [ ] Wire `pnpm test` into whatever CI runs (check `.github/workflows/` for the build workflow) so it actually gates.

## Notes

- Per CLAUDE.md: identify specific edge cases worth covering; no tests for coverage's sake; layout/styling components don't need unit tests.
- Wiggle room: if Vitest fights the ESM/TS setup for some reason, `node:test` + `tsx` is an acceptable zero-dep fallback — the tests matter more than the runner.
- Legacy test locations to check (paths from the review): `../node-modules/packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.test.ts` and `.../src/shared.test.ts` — update the `../node-modules` checkout first (stream README point 4).

## Depends on

- Nothing hard. `./07-cutting-planner-hardening.md` adds cases here when it lands (either order works).

## Files

- `package.json`, new `vitest.config.ts` (or inline config), `app/tools/cutting-planner/algorithm.test.ts` (new)
- Legacy: `../node-modules/packages/applet-cutting-planner/src/`
