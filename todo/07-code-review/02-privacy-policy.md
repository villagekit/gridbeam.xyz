# 02 — Correct the privacy policy (Cloudflare + Cloudinary)

**Status:** DONE

## Why

The privacy policy's pitch is "you can verify this" — and it currently contains two claims that are verifiably false:

1. `app/legal/privacy-policy/page.tsx:76-81` — says the hosting provider "will be named here once the site is deployed". The site IS deployed: Cloudflare Workers via `@opennextjs/cloudflare` (see `wrangler.jsonc`, `next.config.ts`, and the recent deploy commits). Stale placeholder shipped as policy text.
2. `app/legal/privacy-policy/page.tsx:107-112` — claims the hosting provider is "the only third party currently in the path". False: essentially every image on the site is served from **Cloudinary** via the custom image loader (`next.config.ts` → `images.loaderFile` → `app/_lib/cloudinary-loader.ts`), and story/landing videos stream from Cloudinary too. Cloudinary therefore receives visitor IPs and user-agents on nearly every page view.

## What

Policy text that matches reality: names Cloudflare as host (with a link to their privacy policy), discloses Cloudinary as the media CDN (with the same treatment), and a bumped `lastUpdated` date.

## Steps

- [x] Verify current reality first: confirm the production host is still Cloudflare Workers and media is still Cloudinary (check `wrangler.jsonc`, `app/_lib/cloudinary-loader.ts`, and that no other third-party requests ship — grep for external URLs in `app/`; the review found no analytics/fonts/other origins, and the YouTube embed in `how-to-furniture-bolts.mdx` uses `youtube-nocookie.com`, which is only loaded on that story page — decide whether it warrants a mention).
- [x] Rewrite the hosting section: name Cloudflare, link their privacy policy, describe what they necessarily see (IP, user-agent, requested URL — standard server-log data).
- [x] Add a media/CDN section for Cloudinary with the same shape.
- [x] Reconsider the "only third party" sentence — either enumerate the actual set (Cloudflare, Cloudinary, + YouTube on one page if embedded) or drop the exclusivity claim.
- [x] Bump the policy's `lastUpdated` (find where it's rendered on the page) to the date the fix lands.
- [x] Keep the policy's existing voice — it's plain-language and first-person; don't lawyer it up.

## Notes

- Wiggle room: if hosting has moved since 2026-08-03, name whatever is actually serving production. The bug is the mismatch, not the specific provider.
- The legacy privacy policy (`../node-modules/apps/gridkit/pages/legal/privacy-policy.tsx`) is NOT the baseline here — it was Stripe/AWS/orders-specific and its replacement was a sanctioned rewrite. This task is about making the new policy true, not about parity.
- No sign-off needed for stating facts; if you find yourself adding new *commitments* (retention promises etc.), that's a Mikey decision.

### What the verification pass actually found (2026-08-03)

- Host is Cloudflare Workers (`wrangler.jsonc` → `.open-next/worker.js`; `pnpm deploy` = `opennextjs-cloudflare deploy`). No CI deploy workflow exists — deploys are manual. `observability.enabled: true`, so request logs are visible to us in the Cloudflare dashboard; the policy now says so.
- Cloudinary confirmed for images (`next.config.ts` → `images.loaderFile`) and video (`app/_lib/cloudinary.ts` → `res.cloudinary.com/.../video/upload/...`). **Not** every page though: the designs catalogue PNGs are local static imports rendered with `unoptimized` (`app/_lib/design-images.ts`), so they bypass Cloudinary. Pages with Cloudinary assets: home, about, stories index + story pages. The policy names those rather than claiming "every page".
- Fonts are `next/font/google`, which Next self-hosts at build time — no runtime request to Google. Called out in the policy because it strengthens the "you can verify this" claim.
- Third-party origins loaded by the browser, full sweep of `app/` + `content/` + `products/`: Cloudflare, Cloudinary, and one eagerly-loaded `youtube-nocookie.com` iframe in `content/stories/how-to-furniture-bolts.mdx:335`. Everything else external is an outbound `<a>`, which sends nothing until clicked. The YouTube embed got its own paragraph — it's exactly the kind of thing a privacy-conscious reader wants disclosed.
- Newsletter and contact forms are still not wired up (`app/subscribe/page.tsx`, `app/contact/page.tsx`), so those two "not currently active" sections stayed as-is and remain true.
- **The review pass found a third party the task file missed:** every design detail page fetches `https://unpkg.com/detect-gpu@5.0.70/dist/benchmarks/<gpu>.json`, via `@villagekit/sandbox` → drei's `useDetectGPU()` → `detect-gpu`'s default `benchmarksURL`. Confirmed in the shipped client bundle. Disclosed in the policy as an interim measure; the real fix is [task 16](./16-self-host-gpu-benchmarks.md).
- Also disclosed: `@villagekit/sandbox` stores two viewer display preferences in `localStorage`. Not a cookie and it never leaves the device, so "no cookies" stayed literally true — but a policy claiming to give "the full picture" should say so.
- One wording change worth flagging to Mikey: the closing pledge read "We will not **use** any third party that requires cookies or runs tracking scripts in your browser" — untrue as written, since the YouTube player runs Google's script inside its iframe. Changed to "will not **add** any", so it reads as a forward-looking commitment alongside the disclosed exception. The alternative is to keep the stronger pledge and drop the YouTube embed from that story — Mikey's call.

## Depends on

- Nothing.

## Files

- `app/legal/privacy-policy/page.tsx`
- Reality checks: `wrangler.jsonc`, `next.config.ts`, `app/_lib/cloudinary-loader.ts`, `app/_lib/cloudinary.ts`
