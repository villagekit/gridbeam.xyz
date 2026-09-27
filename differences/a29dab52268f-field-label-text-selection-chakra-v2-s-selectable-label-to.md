---
title: "Field label text selection: Chakra v2's selectable label to Chakra v3's user-select none"
status: upstream
route: shell
axis: interaction
kind: changed
---
## Legacy

Chakra v2's `FormLabel` wrote no `user-select`, so a label's text is selectable with the pointer: on the live `/designs/bed-frame` at 1280 and 375 every field label (`Preset`, `Controls`, the engine's parameter labels) reads `user-select: auto` (`audit/_probe42f6/legacy.json`, `labelUserSelect`; the packed v2 theme at 3.3.1, `components/form-label.js:31-40`, and the `FormLabel` component, `form-control/dist/chunk-H46NUPBZ.mjs:33-37`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`).

## Current

Chakra v3's field recipe writes `userSelect: none` on the label (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`, the `label` base), and the ui `fieldRecipe` (`../ui/src/components/FormLabel.recipe.ts`) does not reset it: on `pnpm dev` under the `file:../ui` override every field label on `/designs/bed-frame` reads `user-select: none` (`audit/_probe42f6/after.json`), so a label's text cannot be selected with the pointer. Predates the ui field root and label box slice `42f6738b9658`, which read it on its probe; a ui recipe reading, for a `../ui` slice beside the shell record, the badge's selectable text (`a4f938a27428`) its precedent.

## Verdict

## Log

- 2026-09-28: Fixed in `../ui` as commit 60e63a2 on its `main` over 3f59037 (not pushed; the push goes with the operator's publish, decision `28c1a536`): `fieldRecipe`'s label base writes `userSelect: 'auto'`, the initial value, over Chakra v3's `none`. Read by the `b8c6df9b44e8` probe on `/designs/bed-frame` under the `file:../ui` override: the `Preset` and `Controls` labels at 1280 read `user-select: auto`, matching the live legacy reading, and a drag across the `Preset` label's text selects it (`audit/_probeb8c6d/after.json`, `drag3.mjs`).

- 2026-09-28: Superseding the note above: reverted. `../ui` commit 60e63a2 was reset before push (`git -C ../ui reset --mixed 3f59037` then `git restore`), so it no longer exists and this item is not fixed. The revert followed the escalation rule (CLAUDE.md, Sub-agents): the Parity review of plan `b8c6df9b44e8` found the sibling change caused a new regression on `01f445a34cc9`'s row (below), a choice the plan did not settle, so the fix was pulled back before commit. This item's own reading (`userSelect: auto`) was itself correct and reproduced on the probe; it is reopened only because it shipped in the same sibling commit as the regressing change and that commit was undone whole. Back to `open`, `b8c6df9b44e8` reopened at `worker: opus` to resolve the interaction with the switch recipe.

- 2026-09-28: Fixed in `../ui` as commit 1c6a07b on its `main` over 3f59037 (not pushed; the push goes with the operator's publish, decision `28c1a536`), superseding the reverted 60e63a2 above: `fieldRecipe`'s label base writes `userSelect: 'auto'`, the initial value, over Chakra v3's `none`. Read by the `b8c6df9b44e8` probe under the `file:../ui` override on `/designs/bed-frame` at 1280 and 375: every field label (`Preset`, `Controls` and the engine's parameter labels) reads `user-select: auto`, as on live legacy, and a drag across the `Preset` label selects its text on both sides (`audit/_probeb8c6e/after.json` against `legacy.json`, `before.json` reading `none`). Waits on the publish for the bump plan [[99f2fe62c62f]] to move it to fixed.
