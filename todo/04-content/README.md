# Stream 04 — Content migration

The legacy gridkit.nz site has solid content — the educational About page, the FAQ, the six MDX stories (4 guides + 2 newsletters) — but it's framed as a startup selling kits. Every "buy now" needs to become "find a supplier" or "build your own". Every "Grid Kit" reference needs to be evaluated: is it talking about the company (rename) or the product/design system (often keep, sometimes rename to "grid beam")?

## Goal

A complete content audit + rewrite pass that produces:
- An updated MDX library of stories with new framing
- A grid-beam-as-generic-system explainer page (the new About)
- A rewritten FAQ
- An initial suppliers list (or a graceful "no suppliers yet" state)
- All imagery either re-hosted or pointed at a new path

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Rebrand copy audit (gridkit.nz → gridbeam.xyz)](./01-rebrand-copy.md) | DONE |
| 02 | [Image hosting decision + migration](./02-image-hosting.md) | DOING (decisions resolved; favicon/OG done; bootstrapping `villagekit-media` repo next) |
| 03 | [Port + update MDX stories](./03-stories-port.md) | DONE (port plan ready; placement deferred to Stream 01 task 05) |
| 04 | [Rewrite the About / grid-beam explainer page](./04-grid-beam-explainer.md) | DONE |
| 05 | [Suppliers content + initial data](./05-suppliers-content.md) | DONE (pending supplier list from Mikey) |

## Order of attack

01 (audit) first — the audit produces a list that informs every other task.

02 in parallel — image hosting is a one-time decision; once made, all image refs can be rewritten in bulk.

03, 04, 05 in parallel after 01.

## Decisions made

- **Tone:** educational, community-oriented, not transactional. No "buy now" copy.
- **"Grid Kit" → "grid beam"** when referring to the system/product family. Keep "Grid Kit" only when referring to the historical NZ startup (mostly in stories about its history).
- **No mailing list signup as a primary CTA.** A "follow updates" link is fine — just don't make it the conversion goal.
