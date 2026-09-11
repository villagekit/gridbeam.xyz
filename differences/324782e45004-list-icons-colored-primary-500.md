---
title: List icons colored primary.500
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:226-268` `<ListIcon as={...} />` with no color, inheriting the text color; dark icons in `audit/_root/1280/legacy.png`.

## Current

`app/page.tsx:417-423` `<Icon color="primary.500" boxSize="6" mt="1">`; pink icons in `audit/_root/1280/current.png`.

## Verdict

## Log
