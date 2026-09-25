---
title: "next.config: test each @villagekit package's need for transpilePackages, correct the comment"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
`next.config.ts`'s `transpilePackages` list and the comment above it say the published `@villagekit/*` packages ship TypeScript sources at their top-level `exports`, and that the build dies without the list. Every package at the versions `pnpm-lock.yaml` pins resolves `.` to `dist/index.js` (`node_modules/@villagekit/ui/package.json`, `exports["."]`, 1.2.0; the shell record `a78b167170b8`'s Log and the next.config slice `4f6f086c5d77`'s Outcome flagged it, and CLAUDE.md's ui row was corrected at the record's finish, decision `40abdb2f222a`). This slice finds out, package by package, whether the list is still needed, and leaves the list and the comment saying what is true. Minted beside the shell record; a site-side change, no publish involved.

## Work

For each entry in `transpilePackages` (`@villagekit/parameters`, `part`, `part-fastener`, `part-gridbeam`, `part-gridpanel`, `plugin-smart-fasteners`, `product`, `product-kit`, `sandbox`, `ui`): remove it, run `timeout 900 just build`, and record whether the build passes and whether `pnpm dev` serves `/`, `/designs/shelf-tower` and `/tools/cutting-planner` with no module or `'use client'` error. Read each package's `package.json` `exports` and `dist/` in `node_modules` first: a package whose `dist` is ESM with `'use client'` directives, CSS or JSX may still need transpiling for a reason other than TypeScript sources; name the reason found. Keep an entry the test shows is needed, with a comment naming its reason; drop the ones the test shows are not, or keep the whole list with a comment that states the true reason, whichever the evidence gives. The legacy site's `createNextConfig` discovered the monorepo's packages for `transpilePackages` (`e0824769af3d`'s Log), so a list that stays is legacy's shape on a hand list.
Verify first: `node -e 'console.log(require("./node_modules/@villagekit/ui/package.json").exports["."])'` prints the `dist` paths.
Docs: CLAUDE.md's ui and gridkit rows, if the transpile clause changes.
Not this slice: the bump plan `99f2fe62c62f`, which re-runs the gate against the published packages after the publish and re-checks the list if the packages' `exports` change.

## Seams under test

None pure; the proof is the build and a served page per removal.

## Done when

- The Outcome holds a table, one row per package: kept or dropped, and the reason the build or the served pages gave
- The comment above `transpilePackages` in `next.config.ts` states what is true of the published packages at the pinned versions
- `pnpm dev` serves `/`, `/designs/shelf-tower` and `/tools/cutting-planner` with no console error after the change
- `timeout 900 just check` is green

## Outcome

## Log
