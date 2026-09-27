---
title: "Viewer toolbar never appears on hover or focus: the hover and focus-within css key is rejected by Chakra v3"
status: upstream
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

- 2026-09-27: Fixed in ../gridkit as commit 15dc73a (plan [[1e2fbba70884]]): core/sandbox/src/index.tsx writes the raw selector '&:hover, &:focus-within' nesting '& .sandbox-controls', the form Chakra v3's css reads as a selector, with no media (hover: hover) guard, as legacy's rule. Under the packed-tarball override of @villagekit/sandbox the stylesheet on /designs/bed-frame carries `.css-1xu3pyz:hover .sandbox-controls, .css-1xu3pyz:focus-within .sandbox-controls { opacity: 1 }`, legacy's rule shape (`.css-lsis84`), the four .sandbox-controls groups read opacity 1 under the pointer and with a control focused and 0 otherwise at 1280 and 375, legacy's readings, the console holds no kebab-case line for the sandbox, and each toolbar button works. The pointer cursor this item's Legacy section reads is the HoverCard frame's (catalogue-item.tsx:107-112 at fce357d, cursor pointer on the HoverCard sx), [[9d5af9f80912]]'s, not the sandbox's: the container reads auto on both probes here and pointer on legacy, unchanged by this fix. Waits on the operator's publish of @villagekit/sandbox; the bump plan [[99f2fe62c62f]] moves it to fixed.
