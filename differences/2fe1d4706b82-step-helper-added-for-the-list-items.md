---
title: Step helper added for the list items
status: open
route: /
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/index.tsx:225-273` each `<ListItem><ListIcon as={Icon} />text</ListItem>` inline.

## Current

`app/page.tsx:410-427` `function Step({ icon, children })` rendering `<List.Item display="flex" ...><Icon color="primary.500" boxSize="6" mt="1"><StepIcon /></Icon><Span>{children}</Span></List.Item>` where v3 offers `List.Indicator`.

## Verdict

## Log

- 2026-09-12: The icon color is the visual item.
