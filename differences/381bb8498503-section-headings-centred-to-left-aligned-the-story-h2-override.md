---
title: "Section headings: centred to left-aligned (the story h2 override dropped)"
status: regression
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/mdx.tsx:1-18` overrides `h2` with `alignSelf: 'center'`, applied through `apps/gridkit/components/layouts/stories.tsx:9,66` `<MDXProvider components={mdxComponents}>` (the base heading is `flex-start`, `packages/ui-mdx/src/heading.tsx:6-7,14-15`); every h2 is centred in `audit/stories__whats-a-grid-unit/1280/legacy.png` and `audit/stories__building-with-grid-kit/1280/legacy.png`.

## Current

`mdx-components.tsx:1-9` spreads only the sitewide `@villagekit/ui/mdx` map (`node_modules/@villagekit/ui/src/mdx/heading.tsx:14-15,30-32` `alignSelf="flex-start"`); no story override exists, so every h2 is flush left in `audit/stories__whats-a-grid-unit/1280/current.png` and `audit/stories__building-with-grid-kit/1280/current.png`.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.
