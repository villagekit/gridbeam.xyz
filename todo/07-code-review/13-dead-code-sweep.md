# 13 — Dead / invented code sweep

**Status:** TODO

## Why

The review found a set of invented-but-never-consumed API surface — abstractions with no caller, props with no setter, plumbing with no destination. Each is small; together they're noise that misleads future readers about what the code supports. (Outside this list the repo is clean: the review's unused-export sweep over `app/_lib` and `app/_components` found nothing else.)

## The inventory (2026-08-03 — verify each is still dead before deleting)

- **`CatalogueItem` imperative handle**: `app/_components/catalogue/CatalogueItem.tsx:45-67` — `forwardRef` + `useImperativeHandle` + exported `CatalogueItemHandle`; `DesignViewer.tsx:54` creates `itemRef` and never calls it. `defaultTab` prop has no caller either. Remove handle, ref, and `defaultTab`.
- **`useDesignTypingEffect` third tuple element**: `app/_components/landing/useDesignTypingEffect.ts:88,93` — `nextDesign` is returned but no caller consumes it, and the file's header comment claims the port is "unchanged" apart from lodash/type tweaks. Drop the element, fix the comment.
- **`Catalogue.listMessage`**: `app/_components/catalogue/Catalogue.tsx:62,264` supports it; no caller passes it. Legacy's designs page passed the sparkle copy "Your designs here… ✨". **Decision fork**: restore the legacy message from `DesignsBrowser` (nice, matches baseline) or delete the prop. Restoring is the recommended default; it's one line.
- **Store-era props**: `app/_components/catalogue/types.ts:10-11` `active`/`inactiveMessage` + their `ItemCard.tsx:52-67` rendering — nothing sets them in the new site (they existed for out-of-stock store items). Delete unless suppliers-page plans want them (check with the catalogue's other consumer, if any).
- **Always-truthy conditional**: `Catalogue.tsx:191` — `title={filterOptions ? 'Categories' : 'Category'}`; `filterOptions` is always truthy (legacy branched on `isMobile`). Write `'Categories'`.
- **Dead browser guard**: `app/tools/cutting-planner/CuttingPlanner.tsx:100-102` — `typeof window !== 'undefined'` inside an onClick in a `'use client'` component. (Also listed in `./07-cutting-planner-hardening.md`; tick wherever it lands.)
- **Dead newsletter env plumbing**: `env.d.ts:7` types `BUTTONDOWN_API_KEY`, `.env.example` documents it and claims "the subscribe page will degrade gracefully" — nothing reads the var; the subscribe page is a static placeholder. Delete both entries until the form ships (or fix the comment if Mikey prefers keeping the placeholder documented).
- **Duplicated link styling**: `app/contact/page.tsx:67-80` inlines an `& a` css block near-identical to `paragraphLinkCss` in `app/_components/ObfuscatedEmail.tsx:23-34`. Extract one shared constant (or push into the ui `Link` recipe if that's where it belongs — smaller change wins).
- **`CatalogueItem.tsx:99`** — `aspectRatio={{ base: '4 / 3', lg: '4 / 3' }}`: identical at both breakpoints; collapse to a single value.
- **`ItemCard.tsx:36`** — `sizes` attribute tuned for a 4-col layout, but with `unoptimized` there's no srcset, so `sizes` is inert. Delete it, or fix the underlying grid mismatch first (see `./15-parity-nits.md`).
- **Barrel over-export**: `app/_components/catalogue/index.ts` re-exports `ItemCardProps`, `CatalogueProps`, `SORT_OPTIONS`, `SortOption` etc. that nothing imports via the barrel. Trim to what's consumed.
- **Unused prop defaults**: `LandingColumn` `flex`/`gap`, `LandingRow` `gap`/`alignItems` overrides (`app/_components/landing/LandingSection.tsx:28-68`) — no caller uses them; `CubeLogo`'s default `ariaLabel` is never exercised (both call sites pass explicit values). Trim if trivial; skip if it fights the component's shape.
- **Needless `async`**: `app/_lib/designs.ts:22,33,37` — `getDesignIndex`/`getDesignIds`/`getDesign` contain no `await` over the now-static inlined data. Make sync, drop `await` at call sites. Also `Design.image` returned by `getDesign` is unconsumed by `app/designs/[id]/page.tsx` — check other consumers before removing.

## Steps

- [ ] For each item: confirm it's still dead (grep for consumers — the thing may have gained a caller since the review), then delete/fix. One commit for the sweep is fine; keep the `listMessage` restore separate if you take the restore fork.
- [ ] Run `pnpm typecheck && pnpm lint` after; both passed clean before the sweep and must after.
- [ ] Record any item that turned out to be alive in Notes below, with its consumer.

## Notes

- Wiggle room baked in per-item above. The default action is delete; restore-forks are called out explicitly.
- Don't expand scope into behavioral changes here — this task is strictly "remove what nothing uses".

## Depends on

- Sequencing nicety: `./05`, `./07`, `./15` touch overlapping files; land this after those to avoid conflicts, or coordinate.

## Files

- See inventory above.
