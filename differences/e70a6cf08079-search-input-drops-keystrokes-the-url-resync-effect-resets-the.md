---
title: "Search input drops keystrokes: the URL resync effect resets the field mid-typing"
status: dismissed
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/context/catalogue.ts:104-110,140-141` typing `table` at 60 ms per key on the live site yields one `pushState` to `?search=table` and the field reads `table` (Playwright probe, plan cf52c388).

## Current

`app/_components/catalogue/Catalogue.tsx:90-93,102-124` the same probe leaves the field at `tble` and the URL at `?q=tble`: the debounced `replaceUrl` changes `urlSearch`, and `useEffect(() => setSearch(urlSearch), [urlSearch])` overwrites what was typed after the timer fired.

## Verdict

the same difference as [[651ccc51018f]]: the dropped keys are the 250 ms debounce effect through a resync both sides share; recorded in that item log

## Log
