---
title: Bold lead-ins as styled Span, not strong
status: open
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. The home ledger's pattern item is [[01ae1e943907]].

## Current

`app/suppliers/page.tsx:193` `<Span fontWeight="bold">Compatibility:</Span>`, `:138,147,151` the "How to be listed" lead-ins, `:103,111` the empty-state lead-ins: plain `span`s bold by CSS, no `strong`, so nothing reaches the accessibility tree.

## Verdict

## Log
