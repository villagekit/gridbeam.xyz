---
title: "Article Open Graph times: UTC midnight from legacy's Vercel build to the build machine's local midnight as UTC"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:40-41` at `fce357d` writes `modifiedTime: updatedAt.toISOString()` and `publishedTime: publishedAt.toISOString()` on `Date` values built as `new Date('2024/10/10')` (`pages/stories/whats-a-grid-unit.mdx:18-19`), which parse as the build machine's local midnight. Vercel builds in UTC, so the live page serves `<meta property="article:published_time" content="2024-10-10T00:00:00.000Z">` and the same on `article:modified_time`; the same shape on the other five story routes (`building-with-grid-kit` `2021-08-23T00:00:00.000Z`).

## Current

`app/stories/[slug]/page.tsx:34-35` writes the same two `toISOString()` lines on the same `Date` values (`content/stories/whats-a-grid-unit.mdx:22-23`), and nothing pins the build's timezone (`.github/workflows/check.yml`, `package.json`'s `build` and `deploy` scripts). The six pages are prerendered, so the value is the machine's that runs the build: on the operator's NZST machine `pnpm dev` and `next build` serve `article:published_time` `2024-10-09T11:00:00.000Z` (`building-with-grid-kit` `2021-08-22T12:00:00.000Z`), the previous day; a CI build in UTC serves legacy's value. The same shift lands on `/sitemap.xml`'s `<lastmod>` (`app/sitemap.ts:54`), a current-only route.

## Verdict

## Log

- 2026-09-26: Filed from the Parity review of the fields slice (plan [[52adacea5b2f]]), which made the two lines legacy's and so surfaced the build-time dependency legacy's Vercel deploy hid. No rule covers it, so regression by default (decision 2032533f). The site-side code is legacy's line for line; what differs is where the build runs. The candidate closes: pin the build's timezone to UTC where the deploy builds (the release milestone [[a4df2bf79395]], which owns the Cloudflare build), which reproduces legacy's live values, or the operator judges the shift acceptable. Not this slice's call.

- 2026-09-26: The story MDX files moved with the page re-port (plan 4331147cc118): a path content/stories/<slug>.mdx in the text above now reads app/stories/<slug>/page.mdx, the same body at the same lines plus one import line and two export lines after the story object.
