# 03 — DNS / domain — point gridbeam.xyz at new deployment

**Status:** TODO

## Why
For the site to actually be at https://gridbeam.xyz, DNS needs to point at the deployment. Until that switch happens, the new site is only reachable via the Vercel preview URL.

## What
gridbeam.xyz, www.gridbeam.xyz, and (optionally) other relevant subdomains pointing at Vercel (or whichever host).

## Steps
- [ ] Confirm domain ownership of gridbeam.xyz — who's the registrar, who has access?
- [ ] In Vercel: add `gridbeam.xyz` and `www.gridbeam.xyz` as production domains on the new project.
- [ ] Vercel will provide DNS records (usually an A record for apex + CNAME for www, OR Vercel's nameservers).
- [ ] Choose:
  - **A**: Vercel-managed DNS — change the registrar's nameservers to Vercel's. Simplest. Vercel handles everything.
  - **B**: Keep current DNS provider — add A/CNAME/AAAA records pointing at Vercel. More control if you have other services on the domain (mail, etc).
- [ ] If using a contact form that sends mail from `@gridbeam.xyz`, set up MX records and SPF/DKIM at the same time (one-time setup, save grief later).
- [ ] Configure email forwarding for `hello@gridbeam.xyz` (or whatever address the contact form uses). Cloudflare / Improvmx / Forward Email all do this for free.
- [ ] Verify SSL certificate auto-provisions on Vercel (it does, but confirm).
- [ ] Test: `curl -I https://gridbeam.xyz` returns 200, `https://www.gridbeam.xyz` redirects to apex (or vice versa, decide).
- [ ] Submit the new site to Google Search Console + Bing Webmaster Tools.

## Notes
- If the domain is currently parked / inactive, the switch is low-risk. If it already points somewhere, the change is visible to anyone watching.
- HSTS: turn on once you're confident the site is stable. Easy to roll back briefly; HSTS is a year of forced HTTPS.

## Depends on
- [../01-website/11-deployment-and-seo.md](../01-website/11-deployment-and-seo.md) — the deployment must exist
