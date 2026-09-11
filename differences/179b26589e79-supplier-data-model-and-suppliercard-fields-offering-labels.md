---
title: "Supplier data model and SupplierCard: fields, offering labels, status filter"
status: open
route: /suppliers
axis: code
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. The decision's reference data is `apps/gridkit/producers.ts:1-6` (`id`, `title`, `location`, `latitude`, `longitude`).

## Current

`content/suppliers.ts:1-18`: `Region` (`'NZ' | 'AU' | 'EU' | 'UK' | 'US' | 'CA' | 'global'`), `SupplierOffering` (six values), `SupplierStatus` (`'active' | 'paused' | 'archived'`), `Supplier { id, name, region, country, website, offerings, compatibility, blurb, notes?, status }`; `region` is set on both entries and read nowhere. `app/suppliers/page.tsx:39-46` `offeringLabels`; `:49` `suppliers.filter((supplier) => supplier.status !== 'archived')`; `:167-205` `SupplierCard` (a `Box` card with `Heading` h3, a `Paused` `Badge`, the country, the blurb, offering `Badge`s, the compatibility line, optional notes, a `LinkButton isExternal`); `:78-82` a `SimpleGrid columns={{ base: 1, md: 2 }}` of cards. An invention beyond the decision's "supplier cards below, each supplier carrying coordinates"; the operator judges whether it stays.

## Verdict

## Log
