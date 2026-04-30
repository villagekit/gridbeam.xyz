# 09 — Contact + subscribe pages

**Status:** DONE

## Why
The site needs at least one way for people to get in touch (suppliers wanting to be listed, contributors, questions). A subscribe option is nice-to-have but not the focus.

## What
- `app/contact/page.tsx` — for v1, a static page with an obfuscated `mailto:` link plus a GitHub Issues alternative.
- `app/subscribe/page.tsx` — for v1, a static "newsletter coming later" page. Buttondown (existing list, reused) is the planned delivery channel — no form to wire up yet.

## Decisions (locked in 2026-04-30)

| Question | Decision | Reasoning |
|---|---|---|
| Newsletter provider | **Buttondown** — reuse the existing list (subscriber tag already exists for `Grid Beam` per legacy `applet-subscribe/src/schema.ts`). | Same provider as the legacy site; nothing to migrate, no audience to rebuild. Mikey is happy to defer the actual signup form for v1. |
| Newsletter v1 page | **Static `/subscribe` page** — explain the newsletter, mention that signup ships later. Optionally include the existing Buttondown public signup URL as a stop-gap. | Avoids committing API keys, server action, double-opt-in plumbing before we know we'll write newsletters often. Easy upgrade path. |
| Contact form delivery | **`mailto:` link with obfuscation** — no hosted form provider, no serverless function. | Lowest cost, no DNS/API keys, no spam-mitigation code; mailto is universal. Upgrade to a real form if/when abuse arrives. |
| Contact email | **`hello+gridbeam@mikey.nz`** (Gmail-style alias on the maintainer's existing address). | No new MX records needed; the alias makes filtering/forwarding trivial; matches the maintainer email already published in `/legal/privacy-policy`. Future: swap to `hello@gridbeam.xyz` once that domain has email set up. |
| Email obfuscation | **HTML entity encoding** for both display text and `mailto:` href, rendered server-side via `dangerouslySetInnerHTML`. Works without JS, defeats simple regex scrapers. | See implementation note below. |

## Steps

### ObfuscatedEmail component (`app/_components/ObfuscatedEmail.tsx`)
- [x] Server component (no `'use client'`). Wraps a Chakra `Box as="span"` and uses `dangerouslySetInnerHTML` to inject an `<a href="mailto:…">` whose href + visible text are HTML-entity-encoded character-by-character (each char rendered as `&#x{hex};`, and `@` rendered as `&#x40;`).
- [x] Accepts pass-through `BoxProps` (`css`, etc.) so consumers can style the inner anchor via `'& a': {...}`.
- [x] Second export `ObfuscatedEmailLink` — pre-applies paragraph-style link colours (`accentA.800`, underlined) for inline use inside prose.
- [x] Helper `encode(s)` — plain string → entity-encoded string.

### Contact (`app/contact/page.tsx`)
- [x] Two sections. Section 0: hero with `<Title description="How to reach the gridbeam.xyz maintainer.">Get in touch</Title>` + a single intro paragraph naming the kinds of senders we want to hear from.
- [x] Section 1 (`colorPalette="accentA"`): `<Title as="h2" description="Email for private notes. GitHub for anything public.">Two channels</Title>` + a `VStack` of two dashed-border cards.
  - Email card (centred): `<Heading as="h3">Email</Heading>` + secondary description + `<ObfuscatedEmail user="hello+gridbeam" domain="mikey.nz" css={{...}} />` styled large/bold via the css prop on the inner anchor.
  - GitHub Issues card (left-aligned): `<Heading as="h3">GitHub Issues</Heading>` + description + `<Link variant="paragraph" href="https://github.com/villagekit/gridbeam.xyz/issues" target="_blank" rel="noopener noreferrer">github.com/villagekit/gridbeam.xyz/issues</Link>`.
- [x] No form, no validation, no honeypot, no Zod schema, no rate limiting — none of that exists in v1.
- [x] Nav already had `/contact` in `app/_lib/nav.ts` (top nav at `:9`, footer Connect at `:32`).

### Subscribe (`app/subscribe/page.tsx`)
- [x] Two sections. Section 0: hero with `<Title description="A low-volume newsletter is on the way. No signup form yet.">Newsletter</Title>` + three short paragraphs explaining the plan, naming Buttondown as the planned provider (single `<em>` emphasis), and reassuring no spam / no automation / no trackers.
- [x] Section 1 (`colorPalette="accentA"`): `<Title as="h2" description="Two ways to be told when the newsletter goes live.">Find out when it launches</Title>` + a 2-column `SimpleGrid` of dashed-border cards.
  - "Email the maintainer" card → `<LinkButton href="/contact">Go to contact page</LinkButton>` (routes through `/contact`'s obfuscation; no plain mailto on this page).
  - "Watch the repository" card → `<LinkButton href="https://github.com/villagekit/gridbeam.xyz" isExternal>View on GitHub</LinkButton>`.
- [x] No form, no API route, no `BUTTONDOWN_API_KEY` wiring. Deferred to a future task.
- [x] Existing Buttondown public signup URL — none. Legacy gridkit.nz used a server-side API key, no public signup URL to link to. Page is informational only for v1.
- [x] Nav already had `/subscribe` in `app/_lib/nav.ts:33` (footer Connect) + `app/_components/SiteHeaderAction.tsx` (header CTA).

### Privacy policy + /legal index touch-up
- [x] Replaced 3× plain `<Link href="mailto:hello@mikey.nz">` in `app/legal/privacy-policy/page.tsx` with `<ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" />`. Also updated address to the new alias and softened the "(when it ships)" hedge in the "Your rights" section to "The same channels are linked from the contact page" (since the contact channel now exists).
- [x] Replaced 1× plain `<Link href="mailto:hello@mikey.nz">` in `app/legal/page.tsx` Questions section with `<ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" />`.
- [x] Did not bump `lastUpdated` constant — change shipped on the same calendar day (2026-04-30) as the privacy policy's existing `lastUpdated`. The policy *wording* didn't change in any data-handling sense; only the contact channel switched aliases (cosmetic) and obfuscation was applied (security).

### Footer / nav touch-up
- [x] `/contact` and `/subscribe` both resolve with HTTP 200, both static-prerender (`○` in build output). Top-nav "Contact" link, footer "Newsletter" link, and header "Subscribe" CTA all reach live pages now.

## Verification
- `pnpm -w run typecheck` — clean.
- `pnpm -w run lint` — clean.
- `pnpm -w run build` — `/contact`, `/subscribe`, `/legal`, `/legal/privacy-policy` all static-prerender alongside the existing routes; build succeeds with no errors or new warnings.
- **Production HTML scrape** (from `pnpm next start` output, *not* dev mode): zero plain `mailto:hello`, `mikey.nz`, or `hello+gridbeam` strings on `/contact`, `/legal`, `/legal/privacy-policy`, or `/subscribe`. Sample obfuscated anchor on `/contact`: `<a href="mailto:&#x68;&#x65;&#x6c;&#x6c;&#x6f;&#x2b;&#x67;&#x72;&#x69;&#x64;&#x62;&#x65;&#x61;&#x6d;&#x40;&#x6d;&#x69;&#x6b;&#x65;&#x79;&#x2e;&#x6e;&#x7a;">…</a>`. Privacy policy contains 98 entity-encoded characters (2 email occurrences × visible+href); /legal contains 48 (1 occurrence); /contact contains 48 (1 occurrence).
- **Dev-mode caveat.** In `pnpm dev`, the React Server Components flight payload (the `__next_f` script tag) leaks the raw `user="hello+gridbeam"` / `domain="mikey.nz"` props for component-tree debugging. **This is dev-only.** The production build strips that debug payload — verified via `pnpm next start`. Don't be alarmed if a `view-source` of the dev server shows the plaintext.
- Headings on `/contact`: h1 "Get in touch" → h2 "Two channels" → h3 "Email" + h3 "GitHub Issues". On `/subscribe`: h1 "Newsletter" → h2 "Find out when it launches" → h3 "Email the maintainer" + h3 "Watch the repository". Footer h2s present on both. External links (GitHub) carry `target="_blank" rel="noopener noreferrer"` automatically via the `LinkButton`/`Link` `isExternal` path.

## Notes
- **Obfuscation strength.** HTML entity encoding stops naive regex-based email scrapers (`\b\S+@\S+\.\S+\b`) — there is no plaintext `@` or `mikey.nz` anywhere in the rendered HTML. It does *not* stop sophisticated scrapers that decode entities or run JS. If real abuse appears, upgrade to click-to-reveal (a `'use client'` component that constructs the email at click time) — which keeps bots from harvesting until they simulate user interaction.
- **Cross-page consistency.** Originally only `/contact` was going to use the obfuscation; the `/legal` index and `/legal/privacy-policy` had plain `mailto:hello@mikey.nz` left over from task 10. Sub-agent review (correctly) flagged this as a STRONG: "scrapers don't care which page the address is on". Fixed in the same commit by switching all four address sites to the same obfuscated alias.
- **Why Gmail-style alias.** `hello+gridbeam@mikey.nz` lets Mikey filter gridbeam.xyz mail into a dedicated label/folder without provisioning a new mailbox. Same inbox, same spam filtering, separate filing. The `+gridbeam` suffix is also a useful canary if the address is ever harvested — bulk mail addressed to `hello+gridbeam@…` can be auto-filtered.
- **No public Buttondown signup URL.** Legacy gridkit.nz used `BUTTONDOWN_API_KEY` server-side, never exposed a public form URL. So `/subscribe` v1 is informational-only — visitors who want notice are routed to `/contact` or to the GitHub repo.
- **Legacy applet packages stay in `node-modules`.** `applet-subscribe` and `applet-contact` are not folded into `@villagekit/ui`. No real form yet, nothing to fold.
- **Privacy policy still accurate.** `/legal/privacy-policy` says newsletter and contact form are "currently not active" with Buttondown named as the planned newsletter provider. The /contact page ships a mailto link, not a form — so the "no contact form" sentence stays correct. The /subscribe page is informational only — so the "no newsletter" sentence stays correct. Both privacy-policy follow-ups (drop "in future" hedges, name third parties) are still queued for when a real form ships.

## Follow-ups (to do later, separate task)
- Build a real `/subscribe` signup form with Buttondown integration (API key, server action, double-opt-in). Update privacy policy in the same commit — drop "in future" hedge in Newsletter signups paragraph + name Buttondown in Third parties.
- Build a real `/contact` form (likely server action + Resend or similar). Update privacy policy in the same commit — drop "in future" hedge in Contact form paragraph + name the form provider in Third parties. Also reconsider whether to keep the obfuscated mailto fallback on the page or replace it with a richer form.
- Switch maintainer email from `hello+gridbeam@mikey.nz` to `hello@gridbeam.xyz` once the domain has email set up. Three call-sites to update: `/contact` (`<ObfuscatedEmail>`), `/legal` (`<ObfuscatedEmailLink>`), `/legal/privacy-policy` (2× `<ObfuscatedEmailLink>`). Bump `lastUpdated` on the privacy policy in the same commit.
- Real-browser visual QA at base/md/lg widths — currently SSR-checked only.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
