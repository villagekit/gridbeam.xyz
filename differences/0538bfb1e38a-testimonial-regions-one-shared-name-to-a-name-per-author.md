---
title: "Testimonial regions: one shared name to a name per author"
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/testimonial.tsx:23` `<VStack as="section" aria-label="Testimonial">`; three `region "Testimonial"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/landing/Testimonial.tsx:26` `aria-label={`Testimonial from ${name}`}`; `region "Testimonial from Rhona"` etc. in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log
