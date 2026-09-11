---
title: Bold spans added inside two body paragraphs
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:189-192,323-326` the kit and sustainability paragraphs carry no emphasis.

## Current

`app/page.tsx:188` `<Span fontWeight="bold">40&nbsp;mm grid</Span>` and `:296` `<Span fontWeight="bold">Locally-sourced untreated wood, intended to be reused</Span>`; bold runs in `audit/_root/1280/current.png`.

## Verdict

## Log

- 2026-09-12: The locked sustainability line is [[d89bc9307830]]; the lock names its wording, not its weight.
