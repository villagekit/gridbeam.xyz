---
title: "Viewer toolbar never appears on hover or focus: the hover and focus-within css key is rejected by Chakra v3"
status: regression
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/sandbox/src/index.tsx:85-90` `sx={{ ':hover, :focus-within': { '.sandbox-controls': { opacity: 1 } } }}`; on the live site hovering the preview raises the four `.sandbox-controls` groups from opacity 0 to 1 and the cursor is `pointer` (probe, plan cf52c388).

## Current

`@villagekit/sandbox@0.10.0 src/index.tsx:81-86` the same key under `css`; the generated rule is empty and the console logs `Using kebab-case for css properties in objects is not supported. Did you mean :hover, :focusWithin?`; hovering leaves opacity 0 and the cursor `auto`, so the zoom, auto-rotate, grid, reset and fullscreen buttons are never visible (probe; the buttons still work when reached).

## Verdict

## Log

- 2026-09-12: Template. Note [[526d5330ef4e]] (sandbox controls invisible under Chakra v3) holds; the fix belongs in the sibling `../gridkit`. The StoryCard instance of the same rejection is [[150c408aba5a]].
