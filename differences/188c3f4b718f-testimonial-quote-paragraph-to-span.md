---
title: "Testimonial quote: paragraph to span"
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/testimonial.tsx:25-32` `<Text>` renders a `<p>`; `paragraph:` nodes for the quotes in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/landing/Testimonial.tsx:34` `<Text as="span">`; plain `text:` nodes in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log
