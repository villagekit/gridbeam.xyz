---
title: Watch the repository card added
status: regression
route: /subscribe
axis: copy
kind: added
---
## Legacy

None on the route.

## Current

`app/subscribe/page.tsx:71-77` `LinkCard` `title="Watch the repository"`, `icon={<FaGithub />}`, `description="The launch will land as a site update in the GitHub repo. Star or watch it to see updates as they ship."`, `href="https://github.com/villagekit/gridbeam.xyz"`, `isExternal` (a new tab).

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S4). Removed; legacy's route is the heading, one sentence and the form.
