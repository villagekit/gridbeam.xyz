# 01 — Build the audit tooling

**Status:** DONE — script + routes file + package.json wiring landed. Per-machine prerequisite: run `pnpm install` (picks up the `playwright` devDep) and `pnpm exec playwright install chromium` once. First run of `pnpm audit:pages` is task 02.

## Why
The parity work needs a reproducible side-by-side comparison: same routes, same viewports, same conditions, legacy vs current. Without it, "is this page worse than before" is subjective and the per-page work drags. With it, the audit is mechanical and the discussion shifts to which differences matter.

## What
A script under `scripts/` that takes a list of routes and produces, for each route × width, paired screenshots of the legacy site and the current site, plus a browseable `audit/index.html` grid that puts them side by side.

## Decisions
- **Tool: Playwright** (confirmed). Use the `playwright` package (browser-control core, smaller than `@playwright/test`). Requires a one-time `pnpm exec playwright install chromium` per machine.
- **Route list seeding strategy:** ship a starter `scripts/audit-routes.txt` with the obvious common routes; task 02 walks both apps' route trees to fill it out as part of the first audit run.

## Steps
- [x] Add `playwright` as a devDependency in root `package.json`. (Did not run `pnpm install` — per-machine action.)
- [x] Implement `scripts/audit-pages.mjs`. Behaviour shipped:
  - Reads routes from `scripts/audit-routes.txt` (one per line, `#` comments OK, blank lines skipped).
  - Default widths: 375, 768, 1280. Override with `--widths`.
  - Default legacy base: `https://gridkit-landing-villagekit.vercel.app`. Override with `--legacy-base`.
  - Default current base: `http://localhost:3000`. Override with `--current-base`.
  - `--headed` for debugging; `--out` to override output dir; `--routes` to override routes file.
  - Output: `audit/<route-as-slug>/<width>/{legacy,current}.png` plus `audit/index.html` (sticky-nav grid linking every pair, with HTTP-status badges on non-200 captures).
  - Wait for `networkidle` then 800 ms (animations) before capturing.
  - On failure for one capture, log and continue — never aborts the whole run.
- [x] Seed `scripts/audit-routes.txt` with the obvious common routes (top-level pages, tools, legal, all six stories, designs index, suppliers/store). Task 02 extends with representative design IDs and any missed routes.
- [x] Add `/audit/` to `.gitignore`.
- [x] Add `audit:pages` script to root `package.json`.
- [x] Document usage at the top of `scripts/audit-pages.mjs`.

## Notes
- Local dev server: `pnpm dev` → Next.js + turbopack on port 3000.
- The legacy site is on Vercel — already production, no auth, ~30 hits per audit run is fine.
- Keep the script pure-screenshot for now. Pixel-diff or perceptual-diff (`pixelmatch`, `resemblejs`) is a follow-up if needed — manual eyeball is the bar today.
- Capture **dark mode separately** if either site has it — a follow-up if the first pass shows it matters. Don't bake dark-mode capture into v1.
- A `--headed` flag for debugging is cheap to add and worth it.

## Depends on
- Nothing. First task in Stream 06.
