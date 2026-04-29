# 10 — Legal pages (privacy, cookies, etc)

**Status:** TODO

## Why
Even a simple non-commercial site benefits from a clear privacy policy. If the site ever does anything that touches personal data (contact form, subscribe form, any analytics), users deserve to know what happens to it.

## What
- `app/legal/page.tsx` — index of legal pages
- `app/legal/privacy-policy/page.tsx` — privacy policy
- `app/legal/cookie-policy/page.tsx` — cookie policy (only if cookies are actually set)
- (Maybe drop) `app/legal/return-policy/page.tsx` — only relevant if selling, so likely DELETE

## Steps
- [ ] Audit what data gridbeam.xyz actually collects. Likely:
  - Contact form submissions → email address goes to a forwarding / form provider.
  - No analytics initially (Matomo/Sentry from the legacy site are gone).
  - No cookies if no analytics. → Cookie policy might be unneeded; cookie banner definitely is.
- [ ] Port the legacy `applet-legal` outputs from `node-modules/packages/applet-legal/` as a starting structure — but rewrite for the actual data flow of the new site, not the old one.
- [ ] Privacy policy — what's collected, why, retention, user rights, contact for data requests.
- [ ] If we deploy without analytics or cookies, **delete** the cookie policy page rather than ship a "no cookies" stub.
- [ ] Delete the return-policy page outright — we don't sell anything.

## Notes
- The legacy site at `node-modules/apps/gridkit/pages/legal/` uses factory functions like `createLegalPage`, `createPrivacyPolicyPage`. We don't need that abstraction here — three pages, write them as plain MDX or TSX.
- Keep the language plain and human. Skim the legacy versions for structure, but the content needs to reflect *this* site, not the startup.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
