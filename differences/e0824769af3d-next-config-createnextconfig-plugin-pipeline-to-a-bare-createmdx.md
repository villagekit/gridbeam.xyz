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

- 2026-09-26: Plan 4f6f086c accounts for each piece and leaves this item in regression by the plan's own rule. Present: pageExtensions; the hand transpilePackages list (no packages/ to discover here); svgr as turbopack.rules['*.svg'] with @svgr/webpack, so the Current field's 'no svgr' is stale; legacy's @swc/wasm entry is gone with the build-time compile it served (item 9d4e2e43543e). Overtaken by the app router (rule 4): @next/mdx's providerImportSource, which @next/mdx@15.5.18 defaults to next-mdx-import-source-file and resolves to the root mdx-components.tsx (webpack branch index.js:31-36; the Turbopack branch index.js:50-67 aliases it to @vercel/turbopack-next/mdx-import-source). Nothing to act on: the lodash to lodash-es alias and modularizeImports, package.json naming no lodash package. Not restored: @next/bundle-analyzer (ANALYZE) and DuplicatePackageCheckerPlugin (DEDUPE), both webpack plugins; next build --turbopack never runs a webpack config (next/dist/build/index.js takes the turbopackBuild branch; turbopack-warning.js:172-175 only warns). They come back only through a webpack build (next build without --turbopack, plus a webpack svgr rule), a bundler choice no decision records: the operator sanctions this item under rule 5 or decides the bundler.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[77cf83a1285a]] at the finish of the shell record [[a78b167170b8]] (decision 40abdb2f222a); the state stays until the operator judges it.
