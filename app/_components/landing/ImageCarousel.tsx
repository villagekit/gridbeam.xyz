'use client'

import { Box, HStack, Icon, IconButton, VisuallyHidden } from '@villagekit/ui'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import NextImage from 'next/image'
import { type KeyboardEvent, useCallback, useEffect, useId, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'

export interface CarouselSlide {
  src: string
  alt: string
  width: number
  height: number
}

export interface ImageCarouselProps {
  ariaLabel: string
  slides: ReadonlyArray<CarouselSlide>
  /** When true, slides advance automatically and arrows / dots are hidden. */
  autoPlay?: boolean
  /** Auto-advance interval in ms. Only used when `autoPlay` is true. */
  autoPlayIntervalMs?: number
  /** Hint to NextImage to give the first slide loading priority. */
  priority?: boolean
  /** Sizes attribute passed through to NextImage. */
  sizes?: string
}

export function ImageCarousel(props: ImageCarouselProps) {
  const {
    ariaLabel,
    slides,
    autoPlay = false,
    autoPlayIntervalMs = 4000,
    priority = false,
    sizes = '(min-width: 1024px) 50vw, 100vw',
  } = props

  const groupId = useId()
  const [index, setIndex] = useState(0)
  const slideCount = slides.length
  const prefersReducedMotion = useReducedMotion() ?? false
  // Reduced-motion users see only the first slide — no autoplay, no
  // cross-fades. They can still hand-navigate via the dots when the carousel
  // is interactive (autoPlay=false).
  const isAutoplayActive = autoPlay && !prefersReducedMotion
  const isInteractive = !autoPlay && slideCount > 1

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slideCount) + slideCount) % slideCount)
    },
    [slideCount],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!isAutoplayActive || slideCount <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount)
    }, autoPlayIntervalMs)
    return () => window.clearInterval(id)
  }, [isAutoplayActive, autoPlayIntervalMs, slideCount])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    },
    [isInteractive, goNext, goPrev],
  )

  const slide = slides[index]
  if (slide == null) return null
  const aspectRatio = `${slide.width} / ${slide.height}`

  return (
    <Box
      as="section"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? 0 : undefined}
      position="relative"
      w="full"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      bg="gray.50"
      css={{
        aspectRatio,
        _focusVisible: { outline: 'none', boxShadow: 'outline' },
      }}
    >
      <Box id={groupId} position="absolute" inset="0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.src}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
          >
            <NextImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={priority && index === 0}
              sizes={sizes}
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Slide {index + 1} of {slideCount}: {slide.alt}
      </VisuallyHidden>

      {isInteractive && (
        <>
          <IconButton
            title="Previous slide"
            variant="tertiary"
            onClick={goPrev}
            position="absolute"
            top="50%"
            left="2"
            transform="translateY(-50%)"
            zIndex="1"
          >
            <Icon as={FaChevronLeft} boxSize="5" />
          </IconButton>
          <IconButton
            title="Next slide"
            variant="tertiary"
            onClick={goNext}
            position="absolute"
            top="50%"
            right="2"
            transform="translateY(-50%)"
            zIndex="1"
          >
            <Icon as={FaChevronRight} boxSize="5" />
          </IconButton>

          <HStack
            position="absolute"
            bottom="3"
            left="0"
            right="0"
            justifyContent="center"
            gap="2"
            zIndex="1"
          >
            {slides.map((s, i) => (
              <IconButton
                key={s.src}
                title={i === index ? `Slide ${i + 1} (current)` : `Go to slide ${i + 1}`}
                variant="tertiary"
                size="xs"
                onClick={() => goTo(i)}
                bg="transparent"
                minW="auto"
                w="5"
                h="5"
              >
                <Icon
                  as={FaCircle}
                  boxSize="3"
                  color={i === index ? 'primary.500' : 'whiteAlpha.700'}
                  css={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.4))' }}
                />
              </IconButton>
            ))}
          </HStack>
        </>
      )}
    </Box>
  )
}
