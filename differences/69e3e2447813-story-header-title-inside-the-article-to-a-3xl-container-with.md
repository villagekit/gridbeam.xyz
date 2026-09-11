---
title: "Story header: Title inside the article to a 3xl Container with top padding and a boxed cover"
status: regression
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:55-64` `<article><Title description={description} hasAnchor>` then, when `showImageInStory`, `<Center sx={{ marginBottom: 16 }}><StoryImage {...image} priority /></Center>`.

## Current

`app/stories/[slug]/page.tsx:82-109` `<Container maxW="3xl" pt={{ base: 4, md: 8 }}>` around `<Box as="article">` with `<Title as="h1" hasAnchor>`, the date `HStack`, and the cover in `<Box mt="4" mb="12" maxW="3xl" mx="auto">`. From code; the cover shows only on /stories/2022-newsletter (`showImageInStory: true`).

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.
