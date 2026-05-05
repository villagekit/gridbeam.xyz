# 06 — Uplift: Stories index (`/stories`)

**Status:** DONE

## Why

The legacy stories index had two things the current is missing: (1) category filter chips at the top of the page (All / Guides / Inspiration / Newsletters), and (2) **external** stories — links to inspiration content on third-party sites (Ken Isaacs interview, Modular Living build, Order the Metro, the Village Kit newsletters from before this site existed). The current `/stories` is just a 6-card SimpleGrid of the in-repo MDX, which loses both the filtering interaction and the broader-community content.

## Concrete regressions

From `audit/stories/{375,768,1280}/{legacy,current}.png` and `app/stories/page.tsx` + `app/_components/StoryCard.tsx` ↔ `node-modules/apps/gridkit/pages/stories.tsx` + `node-modules/apps/gridkit/components/stories/{filters,list,item}.tsx`:

### Visual
- Filter chip row at the top of the page is gone.
- Cards lack the legacy's `HoverCardContainer` hover-shadow effect.

### Interaction
- No category filtering. Legacy filter chips were a `radiogroup` with keyboard support and they updated the visible list.
- No external-link affordance — legacy showed a `FaExternalLinkAlt` icon on cards that linked to third-party sites.

### Accessibility
- Legacy explicitly built a `<menubar>` with `aria-owns` for the filter chips (intentional — see comment on line 26 of legacy `pages/stories.tsx`). That whole interaction surface is gone in current.

### Copy
At parity for the title/intro line. The bigger copy issue is that 6 of the 12+ legacy stories are absent — see content section.

### Content
- Legacy index showed **12 stories** (4 in-repo guides, 2 in-repo newsletters, plus ~6 external inspiration stories on third-party sites).
- Current shows only the **6 in-repo stories**.
- The external stories were a real part of the value of the legacy `/stories` page — they pointed readers at the wider grid-beam world (the Modular Living blog build, the Ken Isaacs interview on a magazine site, etc.).

### Code patterns
- Current's `app/stories/page.tsx` is just a `SimpleGrid` of `StoryCard`. Legacy had `StoriesContextProvider` + `Filters` + `List` components with a `useStoriesContext` hook for filter state. The whole composition pattern is collapsed.
- The current `StoryMetadata` type doesn't have an `external: true` / `url` field — it assumes every story is in-repo MDX.

## Recommended mode

**Restore close to legacy.** Both the filtering and the external-stories support were good legacy design decisions; the rebuild simply hadn't gotten to them yet.

## Steps

- [x] Extended `StoryMetadata` (`app/_lib/stories.ts`) with optional `external?: { url: string; byline?: string }`. `Story.Content` is now optional too — external stories carry only metadata, no MDX. Added `inspiration` to `StoryCategory`. Sourced the 4 external entries from the legacy `node-modules/apps/gridkit/stories.ts` (pinned at SHA `fce357d`); each URL re-verified resolving 2026-05-05 before adding.
- [x] Added `app/stories/StoriesBrowser.tsx` (client component): URL-driven filter chips (`?f=guide` / `?f=newsletter` / `?f=inspiration` / no param = all), `radiogroup` ARIA pattern for keyboard support, colour-coded badge chips per category. Pattern adjacent to the existing `/designs` `Catalogue` filter convention but doesn't yet reuse the `Option` component (lifting that into `@villagekit/ui` is a follow-up — both filters could share it).
- [x] `StoryCard` (`app/_components/StoryCard.tsx`) now renders external-story cards as outbound links (`target="_blank" rel="noopener noreferrer"`) with a small `FaExternalLinkAlt` glyph below the date.
- [x] Added `isExternalStory(metadata)` helper and used it in `app/sitemap.ts` to exclude external stories from the sitemap (they aren't hosted here).
- [x] `app/stories/[slug]/page.tsx`: added an unreachable-but-TS-required `story.Content == null` guard alongside the existing `story == null` notFound, since `Content` is now optional. Real-world guard: `STORY_SLUGS` only includes internal slugs, so external stories never reach the route.
- [x] Verified visually at 375 / 768 / 1280 with snapshots in `/tmp/stories-shots/`. `?f=inspiration` filter view confirmed showing only the 4 external cards. Hit `/stories` returns 200; no console errors beyond the pre-existing `data-story-image` kebab-case warning.
- [ ] **Deferred follow-up:** restore the `HoverCardContainer`-style shadow lift on cards. Current `_hover: { transform: 'scale(1.02)' }` covers the lift; the legacy added a stronger box-shadow as well — minor.
- [ ] **Deferred follow-up:** re-host the 4 external-story preview images from `v1/gridkit.nz/stories/linked-articles/...` to `gridbeam.xyz/stories/external/...` via the `villagekit-media` workflow. Same Cloudinary cloud, so they render today; the path rewrite is cleanup, not a parity blocker.

## Notes
- The legacy `Filters` component used `useIsMobile()` to switch between `size="sm"` and `size="lg"` chips. Replicate that responsive sizing or use the `Catalogue`'s breakpoint pattern (`<select>` on mobile, chip group on desktop).
- The legacy filter chips were colour-coded per category (`StoryCategoryColors`). Worth keeping — visually communicates the badge / filter / category coupling.
- External stories' images may need re-hosting if they were on a third-party CDN.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/stories/page.tsx`, `app/stories/StoriesBrowser.tsx` (new), `app/_components/StoryCard.tsx`, `app/_lib/stories.ts`, `app/sitemap.ts`, `app/stories/[slug]/page.tsx`
- Legacy reference: `node-modules/apps/gridkit/pages/stories.tsx`, `node-modules/apps/gridkit/components/stories/{filters,list,item}.tsx`, `node-modules/apps/gridkit/stories.ts` (external story records), `node-modules/apps/gridkit/context/stories.ts` (filter context) — pinned at SHA `fce357d`
