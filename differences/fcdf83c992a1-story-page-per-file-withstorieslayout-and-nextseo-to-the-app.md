---
title: "Story page: per-file withStoriesLayout and NextSeo to the app-router page with generateMetadata"
status: sanctioned
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/whats-a-grid-unit.mdx:3,21` `export default withStoriesLayout(metadata)`; `apps/gridkit/components/layouts/stories.tsx:19-79` `StoriesLayout` with `NextSeo` (`:35-53`, article openGraph, image at width 1200) and `MDXProvider` (`:66`).

## Current

`app/stories/[slug]/page.tsx:27-57` `generateMetadata` (article openGraph with the same fields, a `twitter` card block added), `:59-116` the page; `mdx-components.tsx:1-9` `useMDXComponents`.

## Verdict

rule: upgrade (the pages-router layout HOC and next-seo have no app-router equivalent; shell 1c05b1d0d3db and 65c21e08b3f1)

## Log

- 2026-09-12: Story page template; filed where first met. The twitter block and the dropped OG image `type` are the shell items f46533a8ae54 and 65c21e08b3f1.
