---
title: Privacy policy section Third parties added
status: open
route: /legal/privacy-policy
axis: copy
kind: added
---
## Legacy

No such section (the legacy "Third party providers" subsection is its own removed item).

## Current

`app/legal/privacy-policy/page.tsx:148-184` `<Heading as="h2" size="lg">Third parties</Heading>`: "Two third parties are in the path across the site: Cloudflare, which hosts it, and Cloudinary, which serves the photos and videos. Both receive the server-log data described above. Neither runs any script in your browser — they hand over pages and media files, nothing else." (names bold) / "Two places reach one step further. The guide on installing furniture bolts embeds a YouTube video. It loads from youtube-nocookie.com, YouTube's privacy-enhanced domain, which Google says holds off on tracking cookies until you press play — but YouTube receives your IP address and user-agent as soon as the player appears. It's the only embed of its kind anywhere on the site." (link "installing furniture bolts" to `/stories/how-to-furniture-bolts`) / "And the 3D viewer on a design page downloads a graphics-benchmark file from unpkg.com, a public CDN for open-source packages. The rendering library uses it to judge how much detail your graphics hardware can handle. It's a plain file download — nothing about you or your session is sent along — but unpkg does see your IP address and user-agent when it happens." (link "design page" to `/designs`) / "When the newsletter or contact form ship, the providers handling them will be listed here. We will not add any third party that requires cookies or runs tracking scripts in your browser."

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
