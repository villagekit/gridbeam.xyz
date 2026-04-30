# 10 — `tsup` install + `dist/` build

**Status:** TODO

## Why
`./ui/package.json` declares `"build:pkg": "tsup src"` and uses `publishConfig.exports` to redirect npm consumers to `./dist/*` — but `tsup` is not in `devDependencies` and `./dist/` does not exist. Workspace consumption works (the `exports` field points at `./src/index.ts` for dev), but `pnpm publish` will produce a broken package today. Required before Stream 02 task 08 can run.

Tracked as a follow-up in Stream 01 task 01 and Stream 02 task 02 — promoted to its own task since it's a real publish blocker.

## What
`./ui` builds a clean `dist/` via `tsup`, with the multiple sub-path bundles (main + `./mdx`) the export map promises. `pnpm run build:pkg` is green; `pnpm run publint` is green.

## Steps
- [ ] Add `tsup` to `./ui/devDependencies` (latest stable). Run `pnpm install`.
- [ ] Add a `tsup.config.ts` with the right entrypoints:
  - main: `src/index.ts`
  - mdx sub-path: `src/mdx/index.ts` (only after Stream 02 task 06 ships — leave commented until then)
- [ ] Configure `tsup` for ESM-only, with `.d.ts` emission and source maps.
- [ ] Run `pnpm run build:pkg`; verify `dist/index.js`, `dist/index.d.ts`, and the mdx sub-path bundle (once 06 lands).
- [ ] Run `pnpm run publint` against the built output; fix any export-map warnings.
- [ ] Confirm Storybook still resolves the source (it should — stories import from `../src` directly, not the package).
- [ ] Spot-check that workspace consumption still works: `pnpm -w run typecheck` from the gridbeam.xyz root.
- [ ] Add `dist/` to `.gitignore` if not already.

## Notes
- The `'use client'` directives matter here too — `tsup` should preserve them in the bundled output. Verify with `head -1 dist/...` per-file. (Use `tsup --banner` or the `esbuildOptions.banner` config if needed — Next.js consumers rely on the directive surviving the bundle.)
- Sub-path exports (Stream 02 task 06) require `tsup` to emit separate bundles. If task 10 ships before 06, leave the sub-path config commented and add it when 06 lands.
- Could alternatively switch the build away from `tsup` to `tsc -p .` — simpler, but loses bundling and the `.d.ts` rollup. Recommend sticking with `tsup`.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./09-use-client-audit.md](./09-use-client-audit.md) — directives must exist before the build can preserve them
