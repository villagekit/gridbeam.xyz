---
title: Cookie policy card removed
status: sanctioned
route: /legal
axis: copy
kind: removed
---
## Legacy

`packages/applet-legal/src/pages/legal.tsx:46-52` `title="Cookie policy"`, `description="How we use cookies on our website."`, `href="/legal/cookie-policy"`, icon `FaCookie` (`audit/legal/dom/legacy.txt:13-14`).

## Current

No such card in `app/legal/page.tsx`. The route it linked to is its own item on `/legal/cookie-policy`.

## Verdict

rule: no startup plumbing (the cookie policy is gone)

## Log
