---
title: "Fullscreen slider tooltip: legacy flips the first slider's tooltip below its thumb where zag keeps it above, the HoverCard frame restored"
status: open
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

On the live `/designs/makers-desk` at 1280, in fullscreen under the `Custom` preset, the first number slider's tooltip opens below its thumb (`data-popper-placement="bottom"`, the thumb at 1092, 152 and the tooltip at 184 to 216) while the third and fifth open above (the scratchpad's `flip.mjs`, the re-port's probe). Popper's flip reads the reference's clipping ancestors, and the thumb's is the preview frame `div.ui-hover-card` (`overflow: hidden`, top 218 in fullscreen, since a fullscreen element's ancestors keep their layout boxes), so Popper reads no room above; `apps/gridkit/components/catalogue-item/catalogue-item.tsx:105-115` at `fce357d` is the frame.

## Current

The same probe after the page re-port, the frame restored by `app/_components/catalogue-item/CatalogueItem.tsx:99-110`: the first slider's tooltip opens above its thumb (`data-placement="top"`, the thumb at 948, 146 and the tooltip at 110 to 134), the third and fifth above too, with the same clipping ancestor present (`div.ui-hover-card` at top 200). Chakra v3's tooltip positions with floating-ui through zag, whose flip reads the floating element's clipping ancestors, not the reference's, so the frame no longer flips it. Read on `/designs/makers-desk`, the desk with the most sliders; filed on this route as the record's sampled route. A fix, if one is wanted, belongs to the engine's tooltip positioning in `../gridkit` or the ui's `Tooltip` in `../ui`, never here.

## Verdict

## Log

- 2026-09-28: For the operator, on the design pages' verdicts plan [[8512c5e9cc98]] by the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): the live behavior is Popper's reading of the frame as the thumb's clipping ancestor, and the current one is floating-ui's through zag reading the floating element's ancestors, the same library change the operator judges on the designs index's list message ([[105cb9410b89]] on [[549ec777422c]]); the live site being ground truth for interaction (bfa9a416), the question is whether rule 4 of 2032533f covers the positioning library's change, or a ../gridkit or ../ui slice sets the tooltip's positioning boundary to the frame so it flips as Popper did. Not judged here; the state stays open.
