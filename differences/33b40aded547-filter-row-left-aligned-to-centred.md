---
title: "Filter row: left-aligned to centred"
status: fixed
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/filters.tsx:20-27` `<HStack ... alignItems="center">` with no `justifyContent`: the chips start at the container's left edge, `audit/stories/1280/legacy.png`.

## Current

`app/stories/StoriesBrowser.tsx:57-61` `justifyContent="center"`; the chips are centred, `audit/stories/1280/current.png`.

## Verdict

plan 278fb531

## Log

- 2026-09-26: Correction at the page re-port (plan [[278fb531e229]], the Spec review's finding): the Legacy text's premise, the chips starting at the container's left edge, is wrong. Legacy's pages/stories.tsx:28 puts Filters inside a VStack, which centers its children, and the live legacy row's left edge measures 437px at 1280, the same as this site's after the re-port (audit/stories/probe.json, rowLeft on both sides). The shipped Filters.tsx writes no justifyContent, as legacy's filters.tsx did not, and the row is centered on both sides; the fix is the code being legacy's line for line, not a left alignment.
