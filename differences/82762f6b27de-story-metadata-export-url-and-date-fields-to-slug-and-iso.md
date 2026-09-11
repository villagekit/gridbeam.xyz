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
