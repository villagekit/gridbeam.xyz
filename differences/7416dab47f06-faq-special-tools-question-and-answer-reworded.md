---
title: FAQ special tools question and answer reworded
status: regression
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:48,51-56` "Do I need any special tools to assemble my Grid Kit?": "No special tools needed! Grid Kit is designed for easy assembly, and you only need basic hand tools like a 4mm hex key. For help on assembly, see our guide "How To Install Furniture Bolts"." (link ""How To Install Furniture Bolts"" to `/stories/how-to-furniture-bolts`).

## Current

`app/faq/page.tsx:64,67-73` "Do I need any special tools to assemble it?": "No special tools — basic hand tools and a 4 mm hex key are enough for almost every build. A measuring tape and a saw if you're cutting beams to length yourself. For help on assembly, see our guide How to Install Furniture Bolts." (link "How to Install Furniture Bolts", unquoted).

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F3). Question ships as "Do I need any special tools to assemble it?" (legacy's ended on the kit; operator). Answer legacy with the rule 1 swap: "No special tools needed! Grid beam is designed for easy assembly, and you only need basic hand tools like a 4mm hex key. For help on assembly, see our guide \"How To Install Furniture Bolts\"." with legacy's quoted link label.
