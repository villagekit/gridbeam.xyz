---
title: "StorySection width: container.lg to 5xl"
status: regression
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-section.tsx:17` `maxW="container.lg"` (Chakra v2, 62em); a full-width story image measures 992px at 1280 on the live site (the furniture-bolts decision tree).

## Current

`app/_components/story/StorySection.tsx:17` `maxW="5xl"` (`node_modules/@chakra-ui/react/dist/esm/theme/tokens/sizes.js:16` 64rem); the same image measures 960px inside the padded container on the dev server.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.
