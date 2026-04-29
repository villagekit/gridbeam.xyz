# 05 — Publish runtime packages to npm

**Status:** TODO

## Why
Until the engine packages are on npm, the only way to consume them is via git submodule + workspace. That's fine for the gridbeam.xyz site (which already has the submodule), but blocks any third party from using the engine. Publishing makes it real open source.

## What
Every public runtime package published to npm under the `@villagekit` scope. CI in place to publish on tag.

## Steps
- [ ] Confirm `@villagekit` npm scope is owned. (Same check as Stream 02 task 08 — coordinate.) No collision: the engine's `core/ui` is removed by task 08.
- [ ] List packages to publish:
  - `@villagekit/design`
  - `@villagekit/parameters`
  - `@villagekit/part`
  - `@villagekit/product`
  - `@villagekit/sandbox`
  - `@villagekit/part-gridbeam`, `@villagekit/part-gridpanel`, `@villagekit/part-fastener`
  - `@villagekit/product-kit`
  - `@villagekit/kit-plugin-smart-fasteners`
  - `@villagekit/util-math`, `@villagekit/util-units`
- [ ] **Note: `@villagekit/ui` is NOT in this list.** That name is owned by the standalone library at `./ui`. The engine's old `core/ui` package was removed in task 08.
- [ ] Already using Lerna-Lite (`packageManager` already supports it via `lerna.json`). Run `pnpm version:bump` for the next release.
- [ ] Add `.github/workflows/release.yml`: on tag, run `pnpm run build:pkg`, then `pnpm publish -r --filter '@villagekit/*' --no-git-checks`.
- [ ] Add `NPM_TOKEN` secret to the GitHub repo.
- [ ] Test publish to a beta/dist-tag first: `pnpm publish -r --tag beta`.
- [ ] Verify install: in a fresh project, `pnpm add @villagekit/sandbox @villagekit/product-kit`, run a smoke test.
- [ ] Promote beta → latest.

## Notes
- The bundled creators (parts have a `dist-bundles/creator.js` for runtime sandboxing) need their export paths to make it through publint. Inspect closely.
- Consumers will need peer deps installed (`react`, `three`, `@react-three/fiber`, `xstate`). Document this in each package's README.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md)
- [./04-deps-and-build-audit.md](./04-deps-and-build-audit.md) — clean build before publish
- [./08-migrate-engine-to-chakra-v3.md](./08-migrate-engine-to-chakra-v3.md) — `core/ui` must be removed before publish, so it doesn't go to npm
