---
title: Number input steppers exposed as named buttons
status: sanctioned
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

Chakra v2's `NumberInputStepper` (`packages/applet-cutting-planner/src/components/beam-row.tsx:83-86`) renders `aria-hidden="true"` with `tabindex=-1` arrows: nothing in the tree beside the spinbutton (`audit/tools__cutting-planner/dom/legacy.aria.yaml`).

## Current

Chakra v3's `NumberInput.Control` (`app/tools/cutting-planner/CuttingPlanner.tsx:381-384`) renders `button "increment value"` and `button "decrease value"`, each with a nameless `img`, in every cell (`current.aria.yaml`). Not in the Tab sequence on either side.

## Verdict

rule: upgrade (what Chakra v3's NumberInput.Control renders; the primitive swap is [[65c4396337e7]])

## Log
