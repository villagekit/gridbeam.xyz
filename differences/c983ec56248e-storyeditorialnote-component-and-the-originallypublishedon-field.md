---
title: StoryEditorialNote component and the originallyPublishedOn field added
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: added
---
## Legacy

No note component under `apps/gridkit/components/story/`; no such field on `StoryMetadata` (`apps/gridkit/stories.ts:14-25`).

## Current

`app/_components/story/StoryEditorialNote.tsx:1-50` a dashed `accentB` box with an info icon, `role="note" aria-label="Editor's note"`; `app/_lib/stories.ts:51` `originallyPublishedOn?: 'gridkit.nz'`; `app/stories/[slug]/page.tsx:92-96` the byline clause. Used on /stories/building-with-grid-kit, /stories/2021-winter-newsletter and /stories/2022-newsletter.

## Verdict

## Log

- 2026-09-12: Note 526d5330 lists the device among the copy rewrites never presented to the operator; its text is filed per route as copy.

- 2026-09-25: Regression (story grilling P3, [[dcd8df79a843]]). The editorial note, the originally-on byline and the note component are removed; the historical posts keep "Grid Kit" in their text as legacy published it.
