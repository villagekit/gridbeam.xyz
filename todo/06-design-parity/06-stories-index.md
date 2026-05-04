# 06 — Uplift: Stories index (`/stories`)

**Status:** TODO

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

- [ ] Extend `StoryMetadata` (in `app/_lib/stories.ts`) with optional `external?: { url: string; originallyPublishedOn: string }` so a story can be either in-repo MDX or an external link.
- [ ] Find the legacy external stories list. They were likely defined as `StoryMetadata` records *outside* the MDX files. Check `node-modules/apps/gridkit/stories.ts` (or similar) for the source list.
- [ ] Add the external stories to `app/_lib/stories.ts` with appropriate metadata. **Decided** — include all four legacy entries (vet each URL still resolves first):
  - "Grid Beam modular system builds anything..." — Kirsten Dirksen / faircompanies.com (2017)
  - "Enter the Matrix: An Interview with Ken Isaacs" — walkerart.org (2015)
  - "How to Make Everything Ourselves: Open Modular Hardware" — Kris De Decker / lowtechmagazine.com (2012)
  - "Shelter: Documenting a personal quest for non-toxic housing" — Eric Hunting (2003, web archive)
- [ ] Add filter chips at the top of `/stories`:
  - Filter values: `all` | `guide` | `newsletter` | `inspiration` (the last for external stories).
  - Use the same colour-coded `Badge`-style chips as the legacy `Filters` component. The `Catalogue`'s `Option` component is similar — could be lifted out and reused for both designs and stories filtering.
  - Maintain selected state in URL (`?f=guide`) to match the `/designs` Catalogue convention.
- [ ] Add `FaExternalLinkAlt` icon to story cards when `external != null`. Wrap the link with `target="_blank" rel="noopener noreferrer"`.
- [ ] (Optional) Add hover-card effect to story cards — restore the `HoverCardContainer`-style shadow / lift on hover that the legacy had.
- [ ] Verify at 375 / 768 / 1280 and confirm filter interaction, external-link cards, and updated story count.

## Notes
- The legacy `Filters` component used `useIsMobile()` to switch between `size="sm"` and `size="lg"` chips. Replicate that responsive sizing or use the `Catalogue`'s breakpoint pattern (`<select>` on mobile, chip group on desktop).
- The legacy filter chips were colour-coded per category (`StoryCategoryColors`). Worth keeping — visually communicates the badge / filter / category coupling.
- External stories' images may need re-hosting if they were on a third-party CDN.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/stories/page.tsx`, `app/_components/StoryCard.tsx`, `app/_lib/stories.ts`
- Legacy: `node-modules/apps/gridkit/pages/stories.tsx`, `node-modules/apps/gridkit/components/stories/{filters,list,item}.tsx`, `node-modules/apps/gridkit/stories.ts` (likely contains external story records), `node-modules/apps/gridkit/context/stories.ts` (filter context)
