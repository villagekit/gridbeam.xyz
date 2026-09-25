---
title: Subscribe paragraph 3 added
status: regression
route: /subscribe
axis: copy
kind: added
---
## Legacy

None on the route.

## Current

`app/subscribe/page.tsx:51-54` `<Text variant="secondary">` "No spam. No marketing automation. No third-party trackers. When the signup ships, the terms will be on this page and in the privacy policy."

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S4). Removed; legacy's route is the heading, one sentence and the form.
