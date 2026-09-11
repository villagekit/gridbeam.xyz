---
title: "getRequiredBeamsFromParts: raw lengthInGrids keys in ascending order to required-beams.ts with Math.round and a descending sort"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:249-266` a private function keyed on `spec.lengthInGrids`, `Object.entries` (ascending integer keys).

## Current

`app/_components/design/required-beams.ts:7-27` exported, `Math.round(spec.lengthInGrids)` (comment `:12-16`), `.sort((a, b) => b.size - a.size)` (comment `:21-23`); tested in `required-beams.test.ts`.

## Verdict

## Log

- 2026-09-12: Template. The plan's numbers were checked equal on the three sampled designs.
