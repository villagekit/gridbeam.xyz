---
title: "InfoTooltip props: the 0.9.0 Partial<TooltipProps> spread to named pass-through props"
status: open
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/InfoTooltip.tsx:7,19` (`../ui` at `a5cbe36`) declares `InfoTooltipProps extends Partial<TooltipProps>` and spreads every prop but `pointerTimeout` onto the `Tooltip`, so a caller could pass any tooltip prop (`placement`, `sx`, `portalProps`, `isOpen`) through the icon; the 0.9.0 `TooltipProps` picked `label`, `isOpen`, `placement`, `sx`, `children` and `portalProps` from Chakra v2's.

## Current

`@villagekit/ui@1.2.0 src/components/InfoTooltip.tsx:9-15` (`../ui` after plan c09248be3862) names the props it passes through, `label`, `pointerTimeout`, `portalProps` and `css`, each typed off `TooltipProps`, the form the portal slice 4f55a829c726 set and the style slice c09248be3862 followed; `placement` and `open` do not pass. No visible effect: the one engine caller that ever passed more than a label passes `portalProps` and a style (`../gridkit` `products/kit/src/info.tsx`), and no caller passed `placement` at v0.9.0. A code reading of the wrapper's shape against the legacy author's, read by the Parity review of plan c09248be3862 and not judged.

## Verdict

## Log
