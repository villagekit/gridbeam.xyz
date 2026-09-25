---
title: "Testimonial: aria-label Quote and Name removed"
status: fixed
route: /
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/testimonial.tsx:26,35` `<Text aria-label="Quote">` and `<Text aria-label="Name">`.

## Current

`app/_components/landing/Testimonial.tsx:33-46` neither `Text` carries a label.

## Verdict

plan 0bb6cc8ab1ad

## Log
