---
title: "External story icon: an exposed unnamed image to aria-hidden"
status: regression
route: /stories
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:98` `<Icon as={FaExternalLinkAlt} sx={{ color: 'gray.300' }} boxSize="4" />` with no `aria-hidden`: a bare `img` after each inspiration card's date, `audit/stories/dom/legacy.aria.yaml:84,93,102,111`.

## Current

`app/_components/StoryCard.tsx:104-108` `<Icon ... aria-hidden>`; no `img` on the four cards in `audit/stories/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Legacy exposes an unnamed image; a fix plan should ask the operator (rule 5) before restoring that.
