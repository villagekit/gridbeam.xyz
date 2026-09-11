---
title: "Design page data: getStaticProps and getStaticPaths to generateStaticParams, generateMetadata and notFound"
status: sanctioned
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:268-295` `getStaticProps` (throws on bad params) and `getStaticPaths` with `fallback: false`; `<NextSeo title={meta.label} />` (`:54`).

## Current

`app/designs/[id]/page.tsx:17-49` `generateStaticParams`, `generateMetadata` (title, description, openGraph, twitter) and a `try`/`notFound()` around `getDesign`.

## Verdict

rule: upgrade (app router data and metadata APIs)

## Log

- 2026-09-12: Template. The generated module behind `getDesign` is the `/designs` code item; the openGraph and twitter objects are the shell item [[f46533a8ae54]].
