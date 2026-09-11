---
title: "FAQ question label: a paragraph inside the button to a span"
status: regression
route: /faq
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:350-354` `<AccordionButton><Text variant="tertiary">{question}</Text>...`: `Text` renders `<p>` inside `<button>` (live HTML: `<button ...><p class="chakra-text ...">What is Grid Kit?</p>`); `audit/faq/dom/legacy.aria.yaml` every `button` has a nested `paragraph` child.

## Current

`app/faq/page.tsx:308-318` `<Accordion.ItemTrigger><Text as="span" ...>{entry.question}</Text>`: `audit/faq/dom/current.aria.yaml` flat button names with no child node.

## Verdict

## Log

- 2026-09-12: Regression by the rule's absence; a `<p>` inside a `<button>` is invalid HTML, which the operator may weigh under rule 5.
