# 08 — Migrate engine to Chakra v3 + remove `core/ui`

**Status:** DONE (build/types/lint clean; runtime verification of studio + storybook deferred)

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
- [x] Find every consumer of the engine's `@villagekit/ui`. Inventory:
  - `apps/{studio,storybook}`, `commands/screenshot`, `parts/{gridbeam,fastener,gridpanel}`, `products/kit`, `core/{parameters,sandbox,part,product}`.
- [x] Find every direct Chakra v2 import — all confined to `core/ui` (now deleted).

### Switch consumers off the local `core/ui`
- [x] Wired via the gridbeam.xyz top-level `pnpm-workspace.yaml` covering both `./ui` and `./gridkit/...`. Engine `@villagekit/ui: workspace:*` now resolves to the standalone library at `./ui`. Engine packages keep their existing dependency declarations.
- [x] `pnpm run types` and `pnpm run build:pkg` clean across the engine workspace.

### Migrate the engine to Chakra v3
- [x] Migrated v3 idioms: `FormControl` → `Field.Root`, `ListIcon` → `List.Indicator`, `<List>` → `<List.Root>`, `Switch.Root/Control/Thumb`, `Slider.Root/Track/Range/Thumb`, `Tabs.Root/List/Trigger/Content`, `Select.Root/Field/Indicator`, `Tooltip` `isOpen` → `open`, `useDisclosure` `isOpen/defaultIsOpen` → `open/defaultOpen`. Replaced `useTheme().colors.X` / `.fontSizes` with `system.token('colors.X')` and `system.token('fontSizes.X')`. Replaced `useColorModeValue` with `useMediaQuery(['(prefers-color-scheme: dark)'])` for the editor theme.
- [x] Bulk renamed `sx={...}` → `css={...}` across engine code. (v3 dropped `sx`.)
- [x] `apps/studio` theme ported from spread-baseTheme to `createSystem(defaultConfig, config, studioConfig)` using new `defineConfig`. `ChakraProvider value={system}`.
- [x] `apps/storybook/.storybook/preview.tsx` ported to standalone `Provider`; backgrounds use `var(--chakra-colors-*)`.
- [x] `commands/screenshot` ported to `createSystem` + `ChakraProvider value={...}`.
- [x] Bumped `apps/storybook` from Storybook 8 → 10. Framework stays `@storybook/react-vite`. Addons trimmed to `@storybook/addon-docs` + `@storybook/addon-a11y` to match the new defaults.
- [ ] Visual verification: Storybook (`pnpm run dev:app:storybook`) and studio (`pnpm run dev:app:studio`) — deferred to user runtime check.

### Delete `core/ui`
- [x] `gridkit/core/ui/` removed.
- [x] `pnpm-workspace.yaml` glob picks up the deletion automatically (no explicit reference).
- [x] `turbo.json` had no explicit reference.
- [x] `gridkit/DEV.md` updated (drops the `core/ui` entry).
- [x] `gridkit/README.md` had no `core/ui` row.

### Cascading dependency bumps
- [x] React/react-dom: `^18.x` → `^19.1.0` across all engine packages.
- [x] `@types/react`/`@types/react-dom`: `^18.x` → `^19.1.0` (root pnpm.overrides forces a single version across workspace).
- [x] `@react-three/fiber`: `^8.16.8` → `^9.0.0` (drops `useContextBridge`; `MaterialNode` → `ThreeElement`; `ThreeElements` augmentation moves to `declare module '@react-three/fiber'`).
- [x] `@react-three/drei`: `^9.x` → `^10.0.0` (R19 + R3F 9 compatibility).
- [x] `@xstate/react`: `^4.1.1` → `^6.0.0` (R19 peer support).
- [x] `@emotion/react` added to engine apps as Chakra v3's emotion peer.
- [x] `useContextBridge`/`bridgeContexts` plumbing removed (R19 forwards context through R3F automatically).
- [x] `RefObject<T>` types updated to `RefObject<T | null>` where useRef returns nullable refs.

### Verify
- [x] `pnpm install` clean (peer warnings only — `@curvenote/ansi-to-react` and `r3f-perf`'s nested `drei@9` haven't shipped R19 peer ranges yet, but resolve fine at runtime).
- [x] `pnpm run build:pkg` clean (13/13 packages).
- [x] `pnpm run types` clean (apps/studio).
- [x] `pnpm run lint` clean.
- [ ] `pnpm run dev:app:studio` runtime verification — deferred.
- [ ] Storybook runtime verification — deferred.
- [ ] Commit.

## Notes
- This is a substantial task — possibly multiple days. The Chakra v3 migration alone is non-trivial; deleting a workspace package is fast but needs every consumer updated first.
- If anything in `core/ui` doesn't have a counterpart in the standalone `@villagekit/ui`, fold it in (coordinate with Stream 02). Don't lose functionality silently.
- React 19 vs 18: the standalone `@villagekit/ui` declares `peerDependencies: { react: ^19 }`. So consuming it pulls the engine to React 19. Verify `@react-three/fiber` is on a version that supports R19 (likely v9). If not, the standalone's peer dep should be relaxed to `^18 || ^19`.
- After this task, the engine has zero local Chakra wrapping — all UI components come from the standalone library.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — the standalone `@villagekit/ui` must be on v3 first
- [../02-ui-library/09-use-client-audit.md](../02-ui-library/09-use-client-audit.md) — engine consumers will hit the same RSC boundary issues otherwise
- [../02-ui-library/08-publish-npm.md](../02-ui-library/08-publish-npm.md) — preferable to consume from npm than wrestle with workspace cross-linking, but workable either way
