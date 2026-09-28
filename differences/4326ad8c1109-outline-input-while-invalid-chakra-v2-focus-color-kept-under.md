---
title: "Outline input while invalid: Chakra v2 focus color kept under focus to v3 error red on the border"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's input theme (`@chakra-ui/theme`, `components/input.ts`, the `outline` variant): `_invalid` before `_focusVisible`, so a focused field whose value is invalid shows the focus color; on the live `/subscribe` with `a@b` submitted, the focused `Email` field reads `aria-invalid="true"` with the border and one-pixel shadow `rgba(0, 163, 196, 0.5)` (measured 2026-09-28).

## Current

Chakra v3's input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js`, the base `_invalid` writing `--error-color` on the border and the ring): the same field reads the border `rgb(239, 68, 68)` with no shadow while focused. The `flushed` variant's reading is [[d95ea9aa9271]]; the sibling's `../ui/src/components/Input.tsx:31-38,63-73` at `ae6e4ae` writes the focus color on the base `_focusVisible` and the outline's invalid border under hover only, which its comment says shows the focus color over the error color, unread here.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9), measured on both sides with `a@b` submitted: the sibling's input recipe at ae6e4ae reads as the fix and is unread against this form; the bump plan 99f2fe62c62f reads it on /subscribe with the flushed counterpart d95ea9aa9271, and the shell verdicts plan 77cf83a1285a holds it until then.

- 2026-09-28: Moved to regression by the Parity review of plan 244b962caae9: a visual change no rule covers is a regression by the ledger's rules, open being for the unjudged; upstream once the bump plan 99f2fe62c62f reads the sibling's fix on this form.
