# 10 — Legal pages (privacy, cookies, etc)

**Status:** DONE

## Why
Even a simple non-commercial site benefits from a clear privacy policy. If the site ever does anything that touches personal data (contact form, subscribe form, any analytics), users deserve to know what happens to it.

## What
- `app/legal/page.tsx` — small index page: hero + two cards (privacy policy + site licence/GitHub) + a "Questions" section.
- `app/legal/privacy-policy/page.tsx` — privacy policy. h1 + 6 × h2 + 3 × h3. "Last updated 2026-04-30" surfaced via `lastUpdated` constant in the Title description.
- Footer nav (`app/_lib/nav.ts`) updated: Legal column now reads "Privacy policy" + "Site licence" (cookie-policy link removed).
- No `cookie-policy` page (decided: deploy without cookies = no stub).
- No `return-policy` page (no e-commerce).

## Steps
- [x] Audit what gridbeam.xyz actually collects. Conclusion: server access logs at the host (standard for any web server, retained per provider's policy). Newsletter + contact form deferred to task 09 — flagged in the policy as "currently not active".
- [x] Skim legacy `applet-legal` for structure. Stuck to the section outline (what we collect / what we don't / third parties / your rights / changes / contact); rewrote all the content from scratch — the legacy NZ Privacy Act 2020 + Stripe + Buttondown framing doesn't apply.
- [x] Privacy policy written fresh. Plain language. No factory functions, no MDX — straight TSX with `@villagekit/ui` primitives.
- [x] Cookie policy deleted (never created; footer link removed instead).
- [x] Return policy not created.
- [x] Footer nav updated to reflect actual page set.

## Notes
- **Hosting provider not named.** The first draft named Vercel, but the site isn't actually deployed yet (task 11 ships deployment + DNS). Reviewer caught that as STRONG; the policy now says "whichever hosting provider serves the site" with a one-liner promising to name them once deployed. Update in the same commit that ships task 11.
- **Maintainer email published as `hello@mikey.nz`** — already public via git history; serves as the actionable channel for "exercise your rights" until `hello@gridbeam.xyz` (or similar) is set up under task 09. GitHub issues link (`github.com/villagekit/gridbeam.xyz/issues`) is given as the alternative for users who'd rather not email.
- **Forward compatibility.** Newsletter + contact form sections each say "currently not active" so the page is still accurate after deploy. When task 09 ships, the same commit must update three things in the policy: Newsletter signups paragraph (drop "in future"), Contact form paragraph (drop "in future"), Third parties paragraph (name the form-handling provider). Captured as a follow-up below.
- **No `'use client'`.** Both pages are pure server components — no hooks, all `@villagekit/ui` interactive components (`Link`, `LinkButton`) handle their own client boundary.
- **Style mirrors about/faq/tools-and-resources.** Same `<Title description=…>`, `<Container maxW="3xl">` body, `colorPalette="accentA"` accent section, `<Heading as="h2" size="lg">` / `<Heading as="h3" size="md">` rhythm.

## Verification
- `pnpm -w run typecheck` — clean.
- `pnpm -w run lint` — clean (Biome reformatted long lines on first pass).
- `pnpm -w run build` — `/legal` and `/legal/privacy-policy` both static-prerender (`○`), alongside the existing routes.
- Dev server `pnpm dev` + curl:
  - `/legal` HTTP 200, h1 "Legal" + h2s "Privacy policy" / "Site licence" / "Questions" + 4 × h2 footer.
  - `/legal/privacy-policy` HTTP 200, h1 "Privacy policy" + 6 × h2 (don't collect / do collect / third parties / your rights / changes / contact) + 3 × h3 (server access logs / newsletter signups / contact form). External links to github.com + the project issues URL carry `target="_blank"` + `rel="noopener noreferrer"`. `mailto:hello@mikey.nz` link present in three places (rights, contact-policy, /legal questions).
  - Footer Legal column shows "Privacy policy" + "Site licence" (no cookie-policy reference anywhere).

## Follow-ups
- **When task 09 v1 shipped (2026-04-30):** privacy policy + /legal index switched their plain `mailto:hello@mikey.nz` calls to `<ObfuscatedEmailLink user="hello+gridbeam" domain="mikey.nz" />` (3× in privacy-policy, 1× in /legal index). The "in future" hedges in the Newsletter signups + Contact form paragraphs were intentionally kept, because task 09 v1 is static (mailto + informational page) — no real form was wired up. The hedges + the "No newsletter / contact form is currently active" callouts remain accurate. The Third parties paragraph also stays unchanged.
- **When the real contact / subscribe forms ship (post-task-09 follow-up):** update privacy policy in the same commit — drop the "in future" hedges in the Newsletter signups + Contact form paragraphs, and name the form/newsletter providers (Buttondown for newsletter; Resend or similar for contact form) in the Third parties paragraph. Bump `lastUpdated`.
- **When task 11 (deployment) ships:** update privacy policy in the same commit — name the hosting provider in the Server access logs paragraph and link to their privacy policy. Bump `lastUpdated`.
- **Project email address.** The privacy policy now routes data-rights requests through obfuscated `hello+gridbeam@mikey.nz`. Once `hello@gridbeam.xyz` (or similar gridbeam.xyz alias) is set up, swap the policy across — three `<ObfuscatedEmailLink>` call-sites in privacy-policy + one in /legal index, plus the matching call on /contact.
- **Real-browser visual QA at base/md/lg widths** — currently SSR-only, same as tasks 02–04.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
