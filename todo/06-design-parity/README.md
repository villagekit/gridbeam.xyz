# Stream 06 — Parity audit & uplift

The gridbeam.xyz rebuild was meant to upgrade dependencies and strip startup / e-commerce references — not to redesign every page. In practice the rebuild quietly regressed quality across multiple axes: visual design, interaction, accessibility, copy, AND code patterns. This stream closes that gap, page by page.

## Goal

Reach (and where possible exceed) the legacy gridkit.nz site's quality on every shipped page, on **all four user-facing axes** — visual design, interaction, accessibility, copy — *and* on **code patterns**. The legacy site is the baseline; deviations need a stated reason.

## References

- **Live legacy site (visual + interaction ground truth):** https://gridkit-landing-villagekit.vercel.app/
- **Legacy source code (code patterns, structure, copy ground truth):** `./node-modules/apps/gridkit/`

## Principles

1. **Legacy is the baseline.** A real designer worked on the visuals; a senior developer wrote the code; the copy was written more carefully than its rewrite. Coherent senior-made artifacts beat ad-hoc rebuild output.
2. **Change only when it improves.** Convenience of the new framework / library is not a reason to change. "The new way is easier to write" is not by itself an improvement.
3. **Two acceptable modes when fixing a regression:**
   - Restore / closely match the legacy approach (the usual answer).
   - Re-think from first principles when that produces something genuinely better.
   Never settle for "slightly adapt the current broken thing" because adaptation is easier than either option above.
4. **Same rule for code patterns** as for design — prefer the legacy author's approach unless there's a concrete reason a different one is better.
5. **The `./node-modules` submodule stays** until this stream is done. Stream 05 task 01 (retirement) is gated on parity.

## What "parity" means here

Per-page checklist when comparing legacy vs current:

- **Visual:** layout, spacing, typography hierarchy, color, imagery placement, responsive breakpoints (base / md / lg).
- **Interaction:** hover states, transitions, mobile menu behavior, focus order, scroll behavior, form behavior.
- **Accessibility:** heading semantics, alt text, focus traps in dialogs, color contrast, axe DevTools clean.
- **Copy:** wording, voice, calls-to-action. Legacy copy stays unless replacement is *better*, not just shorter or different.
- **Code patterns:** when implementing a fix, look at how the legacy author solved the same problem. Prefer their approach unless there's a concrete reason another is better.

A page is "at parity" when a side-by-side comparison shows nothing on the new side that's worse than the old, AND nothing the old side did better has been silently dropped.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Build the audit tooling — side-by-side legacy vs current screenshots](./01-audit-tooling.md) | DONE (per-machine: `pnpm install` + `pnpm exec playwright install chromium` before first run) |
| 02 | [First-pass audit — run the tooling, file per-page uplift tasks](./02-initial-audit.md) | DONE (findings: [`initial-audit/findings.md`](./initial-audit/findings.md)) |
| 03 | [Uplift: home (`/`)](./03-home.md) | DONE |
| 04 | [Uplift: about (`/about`)](./04-about.md) | DONE |
| 05 | [Uplift: FAQ (`/faq`)](./05-faq.md) | DONE |
| 06 | [Uplift: stories index (`/stories`)](./06-stories-index.md) | DONE |
| 07 | [Uplift: footer (cross-cutting)](./07-footer.md) | DONE |
| 08 | [Uplift: header brand (cross-cutting)](./08-header-brand.md) | DONE |
| 09 | [Uplift: icons on link cards (cross-cutting)](./09-icons-and-cards.md) | DONE |

Pages found at parity (no task): `/contact`, `/subscribe` (intentional placeholder), `/tools-and-resources`, `/tools/cutting-planner`, `/legal`, `/legal/privacy-policy`, `/stories/<slug>`, `/designs`, `/designs/<slug>`, `/suppliers` (new). See [`initial-audit/findings.md`](./initial-audit/findings.md) for per-page reasoning.

## Order of attack

01 → 02 sequentially. 02 produced the per-page task files (03–09); 05 (FAQ) is done. They can now run in any order — pages are independent — though the cross-cutting ones (07, 08, 09) touch every page and should be coordinated with per-page work to avoid merge churn.

Recommended sequence: **09 first** (extracts the shared `LinkCard` that 04 depends on), then **04** (about, with the new `LinkCard`), then **07** (footer) and **08** (header brand) — both small and visible everywhere, so worth landing early. **03** (home) and **06** (stories) are larger scoped pieces; do them last.

## Cross-stream relationships

- **Supersedes Stream 05 task 04** (pre-launch real-browser QA). That task was about catching CSS / interaction bugs SSR couldn't see; this stream is broader and covers the same ground.
- **Re-opens parts of Stream 04** (content) — copy parity is now in scope here, even though Stream 04 marked itself DONE.
- **Re-opens parts of Stream 01** — every shipped page is a candidate for uplift.
- **Blocks Stream 05 task 01** (retire `./node-modules`) — the legacy reference can't go away until parity is reached.

## A note on "first principles"

"Re-think from first principles" is not the default. It's the escape hatch for when the legacy approach has a real flaw — e.g., it relies on a deprecated API, it has a known accessibility bug, it bakes in startup-era assumptions that no longer apply. Most regressions are fixed by **going back to what was there**, not by inventing a third option. If you're choosing first-principles mode, write down what's wrong with both the legacy and the current approach so the choice is visible.
