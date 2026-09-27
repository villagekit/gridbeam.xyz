---
title: Jest suites to Vitest, ported and extended
status: sanctioned
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

Jest (`jest.config.js`, `@swc/jest`, jsdom): `packages/applet-cutting-planner/src/shared.test.ts` (three describes) and `src/algorithms/first-fit-decreasing.test.ts` (four cases).

## Current

Vitest (`vitest.config.ts`, `environment: 'node'`): `app/tools/cutting-planner/algorithm.test.ts` (277 lines; every legacy fixture reproduced verbatim under "ported from legacy" describes, plus the infeasible-cut fix, the 30 gu top-up, degenerate input and the summary totals) and `url-codec.test.ts` (283 lines, no legacy counterpart).

## Verdict

rule: operator (CLAUDE.md tech stack: Vitest; the legacy suites are ported verbatim, the additions cover the added code)

## Log

- 2026-09-28: The Current above is stale since plan 40179a428ba3: url-codec.test.ts went with the share-link URL state (plan c273dfed7e26), and algorithm.test.ts is now legacy's two files, app/tools/cutting-planner/shared.test.ts (legacy's three describes verbatim) and app/tools/cutting-planner/algorithms/first-fit-decreasing.test.ts (legacy's four cases verbatim, then the extensions in their own describes below: the negative remainder legacy's algorithm produces on a cut longer than the top-up beam, the hand-supplied long stock, the 30 gu top-up and the degenerate inputs). The three cases that asserted the removed guard went with it.
