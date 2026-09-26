---
title: "Story page TOC: an unnamed navigation landmark ahead of the article, h2 before the h1"
status: fixed
route: /stories/whats-a-grid-unit
axis: accessibility
kind: added
---
## Legacy

`audit/stories__whats-a-grid-unit/dom/legacy.aria.yaml` one `navigation "Main"` (shell) and no in-page nav; the first heading after the header is the article's h1.

## Current

`@villagekit/ui@1.2.0 src/components/layouts/TableOfContents.tsx:39` `<Box as="nav">` with no `aria-label`; `audit/stories__whats-a-grid-unit/dom/current.aria.yaml:22-62` an unnamed `navigation` holding `heading "On this page" [level=2]` and about thirteen links, placed before `main`, so they precede the h1 in reading and tab order.

## Verdict

plan 4331147cc118

## Log

- 2026-09-12: Story page template, six routes; filed where first met.

- 2026-09-25: Regression (story grilling P1). No table of contents on story pages, as legacy; the template item is [[e5faf0655462]].
