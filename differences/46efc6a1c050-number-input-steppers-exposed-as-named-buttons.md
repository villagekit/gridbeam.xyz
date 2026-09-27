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

- 2026-09-28: From the page re-port (plan 9c6e9dd981bd): the Current's lines are gone with the monolith. NumberInput.Control with its two triggers now sits at app/tools/cutting-planner/components/BeamRow.tsx:80-83 and 98-101; the route's DOM pair after the re-port reads the same tree, button increment value and button decrease value with a nameless img in every cell, beside legacy's bare spinbutton (audit/tools__cutting-planner/dom/current.aria.yaml). No state change.
