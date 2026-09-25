---
title: "Typing section paragraph: Grid Kit evolves to Grid Beam evolves"
status: fixed
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:427-429` "Imagine, build, and rebuild — Grid Kit evolves with your life. From practical furniture to fun family projects, our designs are simple to make and can fit any space."

## Current

`app/_components/landing/TypingDesignSection.tsx:64-67` "Imagine, build, and rebuild — Grid Beam evolves with your life. From practical furniture to fun family projects, our designs are simple to make and can fit any space."

## Verdict

plan 2de4b709bb36

## Log

- 2026-09-12: Rule 1 names lowercase `grid beam` in body copy; this instance is Title Case, so the operator judges.

- 2026-09-25: Regression (grilling Q9, [[edad0df805f0]]). Ships as legacy with the rule 1 swap, its own em dash kept: "Imagine, build, and rebuild — grid beam evolves with your life. From practical furniture to fun family projects, our designs are simple to make and can fit any space."
