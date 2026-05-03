# 05 — Publish runtime packages to npm

**Status:** BLOCKED — see "Discovered blockers" below.

## Why
Until the engine packages are on npm, the only way to consume them is via git submodule + workspace. That's fine for the gridbeam.xyz site (which already has the submodule), but blocks any third party from using the engine. Publishing makes it real open source.

## What
Every public runtime package published to npm under the `@villagekit` scope. CI in place to publish on tag.

## Discovered blockers

Two interrelated issues found 2026-05-04 surfaced when verifying the publish pipeline end-to-end:

1. **Engine standalone install is broken since the Chakra v3 migration (commit `0b79bc6`).**
   - Engine packages declare `"@villagekit/ui": "workspace:*"`, but `@villagekit/ui` lives in the separate `./ui` repo. Inside the top-level `gridbeam.xyz` monorepo `pnpm-workspace.yaml`, both are wired together so dev works.
   - In the engine's standalone repo (`villagekit/gridkit`), `pnpm install` errors with `ERR_PNPM_WORKSPACE_PKG_NOT_FOUND` because no `@villagekit/ui` package exists in its workspace.
   - This means `villagekit/gridkit`'s `checks.yml` and `release-npm.yml` workflows are currently broken — both call `pnpm install` via `setup-pnpm`. The `pnpm-lock.yaml` in the engine repo is also stale (it predates the React 19 / Chakra v3 / xstate-6 / storybook-10 bumps).
2. **`@villagekit/ui` hasn't been published yet.** Stream 02 task 08 is "DONE (infra landed; awaiting trusted-publisher config on npmjs.com + first CI publish)" — until that first publish, engine packages can't depend on a real `^x.y.z` version of it.

The fix sequence (cannot proceed until step 1 is done by Mikey):
1. **First, finish Stream 02 task 08** — get `@villagekit/ui` published to npm at e.g. `0.1.0`.
2. Inside the engine repo, change every `"@villagekit/ui": "workspace:*"` to `"@villagekit/ui": "^0.1.0"` (or whatever version ships). pnpm in the top-level monorepo will still link locally because of workspace-protocol fallthrough; the engine's standalone CI will fetch from npm.
3. Regenerate `gridkit/pnpm-lock.yaml` and commit. Verify `checks.yml` goes green.
4. Then everything below (versioning, tagging, publish) becomes unblocked.

## Steps
- [ ] Confirm `@villagekit` npm scope is owned. (Same check as Stream 02 task 08 — coordinate.) No collision: the engine's `core/ui` is removed by task 08.
- [ ] List packages to publish (verified against the actual `package.json` `name` field):
  - `@villagekit/design`
  - `@villagekit/parameters`
  - `@villagekit/part`
  - `@villagekit/product`
  - `@villagekit/sandbox`
  - `@villagekit/part-gridbeam`, `@villagekit/part-gridpanel`, `@villagekit/part-fastener`
  - `@villagekit/product-kit`
  - `@villagekit/plugin-smart-fasteners` (Note: actual package name; the `kit-` prefix in the original task notes was aspirational)
  - `@villagekit/math`, `@villagekit/units` (Note: actual package names; the `util-` prefix in the original task notes was aspirational)
- [ ] **Note: `@villagekit/ui` is NOT in this list.** That name is owned by the standalone library at `./ui`. The engine's old `core/ui` package was removed in task 08.
- [ ] Already using Lerna-Lite (`packageManager` already supports it via `lerna.json`). Run `pnpm version:bump` for the next release.
- [x] `.github/workflows/release-npm.yml` already exists from earlier prep work. Triggers on `v*` tag push, runs `pnpm run build:pkg`, then `pnpm dlx lerna publish from-git --yes`. Has `id-token: write` permission already. Uses `NPM_TOKEN` (OIDC fallback). Two cleanups still pending:
  - [ ] **Typo:** `NPM_CONFIG_ACCCESS` (3 C's) → `NPM_CONFIG_ACCESS` (2 C's). Currently sets a no-op env var.
  - [ ] **Provenance:** uncomment `NPM_CONFIG_PROVENANCE: true` once the engine repo is confirmed public on GitHub (it appears to be — the README and renamed-repo task imply public release intent).
- [ ] Configure npm trusted publisher (OIDC) for each `@villagekit/*` engine package on npmjs.com (or fall back to `NPM_TOKEN` until pnpm supports OIDC).
- [ ] Test publish to a beta/dist-tag first: `pnpm publish -r --tag beta`.
- [ ] Verify install: in a fresh project, `pnpm add @villagekit/sandbox @villagekit/product-kit`, run a smoke test.
- [ ] Promote beta → latest.

## Notes
- The bundled creators (parts have a `dist-bundles/creator.js` for runtime sandboxing) need their export paths to make it through publint. Inspect closely.
- Consumers will need peer deps installed (`react`, `three`, `@react-three/fiber`, `xstate`). Document this in each package's README.
- The engine repo at `villagekit/gridkit` does not have a top-level CI status badge — verify its current `checks.yml` runs (it likely fails) and address as part of the unblock sequence above.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md)
- [./04-deps-and-build-audit.md](./04-deps-and-build-audit.md) — clean build before publish
- [./08-migrate-engine-to-chakra-v3.md](./08-migrate-engine-to-chakra-v3.md) — `core/ui` must be removed before publish, so it doesn't go to npm
- [../02-ui-library/08-publish-npm.md](../02-ui-library/08-publish-npm.md) — **first publish of `@villagekit/ui`** must happen before this task can proceed; engine packages need a real npm version to depend on instead of `workspace:*`
