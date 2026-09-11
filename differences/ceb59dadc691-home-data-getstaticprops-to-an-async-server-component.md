---
title: "Home data: getStaticProps to an async server component"
status: sanctioned
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:382-386` `export const getStaticProps: GetStaticProps<DesignsPageProps>` feeding `HomePage` its `designs` prop.

## Current

`app/page.tsx:91-92` `export default async function HomePage() { const designs = await getDesignIndex() ... }`.

## Verdict

rule: upgrade (the app router has no getStaticProps; a server component fetches its own data)

## Log

- 2026-09-12: What the data path does beyond the forced move (a generated module, a label sort, a nullable image) is [[272613135119]].
