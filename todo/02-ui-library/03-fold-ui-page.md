# 03 — Fold in `ui-page` (layout primitives)

**Status:** TODO

## Why
The legacy `node-modules/packages/ui-page/` exports the page layout system (MainLayout, ContentLayout, CardsLayout, Section, Row, Column, Heading, Title, Description, TableOfContents, Footer, plus hooks `useActiveHeading`, `usePageHeadingsTree`, `useAssertChildIndexes`). The new website needs all of this. The current `./ui` doesn't have layout primitives at all.

## What
The layout components and hooks land in `./ui/src/components/` (or a `src/layouts/` sub-folder), exported from `src/index.ts`, with stories in `stories/`. Cleaned up where they were tied to startup specifics.

## Steps
- [ ] Copy the components from `node-modules/packages/ui-page/src/` into `./ui/src/components/layouts/` (decide naming).
- [ ] Update imports: `@villagekit-private/ui-media` → folded in via task 05; `@villagekit-private/ui-nav` → task 04; `next-seo` → drop or keep (decide; v1 of `@villagekit/ui` could omit SEO and let consumers handle it).
- [ ] Rewrite for Chakra v3 — use the migrated tokens/recipes from task 02.
- [ ] Replace any startup-specific defaults: e.g. if `Footer` had a Village Kit logo by default, parameterise.
- [ ] Add stories: `MainLayout.stories.tsx`, `ContentLayout.stories.tsx`, `CardsLayout.stories.tsx`, `Section.stories.tsx`.
- [ ] Add to `src/index.ts` exports.
- [ ] Verify storybook renders.

## Notes
- `ui-page` depends on `next-seo ^5.9.0`. Decide:
  - Drop SEO from the layout — let the consuming site use Next's metadata API directly.
  - Keep it but make it optional (peer dep).
  - Recommend dropping; the new gridbeam.xyz site uses Next's app-router metadata API anyway.
- Footer behaviour: parameterise — accept slots for logo, columns, copyright text. Don't hardcode anything.
- The hooks `useActiveHeading`, `usePageHeadingsTree`, `useAssertChildIndexes` have no startup coupling — copy directly.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
