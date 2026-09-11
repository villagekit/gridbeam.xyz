---
title: FormControl and FormLabel to chakra.label
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:126-148` `FormControl` > `FormLabel htmlFor="unlimited-beams"` > `Text fontSize="sm" variant="tertiary"` beside the `Select id="unlimited-beams"`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:153-157` `chakra.label htmlFor="unlimited-stock"` > `Text as="span" fontSize="sm" variant="tertiary"`, with the comment at `:150-152` on why (`Field.Root` needed for `FieldLabel`, `as` does not widen `htmlFor`). The toggle's labels are a separate accessibility item.

## Verdict

rule: upgrade (Chakra v3 has no FormControl/FormLabel; the label element with htmlFor keeps the legacy association)

## Log

- 2026-09-12: Parity review, 2026-09-12: Chakra v3 ships Field.Root and Field.Label (the group role, [[623947dd6b3c]]), so chakra.label is convenience, not what the upgrade forces; the sanction stretched rule 4. Superseded: regression.
