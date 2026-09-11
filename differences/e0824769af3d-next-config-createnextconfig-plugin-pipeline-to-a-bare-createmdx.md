---
title: "next.config: createNextConfig plugin pipeline to a bare createMDX"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`packages/dev-next-config/src/index.mjs:14-94`: `createNextConfig` composes `@next/bundle-analyzer`, `@next/mdx` (`providerImportSource: '@mdx-js/react'`), monorepo `transpilePackages` discovery, `DuplicatePackageCheckerPlugin` (`DEDUPE=true`), lodash to `lodash-es` aliases and `next-plugin-svgr`; `apps/gridkit/next.config.mjs:13-22`.

## Current

`next.config.ts:1,11-22,29-31`: `createMDX()` with no options and a hand-maintained `transpilePackages` list; no analyzer, duplicate checker, lodash alias or svgr.

## Verdict

## Log

- 2026-09-12: The webpack-bound plugins cannot run under `next build --turbopack`, but rule 4 covers what the migration forces, not the choice of Turbopack; the closing plan says which pieces still apply.
