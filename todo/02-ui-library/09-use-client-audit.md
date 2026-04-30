# 09 — `'use client'` audit on component wrappers

**Status:** TODO

## Why
Eight component files in `./ui/src/components/` (`Accordion`, `Badge`, `Checkbox`, `FormLabel`, `Select`, `Slider`, `Switch`, `Table`) re-export Chakra v3 namespace components alongside theme recipe objects in the same module — but lack the `'use client'` directive. This works on the gridbeam.xyz home page today only because none of those eight components are consumed there. The cutting planner (Stream 01 task 07) had to add `'use client'` ad hoc when it pulled in `NumberInput`, `Switch`, `Select`, `Table`. The same fix needs to land at the library level so consumers (the website's other pages, the engine post-task 03-08, third-party npm consumers post-task 02-08) don't keep tripping the same RSC boundary.

Tracked as a follow-up in Stream 01 task 01 and Stream 02 tasks 02 + 03 — promoted to its own task since it's a real blocker for publish + engine migration.

## What
Each of the eight wrapper files split into:
- `<Component>.recipe.ts` — recipe export, server-evaluable, imported by `theme/index.ts`.
- `<Component>.tsx` — `'use client'`-marked component file consuming the recipe.

After this, `@villagekit/ui` is fully RSC-safe: any consumer can import any component from the package without server/client-boundary errors.

## Steps
- [ ] Inventory each file: list its exports (recipe object vs component) and which consumers in `theme/index.ts` and elsewhere import what.
- [ ] For each of `Accordion`, `Badge`, `Checkbox`, `FormLabel`, `Select`, `Slider`, `Switch`, `Table`:
  - [ ] Extract recipe(s) into `<Component>.recipe.ts`.
  - [ ] Update `theme/index.ts` (or wherever) to import from the new recipe file.
  - [ ] Add `'use client'` directive at the top of `<Component>.tsx`.
- [ ] Verify `tsc --noEmit` clean from the gridbeam.xyz website root (where the boundary actually matters).
- [ ] Verify `biome check .` clean inside `./ui`.
- [ ] Build a smoke test: temporarily import each affected component into a website page (or a Storybook RSC harness), confirm no "useState only works in client components" errors.

## Notes
- Hooks in `./ui/src/hooks/` were already fixed during Stream 01 task 01 (`useTheme`, `useBreakpointWidth`, `useSizeWidths`, `useIsMobile`, `useMobileFriendlyTooltip`, `useWasRenderedOnClientAtLeastOnce`). New layout/nav files (Stream 02 tasks 03/04) all carry `'use client'` already. Only these 8 older wrappers remain.
- This blocks Stream 02 task 08 (publish to npm) — third-party consumers won't have a workaround.
- This also blocks Stream 03 task 08 (engine on Chakra v3 + remove `core/ui`) — the engine's studio app will hit this when it consumes the standalone library.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
