// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/list.tsx
'use client'

import { Box, Button, Icon, SimpleGrid, Text, VStack, useBreakpointValue } from '@villagekit/ui'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { useCatalogueContext } from '@/app/_lib/context/catalogue'

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

/** The grid of cards for the context's items, the empty state when there are none, and the list message after them. */
export function List() {
  const { items, itemLabel, listMessage, onReset } = useCatalogueContext()

  const [hideComingSoon, setHideComingSoon] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: run when items change
  useEffect(() => {
    setHideComingSoon(true)
    setTimeout(() => setHideComingSoon(false), 0)
  }, [items])

  const columns = useBreakpointValue<number>({ base: 2, lg: 3 })

  if (items.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, ease: 'easeIn', type: 'tween' },
        }}
      >
        <VStack gap="4" css={{ paddingTop: [0, null, 16], textAlign: 'center' }}>
          <Text fontSize={['lg', null, 'xl']}>
            We couldn&apos;t find any {itemLabel} that match your search criteria
          </Text>

          <Text fontSize={['md', null, 'lg']} variant="tertiary">
            Try again using a different keyword or hit reset
          </Text>

          <Button variant="secondary" onClick={onReset} css={{ maxWidth: 'sm', width: '100%' }}>
            <Icon as={FaTimes} boxSize="5" />
            Reset search
          </Button>
        </VStack>
      </MotionBox>
    )
  }

  return (
    <>
      <SimpleGrid columns={columns} gap="8">
        <AnimatePresence>
          {items.map((item) => {
            return (
              <MotionBox
                key={item.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Item item={item} />
              </MotionBox>
            )
          })}
        </AnimatePresence>
      </SimpleGrid>

      {listMessage && (
        <AnimatePresence>
          {!hideComingSoon && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.3,
                  ease: 'easeIn',
                  type: 'tween',
                },
              }}
              css={{ paddingBottom: 4, paddingTop: 8 }}
            >
              <Text fontSize="lg" variant="tertiary">
                {listMessage}
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
