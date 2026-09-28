---
title: "Input size md text: Chakra v2 fontSize md, 16px on 24px, to Chakra v3 textStyle sm, 14px on 20px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's input theme (`@chakra-ui/theme`, `components/input.ts`, size `md`): `fontSize: md`, 16px; on the live `/subscribe`, `Preferred name` types at 16px on a 24px line in a 40px field (measured 2026-09-28).

## Current

Chakra v3's input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js:43-47`, size `md`): `textStyle: sm`, 14px on a 20px line in the same 40px field. The sibling's `../ui/src/components/Input.tsx:83` at `ca72207` writes size `md` as `inputSize('md', '4', 'md')`, `fontSize: md` with `textStyle: none`, 16px again.

## Verdict

## Log

- 2026-09-28: Parked upstream at the mint (plan 244b962caae9), read on the subscribe form's pairs: the sibling's src/components/Input.tsx:83 at ca72207 writes size md as `inputSize('md', '4', 'md')`, `fontSize: md` under `textStyle: none`, 16px on the body's line again, the ui form recipes slice 59fa9072c63f; the bump plan 99f2fe62c62f reads it on /subscribe and /tools/cutting-planner and moves this to fixed.
