# 02 — Migrate to Chakra v3 (theme + multipart components + hooks)

**Status:** TODO

## Why
Chakra v3 is a full API rewrite from v2. The theme system, the multipart component composition, and many hooks have new shapes. There's no way to upgrade incrementally — the whole library has to come along at once.

## What
A `./ui/src/` that compiles, type-checks, lints, and renders correctly under Chakra v3 + React 19. All 25 components have been rewritten to v3 idioms. The theme has been converted from `extendTheme()` to `createSystem()`. Storybook stories all render.

## Steps

### Theme
- [ ] Read the v3 theming docs (theme tokens, semanticTokens, recipes for variants).
- [ ] Rewrite `src/theme/index.ts`: `extendTheme({...})` → `createSystem(defaultConfig, { theme: { tokens, semanticTokens, recipes } })`.
- [ ] Custom colors (accentA, accentB, outlineColor, primary, wood) → tokens.
- [ ] Fonts (Bitter, Fredoka One) → tokens.
- [ ] Component overrides (Accordion, Badge, Button, Checkbox, FormLabel, Heading, Link, NavLink, Slider, Switch, Table, Tabs, Text) → recipes / slot recipes.
- [ ] Wire the system through a `Provider` component exported from the library (replaces `ChakraProvider`).

### Multipart components (highest-risk surface)
- [ ] **Tabs** — v3 uses compound components: `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. The legacy custom wrapper has fade-out scrollable indicators (lines 73-128 of legacy `Tabs.tsx`) — port the effect.
- [ ] **Accordion** — `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`, `Accordion.ItemContent`. Re-do the custom theme (gradient tablist) as a slot recipe.
- [ ] **NumberInput** — `NumberInput.Root`, `NumberInput.Input`, `NumberInput.Control`. Verify steppers still work.
- [ ] **Table** — verify the custom theme variants port.
- [ ] **Menu**, **Modal**, **Popover**, **Stepper**, **Slider**, **Switch** — all changed shape; audit each.

### Hooks
- [ ] Audit the re-exported hooks in `src/index.ts` (lines 102-135). Some v2 hooks were removed or renamed in v3:
  - `useDisclosure` — kept
  - `useBreakpointValue` — kept (but signature may differ slightly)
  - `useMediaQuery` — kept
  - `useTheme` — signature changed; v3 returns `system.theme`, not the raw theme
- [ ] Update the custom hooks (`useBreakpointWidth`, `useIsMobile`, `useMobileFriendlyTooltip`, `useSizeWidths`, `useTheme`, `useWasRenderedOnClientAtLeastOnce`) for v3 APIs.

### Components
- [ ] Walk through each of the 25 components in `src/components/` and verify it compiles. Most simple ones (Button, Heading, Text, Link, etc.) just need import path adjustments.
- [ ] Verify the re-export list in `src/index.ts` for primitives that may have moved or been removed (~40 lines).

### Storybook
- [ ] Update `.storybook/main.ts` and `.storybook/preview.tsx` for v3 (add the `Provider` decorator to all stories).
- [ ] Run `pnpm dev` and verify every story renders.

## Notes
- Estimate: 2-4 days of focused work for someone familiar with Chakra. Multipart components are the biggest sink.
- Use the official v2-to-v3 migration guide (https://chakra-ui.com/docs/get-started/migration) as a checklist.
- Some component-level customizations may be cleaner as v3 recipes than they were as v2 component overrides — take the wins.
- This is also a good time to drop any unused re-exports from `src/index.ts` and shrink the surface area.

## Depends on
- [./01-version-alignment.md](./01-version-alignment.md)
