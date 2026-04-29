# 08 — Migrate engine to Chakra v3 + remove `core/ui`

**Status:** TODO

## Why
Two intertwined changes that are cheaper to do at the same time:

1. **Remove `gridkit/core/ui`.** It's a Chakra UI wrapper specific to the engine but overlaps with the standalone `./ui` library (`@villagekit/ui`). Decision: there's only one `@villagekit/ui`, and it's the standalone one. Engine consumers will depend on it directly.
2. **Migrate the engine to Chakra v3.** The standalone `@villagekit/ui` is on Chakra v3 (Stream 02). For the engine to consume it, every engine package using Chakra has to come along.

Doing both together avoids migrating `core/ui` to v3 only to delete it later.

## What
- `gridkit/core/ui/` deleted from the workspace.
- All engine consumers (`apps/studio`, `apps/storybook`, possibly `core/parameters`, `core/sandbox`, `core/design`) updated to import from the standalone `@villagekit/ui` (Chakra v3).
- All engine code that directly used Chakra v2 APIs (extendTheme, multipart components, removed hooks) migrated to v3.
- Studio app + storybook app render correctly under v3.

## Steps

### Inventory
- [ ] Find every consumer of the engine's `@villagekit/ui`:
  ```sh
  grep -rl '"@villagekit/ui"' gridkit/ --include 'package.json'
  grep -rl '@villagekit/ui' gridkit/ --include '*.ts' --include '*.tsx' | grep -v node_modules
  ```
- [ ] Find every direct Chakra v2 import in the engine:
  ```sh
  grep -r '@chakra-ui/' gridkit/ --include '*.ts' --include '*.tsx' | grep -v node_modules
  ```
  Most should be inside `core/ui` (which is going away), but `apps/studio` likely has direct Chakra usage too.

### Switch consumers off the local `core/ui`
- [ ] In each consumer's `package.json`, change `"@villagekit/ui": "workspace:*"` (currently resolving to `core/ui`) so it resolves to the standalone library:
  - Add `./ui` to the engine's `pnpm-workspace.yaml`? Probably no — the standalone is at the top level of `gridbeam.xyz` repo, not inside `./gridkit`.
  - Easier: temporarily put the standalone version on npm (Stream 02 task 08) and depend on a published version. Cleaner long-term.
  - Or: in development, set `dependenciesMeta` `injected: true` in `pnpm-workspace.yaml` so the top-level `pnpm-workspace.yaml` (covering both `./ui` and `./gridkit/...`) does the linking.
- [ ] Verify imports compile: `pnpm run types`.

### Migrate the engine to Chakra v3
- [ ] In each consumer that uses Chakra v3 surface (Provider, hooks, primitives), update to v3 idioms.
- [ ] If `apps/studio` had a custom Chakra theme, port it from `extendTheme` to `createSystem`.
- [ ] Verify Storybook (`apps/storybook`) renders.
- [ ] Verify studio app (`pnpm run dev:app:studio`) renders.

### Delete `core/ui`
- [ ] Remove `gridkit/core/ui/` directory.
- [ ] Verify `pnpm-workspace.yaml` (which globs `core/*`) no longer references it (the glob handles this automatically).
- [ ] Update `gridkit/turbo.json` if it has explicit references.
- [ ] Update `gridkit/DEV.md` (drops the `@villagekit/ui` entry under `core/`).
- [ ] Update `gridkit/README.md` (drops `core/ui` from the packages list — task 02 should do this).

### Verify
- [ ] `pnpm install` clean.
- [ ] `pnpm run build:pkg` clean.
- [ ] `pnpm run types` clean.
- [ ] `pnpm run lint` clean.
- [ ] `pnpm run dev:app:studio` renders the studio app correctly with the v3 theme.
- [ ] Storybook renders.
- [ ] Commit.

## Notes
- This is a substantial task — possibly multiple days. The Chakra v3 migration alone is non-trivial; deleting a workspace package is fast but needs every consumer updated first.
- If anything in `core/ui` doesn't have a counterpart in the standalone `@villagekit/ui`, fold it in (coordinate with Stream 02). Don't lose functionality silently.
- React 19 vs 18: the standalone `@villagekit/ui` declares `peerDependencies: { react: ^19 }`. So consuming it pulls the engine to React 19. Verify `@react-three/fiber` is on a version that supports R19 (likely v9). If not, the standalone's peer dep should be relaxed to `^18 || ^19`.
- After this task, the engine has zero local Chakra wrapping — all UI components come from the standalone library.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — the standalone `@villagekit/ui` must be on v3 first
- [../02-ui-library/08-publish-npm.md](../02-ui-library/08-publish-npm.md) — preferable to consume from npm than wrestle with workspace cross-linking, but workable either way
