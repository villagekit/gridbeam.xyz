---
title: "useInView: framer-motion to motion/react"
status: sanctioned
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:33,399` `import { useInView } from 'framer-motion'`.

## Current

`app/_components/landing/TypingDesignSection.tsx:4,27` `import { motion, useInView, useReducedMotion } from 'motion/react'`.

## Verdict

rule: upgrade (framer-motion to motion, the successor package)

## Log

- 2026-09-12: Only the package move is sanctioned; the carousel rewrites on motion have their own items.
