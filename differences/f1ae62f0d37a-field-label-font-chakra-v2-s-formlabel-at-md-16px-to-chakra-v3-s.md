---
title: "Field label font: Chakra v2's FormLabel at md, 16px, to Chakra v3's field label at sm, 14px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `FormLabel` theme sets `fontSize: "md"` (`@chakra-ui/theme` `dist/components/form-label.js:28` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`), so on the live `/designs/bed-frame` at 1280 the engine's `Preset` and `Controls` labels (`@villagekit/parameters` at the 0.9.0 tag, `FormLabel htmlFor="show-controls"`) read 16px with a 24px line height (the re-port's `verify-parity.mjs`, `controls.preset` and `controls.controls`, both sides); the Parity review's `audit/_review/sbs-375.png` and `sbs-768.png`.

## Current

`@villagekit/ui@1.2.0` re-exports Chakra v3's `FieldLabel` as `FormLabel` (`node_modules/@villagekit/ui/dist/index.d.ts:3`), whose field recipe gives the label slot `textStyle: "sm"` and `fontWeight: "medium"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js:19-27`), so on `pnpm dev` the same labels read 14px with a 20px line height, at 375, 768 and 1280. Every `FormLabel` on the site without its own `fontSize` reads the same: the engine's controls on every design page, the planner's and the subscribe form's; the applet toggle's two labels set `fontSize="sm"` themselves. A fix belongs to the ui's `FormLabel` in `../ui`, never here. Read by the Parity review of the page re-port (plan 3c448a379ad7), which introduced neither.

## Verdict

## Log

- 2026-09-28: Handed to the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): Chakra v2's value written in the ui recipe or wrapper in ../ui, the one ui slice the record's split (call 7) and the applet components slice named for the open form items on shell, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.

- 2026-09-28: Moved to upstream by the ui form recipes slice [[59fa9072c63f]] (decision 28c1a536): fixed in ../ui at commit ae6e4ae on its main (the fieldRecipe, inputRecipe, numberInputRecipe, tableRecipe and Section), read on pnpm dev under the file:../ui override against the live legacy site (the slice's Outcome, its probe's legacy.json and after.json); waits on the operator's publish, which the bump plan [[99f2fe62c62f]] consumes and moves this to fixed.
