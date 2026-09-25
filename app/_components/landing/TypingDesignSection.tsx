'use client'

import { Box, Heading, Image, LinkButton, Span, Text, VisuallyHidden } from '@villagekit/ui'
import { useInView } from 'motion/react'
import NextLink from 'next/link'
import pluralize from 'pluralize-esm'
import { useRef } from 'react'

import type { StaticImageData } from 'next/image'

import type { DesignIndexEntry } from '../../_lib/designs'
import { useDesignTypingEffect } from '../../_lib/useDesignTypingEffect'
import { DesignCarousel } from '../DesignCarousel'
import { LandingColumn, LandingRow, LandingSection } from './LandingSection'

interface TypingDesignSectionProps {
  index: number
  designs: ReadonlyArray<DesignIndexEntry>
}

export function TypingDesignSection(props: TypingDesignSectionProps) {
  const { index, designs } = props

  const ref = useRef<HTMLDivElement>(null)
  // Pauses the typing-effect timer (and the live-region announcements) when
  // the section is offscreen.
  const isInView = useInView(ref)

  const [currentDesign, typedLabel, nextDesign] = useDesignTypingEffect({
    designs,
    loop: true,
    pause: !isInView,
  })

  const article = getArticle(currentDesign?.label ?? '')

  return (
    <LandingSection index={index}>
      <Box ref={ref} w="full">
        <LandingRow sectionIndex={index}>
          <LandingColumn>
            {/* Live region sits OUTSIDE the heading so it doesn't re-render
                (and re-announce) on every keystroke — only when `currentDesign`
                changes. Some screen readers re-announce live regions when an
                ancestor re-renders. */}
            {currentDesign && (
              <VisuallyHidden aria-atomic="true" aria-live="polite">
                Build {article}
                {currentDesign.label}
              </VisuallyHidden>
            )}
            <Heading as="h2" size={{ base: '3xl', md: '4xl' }} lineHeight="1.1" aria-hidden="true">
              Build {article}
              <Span color="accentA.500">{typedLabel}</Span>
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Imagine, build, and rebuild — grid beam evolves with your life. From practical
              furniture to fun family projects, our designs are simple to make and can fit any
              space.
            </Text>

            <LinkButton as={NextLink} href="/designs" variant="secondary">
              Explore our design catalog
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full" overflow="hidden">
            {currentDesign !== null && hasImage(currentDesign) && (
              <DesignCarousel
                design={currentDesign}
                sizes={{ base: '100%', md: ['1500px', 2] }}
                shouldMirror
              />
            )}
          </Box>
        </LandingRow>
      </Box>
      {nextDesign !== null && nextDesign.image !== null && (
        // eagerly load the next design
        <Image
          type="local"
          priority
          unoptimized
          src={nextDesign.image}
          alt={nextDesign.label}
          sizes={{ base: '100%', md: ['1500px', 2] }}
          css={{ display: 'none' }}
        />
      )}
    </LandingSection>
  )
}

// "Stilts" → "" / "Bench" → "a " / "Office" → "a " (intentionally not "an "
// because the legacy didn't either — keeps parity with the original copy).
function getArticle(label: string): string {
  const lastWord = label.split(' ').at(-1) ?? ''
  if (lastWord === '') return ''
  return pluralize.isPlural(lastWord) ? '' : 'a '
}

// The site's design index may lack a picture (272613135119, the designs
// record's); DesignCarousel takes a design that has one, as legacy's did.
function hasImage(
  design: DesignIndexEntry,
): design is DesignIndexEntry & { image: StaticImageData } {
  return design.image !== null
}
