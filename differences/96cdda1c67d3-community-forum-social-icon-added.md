---
title: Community forum social icon added
status: open
route: shell
axis: visual
kind: added
---
## Legacy

`https://discuss.villagekit.com` is a footer section link, `Community` under `Our company` (`apps/gridkit/components/footer.tsx:49-52`); the social row (`:60-121`) has no forum icon. The lock's source `apps/villagekit/components/footer.tsx:33-37` lists it as a section link too.

## Current

`app/_components/SiteFooter.tsx:66-72`: `{ href: 'https://discuss.villagekit.com', label: 'Community forum', icon: <FaUsers /> }` in the social row, with the comment `Note(cc): added vs legacy footer`. Last icon in `audit/_root/1280/current.png`.

## Verdict

## Log
