// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/stories/list.tsx
'use client'

import { Box, SimpleGrid, useBreakpointValue } from '@villagekit/ui'
import { AnimatePresence, type Variants, motion } from 'motion/react'

import { useStoriesContext } from '../../_lib/context/stories'
import { Item } from './Item'

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    transition: { duration: 0.3, ease: 'easeOut', type: 'tween' },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeIn', type: 'tween' },
  },
}

const MotionBox = motion.create(Box)

export function List() {
  const { stories } = useStoriesContext()

  const columns = useBreakpointValue<number>({ base: 1, md: 2 })

  return (
    <SimpleGrid columns={columns} gap="12">
      <AnimatePresence>
        {stories.map((story) => (
          <MotionBox
            key={story.title}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Item metadata={story} />
          </MotionBox>
        ))}
      </AnimatePresence>
    </SimpleGrid>
  )
}
