# 09 — `'use client'` audit on component wrappers

**Status:** DONE

## Why
Eight component files in `./ui/src/components/` (`Accordion`, `Badge`, `Checkbox`, `FormLabel`, `Select`, `Slider`, `Switch`, `Table`) mixed Chakra v3 namespace component re-exports with theme recipe objects in the same module. The original concern was that lacking `'use client'` would break server-component (SC) consumers. Investigation showed the opposite — adding `'use client'` to a wrapper that re-exports a Chakra namespace **breaks** namespace access (`Accordion.Root`, `Switch.Control`, etc.) from SC consumers, because Next.js wraps the entire export as a single Client Reference that doesn't expose the namespace properties.

The FAQ page (a Server Component using `Accordion.Root`/`Accordion.Item`/`Accordion.ItemTrigger`) was the canary that revealed this — the build prerender of `/faq` fails with `"Element type is invalid: ... but got: undefined."` whenever `Accordion.tsx` carries `'use client'`, regardless of whether the namespace is re-exported as-is or reconstructed as a plain object literal.

## What
- All eight wrapper files had their recipes extracted into separate `<Component>.recipe.ts` files (server-evaluable, no React deps). `theme/index.ts` updated to import from the new paths.
- **No `'use client'` added** to any of the eight wrappers. Chakra's underlying primitive files (`accordion.js`, `switch.js`, `field.js`, `badge.js`, etc.) already carry `'use client'` themselves, so SC consumers automatically get Client References for the actual interactive components — no wrapper-level directive needed.
- The cutting planner page consuming `Switch`/`Select`/`Table`/`NumberInput` from a `'use client'` page is the normal Next.js pattern for an interactive feature, not a library bug.

## Steps
- [x] Inventory each file: list its exports (recipe object vs component) and which consumers in `theme/index.ts` import what.
- [x] For each of `Accordion`, `Badge`, `Checkbox`, `FormLabel`, `Select`, `Slider`, `Switch`, `Table`:
  - [x] Extract recipe(s) into `<Component>.recipe.ts` (Select has no recipe — only re-exports `NativeSelect`).
  - [x] Update `theme/index.ts` to import from the new recipe file.
  - [x] ~~Add `'use client'` directive at the top of `<Component>.tsx`.~~ — see "Why" above; would break namespace consumption from SC.
- [x] Verify `tsc --noEmit` clean from the gridbeam.xyz website root.
- [x] Verify `biome check .` clean inside `./ui`.
- [x] Smoke test: full `pnpm run build` of gridbeam.xyz prerenders all 20 pages, including `/faq` (Accordion in SC) and `/tools/cutting-planner` (Switch/Select/Table inside a CC page).

## Findings — when `'use client'` IS appropriate on a wrapper

- **Add it** when the wrapper writes its own JSX that calls hooks or wraps Chakra primitives in interactive logic — e.g., `Button`, `Heading`, `Link`, `NavLink`, `Tabs`, `Text`, `Tooltip`, `NumberInput`. These already have it.
- **Don't add it** when the wrapper is a pure re-export of one or more Chakra components, including a namespace object. The directive turns the export into an opaque Client Reference and namespace access (`Component.Subname`) collapses to `undefined`.

## Latent issue: `Tabs.tsx`
`Tabs.tsx` carries `'use client'` and exports a plain-object namespace (`Tabs.Root`, `Tabs.List`, etc.). It works in client-component contexts but would fail the same way `Accordion` does if used from a Server Component. Not currently used in SC; flagged as a follow-up rather than fixed here, because rewriting `Tabs` to dodge the issue would mean either dropping the wrapping `TabsList` enhancement (the fade-out indicator) or changing the public API away from `Tabs.X` to `TabsX`. Worth revisiting if/when a SC needs to render tabs.

## Notes
- Hooks in `./ui/src/hooks/` were already fixed during Stream 01 task 01 (`useTheme`, `useBreakpointWidth`, `useSizeWidths`, `useIsMobile`, `useMobileFriendlyTooltip`, `useWasRenderedOnClientAtLeastOnce`). New layout/nav files (Stream 02 tasks 03/04) all carry `'use client'` already.
- The recipe-split pattern is good architectural hygiene independent of the directive question — `defineRecipe` config has no React deps and never needs to be in a client module.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
