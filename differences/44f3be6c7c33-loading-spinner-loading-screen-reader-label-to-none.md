---
title: "Loading spinner: Loading... screen-reader label to none"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />`; Chakra v2's Spinner renders a visually hidden `Loading...` by default.

## Current

`app/_components/design/DesignViewerDynamic.tsx:8-10` `<Spinner size="xl" />`; Chakra v3's Spinner is a bare `span` with no default label and none is passed.

## Verdict

## Log

- 2026-09-12: Template.
