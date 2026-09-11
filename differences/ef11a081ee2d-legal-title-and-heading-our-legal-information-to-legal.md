---
title: "Legal title and heading: Our legal information to Legal"
status: open
route: /legal
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/pages/legal.tsx:61` `<CardsLayout title="Our legal information">`: one string for both `<NextSeo title>` and `<Title>` (`CardsLayout.tsx:19,21`); rendered `<title>Grid Kit: Our legal information</title>` and `heading "Our legal information" [level=1]` (`audit/legal/dom/legacy.aria.yaml:22`).

## Current

`app/legal/page.tsx:20,23-32,40` `const title = 'Legal'` in `metadata` and `<Title description="...">Legal</Title>`; rendered `<title>Legal — gridbeam.xyz</title>` and `heading "Legal" [level=1]` (`audit/legal/dom/current.aria.yaml:23`).

## Verdict

## Log
