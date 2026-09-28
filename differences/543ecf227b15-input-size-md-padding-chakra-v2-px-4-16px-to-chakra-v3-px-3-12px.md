---
title: "Input size md padding: Chakra v2 px 4, 16px, to Chakra v3 px 3, 12px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's input theme (`@chakra-ui/theme`, `components/input.ts`, size `md`): `px: 4`, 16px; on the live `/subscribe`, the `Preferred name` placeholder starts 16px inside the field (measured by the Parity review of plan 244b962caae9).

## Current

Chakra v3's input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js:43-47`, size `md`): `px: 3`, 12px, the placeholder 12px inside. The sibling's `../ui/src/components/Input.tsx:83` at `ca72207` writes size `md` as `inputSize('md', '4', 'md')`, `px: 4` again; the font size is [[1ab306f09dca]].

## Verdict

## Log

- 2026-09-28: Parked upstream at the mint (plan 244b962caae9, the Parity review's reading): the sibling's src/components/Input.tsx:83 at ca72207 writes size md with px 4, the ui form recipes slice 59fa9072c63f; the bump plan 99f2fe62c62f reads it on /subscribe with 1ab306f09dca and moves this to fixed.
