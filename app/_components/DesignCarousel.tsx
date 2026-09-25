// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/carousel.tsx
'use client'

import { Box, Image, type LocalImageProps } from '@villagekit/ui'
import type { StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { DesignIndexEntry } from '../_lib/designs'

interface DesignCarouselProps {
  design: DesignIndexEntry & { image: StaticImageData }
  sizes: LocalImageProps['sizes']
  shouldMirror?: boolean
}

export function DesignCarousel(props: DesignCarouselProps) {
  const { design, sizes, shouldMirror = false } = props

  const fadeBoxRef = useRef<HTMLDivElement>(null)
  const zoomBoxRef = useRef<HTMLDivElement>(null)

  const [image, setImage] = useState(getDesignImage(design))

  useEffect(() => {
    const fadeBox = fadeBoxRef.current
    const zoomBox = zoomBoxRef.current
    if (fadeBox == null || zoomBox == null) return

    const fadeOut = fadeBox.animate(
      {
        opacity: [1, 0],
      },
      {
        duration: 100,
        easing: 'ease-in',
        fill: 'forwards',
      },
    )

    fadeOut.finished.then(() => {
      setImage(getDesignImage(design))
    })
  }, [design])

  const handleImageLoaded = useCallback(() => {
    const fadeBox = fadeBoxRef.current
    const zoomBox = zoomBoxRef.current
    if (fadeBox == null || zoomBox == null) return

    fadeBox.animate(
      {
        opacity: [0, 1],
      },
      {
        duration: 1500,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
    zoomBox.animate(
      {
        scale: [0.8, 1],
      },
      {
        duration: 2000,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        fill: 'forwards',
      },
    )
  }, [])

  return (
    <Box
      ref={fadeBoxRef}
      css={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        ref={zoomBoxRef}
        css={{
          aspectRatio: '4 / 3',
        }}
      >
        <Image
          type="local"
          priority
          unoptimized
          {...image}
          sizes={sizes}
          css={
            shouldMirror
              ? {
                  transform: 'scaleX(-1)',
                }
              : {}
          }
          onLoad={handleImageLoaded}
        />
      </Box>
    </Box>
  )
}

// Legacy's design index carried the image as a LocalImageProps object with
// the design's label as its alt (packages/designs/src/index.ts, getDesignImage);
// the site's DesignIndexEntry holds the StaticImageData alone, so the pair is
// built here and held in state together, as legacy held the object.
function getDesignImage(
  design: DesignCarouselProps['design'],
): Pick<LocalImageProps, 'src' | 'alt'> {
  return { alt: design.label, src: design.image }
}
