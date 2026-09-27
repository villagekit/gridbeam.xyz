---
title: "Switch name: aria-label to a visually hidden label that also reads as text"
status: fixed
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

- 2026-09-28: From the applet components slice (plan 55d567074c71): the Verdict's reason, that a label element is what a correct name requires under Chakra v3, is contradicted by the re-ported toggle (app/tools/cutting-planner/components/DisplayUnitToggle.tsx): Switch.Root with ids={{ hiddenInput: 'cutting-plan-units' }}, the aria-label on Switch.HiddenInput and no Switch.Label renders the machine's aria-labelledby pointing at a label id no element carries, and the accessible name falls to the aria-label (accname step 2B skips a reference with no valid id), so Chromium's tree is legacy's: checkbox named, no text node, read on the throwaway route against the live Plan tab of /designs/bed-frame. The sanction stands on this route until the planner record's split consumes the component, which restores legacy's form; the operator or that split decides whether the item then closes as fixed or its verdict is superseded.

- 2026-09-28: Moved to fixed by plan 9c6e9dd981bd, the Verdict's reason superseded by this note and the new state (differences/README.md: a wrong verdict is superseded by a note and a new state, never edited): with the applet's DisplayUnitToggle on the route after the re-port, the tree is legacy's, a group holding one checkbox named Display units as millimeters or grid units by its aria-label and no text node (the slice's probe after Plan it!, probe-1280.json, current.aria1 against legacy.aria1), so the label element the verdict called required is not, and the difference is gone. The record's split (call 5 in its Log) made this call.
