---
title: "Story catalogue: allStories array with url and isExternal to a slug-keyed record with accessors"
status: regression
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/stories.ts:14-25` `StoryMetadata { url, isExternal?, publishedAt: Date, updatedAt: Date, image: RasterImagePropsWithOptionalSizes }`; `:34-99` `linkedStories`; `:101-109` `allStories` as one array cast `as Array<StoryMetadata>`.

## Current

`app/_lib/stories.ts:40-60` `StoryMetadata { slug, external?: { url }, publishedAt: string, originallyPublishedOn? }` and a `Story { metadata, Content? }` wrapper; `:62-87` `internalStoriesBySlug`, `:95-173` `externalStories`, `:175-185` `STORY_SLUGS`, `getStory`, `getAllStories` (a spread sort by `Date.parse`), `:187-189` `isExternalStory` which nothing calls (`app/_components/StoryCard.tsx:80` inlines the check); `app/stories/page.tsx:28-30` strips `Content` before the client boundary.

## Verdict

## Log
