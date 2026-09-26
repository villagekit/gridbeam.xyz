---
title: Six MDX story pages to one dynamic [slug] route over a catalogue map
status: fixed
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/*.mdx` are the pages (`pageExtensions` include mdx); `apps/gridkit/stories.ts:1-9` imports only their `metadata`.

## Current

`app/stories/[slug]/page.tsx:23-25,59-65` `generateStaticParams` over `STORY_SLUGS`, `getStory(slug)`, a `notFound()` guard; `app/_lib/stories.ts:6-21,62-87` imports each MDX default export and metadata into `internalStoriesBySlug`; the MDX lives in `content/stories/`, outside `app/`.

## Verdict

plan 4331147cc118

## Log

- 2026-09-12: Not upgrade-forced: the app router renders `page.mdx` files directly when `pageExtensions` lists mdx (`node_modules/@next/mdx/readme.md:87-136`, the App directory section and its `pageExtensions` config), and `next.config.ts:6` already does.

- 2026-09-26: The catalog slice 48c8cbdb206a keeps this lookup as STORY_SLUGS and getStory over a private hostedStories array whose Content is typed required. The comment at app/stories/[slug]/page.tsx:45-48 saying the Content == null guard exists for TypeScript and that external stories carry no Content is stale from that commit on: the guard is dead code. The slice leaves the page untouched, as its plan says; the split of the story pages record removes the guard and the comment with the lookup.

- 2026-09-26: At the split of the story pages record [[56e6eb197e6c]]: the page re-port [[4331147cc118]] ships the six pages as app/stories/<slug>/page.mdx under legacy's withStoriesLayout and removes the [slug] route, the lookup (STORY_SLUGS, getStory, hostedStories), the dead guard and the stale comment, and content/stories, closing this item outright. The one name the app router forces on that shape, the story's data export renamed from metadata to story with a page metadata built from it (Next reads a page module's metadata export as the page's head and refuses generateMetadata beside it), is filed as [[0e005a229aee]] (open, a rule 4 candidate) on the verdicts plan [[14be8f377b34]], so a verdict before the re-port runs shapes it.
