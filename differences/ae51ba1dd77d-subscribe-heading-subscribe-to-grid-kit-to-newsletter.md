---
title: "Subscribe heading: Subscribe to Grid Kit to Newsletter"
status: regression
route: /subscribe
axis: copy
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:32` `` `Subscribe to ${websiteName}` `` with `websiteName: 'Grid Kit'` (`apps/gridkit/pages/subscribe.tsx:9`): `audit/subscribe/dom/legacy.aria.yaml:22` `heading "Subscribe to Grid Kit" [level=1]`.

## Current

`app/subscribe/page.tsx:37-39` `<Title description="A low-volume newsletter is on the way. No signup form yet.">Newsletter</Title>`: `heading "Newsletter" [level=1]`.

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S1). Ships as "Subscribe to Grid Beam": legacy interpolates the site name, the Title Case wordmark is rule 1.
