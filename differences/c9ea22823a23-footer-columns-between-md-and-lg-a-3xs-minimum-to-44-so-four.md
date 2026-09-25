---
title: "Footer columns between md and lg: a 3xs minimum to 44, so four columns fit 768"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Footer.tsx:72`: `minWidth: '3xs'` on every column at every width, so legacy's three columns are 224px each and the row 672px, which fits the 768 viewport (`audit/_root/768/legacy.png`, footer; measured: the row at x 48, 672px wide).

## Current

`../ui/src/components/layouts/Footer.tsx:110` (the brand footer slice): `minW={{ base: '3xs', md: '44', lg: '3xs' }}` on every column. Decision `9f344fbfde9a`'s four columns at 3xs would be 896px, wider than the md viewport, so between md (768px) and lg (1024px) each column's minimum is 44 (11rem): the row is 704px and fits (`audit/_root/768/current.png`, footer; measured: the row at x 32, 704px wide, `Tools and resources` on one line, the document 768px wide). From lg the columns are 3xs again: at 1280 the row is 896px (`audit/_root/1280/current.png`).

## Verdict

## Log

- 2026-09-26: Filed by the ui brand footer slice [[1977c9af920c]] as the expected stop the shell record's Log names: the four sanctioned sections (decision 9f344fbfde9a) do not fit a 768px row at legacy's 3xs minimum, so the smallest change to the ui Footer that fits them, a narrower minimum between md and lg, ships in the sibling, and the operator judges it. The alternatives left for that verdict: the row stacking until lg, or a wrap at md. Not sanctioned by an agent.

- 2026-09-26: The Current cites ../ui/src/components/layouts/Footer.tsx:110 at commit ae593d0 in the sibling.
