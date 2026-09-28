---
title: "Textarea box: Chakra v2 80px minimum height, 16px padding, focus border and shadow over 0.2s to Chakra v3 auto height, 12px padding and a gray outline with no transition"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's textarea theme (`@chakra-ui/theme`, `components/textarea.ts`, the `outline` variant and size `md` from the input's): an 80px `minHeight`, 16px padding, the focus color on the border with a one-pixel shadow and the `common` properties over 0.2s; on the live `/subscribe`, the three textareas are 80px tall (`audit/subscribe/1280/legacy.png`, measured by the Parity review of plan 244b962caae9).

## Current

Chakra v3's textarea recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/textarea.js`, the base and size `md`, `px: 3`, `py: 2`, no `minHeight`, the focus through `focusRingColor` and no transition): the same textareas are 58px tall with 12px padding, a gray one-pixel outline on focus and no transition, 22px shorter each (`audit/subscribe/1280/current.png`). The sibling's `../ui/src/components/Textarea.tsx` at `ca72207` writes only `bg="white"`, so the publish does not close this; the font size is [[f8b54ce1441c]].

## Verdict

## Log

- 2026-09-28: Filed regression by the Parity review of the subscribe re-port (plan 244b962caae9), measured on both sides: no rule of 2032533f covers a Chakra v3 recipe's box, and the sibling at ca72207 does not write it. A ui recipe fix in ../ui for a slice the shell verdicts plan 77cf83a1285a mints beside the shell record, blocking the bump plan 99f2fe62c62f.
