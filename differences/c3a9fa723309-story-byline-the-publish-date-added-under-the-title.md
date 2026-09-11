---
title: "Story byline: the publish date added under the title"
status: open
route: /stories/whats-a-grid-unit
axis: copy
kind: added
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:35-58` `publishedAt` feeds `NextSeo openGraph.article` only; no date in any `audit/stories__*/dom/legacy.txt`.

## Current

`app/stories/[slug]/page.tsx:71-75,88-91` `toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })` centred under the description: "10 October 2024" (whats-a-grid-unit), "29 November 2024" (how-to-cut-grid-beams), "30 October 2024" (how-to-furniture-bolts), "23 August 2021" (building-with-grid-kit), "15 September 2021" (2021-winter-newsletter), "13 December 2022" (2022-newsletter), each in its `audit/<slug>/dom/current.txt`.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met. Note 526d5330 lists the byline among the copy devices never presented to the operator.
