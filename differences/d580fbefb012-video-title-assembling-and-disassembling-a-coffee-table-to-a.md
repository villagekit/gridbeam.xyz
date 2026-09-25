---
title: "Video title: Assembling and disassembling a coffee table to a grid-beam coffee table"
status: fixed
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:202` `title="Assembling and disassembling a coffee table"`, the `<video>`'s only accessible name (`packages/ui-media/src/video.tsx:48-50`).

## Current

`app/page.tsx:202` `title="Assembling and disassembling a grid-beam coffee table"` (`app/_components/landing/LandingVideo.tsx:31-32`).

## Verdict

plan 2de4b709bb36

## Log

- 2026-09-25: Regression (grilling Q7). Ships as "Assembling and disassembling a coffee table".
