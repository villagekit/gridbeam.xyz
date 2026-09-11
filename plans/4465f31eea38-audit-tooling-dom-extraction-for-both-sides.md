---
title: "Audit tooling: DOM extraction for both sides"
status: todo
parent: c6182c6a8609
derived_from: c6182c6a8609
priority: urgent
---

Both sides of every route can be diffed as text, not only as pixels: `pnpm audit:dom` writes, beside the screenshot pairs `pnpm audit:pages` already writes, each page's visible text in document order and its accessibility tree, for the legacy site and the local dev server alike. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `bfa9a416`.

## Work

Extract the argument parsing and the routes-file reader of `scripts/audit-pages.mjs` (`parseArgs`, the route slugging, the wait strategy) into `scripts/audit-shared.mjs`, so `audit-pages.mjs` and the new `scripts/audit-dom.mjs` share them without either duplicating the other; `audit-pages.mjs` keeps its behavior. The reader returns each route with its sides: `scripts/audit-routes.txt` marks a one-side-only route with `legacy-only` or `current-only` after the path (the file's header documents it), and an unmarked route exists on both. Wire `pnpm audit:dom` in `package.json` with the same flags minus `--widths`.

Per route and side, load the page with Playwright (already a dev dependency, Chromium installed per machine) and capture two things: `page.ariaSnapshot()`, the accessibility tree as YAML (roles, names, headings, links, buttons and their states), written raw to `audit/<slug>/dom/<side>.aria.yaml`; and the visible text in document order (`document.body.innerText` via `page.evaluate`), normalized by a pure function into one block per line with whitespace collapsed, written to `audit/<slug>/dom/<side>.txt`. The normalizer lives in `scripts/audit-dom/normalize.ts` (Node 22.18+ strips types from a `.ts` import in a `.mjs` script; `.nvmrc` is 24) so Vitest tests it as `normalize.test.ts` beside it. `diff` on the two `.txt` files is the copy diff; the YAML is what the accessibility family reads.

`audit-dom.mjs` skips the missing side of a marked route. A capture that fails on a side the route is declared to have (an HTTP status of 400 or more, a navigation error, a timeout) is recorded and, after every route was attempted, exits the script non-zero; `audit/<slug>/dom/manifest.json` records each side's status.
Interfaces: `pnpm audit:dom --routes <file>` and the output layout above, for the `parity` skill; documented in the script's header comment and in CLAUDE.md's "Commands" table.
Verify first: `node --version` is 22.18 or later (type stripping; `.nvmrc` is 24, CI uses it), Chromium is installed for Playwright (`pnpm exec playwright install chromium`, once per machine), the legacy host answers (`curl -sI https://gridkit-landing-villagekit.vercel.app`), and `pnpm audit:pages --routes <a one-route file>` runs on this machine against the live legacy site and a local `pnpm dev`, before and after the extraction of the shared module.
Not this slice: any judgement of the extracted differences.

## Seams under test

`normalize(innerText: string): string` in `scripts/audit-dom/normalize.ts`: a fixture string with blank lines, runs of spaces, tabs and non-breaking spaces normalizes to the expected line-per-block form, as a Vitest test written first.

## Done when

- `pnpm audit:dom --routes scripts/audit-routes.txt` exits 0 against the live legacy site and a local `pnpm dev`, and writes `audit/<slug>/dom/{legacy,current}.txt`, `{legacy,current}.aria.yaml` and `manifest.json` for every route that exists on both sides
- `diff audit/about/dom/legacy.txt audit/about/dom/current.txt` shows the visible-text differences of `/about` in document order
- `pnpm audit:pages --routes <a one-route file>` still writes its screenshot pairs
- `normalize.test.ts` is green
- CLAUDE.md's "Commands" table drops the "(ships in M1)" marker from `pnpm audit:dom`
- `pnpm check` is green

## Outcome

## Log
