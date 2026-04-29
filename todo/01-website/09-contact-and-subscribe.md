# 09 — Contact + subscribe pages

**Status:** TODO

## Why
The site needs at least one way for people to get in touch (suppliers wanting to be listed, contributors, questions). A subscribe option is nice-to-have but not the focus.

## What
- `app/contact/page.tsx` — a contact form that emails through to a configured address
- `app/subscribe/page.tsx` — optional, a simple form for newsletter signup OR a static page pointing to RSS / GitHub releases

## Steps

### Contact
- [ ] Decide form delivery: a hosted form provider (Formspree, Forms.app), a serverless function emailing via Resend / Postmark, or a `mailto:` link as a low-tech v1.
- [ ] Replace the legacy `applet-contact` integration (used Buttondown + custom email; tightly coupled to the startup's setup).
- [ ] Build a form: name, email, subject (with options like "Become a supplier", "Question", "Contribute", "Other"), message. Use `@villagekit/ui` form components.
- [ ] Add validation (Zod + react-hook-form, or use a Next server action with `useFormState`).
- [ ] Spam protection: honeypot field + rate limiting at the route level (or use a provider that handles it).
- [ ] Update contact email — the legacy hardcoded `hello@madewithgridkit.com` is gone. Use a new `gridbeam.xyz` address (e.g. `hello@gridbeam.xyz`).

### Subscribe (hosted email newsletter)
- [ ] Pick a provider. Buttondown (the legacy choice) is fine; alternatives include ConvertKit, Mailchimp, EmailOctopus. Recommend **Buttondown** — same provider as the legacy site, simple API, ~$10/mo for the indie tier.
- [ ] Create a new Buttondown list for gridbeam.xyz. (Don't reuse the gridkit.nz list — different audience, different consent.)
- [ ] Add `BUTTONDOWN_API_KEY` to `.env.example` and to Vercel env vars.
- [ ] Build a `/subscribe` page with a simple email form. Use `@villagekit/ui` form components.
- [ ] Server action / API route at `/api/subscribe` that POSTs to Buttondown's subscribers endpoint. Reference: legacy `pages/api/subscribe.ts` in `node-modules/apps/gridkit/` (rewrite, don't import — the legacy applet-subscribe package isn't being folded in).
- [ ] Validation (Zod): email shape, no honeypot field set.
- [ ] Confirm the double-opt-in flow works (Buttondown sends a verification email).
- [ ] Success state: "Thanks — check your email to confirm."
- [ ] Add a small subscribe link in the footer (so it's reachable from every page) plus a CTA on the home page.

## Notes
- The legacy `applet-subscribe` and `applet-contact` packages stay in `node-modules` — we don't fold them in. Build fresh here.
- Spec the contact destination email before deploying — `hello@gridbeam.xyz` requires an MX record / forwarding setup.
- Newsletter content is the user's responsibility — no automated newsletter generation. The platform is just for delivery.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
