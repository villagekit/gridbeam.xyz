---
title: Share the parity tooling's route helpers, test them, log with fields
status: todo
blocked_by:
  - target: d04ec0d664be
    strength: soft
    note: the port to TypeScript first, so the helpers' module and test are written once
tags:
  - "worker:opus"
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

## Log
