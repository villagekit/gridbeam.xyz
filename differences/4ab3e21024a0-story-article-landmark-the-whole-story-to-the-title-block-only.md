---
title: "Story article landmark: the whole story to the title block only"
status: regression
route: /stories/whats-a-grid-unit
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:55-67` one `<article>` around the Title, the cover and the MDX body; `audit/stories__whats-a-grid-unit/dom/legacy.aria.yaml:22-152` every heading and image inside `article`.

## Current

`app/stories/[slug]/page.tsx:83-113` `<Box as="article">` around the Title, the date row and the cover; `<Content />` is a sibling at `:113`; `audit/stories__whats-a-grid-unit/dom/current.aria.yaml:65-70` the article ends after the date, `:71-196` the body sits under `main`.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.
