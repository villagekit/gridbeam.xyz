---
title: "Two external LinkCards added: Source on GitHub and Community forum open a new tab"
status: open
route: /tools-and-resources
axis: interaction
kind: added
---
## Legacy

The one legacy card is internal (`href="/tools/cutting-planner"`, `linkComponent={NextLink}`, `apps/gridkit/pages/tools-and-resources.tsx:16-17`).

## Current

`app/tools-and-resources/page.tsx:93-107` two entries with `isExternal: true`, rendered with `linkComponent={entry.isExternal ? undefined : NextLink}` (`:135,154`) and `target="_blank" rel="noopener noreferrer"` from `@villagekit/ui@1.2.0 src/components/LinkCard.tsx:53-54`; no visible or accessible new-tab marker (the same as legacy's `isExternal` cards elsewhere).

## Verdict

## Log
