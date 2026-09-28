---
title: "Required inputs: aria-required true beside required to required alone by Ark Field"
status: open
route: shell
axis: accessibility
kind: removed
---
## Legacy

Chakra v2's `FormControl` with `isRequired` (`@chakra-ui/form-control`, `getInputProps`): the input carries `required` and `aria-required="true"`; on the live `/subscribe`, the name and email inputs read both.

## Current

Ark's `Field.Root` with `required` (`node_modules/@ark-ui/react`, the field's input props): the input carries `required` alone, no `aria-required`; the accessibility tree marks the required state the same on both sides (`audit/subscribe/dom/{legacy,current}.aria.yaml`, no required mark on either), the native attribute carrying it.

## Verdict

## Log

- 2026-09-28: Filed open by the Parity review of the subscribe re-port (plan 244b962caae9), an attribute Ark's field no longer writes, the tree the same on both sides; on the shell verdicts plan 77cf83a1285a in the words of the required indicator's 57c221eb04a4.
