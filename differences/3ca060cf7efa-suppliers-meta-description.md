---
title: Suppliers meta description
status: open
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers` (`audit/suppliers/1280/legacy.png` is the legacy 404 page).

## Current

`app/suppliers/page.tsx:25-26` "People who make grid-beam-compatible hardware. We don't sell parts; we link to those who do.", reused for `openGraph.description` and `twitter.description` (`:29-36`). The `<title>` renders as "Suppliers — gridbeam.xyz" through the template in `app/layout.tsx:32`.

## Verdict

## Log
