# 10 — `tsup` install + `dist/` build

**Status:** DONE

## Why
`./ui/package.json` declares `"build:pkg": "tsup src"` and uses `publishConfig.exports` to redirect npm consumers to `./dist/*` — but `tsup` is not in `devDependencies` and `./dist/` does not exist. Workspace consumption works (the `exports` field points at `./src/index.ts` for dev), but `pnpm publish` will produce a broken package today. Required before Stream 02 task 08 can run.

Tracked as a follow-up in Stream 01 task 01 and Stream 02 task 02 — promoted to its own task since it's a real publish blocker.

## What
`./ui` builds a clean `dist/` via `tsup`, with the multiple sub-path bundles (main + `./mdx`) the export map promises. `pnpm run build:pkg` is green; `pnpm run publint` is green.

## Steps
- [x] Add `tsup` to `./ui/devDependencies` (latest stable). Run `pnpm install`. (`tsup@^8`, `publint@^0.3.18` added.)
- [x] Add a `tsup.config.ts` with the right entrypoints:
  - main: `src/index.ts`
  - mdx sub-path: `src/mdx/index.ts` (Stream 02 task 06 has shipped — included)
- [x] Configure `tsup` for ESM-only, with `.d.ts` emission and source maps.
- [x] Run `pnpm run build:pkg`; verify `dist/index.js`, `dist/index.d.ts`, and the `dist/mdx/index.{js,d.ts}` sub-path bundle.
- [x] Run `pnpm run publint` against the built output; fix any export-map warnings. (Reports "All good!".)
- [x] Confirm Storybook still resolves the source (stories import from `../src` directly, not the package).
- [x] Spot-check that workspace consumption still works: `npx tsc --noEmit` from gridbeam.xyz root passes.
- [x] Add `dist/` to `.gitignore` (already present).

## Approach taken
- `bundle: false` mode, with a glob entry `src/**/*.{ts,tsx}` — emits one output file per source file, mirroring the `src/` tree under `dist/`. This is the cleanest way to preserve `'use client'` directives: each client module remains its own boundary, marked at the top of its file. A bundled (`bundle: true`) approach would either splice directives across chunks or require manual `banner` workarounds.
- ESM-only (`format: ['esm']`), per the package's `"type": "module"`.
- DTS per file (`dts: true`), with source maps. Per-file DTS aligns with `bundle: false` and keeps deep imports working.
- `target: 'es2022'` matches `tsconfig.json`.
- The package script changed from `"tsup src"` to `"tsup"` so the config file is the source of truth.

## Verification
- `head -1 dist/components/Button.js` → `"use client";` ✓ (preserved)
- `head -1 dist/components/Accordion.js` → server-evaluable re-export, no directive ✓ (correct: Accordion wrapper has no `'use client'` per task 09 findings)
- `head -1 dist/components/Accordion.recipe.js` → no directive, server-evaluable ✓
- `dist/index.js`, `dist/index.d.ts`, `dist/mdx/index.js`, `dist/mdx/index.d.ts` all present.
- `pnpm run publint` → "All good!"

## Notes
- Sub-path exports require separate emit per entrypoint. With `bundle: false`, this is automatic — `src/mdx/index.ts` becomes `dist/mdx/index.js` naturally; no separate entry needed.
- `tsc -p .` would be simpler but emits per-file output too without the `.d.ts` rollup tsup can do — and at this point `bundle: false` tsup gives us per-file output too, so the difference is mostly cosmetic. Sticking with tsup keeps the option open to flip to `bundle: true` later if we want a tighter dist tree.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./09-use-client-audit.md](./09-use-client-audit.md) — recipes split out before the build configures multi-entry output
