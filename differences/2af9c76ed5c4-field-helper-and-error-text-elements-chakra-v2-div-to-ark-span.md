---
title: "Field helper and error text elements: Chakra v2 div to Ark span"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

Chakra v2's `FormHelperText` and `FormErrorMessage` (`@chakra-ui/form-control`) render a `div` each; `audit/subscribe/dom/legacy.txt` reads them in document order.

## Current

Ark's `Field.HelperText` and `Field.ErrorText` render a `span` each (`node_modules/@ark-ui/react`, the field's helper and error text), `audit/subscribe/dom/current.txt` reading the same text; the `aria-describedby` on the control names both on either side.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9), the element swap Ark's field makes; on the shell verdicts plan 77cf83a1285a in the words of the loading spinner's a6f5528f74e3.
