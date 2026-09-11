---
title: "Audit tooling: DOM extraction for both sides"
status: done
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

Shipped: `pnpm audit:dom` (`scripts/audit-dom.mjs`) writes, per route and declared side, `audit/<slug>/dom/<side>.txt` (`document.body.innerText` through the pure `scripts/audit-dom/normalize.ts`, one block per line, whitespace collapsed) and `<side>.aria.yaml` (`page.ariaSnapshot()`, raw), plus `manifest.json` with each side's status; the missing side of a `legacy-only` / `current-only` route is skipped; a declared side that fails (HTTP 400+, navigation error, timeout) is recorded and the script exits 1 after every route was attempted. `scripts/audit-shared.mjs` holds what both scripts share: `parseArgs` (the pages script keeps `--widths`, the dom script rejects it), `loadRoutes` (returns `{ route, sides }`), `routeToSlug`, `gotoSettled` (the wait strategy). `audit-pages.mjs` imports them and keeps its behavior, screenshotting both sides of a marked route. Wired in `package.json`; documented in both scripts' headers, CLAUDE.md's Commands table (the "(ships in M1)" marker dropped) and the parity skill's Capture step (its "once M1 ships it" was stale).

Verified: Node v22.22.2 strips the `.ts` import unflagged; Chromium for Playwright 1.60.0 present; the legacy host answers 200; `pnpm audit:pages` on `/about` wrote 6/6 pairs before and after the extraction; `pnpm audit:dom --routes scripts/audit-routes.txt` over all 24 routes (44 captures) exited 0 with 44/44 captures (the first full run, before the retry, was 42/44: `/subscribe` on both sides, transient, see below); `diff audit/about/dom/legacy.txt current.txt` shows the `/about` copy differences in document order; `normalize.test.ts` (written first, red then green) is green; `pnpm check` green. No route is touched, so no screenshot pairs to look at.

Deviations from the plan, and why:
- The wait strategy, extracted verbatim, gained one retry after a 2 s pause (`gotoSettled` in `audit-shared.mjs`). The first full run failed 2/44: `/subscribe` on both sides, "interrupted by another navigation" (the `load` fallback colliding with the timed-out `networkidle` navigation under load, and a network blip on the legacy side); both sides load cleanly in isolation. Without the retry the plan's "exits 0 over the routes file" does not hold on a loaded machine. The pages script shares the retry; its outputs are unchanged. Tooling only, nothing visitor-facing.
- The routes reader is strict: a token after the path that is not `legacy-only` / `current-only` exits 1 with the line number, where the old pages reader silently dropped it. One reader for both scripts, and a typo must not pass as "both sides".
- A failed side deletes its `.txt` / `.aria.yaml` from an earlier run before capturing, so a stale extraction never diffs as fresh (review finding).
- `package.json` raises the Playwright floor from `^1.48.0` to `^1.60.0` (the installed version; `page.ariaSnapshot()` is newer than 1.48). Lockfile specifier updated, resolved version unchanged.
- The manifest also records `capturedAt` (not asked; says when the extraction is from).

Review (three Opus axes, two rounds). Findings fixed: stale side files; import-group blank line; the fixture's non-breaking spaces made explicit ` ` escapes (they were literal bytes, which two reviewers could not see); Playwright floor; `.aria.yaml` trailing newline; parity skill doc. Rejected: extracting the one-line `bases` map into the shared module and dropping the idempotent second `mkdir` (below the bar for a shared abstraction); restructuring the wait strategy as one `goto(domcontentloaded)` + `waitForLoadState('networkidle')` (the author's shape is kept and the retry also covers a network blip, which the restructure would not); a `--viewport` flag (not asked; the 1280 px choice is documented in the header, and narrow widths have the screenshot pairs). Parity's faithfulness observations (innerText has no alt text, nothing behind an inactive tab, does include visually hidden text; the home typewriter is captured mid-animation; table cells become space-separated) are properties of `innerText`, not of the spec, and are now stated in the script's header so the ledger's families read `.txt` and `.aria.yaml` together. Heads-up for the shell and about ledgers, not filed here (ledger plans' work): `/about` heading and body rewritten, Store/Cart and cookie banner dropped, footer policy and social links dropped, skip link added; `/designs/<slug>` "View plan" vs "View cutting plan", "Product Care" vs "Product care".

Round two: Standards and Spec report nothing critical; Spec confirmed the retry against the plan's failure semantics (a 4xx resolves and is never retried, a real navigation error fails both attempts, exit 1 only after every route). Taken from round two: a `console.warn` when the retry fires; the comment on the stale-file removal reworded to "a side that never loaded". Rejected: a timeout on `page.evaluate` (Playwright's evaluate takes none); the pages script's `console.log` on failure (pre-existing, untouched). Parity round two re-confirmed no route or copy change and found two gaps in the header, both fixed: an image leaves no line at all (the normalizer drops blank lines), and neither file has the `<title>` or meta description (both snapshots start at `<body>`; the copy family reads them from the source). Not taken: a null `goto` response recorded as ok with status 0 (the author's pre-existing handling, never hit in 44 captures); the legacy cookie banner appearing in every legacy `.txt` (fresh context per route; one shell item for the shell ledger).

## Log
