---
title: Six MDX story pages to one dynamic [slug] route over a catalogue map
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/*.mdx` are the pages (`pageExtensions` include mdx); `apps/gridkit/stories.ts:1-9` imports only their `metadata`.

## Current

`app/stories/[slug]/page.tsx:23-25,59-65` `generateStaticParams` over `STORY_SLUGS`, `getStory(slug)`, a `notFound()` guard; `app/_lib/stories.ts:6-21,62-87` imports each MDX default export and metadata into `internalStoriesBySlug`; the MDX lives in `content/stories/`, outside `app/`.

## Verdict

## Log

- 2026-09-12: Not upgrade-forced: the app router renders `page.mdx` files directly when `pageExtensions` lists mdx (`node_modules/@next/mdx/readme.md:87-136`, the App directory section and its `pageExtensions` config), and `next.config.ts:6` already does.
