# External URL status — 2026-04-30

Quick HEAD-check of every external URL referenced in the audit, draft pages, or legacy site source. Findings inform the "Things flagged for Mikey" list and the stories-port plan.

## Live (200)

| URL | What it is | Note |
|-----|-----------|------|
| `https://play.gridbeam.xyz/` | The 2021 prototype playground | Still up. Referenced in 2021-winter-newsletter.mdx; link can stay. |
| `https://gridkit-landing-villagekit.vercel.app/` | The legacy gridkit.nz Vercel deploy | Still serving. Stream 05 task 02 will archive. |
| `https://villagekit.com/` | Village Kit org page | Up. |
| `https://gridbeam.org/` | Mikey's older Grid Beam Gatsby site | Up. Title "Grid Beam"; description is community-friendly and predates Grid Kit. Worth keeping the cross-link in the new site. |
| `https://gridbeam.com/` | Unknown — server responds 200 to GET, 405 to HEAD | Quirky. Title not extracted via grep; worth a manual visit. Mikey should confirm if this is owned. |

## Surprising

| URL | What's there | Implication |
|-----|--------------|-------------|
| `https://gridbeam.xyz/` | **Currently serving the OLD `gridbeam.org` Gatsby static site.** Same HTML, same Mikey-Williams twitter creator. | DNS for gridbeam.xyz points at gridbeam.org's hosting (or both share infrastructure). When the new Next.js site deploys, this gets replaced. Stream 01 task 11 (deployment) needs to ensure the cutover is clean. **Not a blocker.** |
| `https://gridkit.nz/` | **Serving a v0.app-generated Next.js page** titled "GridKit.nz - Modular Furniture System", description "Modular components for makers - build, adapt, and evolve your own space." Uses Supabase image storage, Inter + Fredoka fonts. Does NOT match the legacy gridkit.nz Vercel deploy (which lives at `gridkit-landing-villagekit.vercel.app` instead). | The original gridkit.nz domain has been redeployed to a different (maybe in-progress?) site. **Mikey should know this.** Possibilities: someone else has the domain; Mikey is experimenting with v0.app; or the DNS got repointed. Either way, the legacy "gridkit.nz" the audit talks about is the Vercel deploy, not whatever is at gridkit.nz today. |

## Broken

| URL | Status | Implication |
|-----|--------|-------------|
| `https://discuss.villagekit.com/` | Server responds (52.62.35.99) but **TLS certificate expired** | The Discourse forum is still running but its cert lapsed. Stories 3 and 4 (`how-to-cut-grid-beams`, `how-to-furniture-bolts`) link here; the homepage and FAQ both link here. Action: either renew the cert (cheap fix — Let's Encrypt) or migrate community to GitHub Discussions. **Flag for Mikey.** |
| `https://madewithgridkit.com/` | DNS unresolved | The brand domain is gone. The 9 social accounts under `@madewithgridkit` (Bluesky, Mastodon, Instagram, X, Facebook, Threads, YouTube, TikTok, GitHub) reference this username on each platform — some may still exist. Specific check: `https://sunrise.social/gridkit` (Mastodon) returns 404. The other 8 accounts unverified — Mikey should triage them per "Mikey decision item 2" in the audit. |
| `https://sunrise.social/gridkit` | 404 | The Mastodon account at this URL is gone. Drop the social link. |

## Recommended actions (consolidated)

1. **Fix `discuss.villagekit.com` TLS** before any new gridbeam.xyz copy ships — story-3 and story-4 link there in the body, and the homepage CTA points there too. Without TLS, every browser warns the visitor away. Cheapest fix: renew via Let's Encrypt.
2. **Investigate `gridkit.nz` ownership.** The v0.app site there is unexplained — either accept it as parallel (and stop linking to "gridkit.nz" anywhere), or reclaim/redirect.
3. **Triage the 9 `@madewithgridkit` social accounts.** Mikey decision item 2 from the audit. Default plan was "drop most"; combined with the dead `madewithgridkit.com` domain, the case for dropping all of them gets stronger.
4. **Confirm `gridbeam.com` ownership** — whoever owns it may matter for SEO / brand confusion.

## Updates to other docs

- `04-content/01-rebrand-copy/audit.md` "Things flagged for Mikey" — items 2 and 3 now have observable status; reduce ambiguity in the audit.
- `04-content/03-stories-port/plan.md` — story 3 and story 4 forum-link footnotes should call out the expired-cert finding so the port doesn't ship broken links.

This file is canonical for URL status as of 2026-04-30. Re-run the HEAD checks before any deployment that depends on these URLs being live.
