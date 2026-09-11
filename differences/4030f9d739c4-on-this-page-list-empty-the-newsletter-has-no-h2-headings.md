---
title: "On this page list empty: the newsletter has no h2 headings"
status: open
route: /stories/2021-winter-newsletter
axis: visual
kind: added
---
## Legacy

No table of contents; the sections are `#` (h1) and `###` (h3) headings on both sides (`apps/gridkit/pages/stories/2021-winter-newsletter.mdx`, identical in `content/stories/2021-winter-newsletter.mdx`).

## Current

`node_modules/@villagekit/ui/src/components/layouts/hooks/usePageHeadingsTree.ts:117` warns nine times in the browser ("heading "Prototyping online" (#prototyping-online) is orphaned — skipping it in the table of contents", and the eight other h3s); `audit/stories__2021-winter-newsletter/dom/current.aria.yaml:22-24` a `navigation` with the heading "On this page" and an empty list.

## Verdict

## Log

- 2026-09-12: A consequence of the TOC added on the story template (filed on /stories/whats-a-grid-unit).
