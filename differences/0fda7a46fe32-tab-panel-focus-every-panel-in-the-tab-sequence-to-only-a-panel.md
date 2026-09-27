---
title: "Tab panel focus: every panel in the Tab sequence to only a panel with nothing focusable"
status: open
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

Every tab panel is in the page's Tab sequence: Chakra v2's `useTabPanel` writes `tabIndex: 0` on each panel ("Puts the tabpanel in the page `Tab` sequence", the packed `@chakra-ui/tabs` `dist/chunk-NXSBASJ3.mjs:205-206` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`), so on `/designs/bed-frame` at 1280, with the `Parts` tab clicked, one Tab press from the trigger focuses the panel itself (`div[role=tabpanel][tabindex=0]`), read on the live page by the implementing agent of plan 402430831b29 (its scratchpad `panel.mjs`).

## Current

zag's tabs machine removes the panel's `tabindex` whenever the selected panel holds a focusable element and sets `0` only when it holds none (`node_modules/.pnpm/@zag-js+tabs@1.40.0/node_modules/@zag-js/tabs/dist/tabs.machine.js:251-263`, `syncTabIndex`), so with the `Parts` tab clicked one Tab press from the trigger lands on the panel's first switch input, not the panel; the `Overview` panel, which holds no focusable, keeps `tabindex="0"` (read on `pnpm dev` against the published `@villagekit/ui@1.2.0` by the same probe). Reported by the Parity review of plan 402430831b29; not caused by it.

## Verdict

## Log

- 2026-09-28: For the operator, on the design pages' verdicts plan [[8512c5e9cc98]] by the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): whether zag's tabs machine dropping a panel with a focusable from the Tab sequence is an upgrade-forced deviation under rule 4 of 2032533f (WAI-ARIA's own pattern for a tab panel with focusable content), or a regression for a ../ui slice that writes tabIndex 0 on Tabs.Content as Chakra v2's useTabPanel did. Not judged here; the state stays open. The accessibility pass after M2 (note eeba2a65cee4) is where legacy's markup is bettered.
