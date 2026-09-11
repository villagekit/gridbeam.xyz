---
title: "Hero emphasis span: primary.400 to primary.500"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:92` `<Box as="span" sx={{ color: 'primary.400', fontWeight: 'bold' }}>no experience needed</Box>`.

## Current

`app/page.tsx:121` `<Span color="primary.500" fontWeight="bold">no experience needed</Span>`.

## Verdict

## Log

- 2026-09-12: The token literals themselves are the shell item [[72b776cb0d3f]]; this is the call site's step change.
