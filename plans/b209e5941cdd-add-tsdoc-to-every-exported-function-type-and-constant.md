---
title: Add TSDoc to every exported function, type and constant
status: todo
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found nearly every export undocumented.

## Work

Rule: the `typescript` skill, "Doc comments": "Public items have TSDoc: one `/** ... */` paragraph on each exported function, type and constant, in the `simple-english` skill's register, saying what the caller gets and when it throws or returns an error."

Places: 149 of 153 exports, among them `app/tools/cutting-planner/algorithm.ts:38` and `:84`, `app/tools/cutting-planner/url-codec.ts:53`, `:98` and `:151`, `app/_lib/designs.ts:22` and `:37`, `app/_lib/stories.ts:177` and `:181`, `app/_lib/cloudinary.ts:19` and `:28`, `app/_components/design/required-beams.ts:7`, `app/_components/design/designs-to-catalogue.ts:39`, `app/_components/cutting-plan/CutBeamSvg.tsx:110`, `scripts/audit-dom/normalize.ts:10`; found by `rg -n -B1 '^export (default )?(async )?(function|const|type|interface)' app content scripts mdx-components.tsx` and checking the line above for `*/`.

Fix: one TSDoc paragraph per export, what the caller gets and when it throws or returns an error, in plain English. The operator sets the scope: every export, or the pure modules first (the planner, the codecs, the catalog, the loaders) with the route components' default exports left bare. A route the M2 records re-port from legacy gets its comments in that re-port; this plan covers what stays.

## Seams under test

None.

## Done when

- The grep above finds no export without a `/** ... */` above it, within the scope the operator set
- `timeout 900 just check` is green

## Outcome

## Log
