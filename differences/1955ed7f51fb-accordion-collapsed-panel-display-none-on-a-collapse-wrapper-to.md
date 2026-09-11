---
title: "Accordion collapsed panel: display none on a Collapse wrapper to the hidden attribute on the region"
status: sanctioned
route: shell
axis: accessibility
kind: changed
---
## Legacy

Chakra v2 `AccordionPanel` (`apps/gridkit/pages/faq.tsx:356`) renders `<div class="chakra-collapse" style="overflow:hidden;display:none;opacity:0;height:0px">` around `<div role="region" id="accordion-panel-..." aria-labelledby="accordion-button-...">`; the region carries no `hidden` (live HTML of `https://gridkit-landing-villagekit.vercel.app/faq`).

## Current

Chakra v3's `Accordion.ItemContent` (`app/faq/page.tsx:320`) renders `<div data-part="item-content" data-state="closed" hidden role="region" aria-labelledby="...trigger:...">` (`curl http://localhost:3000/faq`). Trigger and region keep `aria-expanded`, `aria-controls` and the reciprocal `aria-labelledby` on both sides.

## Verdict

rule: upgrade (Chakra v3 and Zag render the accordion content this way; the disclosure wiring is unchanged)

## Log

- 2026-09-12: Filed on shell from plan 848b026f.
