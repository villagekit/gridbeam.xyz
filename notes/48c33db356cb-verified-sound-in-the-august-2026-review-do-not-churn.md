---
title: "Verified sound in the August 2026 review: do not churn"
---
Carried forward from the deleted task tree. The August 2026 code review verified these as sound against the legacy baseline; a worker nearby leaves them alone unless a difference says otherwise.

- `scripts/generate-designs-data.mjs` and the inlined designs data (regenerates to a zero diff; motivated by the Workers no-readdir constraint).
- The cutting-planner algorithm port: a faithful first-fit-decreasing port, all four legacy Jest cases hand-traced to byte-identical output; its infeasible-cut fix corrects a real legacy bug (legacy emitted negative remainders).
- MDX story prose: word-for-word faithful apart from rebrand edits.
- `EmotionRegistry`, `transpilePackages`, peer-dep hygiene (`three` and `xstate` at top level for the sandbox), `wrangler.jsonc` and `open-next.config.ts` minimalism, skip-nav, the Suspense plus static-fallback pattern on stories and designs, the `robots.ts` default-deny posture, SHA-pinned port citations.
- Typecheck and lint pass clean; every `"use client"` directive was justified at the time.
