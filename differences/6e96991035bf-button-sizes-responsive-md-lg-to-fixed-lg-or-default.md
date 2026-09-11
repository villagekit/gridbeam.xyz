---
title: "Button sizes: responsive md/lg to fixed lg or default"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:69` `buttonSize = isMobile ? 'md' : 'lg'` on every CTA; smaller buttons in `audit/_root/375/legacy.png`.

## Current

`size="lg"` fixed on `app/page.tsx:127,130,193,257,332`; no `size` on "Read all stories" (`:280`), "GitHub" and "Subscribe to the newsletter" (`:398-403`); `audit/_root/375/current.png`.

## Verdict

## Log
