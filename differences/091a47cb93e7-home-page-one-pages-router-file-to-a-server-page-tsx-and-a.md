---
title: "Home page: one pages-router file to a server page.tsx and a client HomePage.tsx"
status: open
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx` at `fce357d` is one file: `HomePage` with `NextSeo` for the title (`:74`), the breakpoint hooks (`:59-70`), the seven sections, `getStaticProps` (`:382-386`), the two stories' `metadata` imports (`:48-49`) and the private helpers below the page (`:388-551`).

## Current

`app/page.tsx` (25 lines) is a server component: it exports `metadata` (`:10-12`, `title: { absolute: 'Grid Beam' }`), awaits `getDesignIndex()` (`:15-16`), imports the two stories' `metadata` (`:4-5`) and renders `<HomePage>` (`:19-23`). `app/HomePage.tsx` is a client component (`'use client'`, `:2`) holding the hooks (`:63-74`), the seven sections and the private helpers (`:386-548`), legacy's page body line for line. The app router exports `metadata` from a server component only, and `useIsMobile`, `useBreakpointValue`, `useInView` and `useDesignTypingEffect` need a client one; the MDX imports stay in the server file so the two stories' compiled content never enters the home's client bundle.

## Verdict

## Log

- 2026-09-26: Filed open by the page re-port (plan [[159c621d8a1a]]) for its own deviation, so not judged by it, as the adapter slice filed [[1eddda919812]]. The rule to test it against is rule 4 of 2032533f (upgrade-forced): the app router allows no other split, and the visitor sees the same page. Goes on the home's verdicts plan at the record's finish (the record's Log, call 8).

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): named on the home's verdicts plan [[8bb4a4380264]] for the operator (decision 40abdb2f222a); the state stays open until judged there. No verdict written.
