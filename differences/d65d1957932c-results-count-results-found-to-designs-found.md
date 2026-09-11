---
title: "Results count: results found to designs found"
status: open
route: /designs
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/results-count.tsx:18` `{items.length} {items.length > 1 ? 'results' : 'result'} found`, rendered `37 results found` (`audit/designs/dom/legacy.txt`).

## Current

`app/_components/catalogue/Catalogue.tsx:428` `{count} {count === 1 ? itemLabel.replace(/s$/, '') : itemLabel} found`, rendered `37 designs found` (`audit/designs/dom/current.txt`).

## Verdict

## Log
