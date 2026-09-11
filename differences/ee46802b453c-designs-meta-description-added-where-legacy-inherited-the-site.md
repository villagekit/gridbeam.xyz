---
title: Designs meta description added where legacy inherited the site default
status: open
route: /designs
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:69` `<NextSeo title="Designs" />` sets no description, so the route serves the `DefaultSeo` text from `apps/gridkit/pages/_app.tsx:49` `Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family.`

## Current

`app/designs/page.tsx:11-12` `A catalogue of grid-beam designs — beds, desks, shelves, and more. Each design has a 3D preview and a parts list.`, used for `description`, `openGraph.description` and `twitter.description` (`page.tsx:14-23`).

## Verdict

## Log

- 2026-09-12: Same pattern as [[bfc81eb7197c]] on `/` and [[39bf8c100615]] on `/stories`; the mechanism is the shell item [[65c21e08b3f1]].
