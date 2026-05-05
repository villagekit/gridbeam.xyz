// Pull-quote with a quotation-mark glyph. Used in a 3-up row on the home
// page hero. Mirrors the legacy gridkit.nz testimonial: dashed-border block
// + tertiary italic text + author name underneath.
//
// `'use client'` because BlockSection takes the icon as a function reference
// (`Icon: ComponentType`); server components can't pass functions across the
// RSC boundary, so the wrapping testimonial has to render on the client too.

'use client'

import { BlockSection, Text, VStack } from '@villagekit/ui'
import type { ReactNode } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

interface TestimonialProps {
  quote: ReactNode
  name: string
}

export function Testimonial(props: TestimonialProps) {
  const { quote, name } = props

  return (
    <VStack
      as="section"
      aria-label={`Testimonial from ${name}`}
      gap="2"
      flex="1"
      w="full"
      alignItems="stretch"
    >
      <BlockSection Icon={FaQuoteLeft} css={{ flex: 1 }}>
        <Text
          as="span"
          variant="tertiary"
          fontSize={{ base: 'sm', xl: 'md' }}
          fontStyle="italic"
          textAlign="center"
        >
          {quote}
        </Text>
      </BlockSection>

      <Text fontSize={{ base: 'sm', xl: 'md' }} color="gray.500" alignSelf="center">
        {name}
      </Text>
    </VStack>
  )
}
