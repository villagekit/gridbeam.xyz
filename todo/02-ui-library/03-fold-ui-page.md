# 03 — Fold in `ui-page` (layout primitives)

**Status:** DONE (storybook stories deferred — see follow-ups)

## Why
The legacy `node-modules/packages/ui-page/` exports the page layout system (MainLayout, ContentLayout, CardsLayout, Section, Row, Column, Heading, Title, Description, TableOfContents, Footer, plus hooks `useActiveHeading`, `usePageHeadingsTree`, `useAssertChildIndexes`). The new website needs all of this. The current `./ui` doesn't have layout primitives at all.

## What
The layout components and hooks now live in `./ui/src/components/layouts/`, exported via `./ui/src/index.ts`. Ported to Chakra v3 + React 19. Heavily decoupled from startup specifics.

## Steps
- [x] Copied components to `./ui/src/components/layouts/`. Hooks live in `./ui/src/components/layouts/hooks/`. Util in `./ui/src/components/layouts/util/sortNodes.ts`.
- [x] Dropped `next-seo` entirely — `CardsLayout` no longer renders `<NextSeo>`. Consumers use Next.js's metadata API directly. Drops a dep from the library.
- [x] Replaced `lodash-es`'s `map`/`uniqueId` with stdlib (`Array.prototype.map`, simple counter).
- [x] Replaced `useTheme().colors[colorScheme][shade]` index-into-theme with Chakra v3 `colorPalette` prop + `colorPalette.50` token references. Theme-aware without runtime lookup.
- [x] Replaced `useMergeRefs` (v2) with `mergeRefs` (v3).
- [x] Replaced `sx` prop with `css` prop throughout.
- [x] Renamed the v2 `Heading` (with anchor support) to `AnchorHeading` to avoid name conflict with the base `Heading` already in the lib. Original `Heading` from base lib is unchanged. `getHeadingId` helper exported.
- [x] `Footer` parameterised — accepts arbitrary `FooterSection[]` (no length constraint anymore — v2 was hardcoded to 3) and an optional `children` slot for logos/etc. Background colour still uses `accentB.50` semantic token; can be overridden via `css`.
- [x] `MainLayout` accepts an optional `Banner` (was required in v2).
- [x] All hooks ported with strict-typed array access. No `any` casts.
- [x] Added `'use client'` directives to every component file (all of them use hooks or context).
- [x] Exports added to `./ui/src/index.ts` via `export * from './components/layouts'`.
- [x] `tsc --noEmit` clean from the website root.
- [x] `biome check .` clean inside `./ui`.
- [ ] Storybook stories deferred — see follow-ups.

## Notes
- **Naming change:** the legacy `Heading` from `ui-page` shadowed the base `Heading` from `@villagekit/ui`. Renamed to `AnchorHeading`. Consumers who want anchor behaviour use `<AnchorHeading hasAnchor>...</AnchorHeading>`; everyone else uses the plain `Heading`.
- **`colorScheme` → `colorPalette`** throughout (Chakra v3 idiom). `Section.colorPalette` accepts any palette key (`'accentB'`, `'gray'`, `'primary'`, etc.).
- **`spacing` → `gap`** on all `Stack`/`HStack`/`VStack` instances.
- The legacy `useAssertChildIndexes` used `console.error` for layout-validation warnings. Switched to `console.warn` since these are dev-only sanity hints, not errors.

## Follow-ups
- **Storybook stories** for `MainLayout`, `ContentLayout`, `CardsLayout`, `Section`, `Row`, `Column`, `BlockSection`, `Title`, `Description`, `TableOfContents`, `Footer`. Deferred — the website's own pages will be the practical test surface in the short term, and Storybook stories require the full lockfile install and visual review.
- **`'use client'` audit on existing component wrappers** (Stream 02 task 02 follow-up, still open). New layout/nav files all carry the directive; the older `Accordion`/`Badge`/`Checkbox`/`FormLabel`/`Select`/`Slider`/`Switch`/`Table` wrappers still need it.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
