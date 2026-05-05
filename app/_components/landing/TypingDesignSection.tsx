'use client'

import { Box, Heading, LinkButton, Span, Text, VisuallyHidden } from '@villagekit/ui'
import { motion, useInView, useReducedMotion } from 'motion/react'
import NextImage from 'next/image'
import pluralize from 'pluralize-esm'
import { useRef } from 'react'

import type { DesignIndexEntry } from '../../_lib/designs'
import { LandingColumn, LandingRow, LandingSection } from './LandingSection'
import { useDesignTypingEffect } from './useDesignTypingEffect'

interface TypingDesignSectionProps {
  index: number
  designs: ReadonlyArray<DesignIndexEntry>
}

export function TypingDesignSection(props: TypingDesignSectionProps) {
  const { index, designs } = props

  const ref = useRef<HTMLDivElement>(null)
  // Pauses the typing-effect timer (and the live-region announcements) when
  // the section is offscreen. Honour `prefers-reduced-motion` too — the
  // continuous keystroke + image-zoom effect is exactly what motion-sensitive
  // users avoid, so we render the static current label instead.
  const isInView = useInView(ref)
  const prefersReducedMotion = useReducedMotion() ?? false

  const [currentDesign, typedLabel] = useDesignTypingEffect({
    designs,
    loop: true,
    pause: !isInView || prefersReducedMotion,
  })

  const article = getArticle(currentDesign?.label ?? '')
  // When motion is reduced, show the full label — the typing effect is
  // suppressed but the section still reads as "Build a [design]".
  const displayLabel = prefersReducedMotion ? (currentDesign?.label ?? '') : typedLabel

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
              <Span color="accentA.500">{displayLabel}</Span>
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Imagine, build, and rebuild — Grid Beam evolves with your life. From practical
              furniture to fun family projects, our designs are simple to make and can fit any
              space.
            </Text>

            <LinkButton href="/designs" variant="secondary">
              Explore the design catalogue
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full" overflow="hidden">
            {currentDesign !== null && currentDesign.image !== null && (
              <DesignCarouselImage
                src={currentDesign.image.src}
                alt={currentDesign.label}
                shouldMirror
                prefersReducedMotion={prefersReducedMotion}
              />
            )}
          </Box>
        </LandingRow>
      </Box>
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

interface DesignCarouselImageProps {
  src: string
  alt: string
  shouldMirror?: boolean
  prefersReducedMotion?: boolean
}

function DesignCarouselImage(props: DesignCarouselImageProps) {
  const { src, alt, shouldMirror = false, prefersReducedMotion = false } = props

  // motion.key drives the cross-fade + zoom-in animation each time the image
  // src changes — same shape as the legacy `DesignCarousel` (Web Animations
  // API) but expressed via Framer Motion since it's already in the bundle.
  // Reduced-motion users get a plain swap with no animation.
  const initial = prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }
  const animate = { opacity: 1, scale: 1 }
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        opacity: { duration: 0.6, ease: 'easeOut' as const },
        scale: { duration: 1.2, ease: [0.33, 1, 0.68, 1] as const },
      }

  return (
    <Box display="flex" justifyContent="center" h="full" w="full">
      <Box aspectRatio="4 / 3" w="full" position="relative">
        <motion.div
          key={src}
          initial={initial}
          animate={animate}
          transition={transition}
          style={{
            position: 'absolute',
            inset: 0,
            transform: shouldMirror ? 'scaleX(-1)' : undefined,
          }}
        >
          <NextImage
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
      </Box>
    </Box>
  )
}
