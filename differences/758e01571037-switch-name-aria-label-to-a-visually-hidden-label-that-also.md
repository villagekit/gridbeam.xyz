---
title: "Switch name: aria-label to a visually hidden label that also reads as text"
status: sanctioned
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:29-34` `<Switch id="cutting-plan-units" aria-label="Display units as millimeters or grid units" ...>`: the checkbox is named by the attribute and nothing else enters the tree (`audit/tools__cutting-planner/dom/legacy.aria.yaml`, result state).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:452-454` `<Switch.Label><VisuallyHidden>Display units as millimeters or grid units</VisuallyHidden></Switch.Label>`: the checkbox is named by `aria-labelledby`, and the label's text is also a `text` node beside it (`current.aria.yaml`: `checkbox "Display units..."` then `text: Display units...`). The name itself is identical on both sides.

## Verdict

rule: upgrade (Chakra v3's switch sets `aria-labelledby` to the label id unconditionally, `@zag-js/switch@1.40.0 dist/switch.connect.mjs:96`, so a label element is what a correct name requires; the text node is its consequence)

## Log
