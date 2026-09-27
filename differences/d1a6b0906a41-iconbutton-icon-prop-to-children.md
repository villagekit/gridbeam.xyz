---
title: IconButton icon prop to children
status: sanctioned
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:35-40` `<IconButton title="Clear search" icon={<Icon as={FaTimes} boxSize="5" />} variant="toolbar" />`.

## Current

`app/_components/catalogue/Catalogue.tsx:408-410` `<IconButton title="Clear search" variant="toolbar" size="sm"><Icon as={FaTimes} boxSize="5" /></IconButton>`.

## Verdict

rule: upgrade (Chakra v3 IconButton takes the icon as children)

## Log

- 2026-09-27: From the catalog re-port (plan 8417428fd88a): the Current is now app/_components/catalogue/SearchBar.tsx:36-38, the IconButton with the Icon as its child inside Chakra v3's InputGroup endElement. The state stays sanctioned.
