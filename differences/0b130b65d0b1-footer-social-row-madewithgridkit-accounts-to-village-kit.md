---
title: "Footer social row: madewithgridkit accounts to Village Kit accounts"
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/footer.tsx:60-121`, ten links: `Newsletter` (/subscribe), `Mastodon` (https://sunrise.social/gridkit), `Bluesky` (https://bsky.app/profile/madewithgridkit.com), `Instagram` (https://instagram.com/madewithgridkit), `Twitter / X` (https://x.com/madewithgridkit), `Facebook` (https://facebook.com/madewithgridkit), `Instagram` (https://www.threads.net/@madewithgridkit, the Threads icon under a duplicate label), `YouTube` (https://www.youtube.com/@madewithgridkit), `TikTok` (https://www.tiktok.com/@madewithgridkit), `Github` (https://www.github.com/villagekit). Ten icons in `audit/_root/1280/legacy.png`.

## Current

`app/_components/SiteFooter.tsx:27-73`, eight links: `Email` (/contact), `Mastodon` (https://sunrise.social/@villagekit), `Instagram` (https://instagram.com/village_kit), `X / Twitter` (https://x.com/villagekit), `Facebook` (https://facebook.com/villagekit), `YouTube` (https://www.youtube.com/@villagekit), `GitHub` (https://github.com/villagekit), `Community forum` (https://discuss.villagekit.com). The lock's source, `apps/villagekit/components/footer.tsx:45-88`, lists Mastodon, Instagram, `X / Twitter`, Facebook, YouTube and Github under the Village Kit accounts, with no Bluesky, Threads or TikTok.

## Verdict

lock: footer (the social row uses the Village Kit accounts as apps/villagekit lists them; Bluesky, Threads and TikTok are not in that list)

## Log

- 2026-09-12: Three entries deviate from the list the lock cites (the envelope link, the Mastodon and GitHub hrefs and the GitHub label, the added Community forum icon); each has its own item.
