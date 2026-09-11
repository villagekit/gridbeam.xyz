---
title: "Engine 0.10.0: Chakra v3 compound components in parameters, product errors and the sandbox controls"
status: sanctioned
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/{index,presets/index,values/*}.tsx` `FormControl`, `Switch`, `Select`, `Slider*`, `sx`, `spacing`; `core/product/src/errors.tsx:81-153` `List`, `ListItem`, `ListIcon`; `core/sandbox/src/index.tsx:53-58` `useDisclosure({ defaultIsOpen })` / `isOpen`.

## Current

`@villagekit/parameters@0.10.0 src/*` `Field.Root`, `Switch.*`, `Select.*`, `Slider.*`, `onCheckedChange`/`onValueChange`, `css`, `gap`; `@villagekit/product@0.10.0 src/errors.tsx` `List.Root`/`Item`/`Indicator`; `@villagekit/sandbox@0.10.0 src/index.tsx` `useDisclosure({ defaultOpen })` / `open`, `css`; `@villagekit/part@0.10.0 src/summary.tsx` `css`/`gap`; the sandbox scenery also carries the react-three-fiber v9 types (`ThreeElements`, readonly tuples in `scenery/{floor,grid}.tsx`), with no rendered change.

## Verdict

rule: upgrade (the engine's own Chakra v3 migration; the state machines, contexts and codecs are byte-identical)

## Log

- 2026-09-12: Template. The slider width, the hover key and the tooltip icon are separate regressions on this route.
