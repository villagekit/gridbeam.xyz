---
title: "List animation: framer-motion MotionBox to motion/react motion.div"
status: sanctioned
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:11,32` `import { AnimatePresence, type Variants, motion } from 'framer-motion'`; `const MotionBox = motion<BoxProps>(Box)`.

## Current

`app/_components/catalogue/Catalogue.tsx:17,245-255` `from 'motion/react'`, `motion.div` with `style={{ minWidth: 0 }}`; the variants (`:42-52`) are identical.

## Verdict

rule: upgrade (framer-motion to motion, the successor package, as [[83b6c8ceb5d0]])

## Log
