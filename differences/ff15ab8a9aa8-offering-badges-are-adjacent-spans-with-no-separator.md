---
title: Offering badges are adjacent spans with no separator
status: open
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:185-191` `HStack gap="2"` of `Badge` spans; live markup `<span class="chakra-badge">Beams</span><span class="chakra-badge">Fasteners</span><span class="chakra-badge">Kits</span>` with no text node between them (the aria snapshot shows `text: Beams Fasteners Kits`), so word boundaries depend on the assistive technology.

## Verdict

## Log
