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

- 2026-09-27: From the catalog re-port (plan 8417428fd88a): the Current is now app/_components/catalogue/List.tsx:25 const MotionBox = motion.create(Box) from motion/react, the stories List.tsx form, around legacy's itemVariants and AnimatePresence lines. The state stays sanctioned. One behavior the library change brings is filed apart, as [[105cb9410b89]]: the list message's remount on a filter change, which framer-motion swallowed on the live site and motion 12 plays.
