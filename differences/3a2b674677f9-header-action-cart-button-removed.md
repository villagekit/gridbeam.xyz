---
title: "Header action: cart button removed"
status: sanctioned
route: shell
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:92-127`: `CartButton` renders `<LinkIconButton as={NextLink} href="/cart" title="Cart" icon={<Icon as={FaShoppingCart} boxSize="5" />} variant="toolbar" sx={{ color: 'gray.900' }} />` with a `primary.400` `Badge` showing `useCartContext().itemsCount`. `audit/_root/1280/legacy.png` top right; `link "Cart"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

No cart control. The `HeaderAction` slot holds `SiteHeaderAction` (`app/layout.tsx:75`), a Subscribe button (its own item).

## Verdict

rule: no e-commerce (the cart surface is gone)

## Log

- 2026-09-26: Current is stale since plan 63e9c753ca55: the header action is the Find a supplier link to /suppliers (the verdict of e48df8d1ce98), not a Subscribe button. The Verdict stands.
