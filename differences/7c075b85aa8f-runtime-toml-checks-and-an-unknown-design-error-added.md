---
title: Runtime TOML checks and an Unknown design error added
status: open
route: /designs
axis: code
kind: added
---
## Legacy

`packages/designs/src/index.ts:25-26,42` a `// @ts-ignore` destructure and a bare `as ProductMeta` cast; an unknown id is unreachable (`apps/gridkit/pages/designs/[id].tsx:288-295`, `fallback: false`), so a missing file would surface as a raw `readFile` error.

## Current

`scripts/generate-designs-data.mjs:41-47` throws on a missing `[product]` table or a non-string `exports`; `app/_lib/designs.ts:37-41` throws `Unknown design: ${id}`, caught by `app/designs/[id]/page.tsx:45-49` (`notFound()`) and `:24-38` (`Design not found`).

## Verdict

## Log
