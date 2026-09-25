---
title: Home meta description added where legacy inherited the site default
status: fixed
route: /
axis: copy
kind: added
---
## Legacy

No `description` on the page's `NextSeo` (`apps/gridkit/pages/index.tsx:75`); the site default from `apps/gridkit/pages/_app.tsx:49` renders: "Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family."

## Current

`app/page.tsx:44-45,50,54,58` `heroDescription = 'A 40 mm grid system for building furniture — open, modular, and reusable. Find designs, cutting tools, and suppliers.'` as `description`, `openGraph.description` and `twitter.description`.

## Verdict

plan 4faefea8

## Log

- 2026-09-12: The site default's own rewrite is the shell item [[1906af99b588]].

- 2026-09-25: Regression (grilling Q1). Legacy's home page inherited the site default; this one does too. The per-page description is removed and the default's own verdict ([[1906af99b588]]) is the text that renders.
