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

- 2026-09-26: The story card slice (plan [[e332105c3b52]]) re-ported the card as app/_components/stories/Item.tsx and renders the icon as legacy's item.tsx:98 does, line for line: <Icon as={FaExternalLinkAlt} css={{ color: 'gray.300' }} boxSize="4" />. Chakra v3's Icon writes aria-hidden="true" itself (node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:20), so the icon stays hidden and the four inspiration cards show no bare img in audit/stories/dom/current.aria.yaml. Left regression for the stories index record's split or verdicts plan, as this Log asks; restoring legacy's exposed unnamed image would need an aria-hidden override the legacy line does not carry.
