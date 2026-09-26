// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-image-carousel.tsx
'use client'

import { ImageCarousel, type ImageCarouselProps } from '../ImageCarousel'
import { MediaContainer, useMediaMaxWidthBreakpoints } from './media'

interface StoryImageCarouselProps extends Optional<ImageCarouselProps, 'sizes'> {
  isInColumn?: boolean
  aspectRatio?: string
}

export function StoryImageCarousel(props: StoryImageCarouselProps) {
  const { isInColumn = false, aspectRatio } = props

  const maxWidthBreakpoints = useMediaMaxWidthBreakpoints()

  const sizes = isInColumn
    ? { base: '100%', md: ['1024px', 2] as ['1024px', number] }
    : maxWidthBreakpoints

  return (
    <MediaContainer>
      <ImageCarousel sizes={sizes} slideCss={{ aspectRatio: aspectRatio ?? '4 / 3' }} {...props} />
    </MediaContainer>
  )
}

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
