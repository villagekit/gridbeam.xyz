---
title: "Select and NumberInput: focusBorderColor dropped from the ui wrappers"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Select.tsx:17` `<BaseSelect background="white" focusBorderColor={outlineColor} {...props} />`; `src/components/NumberInput.tsx:48` `focusBorderColor={outlineColor}`: the focused field's border takes the theme's outline colour (`cyan.600` at 50%).

## Current

`@villagekit/ui@1.2.0 src/components/Select.tsx` and `src/components/NumberInput.tsx` set no focus border colour; the fields fall back to Chakra v3's defaults. Found on `/tools/cutting-planner` (the top-up select and the beam inputs, `app/tools/cutting-planner/CuttingPlanner.tsx:158-170,366-420`); filed on `shell` since the wrappers are the ui's. The `outline` shadow token itself is identical on both sides.

## Verdict

## Log
