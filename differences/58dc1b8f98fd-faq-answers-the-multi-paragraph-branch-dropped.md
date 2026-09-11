---
title: "FAQ answers: the multi-paragraph branch dropped"
status: regression
route: /faq
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/faq.tsx:25` `answer: React.ReactNode | Array<React.ReactNode>`; `:357-366` an array answer renders one `<Text>` per paragraph in a nested `<VStack alignItems="flex-start">`. Used by the add-ons, What can I make, modular and sustainability answers (`:136-147,152-164,167-171,184-208`).

## Current

`app/faq/page.tsx:34` `answer: ReactNode`; `:322` always one `<Text>{entry.answer}</Text>`. No current answer has more than one paragraph (the merged paragraphs are copy items).

## Verdict

## Log
