---
title: "Designs data: getDesignIndexes at build from the products checkout to a committed generated module read by app/_lib/designs.ts"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:96-100` `getStaticProps` calls `getDesignIndexes(join(process.cwd(), '../../products/products'))` from `@villagekit-private/designs` (`packages/designs/src/index.ts:17-32`, `readdir` + `smol-toml`, unsorted, image via `images.ts`).

## Current

`scripts/generate-designs-data.mjs:30-76` (`predev`/`prebuild`, `package.json:13,15`) writes `app/_lib/designs-data.generated.ts`, one committed module holding every design's parsed TOML and raw `.ts` source; `app/_lib/designs.ts:22-43` (`getDesignIndex`, sorted by `label.localeCompare`, `getDesignIds`, `getDesign`) and `app/_lib/design-images.ts` read it. The script's header (`:8-12`) gives the reason: the Workers runtime cannot `readdir` at request time.

## Verdict

## Log

- 2026-09-12: Same judgement as the home's use of it, [[272613135119]]: the app-router move is rule 4, the generated module and the sort are not forced (a build-time read from disk in `generateStaticParams` would do). The hosting decision [[91cbeac8a3fd]] may lead the operator to sanction under rule 5.
