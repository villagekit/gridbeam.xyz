---
title: "FAQ add-ons repository link: the same tab to target _blank"
status: fixed
route: /faq
kind: changed
axis: interaction
---
## Legacy

`../node-modules/apps/gridkit/pages/faq.tsx:141` at `fce357d`: `<Link key="replicad-models" href="https://github.com/villagekit/replicad-models">` with no `isExternal`, and the live legacy `/faq` renders `<a href="https://github.com/villagekit/replicad-models">` with no `target` and no `rel`, so the link opens in the same tab. The Australia link (`:197-200`) is written the same way; it is absent from the current page until the copy verdict `9da5502523b9` restores it, so no twin item is filed.

## Current

`app/faq/page.tsx:107-114`: the anchor carries `target="_blank" rel="noopener noreferrer"`, so it opens a new tab. `154bcd2abdfb` lists this anchor among the six that write `rel`, but that item's legacy lines are the `isExternal` links (the EPA and forum anchors among the kept ones); this link was not one, and its difference is the tab, not the `rel` value.

## Verdict

plan bba2bb35

## Log

- 2026-09-26: Filed at the faq split (plan [[7f0b60d948c5]]): the M1 ledger and [[154bcd2abdfb]] record the rel value on the isExternal links, not this link's tab. No rule covers a new tab legacy did not open, so regression; the page re-port closes it by writing legacy's Link with no target, and the copy slice restores the Australia link without one.
