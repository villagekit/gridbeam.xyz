---
title: Footer Subscribe given a prominent visual treatment
status: sanctioned
route: shell
axis: visual
kind: added
---
## Legacy

`apps/gridkit/components/footer.tsx:61-66`: Newsletter is one plain text link among many under the `Our company` heading, no distinct visual treatment.

## Current

`app/_components/SiteFooter.tsx`: Subscribe/Newsletter is a plain link in the social icon row (see `0a0329d7aa2c`), same weight as every other link. No signup box or standalone visual treatment exists yet.

## Verdict

rule: operator (5). With the header's cart-equivalent action now pointing to Suppliers ([[e48df8d1ce98]]) rather than the newsletter, Subscribe needs its own footer prominence instead of riding along as a plain link (it never had a form of its own in legacy either). A closing plan gives it a standalone signup box in the Connect section, not just a text link; the exact treatment is the implementing plan's to design and this item's Verdict to be amended with what shipped, since no visual spec was given here. Confirmed 2026-09-13.

## Log
