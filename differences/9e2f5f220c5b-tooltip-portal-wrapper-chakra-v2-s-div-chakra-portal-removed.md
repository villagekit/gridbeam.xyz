---
title: "Tooltip portal wrapper: Chakra v2's div.chakra-portal removed"
status: open
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

Chakra v2's `Portal` renders a `div.chakra-portal` wrapper and mounts the tooltip inside it (the packed `@chakra-ui/portal` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/portal/dist/chunk-34PD6CUK.mjs:16-17`): on the live legacy page the tooltip's chain reads `div#tooltip-:r5:`, `div`, `div.chakra-portal` under `body`, and under `#sandbox-container` in fullscreen (the scratchpad's `legacy.json` for plan 4f55a829c726).

## Current

Chakra v3's `Portal` is Ark's, which `createPortal`s each child straight into the container or the body with no wrapper (`node_modules/.pnpm/@ark-ui+react@5.36.2*/node_modules/@ark-ui/react/dist/components/portal/portal.js:17-18`): the tooltip's positioner is a direct child of `body`, or of `#sandbox-container` in fullscreen (`current.json`). No visible effect; a code reading of the upgrade, filed by the Parity review of plan 4f55a829c726 and not judged.

## Verdict

## Log

- 2026-09-28: For the operator, on the design pages' verdicts plan [[8512c5e9cc98]], where the sibling slice that filed this item put it by note; confirmed at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a). Not judged; the state stays open.
