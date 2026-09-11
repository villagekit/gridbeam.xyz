---
title: "FAQ Accordion: Chakra v2 compound components to the v3 slot API"
status: sanctioned
route: /faq
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:347-370` `<Accordion allowMultiple>`, `<AccordionItem key={question}>`, `<AccordionButton>`, `<AccordionIcon />`, `<AccordionPanel>`; `@villagekit/ui@0.9.0 src/components/Accordion.tsx:1-8` re-exports Chakra v2's.

## Current

`app/faq/page.tsx:305-327` `<Accordion.Root multiple collapsible>`, `<Accordion.Item value={entry.question}>`, `<Accordion.ItemTrigger>`, `<Accordion.ItemIndicator />`, `<Accordion.ItemContent>`, `<Accordion.ItemBody>`; `@villagekit/ui@1.2.0 src/components/Accordion.tsx:1-10` wraps Chakra v3's, which needs a `value` per item.

## Verdict

rule: upgrade (Chakra v3 replaces the compound Accordion with slot components and requires a value per item)

## Log

- 2026-09-12: Filed on the route because the props are the route's call site; the Accordion's own recipe changes (hover fill, separator, hidden panel) are on shell: 1955ed7f51fb, cb9dce13acba, cb528cbc05e6.
