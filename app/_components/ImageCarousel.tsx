// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/image-carousel.tsx
'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

import {
  Box,
  Icon,
  IconButton,
  RasterImage,
  type RasterImageProps,
  type RasterImagePropsWithOptionalSizes,
  type SystemStyleObject,
} from '@villagekit/ui'
import type React from 'react'
import { useMemo } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'
import { Carousel, type CarouselProps } from 'react-responsive-carousel'

export interface ImageCarouselProps {
  ariaLabel: CarouselProps['ariaLabel']
  slides: Array<RasterImagePropsWithOptionalSizes>
  autoPlayEnabled?: boolean
  slideCss?: SystemStyleObject
  sizes: RasterImageProps['sizes']
  priority?: RasterImageProps['priority']
}

export function ImageCarousel(props: ImageCarouselProps) {
  const { slides, ariaLabel, autoPlayEnabled = false, slideCss, sizes, priority } = props

  const isInteractive = !autoPlayEnabled && slides.length > 1

  return (
    <Box
      css={{
        '& .carousel': {
          borderRadius: 'xl',
          boxShadow: 'md',
          userSelect: 'none',
        },
        '& .carousel-root, & .carousel, & .slider-wrapper, & .slider, & .slide': {
          aspectRatio: slideCss?.aspectRatio,
          height: '100%',
        },
        height: '100%',
        width: '100%',
      }}
    >
      <Carousel
        autoPlay={autoPlayEnabled}
        ariaLabel={ariaLabel}
        emulateTouch={isInteractive}
        infiniteLoop
        interval={4000}
        renderArrowPrev={
          isInteractive
            ? (onClick, _hasPrevious, label) => (
                <ArrowButton direction="prev" label={label} onClick={onClick} />
              )
            : undefined
        }
        renderArrowNext={
          isInteractive
            ? (onClick, _hasNext, label) => (
                <ArrowButton direction="next" label={label} onClick={onClick} />
              )
            : undefined
        }
        renderIndicator={(onClick, isSelected, _index, label) => (
          <Indicator isSelected={isSelected} label={label} onClick={onClick} />
        )}
        showArrows={isInteractive}
        showStatus={false}
        showThumbs={false}
        showIndicators={isInteractive}
        swipeable={isInteractive}
      >
        {slides.map((slide) => (
          <RasterImage
            key={slide.key}
            css={{ height: '100%', objectFit: 'cover', ...slideCss }}
            sizes={sizes}
            priority={priority}
            {...slide}
          />
        ))}
      </Carousel>
    </Box>
  )
}

interface IndicatorProps {
  isSelected: boolean
  label: string
  onClick: (e: React.MouseEvent) => void
}

function Indicator(props: IndicatorProps) {
  const { isSelected, label, onClick } = props

  return (
    <Icon
      aria-label={label}
      as={FaCircle}
      onClick={onClick}
      css={{
        cursor: 'pointer',
        fill: isSelected ? 'primary.400' : 'white',
        marginX: 1,
        opacity: isSelected ? 1 : 0.5,
        transform: 'scale(0.6)',
      }}
    />
  )
}

interface ArrowButtonProps {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
}

function ArrowButton(props: ArrowButtonProps) {
  const { direction, label, onClick } = props

  const icon = useMemo(() => (direction === 'prev' ? FaChevronLeft : FaChevronRight), [direction])

  const directionStyles = useMemo(
    () => (direction === 'prev' ? { left: 2 } : { right: 2 }),
    [direction],
  )

  return (
    <Box
      css={{
        ...directionStyles,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
      }}
    >
      <IconButton title={label} onClick={onClick} variant="tertiary">
        <Icon as={icon} css={{ transform: 'scale(1.5)' }} />
      </IconButton>
    </Box>
  )
}
