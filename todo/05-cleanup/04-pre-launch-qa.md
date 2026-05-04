# 04 — Pre-launch real-browser QA pass

**Status:** SUPERSEDED by Stream 06 (parity audit & uplift). The per-page audit + browser walkthrough described here is folded into Stream 06's task 02 and the per-page tasks (03+) it produces. The Lighthouse / OG card / share-card validation bits below are a small remaining subset that should be checked once Stream 06 work lands and a Vercel preview exists — track those there or as fresh tasks.

## Why
Every Stream 01 page task ships with a "verified via SSR markup only — real-browser visual QA at base/md/lg widths deferred" follow-up. Tasks 01-02, 01-03, 01-04, 01-07, 01-09, 01-10 all flag this. Nobody currently owns the actual pass. It needs to happen once, before deployment, so we don't ship CSS/interaction bugs that SSR string inspection can't catch.

## What
A single live walk-through of every shipped page in real browsers (Chrome, Firefox, Safari) at base/md/lg widths, with notes on every regression found and a follow-up PR/task per fix. Plus Lighthouse audits and OG/Twitter card validation against a preview deploy.

## Steps
- [ ] Spin up `pnpm dev` (or a Vercel preview from Stream 01 task 11) and walk every route:
  - `/`, `/about`, `/faq`, `/tools-and-resources`, `/tools/cutting-planner`, `/contact`, `/subscribe`, `/legal`, `/legal/privacy-policy`, plus `/stories`, `/designs`, `/suppliers` (whichever have shipped)
- [ ] At each route, exercise:
  - [ ] Three viewport widths: base (mobile, ~375px), md (tablet, ~768px), lg (desktop, ~1280px)
  - [ ] Mobile menu open/close — drawer focus trap, ESC dismissal, backdrop click, explicit X-button
  - [ ] Skip-nav link works (Tab from address bar, Enter)
  - [ ] All `LinkButton` / `Link` external targets carry `target="_blank"` + `rel="noopener noreferrer"`
  - [ ] No console errors or warnings
  - [ ] Heading order is semantic (one h1, h2/h3 nested correctly) — confirms screen-reader navigation
- [ ] Cutting planner — full interaction:
  - [ ] Input flow: stock + required cuts, unlimited toggle, gu/mm display
  - [ ] Plan it → URL updates → result renders → reload preserves state
  - [ ] Print preview (`Cmd/Ctrl+P`) — controls hidden, plan + infeasible visible, no page-break-inside on figures
- [ ] Subscribe / Contact — obfuscated `mailto:` opens in mail client (production build, not dev — dev leaks plaintext via RSC flight payload, expected per task 01-09 notes)
- [ ] Run Lighthouse (mobile + desktop) on every page; target >90 across performance / accessibility / SEO / best practices.
- [ ] Run each shipped page through the Twitter card validator and Facebook sharing debugger; confirm OG image + title + description render.
- [ ] Spot-check axe DevTools on every page; fix critical/serious findings before launch.
- [ ] Visual regression check: any obvious layout shifts, font swaps, image reflows? Note breakpoints where things bunch up.
- [ ] Browser matrix: latest Chrome, latest Firefox, latest Safari (macOS or iOS Simulator). Document any per-browser issues.

## Notes
- This is the moment to find the bugs that SSR markup inspection couldn't catch. Don't rush.
- Once issues are filed, individual fixes go back through normal task flow — this task is the audit, not the fixes themselves.
- This also closes the "Storybook stories deferred" follow-ups from Stream 02 tasks 02–04 indirectly: if the live site renders correctly, the lib is producing usable components even without per-component stories.

## Depends on
- All of Stream 01 (pages need to exist before they can be QA'd)
- [../01-website/11-deployment-and-seo.md](../01-website/11-deployment-and-seo.md) — preferable to QA against a Vercel preview rather than localhost
