---
title: "Category filters added: Entryway, Event, Laundry, Retail, Shelving"
status: open
route: /designs
axis: copy
kind: added
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:27-43` a fixed `filterOptions` table of 14 labels (Bedroom, Cats, Desk, Dining, Garage, Kids, Kitchen, Lounge, Office, Seating, Storage, Tables, Utility, Workbench); designs tagged `entryway`, `event`, `laundry`, `retail` or `shelving` get no filter (`audit/designs/dom/legacy.txt` lists 14 options after `All designs`).

## Current

`app/_components/design/designs-to-catalogue.ts:42-67` `buildDesignFilterOptions` derives the options from every tag present, so `Entryway`, `Event`, `Laundry`, `Retail` and `Shelving` are appended after the 14 (`audit/designs/dom/current.txt`, 19 options).

## Verdict

## Log
