---
title: "Filter chip size and gap: Badge sm/lg with gap 2/4 to fontSize sm/md, px 3 py 1, gap 2/3"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/filters.tsx:17,26,35` `size={isMobile ? 'sm' : 'lg'}`, `spacing={isMobile ? 2 : 4}`; `apps/gridkit/components/option.tsx:52-55` `fontSize: size`, `paddingX: 2`.

## Current

`app/stories/StoriesBrowser.tsx:60-61,113-118` `gap={{ base: 2, md: 3 }} flexWrap="wrap"`, `fontSize={{ base: 'sm', md: 'md' }}`, `px="3" py="1"`. From code.

## Verdict

## Log
