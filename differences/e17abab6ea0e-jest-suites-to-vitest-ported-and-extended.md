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
