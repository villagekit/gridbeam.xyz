---
title: "Assembled Dimensions tooltip icon: named img to aria-hidden"
status: upstream
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

- 2026-09-27: Fixed in ../ui at 1dbd172 (plan 65ee8339cb1d): the InfoTooltip's Icon passes aria-hidden undefined, which removes the aria-hidden="true" Chakra v3's Icon writes before spreading its props (the package's idiom in Social, LinkCard and Footer), so the svg carries legacy's attribute set (focusable="false", aria-label="Tooltip", no aria-hidden) and reads img "Tooltip" inside region "Assembled dimensions" on pnpm dev under the file:../ui override, as the live legacy page reads; hovering it shows the Width x Depth x Height tooltip. Waits on the operator's publish; the bump plan 99f2fe62c62f closes it.
