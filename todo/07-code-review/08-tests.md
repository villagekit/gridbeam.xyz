# 08 — Test infrastructure: Vitest + port legacy cutting-planner suites

**Status:** DONE (2026-08-06)

## Why

The repo has **no test runner, no test script, zero `*.test.ts` files** — while CLAUDE.md names the cutting planner, designs-catalog logic, and engine math as the highest-value test targets. Legacy had Jest suites: `first-fit-decreasing.test.ts` (4 cases incl. the infeasible path) and `shared.test.ts` (3 helper cases) in `../node-modules/packages/applet-cutting-planner/`. The ported algorithm was *modified* (infeasible-cut fix, configurable 30/60 stock) — exactly the situation where the tests should have come along. `todo/01-website/07-cutting-planner.md:38,43` admits verification was done via throwaway `pnpm dlx tsx` one-shots, and the Vitest follow-up was never actioned.

## What

Vitest wired into the repo (`pnpm test` script, CI-runnable), the legacy suites ported, plus cases for the behavior that changed since legacy.

## Steps

- [x] Confirm there's still no test setup (`package.json` scripts, any vitest/jest config) before adding one. — confirmed: no runner, no config, no test files, and no CI of any kind.
- [x] Add Vitest (devDep) with minimal config — the targets are pure TS functions, no DOM/component testing needed initially; don't add jsdom/testing-library until something needs it.
- [x] Port `first-fit-decreasing.test.ts` and `shared.test.ts` from `../node-modules/packages/applet-cutting-planner/` against `app/tools/cutting-planner/algorithm.ts`. Cite the source with a SHA-pinned GitHub URL per CLAUDE.md convention. Expect the 4 algorithm cases to pass unchanged (the review hand-traced them to byte-identical output); if one fails, **investigate before "fixing"** — per CLAUDE.md testing rules, the test may be catching a real divergence. — the 4 algorithm cases passed unchanged. One *helper* case failed and was catching a real divergence; see Notes.
- [x] Add cases for post-legacy behavior: cut size > unlimited-stock size → lands in `infeasibleBeams` (the new fix; legacy emitted negative remainders); 30 gu stock option; empty required input; zero/negative counts. — note the 30 gu option is post-legacy only in the *UI*; legacy's algorithm already took `hasUnlimitedStock?: false | 30 | 60`.
- [x] Add URL-codec tests for the planner: `encodeQuotas`/`decodeQuotas` round-trip, malformed input, and the bounds that [task 07](./07-cutting-planner-hardening.md) added. Specifically (07 verified these end-to-end in a browser; they want to be unit tests):
  - `?r=2-3000` decodes to 60 rows / 3000 beams; `?r=2-3001` decodes to `[]` (over `MAX_BEAMS`, dropped rather than truncated).
  - Split boundaries: count 50 → one row, 51 → 50+1, 100 → 50+50, 192 → 50+50+50+42. Total beams preserved in every case.
  - A size above `MAX_SIZE` survives decode (it must reach `infeasibleBeams`, because the design page links here saying exactly that) — `?r=80-2~60-1~30-2&u=60`.
  - Sizes below `MIN_SIZE`, unparseable pairs, `?r=` empty string, `2-3-4`, `-5-3`.
  - `tryParseUnlimited`: `'30'`/`'60'`/`'false'` parse, anything else → null → caller's default; `parseUnlimited` throws.
- [x] Add a `placed + waste === stock used` invariant test with a **non-empty** `infeasibleBeams` — that's the case the old `totalRequiredLength` summary got wrong.
- [x] `getRequiredBeamsFromParts`: a parts fixture with float drift (`1.9999999999999991` and `2.000000000000001`) must group into one row of the rounded size. Task 07 hit this in `lumber-rack`.
- [x] Second target, if appetite remains: `app/_components/design/designs-to-catalogue.ts` and `getRequiredBeamsFromParts`.
- [x] Wire `pnpm test` into whatever CI runs (check `.github/workflows/` for the build workflow) so it actually gates. — there was no CI at all; added one. See Notes.

## Notes

**75 tests across four files**, all pure TypeScript — no jsdom, no testing-library, no component
rendering. `vitest.config.ts` mirrors the `@/*` path mapping from `tsconfig.json` and nothing else.
`pnpm test` runs once, `pnpm test:watch` watches.

| File | Covers |
|---|---|
| `app/tools/cutting-planner/algorithm.test.ts` | the two legacy suites verbatim, plus the port's divergences |
| `app/tools/cutting-planner/url-codec.test.ts` | the share-link codec and every bound task 07 added |
| `app/_components/design/required-beams.test.ts` | parts → beam quotas, incl. the float-drift grouping |
| `app/_components/design/designs-to-catalogue.test.ts` | catalogue mapping + filter-option ordering |

**The ported legacy tests found a real divergence — in the port, not in the tests.** All four FFD
cases and two of the three helper cases passed verbatim. `beamsToBeamQuotas` did not:
legacy grouped into a plain object keyed by size, and integer-like keys iterate in ascending
numeric order, so its output was sorted. The port used a `Map`, which preserves *encounter* order.
Since desired beams are packed largest-first, that silently reversed the "Infeasible cuts" table —
a visible regression that the earlier hand-tracing had written off as cosmetic
(`07-cutting-planner-hardening.md`, last bullet). Fixed in the port by sorting ascending, which is
also better-defined than legacy's: legacy's key ordering only sorts *integer-like* keys and would
have appended a fractional size in insertion order. Verified in the browser as well as in the
suite — `?r=90-1~70-2~80-1` now lists 70, 80, 90 rather than 90, 80, 70. Note that only the
*helper* test catches the raw regression; the ordering is also asserted at the
`firstFitDecreasing` level, which is where the symptom was.

**Two extractions, both to make untested code testable without a DOM:**

- `app/tools/cutting-planner/url-codec.ts` — the codec, its bounds, and `parseUnlimited`, lifted
  out of the `'use client'` component. It is the planner's only untrusted input and the page plans
  on mount, so it is the part most worth testing; testing it in place would have meant importing
  Chakra and `next/navigation` into a unit test.
- `app/_components/design/required-beams.ts` — `getRequiredBeamsFromParts`, out of
  `DesignCuttingPlan.tsx` for the same reason. Its fixture is three hand-built parts, not an
  engine render.

Neither extraction changed behaviour. Both were re-verified against a production build with the
task 07 scripts (`planner-check.mjs` 13/13, `design-plan-check.mjs` 5/5, `clamp-check.mjs`).

**The decode got stricter while writing its tests.** `2-3-4` decoded as 2×3 and
`1.9999999999999991-8` as size 1 — `Number.parseInt` reads the leading digits and discards the
rest. Both are wrong plans that render as confidently as right ones, which is the exact failure
mode task 07 spent two review rounds on; the float-drift one is the very string task 07 stopped
`DesignCuttingPlan` from emitting. A pair is now matched whole against `/^(\d+)-(\d+)$/`, so
anything that isn't two plain integers is rejected and reported through the existing "out of
range" notice.

**A round-trip hole the stricter decode exposed.** A fractional size in the table produces
`?r=10.5-2` — a link the planner's own decoder rejects, showing "out of range" over a plan the
user had just made. Nothing in the widget prevents one: `step` doesn't snap the value and
`clampValueOnBlur` only clamps to `min`/`max`, so `?r=10.5-2` was reachable (demonstrated by
setting the field's value directly, as autofill does). Both number inputs now `Math.round`, which
is the same rounding `getRequiredBeamsFromParts` already does and the same class of assumption
task 07 found misplaced in `clampValueOnBlur`. The decode gained a matching
`Number.isSafeInteger` guard, so `?r=9007199254740993-1` is rejected rather than quietly becoming
…992.

**There was no CI to wire into.** The repo has no `.github/` at all; the chosen CI is Cloudflare
Workers Builds, which is a *user action* still pending
(`todo/01-website/11-deployment-and-seo.md`) and which only builds. Added
`.github/workflows/check.yml` — lint, typecheck, test, build, on pushes to `main` and on every PR.
It runs `pnpm build` **because Workers Builds isn't connected**: until it is, nothing else would
catch a change that typechecks and fails to build. That step should go when Workers Builds lands.
The build's `prebuild` regenerates `designs-data.generated.ts`, so a `git diff --exit-code` on it
afterwards also catches the committed catalogue drifting from `./products`.

**Deliberately not tested:** the FFD algorithm's internals beyond the ported cases (the port is
faithful and hand-traced; more cases would test the algorithm's design, not its implementation),
`formatLength` (a one-line `toLocaleString`), and anything that renders.
`scripts/generate-designs-data.mjs` is covered better by CI than by a unit test — its output is
committed, and the workflow now fails if regenerating changes it. `scripts/audit-pages.mjs` is a
manual parity tool writing to the gitignored `audit/`; nothing depends on it at build time.

## Depends on

- Nothing hard. `./07-cutting-planner-hardening.md` adds cases here when it lands (either order works).

## Files

- `package.json`, `vitest.config.ts`, `.github/workflows/check.yml`
- `app/tools/cutting-planner/algorithm.test.ts`, `app/tools/cutting-planner/url-codec.{ts,test.ts}`
- `app/_components/design/required-beams.{ts,test.ts}`, `app/_components/design/designs-to-catalogue.test.ts`
- Legacy: `../node-modules/packages/applet-cutting-planner/src/`
