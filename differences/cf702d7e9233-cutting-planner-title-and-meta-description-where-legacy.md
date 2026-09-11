---
title: Cutting planner title and meta description where legacy inherited the site default
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

No page-level `NextSeo` on `apps/gridkit/pages/tools/cutting-planner.tsx`, so the site default applies: `apps/gridkit/pages/_app.tsx:47-49` title "Grid Kit", description "Anyone can be a maker with Grid Kit: start building custom furniture, no experience needed. Eco-friendly, adaptable, and fun for the whole family."

## Current

`app/tools/cutting-planner/page.tsx:7-20` title "Cutting planner" (rendered "Cutting planner — gridbeam.xyz" through `app/layout.tsx:30-32`), description "Plan how to cut a list of grid beams from your stock with the least off-cut waste. First-fit-decreasing bin packing.", reused for Open Graph and Twitter. The mechanism is the shell's [[f46533a8ae54]]; the home precedent is [[bfc81eb7197c]].

## Verdict

## Log
