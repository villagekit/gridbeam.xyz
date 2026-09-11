---
title: "Suppliers page shape: three Sections, the third tinted gray"
status: open
route: /suppliers
axis: visual
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. Decision [[8b5e51fcaf61]] names a map at the top and cards below, nothing else.

## Current

`app/suppliers/page.tsx:56` `Section index={0}` (title, a centered `Container maxW="3xl"` paragraph), `:74-119` `Section index={1}` (the Listings grid, or the empty state), `:121-125` `Section index={2} colorPalette="gray" id="how-to-be-listed"` (a gray band, `audit/suppliers/1280/current.png`). Its text is filed as copy.

## Verdict

## Log
