---
title: "Select field hover: Chakra v2's gray.300 border under the pointer removed"
status: open
route: shell
axis: interaction
kind: removed
---
## Legacy

Chakra v2's input field wrote `_hover: { borderColor: gray.300 }` in its `outline` variant, which v2's select field took as its own (the packed v2 theme at 3.3.1, the version legacy's `pnpm-lock.yaml` pins, `components/input.js:118-120` and `components/select.js:115-122`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), and the 0.9.0 `Select` wrapper (`../ui` at `a5cbe36`, `src/components/Select.tsx:17`) passed it through: on the live site `/designs` at 375, either `role="menuitem"` select's border reads `rgb(203, 213, 224)` under the pointer where at rest it reads `rgb(226, 232, 240)` (the Parity review's probe of plan ad2f5e52f9d8, `scratchpad/verify-probe.mjs`, `legacy.hover`).

## Current

Chakra v3's native select `outline` field (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/native-select.js:63`, taking `recipes/select.js:134-140`) writes `borderColor: border` and an `_expanded` color and no `_hover`, and the ui recipe (`../ui/src/components/Select.tsx` at `7ee04a9`, `nativeSelectRecipe`) writes none: on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the same selects read `rgb(226, 232, 240)` under the pointer, the rest color. The same on the published `@villagekit/ui@1.2.0`.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[ad2f5e52f9d8]], which found it beside the background it fixed; not from that change (the readings hold before and after it). Not judged. The mechanism is the package's select recipe, so a fix is a ui slice beside the shell record; handed to [[6bc0d3ba08dc]].
