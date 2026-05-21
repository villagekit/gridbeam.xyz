# 03 — DNS / domain — point gridbeam.xyz at new deployment

**Status:** TODO

## Why
For the site to actually be at https://gridbeam.xyz, DNS needs to point at the Cloudflare Worker. Until that switch happens, the new site is only reachable via the `*.workers.dev` preview URL.

## What
gridbeam.xyz, www.gridbeam.xyz, and (optionally) other relevant subdomains pointing at the production Cloudflare Worker.

## Steps
- [ ] Confirm domain ownership of gridbeam.xyz — who's the registrar, who has access?
- [ ] In the Cloudflare dashboard, on the production Worker (`gridbeam-xyz`): add `gridbeam.xyz` and `www.gridbeam.xyz` as Custom Domains. Cloudflare provisions the SSL cert automatically when the apex/CNAME records are in place.
- [ ] Add the DNS records to whichever zone gridbeam.xyz uses:
  - Apex (`gridbeam.xyz`) — Custom Domain on the Worker (proxied).
  - `www.gridbeam.xyz` — CNAME to apex, or also a Custom Domain on the Worker.
- [ ] If using a contact form that sends mail from `@gridbeam.xyz`, set up MX records and SPF/DKIM at the same time (one-time setup, save grief later).
- [ ] Configure email forwarding for `hello@gridbeam.xyz` (or whatever address the contact form uses). Cloudflare Email Routing handles this for free if the zone is on Cloudflare; otherwise Improvmx / Forward Email also work.
- [ ] Verify SSL certificate auto-provisions on Cloudflare (it does, but confirm).
- [ ] Test: `curl -I https://gridbeam.xyz` returns 200, `https://www.gridbeam.xyz` redirects to apex (or vice versa, decide).
- [ ] Submit the new site to Google Search Console + Bing Webmaster Tools.

## Notes
- If the domain is currently parked / inactive, the switch is low-risk. If it already points somewhere, the change is visible to anyone watching.
- HSTS: turn on once you're confident the site is stable. Easy to roll back briefly; HSTS is a year of forced HTTPS.

## Depends on
- [../01-website/11-deployment-and-seo.md](../01-website/11-deployment-and-seo.md) — the deployment must exist
