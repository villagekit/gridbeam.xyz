---
title: "Home design list: getStaticProps and getDesignIndexes to a generated module sorted by label"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:382-386` `getStaticProps` calls `getDesignIndexes(join(process.cwd(), '../../products/products'))` (`packages/designs/src/index.ts:17-32`, a filesystem walk in `readdir` order); `DesignIndex.image` is never null (`:10-15`).

## Current

`app/page.tsx:91-93` `await getDesignIndex()` (`app/_lib/designs.ts:22-31`, reading `designs-data.generated.ts` and sorting by `label`), then `.filter((design) => design.image !== null)` because `DesignIndexEntry.image` is nullable (`:7-13`); `TypingDesignSection.tsx:73` guards again.

## Verdict

## Log

- 2026-09-12: The app-router move from `getStaticProps` is rule 4; the generated module, the sort and the nullable image are not forced. `app/_lib/designs.ts` itself is the designs ledger's; this item is the home's use of it.

- 2026-09-12: The move from getStaticProps to an async server component is forced by the app router and has its own sanctioned item; this regression is the generated module, the label sort and the nullable image.

- 2026-09-12: The designs route's own use of the generated module is filed on `/designs` with the same judgement (plan cf52c388).
