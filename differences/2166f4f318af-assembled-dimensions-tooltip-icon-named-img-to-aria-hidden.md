---
title: "Assembled Dimensions tooltip icon: named img to aria-hidden"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/InfoTooltip.tsx:21-23` `<Icon aria-label="Tooltip" as={FaInfoCircle} />` (`audit/designs__bed-frame/dom/legacy.aria.yaml`: `img "Tooltip"` inside `region "Assembled dimensions"`).

## Current

`node_modules/@villagekit/ui/src/components/InfoTooltip.tsx:24` keeps `aria-label="Tooltip"` on the `Icon` (the file otherwise moved to `color="gray.300"` and `open`), but Chakra v3's `Icon` sets `aria-hidden="true"` ahead of the spread props, so the trigger and its `Width x Depth x Height` text leave the tree (`current.aria.yaml`: no img in the region).

## Verdict

## Log

- 2026-09-12: Template.
