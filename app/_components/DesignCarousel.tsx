// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/carousel.tsx
'use client'

import { Box, Image, type LocalImageProps } from '@villagekit/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { DesignIndex } from '../_lib/designs'

interface DesignCarouselProps {
  design: DesignIndex
  sizes: LocalImageProps['sizes']
  shouldMirror?: boolean
}

export function DesignCarousel(props: DesignCarouselProps) {
  const { design, sizes, shouldMirror = false } = props

  const fadeBoxRef = useRef<HTMLDivElement>(null)
  const zoomBoxRef = useRef<HTMLDivElement>(null)

  const [image, setImage] = useState(design.image)

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
      setImage(design.image)
    })
  }, [design.image])

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
