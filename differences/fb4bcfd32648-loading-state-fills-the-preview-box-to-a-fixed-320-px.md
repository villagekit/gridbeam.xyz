---
title: "Loading state: fills the preview box to a fixed 320 px"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/loading.tsx:8-19` `Flex` with `height: '100%'`, `padding: 8`, `Spinner size="xl"`, via `components/design/view-dynamic.tsx:6-9`.

## Current

`app/_components/design/DesignViewerDynamic.tsx:8-12` an inline `Flex w="full" h="320px"` with the spinner (read from code; the state is transient).

## Verdict

## Log

- 2026-09-12: Template.
