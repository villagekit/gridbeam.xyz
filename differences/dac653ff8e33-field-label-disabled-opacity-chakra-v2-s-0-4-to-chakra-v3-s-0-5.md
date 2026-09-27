---
title: "Field label disabled opacity: Chakra v2's 0.4 to Chakra v3's 0.5"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `FormLabel` base wrote `opacity: 1` and `_disabled: { opacity: 0.4 }` (the packed v2 theme at 3.3.1, `components/form-label.js:31-34`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`).

## Current

Chakra v3's field recipe writes `_disabled: { opacity: '0.5' }` on the label (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`), and the ui `fieldRecipe` (`../ui/src/components/FormLabel.recipe.ts`) does not replace it. No route renders a disabled field today, so nothing shows it. Read by the ui NumberInput and field label slice's reviews; a ui recipe reading, for a `../ui` slice beside the shell record.

## Verdict

## Log

- 2026-09-28: Fixed in ../ui commit 3f59037 (plan [[42f6738b9658]]): the label writes opacity 1 and 0.4 under _disabled, Chakra v2's form-label theme; read at 0.4 on a disabled field of the slice's throwaway probe route under the file:../ui override (audit/_probe42f6/after.json, probe.disabled). Waits on the operator's publish for the bump plan [[99f2fe62c62f]] to move it to fixed (decision 28c1a536).
