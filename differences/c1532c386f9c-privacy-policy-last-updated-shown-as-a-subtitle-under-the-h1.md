---
title: Privacy policy last updated shown as a subtitle under the h1
status: open
route: /legal/privacy-policy
axis: visual
kind: added
---
## Legacy

The h1 (`packages/applet-legal/src/mdx/privacy-policy.mdx:1`) has no description line; the date sits in the Changes paragraph (`:103`).

## Current

`app/legal/privacy-policy/page.tsx:40` `<Title description={`Last updated ${lastUpdated}.`}>` renders a caption line under the centered h1 (`audit/legal__privacy-policy/1280/current.png`, top of page).

## Verdict

## Log

- 2026-09-12: The wording and date are the copy item on this route.
