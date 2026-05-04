# 02 — First-pass audit and per-page task creation

**Status:** DONE — audit run 2026-05-04. Findings at [`./initial-audit/findings.md`](./initial-audit/findings.md). Per-page tasks 03–09 filed; see the [Stream 06 README](./README.md) task table.

## Decisions
- **Discover regressions cold via the comparison.** Don't seed `findings.md` with prior assumptions about what's wrong — let the side-by-side artifacts surface every regression unbiased.

## Why
With the tooling from task 01 in place, one sweep produces the comparison artifacts for every page. The output of *this* task is a triaged backlog: a set of per-page uplift task files (03+) describing what regressed and how to fix it. Pages already at parity don't get a task.

## What
A reviewed comparison set + per-page tasks under `todo/06-design-parity/` — one per page that needs work, each with concrete findings and a recommended remediation mode (restore vs first-principles).

## Steps
- [x] Run `pnpm audit:pages` against the canonical route list. Pages to include (intersection of legacy and current):
  - `/`, `/about`, `/faq`, `/tools-and-resources`, `/tools/cutting-planner`, `/contact`, `/subscribe`, `/legal`, `/legal/privacy-policy`
  - `/stories`, `/stories/<each slug>` — port slugs from `node-modules/apps/gridkit/pages/stories/`
  - `/designs`, `/designs/<2-3 representative slugs>` — sample, not exhaustive
  - `/suppliers` — note: legacy has `/store` instead; comparison is structural ("how is the browse mechanic shaped") not identical-route.
- [x] Walk every comparison and **score on five axes**:
  - Visual (layout / spacing / typography / color / imagery)
  - Interaction (hover / transitions / mobile menu / focus / scroll)
  - Accessibility (heading order / alt / focus traps / contrast / axe)
  - Copy (wording / voice / CTAs)
  - Code patterns (when reading the implementation: did the rebuild adopt a worse pattern than the legacy author chose?)
- [x] Capture all findings in `todo/06-design-parity/initial-audit/findings.md` — one section per page, scored on each axis, with screenshot file references.
- [x] For each page with regressions, write a task file at `todo/06-design-parity/<NN>-<page-slug>.md` (numbered 03 onward, in audit order). Each task must include:
  - **Concrete** regressions found per axis — specific, not "feels off".
  - File-path references to comparison shots under `audit/`.
  - Recommended mode: **restore close to legacy** (the default) or **first-principles rethink** (with a stated reason it would produce something better).
  - Current code path(s) to touch (e.g. `app/about/page.tsx`).
  - Legacy code reference (e.g. `node-modules/apps/gridkit/pages/about.tsx`).
- [x] Update this stream's README task table with the new tasks.
- [x] Mark `todo/05-cleanup/04-pre-launch-qa.md` as superseded — its checklist is folded into the per-page tasks.
- [x] Update `todo/04-content/README.md` to flag that copy parity is now owned by Stream 06.

## Notes
- Don't fix anything in this task. The output is a triaged backlog; implementation goes in the per-page tasks.
- Use the **live legacy URL** for visual ground truth and the **in-repo source** at `./node-modules/apps/gridkit/pages/<page>.tsx` for the implementation reference (JSX, CSS, copy).
- A page being "at parity" doesn't mean pixel-perfect — it means no axis is worse and no good thing was silently dropped.
- Likely (not exhaustive) regression candidates flagged a priori:
  - Home — hero / section composition likely simplified
  - About — diagrams and structural sections
  - FAQ — categorisation depth
  - Stories index + per-story — card layout, typography, image treatment
  - Designs catalog — grid, filters, card chrome
  - Cutting planner — print mode, URL state, control density
  - Footer — legacy footer was richer; new one may have been collapsed
- A `findings.md` template at the top of the file would help — propose one when running the audit.

## Outcomes (post-run)
- Most a priori candidates were confirmed regressions (home, stories index, footer); some weren't (designs catalog turned out near-parity, cutting planner improved).
- Surprise findings not in the a priori list: header brand mark loss (cross-cutting), icons missing from link cards (cross-cutting), about-page rhythm loss (more nuanced than expected — partly justified by new content).
- Audit script change: networkidle timed out on every `/designs/<slug>` capture (3D viewer keeps the network busy). Patched `scripts/audit-pages.mjs` to fall back to `load` after 15 s networkidle timeout; that resolved the design pages. Worth keeping the patch.
- Added `scripts/rebuild-audit-index.mjs` to regenerate the master `audit/index.html` after a partial re-run (the audit script overwrites the index with only its own routes).

## Depends on
- ./01-audit-tooling.md
