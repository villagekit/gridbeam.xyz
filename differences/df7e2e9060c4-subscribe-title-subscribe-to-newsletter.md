---
title: "Subscribe title: Subscribe to Newsletter"
status: regression
route: /subscribe
axis: copy
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:30` `<NextSeo title="Subscribe" />`; rendered `<title>Grid Kit: Subscribe</title>`.

## Current

`app/subscribe/page.tsx:16,21` `const title = 'Newsletter'`; rendered `<title>Newsletter — gridbeam.xyz</title>`.

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S1). Ships as "Subscribe", templated by the shell to "Grid Beam: Subscribe".
