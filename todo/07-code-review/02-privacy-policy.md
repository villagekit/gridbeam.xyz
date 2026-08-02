# 02 — Correct the privacy policy (Cloudflare + Cloudinary)

**Status:** TODO

## Why

The privacy policy's pitch is "you can verify this" — and it currently contains two claims that are verifiably false:

1. `app/legal/privacy-policy/page.tsx:76-81` — says the hosting provider "will be named here once the site is deployed". The site IS deployed: Cloudflare Workers via `@opennextjs/cloudflare` (see `wrangler.jsonc`, `next.config.ts`, and the recent deploy commits). Stale placeholder shipped as policy text.
2. `app/legal/privacy-policy/page.tsx:107-112` — claims the hosting provider is "the only third party currently in the path". False: essentially every image on the site is served from **Cloudinary** via the custom image loader (`next.config.ts` → `images.loaderFile` → `app/_lib/cloudinary-loader.ts`), and story/landing videos stream from Cloudinary too. Cloudinary therefore receives visitor IPs and user-agents on nearly every page view.

## What

Policy text that matches reality: names Cloudflare as host (with a link to their privacy policy), discloses Cloudinary as the media CDN (with the same treatment), and a bumped `lastUpdated` date.

## Steps

- [ ] Verify current reality first: confirm the production host is still Cloudflare Workers and media is still Cloudinary (check `wrangler.jsonc`, `app/_lib/cloudinary-loader.ts`, and that no other third-party requests ship — grep for external URLs in `app/`; the review found no analytics/fonts/other origins, and the YouTube embed in `how-to-furniture-bolts.mdx` uses `youtube-nocookie.com`, which is only loaded on that story page — decide whether it warrants a mention).
- [ ] Rewrite the hosting section: name Cloudflare, link their privacy policy, describe what they necessarily see (IP, user-agent, requested URL — standard server-log data).
- [ ] Add a media/CDN section for Cloudinary with the same shape.
- [ ] Reconsider the "only third party" sentence — either enumerate the actual set (Cloudflare, Cloudinary, + YouTube on one page if embedded) or drop the exclusivity claim.
- [ ] Bump the policy's `lastUpdated` (find where it's rendered on the page) to the date the fix lands.
- [ ] Keep the policy's existing voice — it's plain-language and first-person; don't lawyer it up.

## Notes

- Wiggle room: if hosting has moved since 2026-08-03, name whatever is actually serving production. The bug is the mismatch, not the specific provider.
- The legacy privacy policy (`../node-modules/apps/gridkit/pages/legal/privacy-policy.tsx`) is NOT the baseline here — it was Stripe/AWS/orders-specific and its replacement was a sanctioned rewrite. This task is about making the new policy true, not about parity.
- No sign-off needed for stating facts; if you find yourself adding new *commitments* (retention promises etc.), that's a Mikey decision.

## Depends on

- Nothing.

## Files

- `app/legal/privacy-policy/page.tsx`
- Reality checks: `wrangler.jsonc`, `next.config.ts`, `app/_lib/cloudinary-loader.ts`, `app/_lib/cloudinary.ts`
