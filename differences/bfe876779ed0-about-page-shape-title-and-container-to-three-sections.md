---
title: "About page shape: Title and Container to three Sections"
status: regression
route: /about
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:14-118` a top-level `<Title size="2xl">` and one `<Container maxW="container.md"><VStack spacing="8">` of captions and images; no `Section`.

## Current

`app/about/page.tsx:43-217` three `<Section index={n} maxW="6xl">` each with a `Title`, the first holding `<Container maxW="3xl">`; the sections are unlabelled `<section>` elements (`node_modules/@villagekit/ui/src/components/layouts/Section.tsx:83,96-97`).

## Verdict

## Log

- 2026-09-12: `getLayout` to the root layout and `Main` per route are the shell items [[1c05b1d0d3db]] and [[a73e9678cd57]].
