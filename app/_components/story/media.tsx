// stand-in for @villagekit/ui/mdx's MediaContainer, useMediaMaxWidthBreakpoints, Image and Video (in the sibling ../ui at 1c3e3e8, not in the published 1.2.0: difference d750c0a47839) until the operator's publish
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/MediaContainer.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/Image.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/Video.tsx
'use client'

import {
  Image as BaseImage,
  type ImagePropsWithOptionalSizes as BaseImageProps,
  Video as BaseVideo,
  type VideoProps as BaseVideoProps,
  Center,
  useBreakpointValue,
  useConst,
} from '@villagekit/ui'
import type React from 'react'

export interface MediaContainerProps {
  children: React.ReactNode
}

export function MediaContainer(props: MediaContainerProps) {
  const { children } = props

  const maxWBreakpoints = useMediaMaxWidthBreakpoints()
  const maxW = useBreakpointValue(maxWBreakpoints)

  return (
    <Center maxW={maxW} alignSelf="center">
      {children}
    </Center>
  )
}

export function useMediaMaxWidthBreakpoints() {
  return useConst({
    base: 'md',
    md: 'lg',
  } as const)
}

export type ImageProps = BaseImageProps

export function Image(props: ImageProps) {
  const { type } = props

  const maxWidthBreakpoints = useMediaMaxWidthBreakpoints()

  const content =
    type === 'svg' ? <BaseImage {...props} /> : <BaseImage sizes={maxWidthBreakpoints} {...props} />

  return <MediaContainer>{content}</MediaContainer>
}

export type VideoProps = Optional<BaseVideoProps, 'sizes'>

export function Video(props: VideoProps) {
  const maxWidthBreakpoints = useMediaMaxWidthBreakpoints()

  return (
    <MediaContainer>
      <BaseVideo sizes={maxWidthBreakpoints} {...props} />
    </MediaContainer>
  )
}

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
