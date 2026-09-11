---
title: "getDesign return shape: code and meta to id, meta, code and an unused image"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`packages/designs/src/index.ts:34-69` returns `{ code, meta }` after a bare `as ProductMeta` cast; an unknown id is unreachable (`fallback: false`).

## Current

`app/_lib/designs.ts:15-20,37-43` returns `{ id, meta, code, image }`; `image` is computed for every request and never read by the page (`app/designs/[id]/page.tsx:51` destructures `meta` and `code`).

## Verdict

## Log
