---
title: "StoryImage: story-image.tsx to a next/image wrapper with explicit aspectRatio and isInColumn props"
status: fixed
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image.tsx:1-40` wraps ui-mdx `Image`: `aspectRatio` a local const `'standard'`, `isInColumn` from the `useIsInColumn()` context (`packages/ui-page/src/components/Column.tsx:33-36`), column `sizes` `{ base: 'full', md: ['container.lg', 2] }`, an `svg` branch (`:18-21`); call sites pass `type='cloudinary'` and never `isInColumn` (`apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx:49-56`).

## Current

`app/_components/story/StoryImage.tsx:1-61` `NextImage` in a `Box` (radius xl, shadow md): `aspectRatio` prop mapped standard/wide/square/null, `isInColumn` a boolean prop the MDX must set on every call (`content/stories/how-to-cut-grid-beams.mdx:42-49` and 15 more there), `sizes` `'(min-width: 768px) 50vw, 100vw'` or `'(min-width: 1024px) 1024px, 100vw'`, `priority`; no `svg` branch.

## Verdict

plan 373320c9

## Log

- 2026-09-12: Story page template; filed where first met. The same component seen from the story card is 656dc6d730d7 on `/`.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.

- 2026-09-26: Correction to the Legacy text by the components slice [[373320c95e55]]: legacy's call sites do pass isInColumn and aspectRatio={null}. At fce357d, whats-a-grid-unit.mdx:34,58,72,100,118,218,232,245,259 write both on nine StoryImage calls, and how-to-cut-grid-beams.mdx:359,380 write aspectRatio={null} alone; only the other four files pass neither. The re-ported StoryImage declares no prop for them: a call's value arrives in ...rest after the const and wins (story-image.tsx:34), which is how the eleven keep their native ratio.
