# Stream 07 — Code review remediation

A full code-level review of this repo against the legacy baseline (`../node-modules/apps/gridkit/` plus the legacy monorepo packages) was run on 2026-08-03, after Stream 06's screenshot-based parity pass. Stream 06 caught visual/copy regressions; this review went file-by-file through the *code* and found a different class of issues: a fabricated historical fact in shipped copy, dropped legacy interaction behavior, unapproved copy rewrites, duplication of components the `@villagekit/*` packages already ship, dead invented API surface, and zero committed tests.

This stream turns those findings into tasks.

## How to work these tasks (read first)

1. **Verify before acting.** Every task was filed from a high-level review. The reviewer read the code but did not run every scenario, and the code may have moved since. Each task's first step is to reproduce the finding against the current code. If a finding doesn't hold up, don't force the fix — tick the step, record what you actually found in the task's Notes, and skip or adapt the rest. A wrong finding recorded is more valuable than a wrong fix landed.
2. **Legacy is the baseline** (same rule as Stream 06, see [`../06-design-parity/README.md`](../06-design-parity/README.md)). When restoring behavior, prefer the legacy author's approach unless there's a concrete stated reason to deviate.
3. **Decision-gated items are marked.** Several tasks contain steps that need Mikey's explicit sign-off (copy changes, promises to third parties, publishing to npm). "The task file suggests X" is not authorization — ask.
4. **Update the legacy checkout first.** `../node-modules` is checked out at `917daacb`, which is *older* than its `origin/main` — three of the six MDX stories and `story-image-grid.tsx` only exist upstream. Before any parity comparison in this stream: `cd ../node-modules && git fetch && git checkout origin/main` (or ask Mikey which ref is canonical). Comparing against the stale tree gives wrong conclusions.

## Tasks

Ordered roughly by severity and suggested attack order. Content-accuracy fixes first (live factual errors), then behavior regressions, then structural cleanups.

| # | Task | Severity | Status |
|---|------|----------|--------|
| 01 | [Fix fabricated "Phelps" history + attribution errors](./01-phelps-history.md) | High | DONE |
| 02 | [Correct the privacy policy (Cloudflare + Cloudinary)](./02-privacy-policy.md) | Medium | DONE |
| 03 | [Unsourced FAQ claims + supplier-page promises](./03-faq-and-suppliers-claims.md) | Medium, decision-gated | DONE |
| 04 | [Restore missing photo in how-to-cut-grid-beams](./04-restore-cut-alignment-photo.md) | High | DONE |
| 05 | [DesignViewer: shallow URL updates, popstate sync, fullscreen params](./05-design-viewer-url-state.md) | High | DONE |
| 06 | [LinkButton: internal links bypass Next client navigation](./06-linkbutton-nextlink.md) | High, touches `../ui` | DONE |
| 07 | [Cutting planner hardening (URL decode bounds + small fixes)](./07-cutting-planner-hardening.md) | High | DONE |
| 08 | [Test infrastructure: Vitest + port legacy cutting-planner suites](./08-tests.md) | High | DONE |
| 09 | [Swap hand-rolled CutBeamSvg for CutGridBeamSvg](./09-cutgridbeamsvg-swap.md) | Medium | DOING — done on branch, blocked on a `part-gridbeam` publish |
| 10 | [Cloudinary video/media transforms + ui media components](./10-media-transforms.md) | Medium | TODO |
| 11 | [Copy-rewrite reconciliation (decision list for Mikey)](./11-copy-reconciliation.md) | Medium, decision-gated | TODO |
| 12 | [ImageCarousel: accessibility + dead half](./12-carousel-a11y.md) | Medium | TODO |
| 13 | [Dead / invented code sweep](./13-dead-code-sweep.md) | Low | TODO |
| 14 | [Metadata, config, and doc-drift cleanup](./14-metadata-and-config-cleanup.md) | Low | TODO |
| 15 | [Small parity nits batch (visual / a11y)](./15-parity-nits.md) | Low | TODO |
| 16 | [Self-host detect-gpu benchmarks (drop unpkg.com request)](./16-self-host-gpu-benchmarks.md) | Medium, touches `../gridkit` | TODO |
| 17 | [Sandbox controls are invisible (Chakra v3 CSS regressions)](./17-sandbox-chakra-v3-css.md) | High, touches `../gridkit` | TODO |
| 18 | [LinkCard's overlay anchor has no accessible name](./18-linkcard-accessible-name.md) | Medium, touches `../ui` | TODO |
| 19 | [`@villagekit/ui` claims Next is optional but hard-requires it](./19-ui-next-peer-dependency.md) | Low, touches `../ui` | TODO |
| 20 | [`utility-workbench` emits 0 gu grid beams](./20-utility-workbench-degenerate-beams.md) | Medium, touches `../products` | TODO |

## What the review found was GOOD (don't churn these)

For calibration — these were explicitly verified as sound; don't "improve" them while working nearby:

- `scripts/generate-designs-data.mjs` and the inlined designs data (regenerates to a zero diff; correctly motivated by the Workers no-readdir constraint).
- The cutting-planner algorithm port is a faithful FFD port — all four legacy Jest cases hand-traced to byte-identical output — and its infeasible-cut fix corrects a real legacy bug (legacy emitted negative remainders).
- MDX story *prose* is word-for-word faithful apart from sanctioned rebrand edits.
- `EmotionRegistry`, `transpilePackages`, peer-dep hygiene (`three`/`xstate` at top level for sandbox), `wrangler.jsonc`/`open-next.config.ts` minimalism, skip-nav, the Suspense + static-fallback pattern on stories/designs, `robots.ts` default-deny posture, SHA-pinned port citations.
- Typecheck and lint pass clean; no unused exports in `app/_lib`/`app/_components` (beyond the specific items in task 13); all 17 `"use client"` directives justified.

## Cross-stream relationships

- Task 06 requires changes in `villagekit/ui` (sibling repo) and an npm publish — coordinate with the Stream 02 release process; publishing needs Mikey's go-ahead. Tasks 09, 16 and 17 have the same shape against `villagekit/gridkit` — batch the releases if possible. Task 09's three fixes are already committed in `../gridkit` (`915085f`, `d4b3e7e`, `e58d700`) and just need the publish.
- Task 04 requires `../media` and `pnpm sync-media` (see `../04-content/02-image-hosting.md` for the media pipeline).
- Task 11 re-opens copy that Stream 06 tasks marked DONE — that's expected; Stream 06 audited screenshots, not the wording-vs-legacy diff.
- Stream 05 (retire `../node-modules`) remains blocked until this stream and Stream 06 are done.
