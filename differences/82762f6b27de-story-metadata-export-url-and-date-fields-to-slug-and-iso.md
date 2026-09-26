---
title: "Story metadata export: url and Date fields to slug and ISO strings, image type dropped"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/whats-a-grid-unit.mdx:5-19` `url: '/whats-a-grid-unit'`, `image: { type: 'cloudinary', ... }`, `publishedAt: new Date('2024/10/10')`; typed once as an array (`apps/gridkit/stories.ts:109`). The same shape on the other five (e.g. `2021-winter-newsletter.mdx:22-31`).

## Current

`content/stories/whats-a-grid-unit.mdx:11-24` `slug: 'whats-a-grid-unit'`, no `type`, `publishedAt: '2024-10-10'`; `app/_lib/stories.ts:40-54` the type, each story cast `as unknown as StoryMetadata` (`:64`) and its slug repeated as the map key (`:63`). A dashed ISO date parses as UTC where the legacy slash form parsed as local time.

## Verdict

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.

- 2026-09-26: The story card slice (plan [[e332105c3b52]]) re-ported the card as app/_components/stories/Item.tsx, which renders publishedAt with new Date(publishedAt).toLocaleDateString('en-NZ', numeric day, month and year), legacy's item.tsx:90-94 on this string field. The visible side of the UTC parse this item records is on the /stories cards and any card with showDate: the server (UTC) and a browser at or east of UTC print the same day as legacy, a browser west of UTC prints the previous day and React reports a hydration text mismatch on every card. The old StoryCard parsed the same way. The fix is this item's, the catalog's shape (753b16d28130), not the card's.

- 2026-09-26: From the split of the stories index record [[ca353de8b645]] (its Log, call 3): the same swap is on the four linked stories the catalog module writes inline, app/_lib/stories.ts, where legacy's stories.ts:34-99 wrote url (the external URL) and isExternal: true, image.type: 'cloudinary' and Date values, and the current module writes a made-up slug (external-faircompanies-grid-beam-builds-anything and three more), external: { url }, no image.type and ISO strings. The catalog slice [[48c8cbdb206a]] keeps those names and types and closes only the module's structure ([[753b16d28130]]), so this item covers the linked stories' fields too, for the story pages record [[56e6eb197e6c]] to judge with the six MDX exports.
