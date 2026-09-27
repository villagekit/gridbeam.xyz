---
title: Share the parity tooling's route helpers, test them, log with fields
status: done
blocked_by:
  - target: d04ec0d664be
    strength: soft
    note: the port to TypeScript first, so the helpers' module and test are written once
worker: opus
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found three rules broken in the parity tooling under `scripts/`.

## Work

Rules and places:

- `CLAUDE.md, Conventions`, "Library first: anything a second app could use belongs in a package; two callers make a seam": `scripts/rebuild-audit-index.mjs:18` (a private `WIDTHS`), `:63` (a private copy of `routeToSlug`) and `:68` (a second index renderer), where `scripts/audit-shared.mjs:25` and `:102` and `scripts/audit-pages.mjs:52` hold the originals.
- `CLAUDE.md, Testing`, "TDD applies in full to pure, deterministic code": the routes-file line grammar with its `legacy-only` / `current-only` markers (`scripts/audit-shared.mjs:79`), `routeToSlug` (`:102`), its inverse `slugToRoute` (`scripts/rebuild-audit-index.mjs:36`) and the index ordering (`:46`) have no test.
- `CLAUDE.md, Tracing`, "Structured fields ... over string interpolation": `scripts/generate-designs-data.mjs:76`, `scripts/audit-dom.mjs:154` and `:155`, `scripts/audit-shared.mjs:40`, `:68` and `:87` build their `console.info` and `console.error` messages by interpolation, where `scripts/audit-shared.mjs:117` shows the fields form; only the scripts' `console.log` progress lines are excepted.

Fix: one module of the pure helpers beside a `*.test.ts` that pins them, the round trip included; `rebuild-audit-index` importing from it and sharing one index renderer with `audit-pages`; the six log calls passing a fields object with a fixed message.

Not this slice: the port of the scripts to TypeScript, its sibling, which this one is soft-ordered after.

## Seams under test

The routes-file grammar, `routeToSlug` and `slugToRoute`, and the index ordering, as pure functions.

## Done when

- `pnpm test` runs a test file for the parity tooling's helpers and it passes
- `grep -n "console\.\(info\|warn\|error\)(\`" scripts/` prints nothing
- `timeout 900 just check` is green

## Outcome

The parity tooling's pure route helpers live in one module, `scripts/audit-routes.ts`, beside `scripts/audit-routes.test.ts` (15 tests): `parseRoutes`, the routes-file grammar with its `legacy-only` / `current-only` markers, now pure and returning a result (`{ ok: true, routes }` or `{ ok: false, line, text }`, the line numbered from one); `routeToSlug` and its inverse `slugToRoute`, the round trip pinned; `orderRoutes`, the index ordering, returning a new array. The `Side` type, `SIDES` and `RouteEntry` moved there from `scripts/audit-shared.ts`, whose `loadRoutes` now reads the file, calls `parseRoutes` and stops the run on an error; `audit-dom.ts` and `audit-pages.ts` import the moved names from the new module.

`scripts/audit-shared.ts` holds one `renderIndexHtml`, taken from `audit-pages.ts` and given a `cell(route, width, side)` callback that says whether each screenshot exists and its HTTP status. `audit-pages.ts` passes its capture results; `rebuild-audit-index.ts` passes a file-exists check, reads its widths from `DEFAULTS.widths` (the same 375, 768 and 1280 as its private `WIDTHS`) and keeps no private copy of `routeToSlug`, `slugToRoute`, the ordering or the renderer. The finding the sibling port d04ec0d664be left here, the inline `'legacy' | 'current'`, goes with its renderer: the shared one takes `Side`.

The six interpolated log calls pass a fields object with a fixed message: `generate-designs-data.ts` (`{ designs, path }`), `audit-dom.ts`'s failure summary (one `{ failed }` line, then one `{ route, side, error }` line per failed capture) and the three errors in `audit-shared.ts` (`{ argument }` twice, `{ routesFile, line, text }` for a bad routes line, which no longer prints as `file:line:`).

Behavior against the scripts at `4a03a98`: the slugs, the grammar, the ordering and the `audit/<slug>/` layout are unchanged, so existing pairs stay valid. The one output change: the index `rebuild-audit-index.ts` writes now carries the `.status` CSS rule, unused there, since it never knows a status. The "capture failed" text in `audit-pages.ts` keeps the em dash it already had; the line moved, it was not written here.

Proof: `pnpm test` runs `scripts/audit-routes.test.ts` (red before the module existed, then green; 89 tests in all); `grep -rn "console\.\(info\|warn\|error\)(\`" scripts/` prints nothing; against a running `pnpm dev`, `pnpm audit:pages --routes <file> --widths 1280` and `pnpm audit:dom --routes <file>` on `/faq` captured 2/2 each, a `current-only` route that 404s printed the new failure lines and exited 1, a bad marker, an unknown argument and a missing value each printed their fields and exited 1, `predev` printed the generator's new line, and `node scripts/rebuild-audit-index.ts` rebuilt the index with 28 routes; `timeout 900 just check` green, the drift check included, with the dev server stopped. No route changed (the Parity review confirmed the generated designs data byte-identical), so no screenshot pair beyond `/faq` was needed.

Reviews: Standards asked for TSDoc on `Side`, `SIDES` and the rewritten `loadRoutes`, applied. Dropped: moving `renderIndexHtml` into the pure module (Standards and Spec both judged its place with the shared script code fine); TSDoc on `REPO_ROOT`, `DEFAULTS`, `parseArgs` and `gotoSettled`, which predates this change; the new module's name beside `audit-routes.txt` (Spec), kept since it reads that file's grammar and CLAUDE.md's Structure names both.

## Log

- 2026-09-28: The scripts this plan cites as `scripts/*.mjs` are now `scripts/*.ts` (plan d04ec0d664be), each renamed with the same behavior and typed under strict; read the paths and line numbers against the `.ts` files.
