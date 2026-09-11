---
title: Privacy policy section What we do collect, with Server access logs, added
status: open
route: /legal/privacy-policy
axis: copy
kind: added
---
## Legacy

No such section.

## Current

`app/legal/privacy-policy/page.tsx:73-95` `<Heading as="h2" size="lg">What we do collect</Heading>` then `<Heading as="h3" size="md">Server access logs</Heading>`: "The site is hosted on Cloudflare Workers. Serving a page means Cloudflare necessarily sees standard server-log data: your IP address, the URL you requested, your user-agent string, and a timestamp. Cloudflare retains that data under its own privacy policy. We can see recent requests in the Cloudflare dashboard when debugging a problem; we don't aggregate, analyse, or export them, and we don't build any profile of you from them." (link "its own privacy policy" to `https://www.cloudflare.com/privacypolicy/`).

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
