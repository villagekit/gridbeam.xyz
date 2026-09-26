// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-image.tsx
'use client'

import {
  type ImagePropsWithOptionalSizes,
  type SystemStyleObject,
  useIsInColumn,
} from '@villagekit/ui'

import { Image } from './media'

type StoryImageProps = ImagePropsWithOptionalSizes

export function StoryImage(props: StoryImageProps) {
  const aspectRatio = 'standard'
  const baseCss: SystemStyleObject = {
    borderRadius: 'xl',
    boxShadow: 'md',
    objectFit: 'cover',
  }

  const isInColumn = useIsInColumn()

  if (props.type === 'svg') {
    const { type, css, ...rest } = props
    return <Image type={type} aspectRatio={aspectRatio} {...rest} css={[baseCss, css]} />
  }
  const { css, ...rest } = props

  const extraProps: Record<string, any> = {}
  if (isInColumn) {
    // NOTE (mw): if we pass an undefined `sizes`, it will override child components,
    //   when we'd rather use the child's default value.
    extraProps.sizes = {
      base: '100%',
      md: ['1024px', 2] as ['1024px', number],
    }
  }

  return <Image aspectRatio={aspectRatio} {...extraProps} {...rest} css={[baseCss, css]} />
}
