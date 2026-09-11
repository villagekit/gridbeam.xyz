---
title: Design meta description added where legacy inherited the site default
status: open
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:54` `<NextSeo title={meta.label} />`, so every design page serves the `DefaultSeo` text from `apps/gridkit/pages/_app.tsx:49` `Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family.`

## Current

`app/designs/[id]/page.tsx:28,31,34` `description: meta.description` on `metadata`, `openGraph` and `twitter`: `A sturdy bed frame. Configurable to suit a number of standard mattress sizes.`

## Verdict

## Log

- 2026-09-12: Template: `/designs/shelf-tower` serves `A versatile storage tower. Can be used as a narrow bookcase, bathroom organiser, and more.` and `/designs/5-12-13-triangle-desk` its own description the same way.
