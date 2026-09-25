// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/testimonial.tsx
'use client'

import { BlockSection, Text, VStack, useBreakpointValue } from '@villagekit/ui'
import type React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

interface TestimonalProps {
  quote: React.ReactNode
  name: string
}

export function Testimonial(props: TestimonalProps) {
  const { quote, name } = props

  const isXlScreen = useBreakpointValue<boolean>(
    {
      base: false,
      xl: true,
    },
    { fallback: 'xl' },
  ) as boolean

  return (
    <VStack as="section" aria-label="Testimonial" flex="1" gap="2">
      <BlockSection Icon={FaQuoteLeft} css={{ flex: 1, width: '100%' }}>
        <Text
          aria-label="Quote"
          fontSize={isXlScreen ? 'md' : 'sm'}
          fontStyle="italic"
          textAlign="center"
          variant="tertiary"
        >
          {quote}
        </Text>
      </BlockSection>

      <Text aria-label="Name" fontSize={isXlScreen ? 'md' : 'sm'} color="gray.500">
        {name}
      </Text>
    </VStack>
  )
}
