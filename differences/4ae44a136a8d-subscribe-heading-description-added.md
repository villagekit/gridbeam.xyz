---
title: Subscribe heading description added
status: fixed
route: /subscribe
axis: copy
kind: added
---
## Legacy

`packages/applet-subscribe/src/page.tsx:32` `<Title>` with no `description`.

## Current

`app/subscribe/page.tsx:37` `description="A low-volume newsletter is on the way. No signup form yet."`.

## Verdict

plan eb43bbfbe5f2

## Log

- 2026-09-25: Regression (subscribe grilling S1). No description line under the heading, as legacy.
