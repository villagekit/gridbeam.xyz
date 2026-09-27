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

- 2026-09-27: At the designs index record's split (plan f901cf9f724d): named on the verdicts plan [[549ec777422c]] for the operator (decision 40abdb2f222a), the fix being a hosting change: OpenNext's default incremental cache is dummy (node_modules/@opennextjs/cloudflare/dist/api/config.js:45) and open-next.config.ts configures none, so a prerendered page renders again on the Worker per request and a build-time readdir there fails; the disk read needs staticAssetsIncrementalCache in open-next.config.ts, under 91cbeac8a3fd. The library slice [[79cec2c9c850]] gives the module legacy's shape and leaves the module. The state stays regression until judged there.
