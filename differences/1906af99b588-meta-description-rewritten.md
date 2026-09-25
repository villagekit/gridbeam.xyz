---
title: Meta description rewritten
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:49`: `Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family.`

## Current

`app/layout.tsx:25-26`: `An open-source educational site about grid beam — modular construction made simple.`

## Verdict

rule: rebrand (1) + operator (5). Ships as: "Anyone can be a maker with Grid Beam: life-size building blocks. Eco-friendly, adaptable, and fun for the whole family."

## Log

- 2026-09-25: The verdict shipped with plan ffe8e5d5: `app/layout.tsx` sets the description verbatim. Routes that set their own description (each route's own item) still override it.
