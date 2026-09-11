---
title: Typing heading hidden from the accessibility tree
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:409-424` the live region sits inside `<Heading>` and only the visible span is `aria-hidden`; `heading "Build a Work Table" [level=2]` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/landing/TypingDesignSection.tsx:50-59` the live region is a sibling and the `<Heading as="h2" aria-hidden="true">` is hidden whole; no heading node for the section in `audit/_root/dom/current.aria.yaml` (`text: Build Vertical Wall Shelves`).

## Verdict

## Log
