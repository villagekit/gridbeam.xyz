---
title: Return policy card removed
status: sanctioned
route: /legal
axis: copy
kind: removed
---
## Legacy

`packages/applet-legal/src/pages/legal.tsx:26-32` `title="Return policy"`, `description="How to return items if you're not satisfied with your purchase."`, `href="/legal/return-policy"`, icon `FaUndoAlt` (`audit/legal/dom/legacy.txt:9-10`).

## Current

No such card in `app/legal/page.tsx` (two cards, `:53-66`). The route it linked to is its own item on `/legal/return-policy`.

## Verdict

rule: no e-commerce (the return policy is gone)

## Log
