---
title: Stories meta description added where legacy inherited the site default
status: open
route: /stories
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/stories.tsx:15` `<NextSeo title="Stories" />` sets no description; the route inherits `apps/gridkit/pages/_app.tsx:47-49` "Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family."

## Current

`app/stories/page.tsx:13-25` `description`, `openGraph.description` and `twitter.description` all set to the visible tagline "Build logs, field reports, and explainers from people working with grid beam."; `openGraph.url` `https://gridbeam.xyz/stories`.

## Verdict

## Log

- 2026-09-12: Same shape as bfc81eb7197c on `/`; the shell items 65c21e08b3f1 and f46533a8ae54 cover the Metadata mechanism.
