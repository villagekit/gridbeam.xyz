---
title: "Typing heading before the shuffle: Build a to Build, the article dropped for the empty label"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:401-403,416-418`: `currentDesignIsPlural` is `null` while `currentDesign` is `null` (before the client-side shuffle), and the heading renders `Build {currentDesignIsPlural ? '' : 'a '}`, so the server HTML and the first paint read `Build a ` followed by the non-breaking space (a curl of the live site, 2026-09-26).

## Current

`app/_components/landing/TypingDesignSection.tsx:97-101`: `getArticle('')` returns `''` for the empty label, so the server HTML reads `Build ` followed by the span with the non-breaking space (a curl of `pnpm dev`, 2026-09-26); the article appears with the first design after hydration. Found by the Parity review of plan 60cca8519469, in code the design carousel slice did not touch.

## Verdict

## Log

- 2026-09-26: Filed regression by the design carousel slice (plan [[60cca8519469]]), whose plan leaves the section's heading untouched. The page re-port [[159c621d8a1a]] inlines the section from pages/index.tsx with legacy's currentDesignIsPlural logic and closes it; a fix in place would be getArticle returning 'a ' for the empty label.
