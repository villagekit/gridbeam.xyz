---
title: "Story catalogue: allStories array with url and isExternal to a slug-keyed record with accessors"
status: fixed
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/stories.ts:14-25` `StoryMetadata { url, isExternal?, publishedAt: Date, updatedAt: Date, image: RasterImagePropsWithOptionalSizes }`; `:34-99` `linkedStories`; `:101-109` `allStories` as one array cast `as Array<StoryMetadata>`.

## Current

`app/_lib/stories.ts:40-60` `StoryMetadata { slug, external?: { url }, publishedAt: string, originallyPublishedOn? }` and a `Story { metadata, Content? }` wrapper; `:62-87` `internalStoriesBySlug`, `:95-173` `externalStories`, `:175-185` `STORY_SLUGS`, `getStory`, `getAllStories` (a spread sort by `Date.parse`), `:187-189` `isExternalStory` which nothing calls (`app/_components/StoryCard.tsx:80` inlines the check); `app/stories/page.tsx:28-30` strips `Content` before the client boundary.

## Verdict

plan 48c8cbdb: app/_lib/stories.ts is legacy's stories.ts again, one allStories array cast as Array<StoryMetadata>, linkedStories inline with legacy's updatedAt, no Story wrapper, no accessors, no sort in the module. The residue left for the story pages record 56e6eb197e6c: the field names and types (82762f6b27de), originallyPublishedOn (c983ec56248e) and the [slug] route's lookup, STORY_SLUGS and getStory over a private hostedStories array below legacy's exports (9c48718ec6f8).

## Log

- 2026-09-26: The split of the stories index record [[ca353de8b645]] (its Log, call 3) gives this item to the catalog slice [[48c8cbdb206a]] as the module's structure: one allStories array, linkedStories inline with legacy's updatedAt on the four, no wrapper, no accessors, no sort in the module. The field names and types on StoryMetadata and the linked stories (slug for url, external for isExternal, the ISO strings, the dropped image.type) are [[82762f6b27de]]'s, originallyPublishedOn is [[c983ec56248e]]'s and the [slug] route's lookup of a story's Content is [[9c48718ec6f8]]'s, all the story pages record's, which the catalog slice keeps beside legacy's exports (STORY_SLUGS and getStory, with a comment naming that item).
