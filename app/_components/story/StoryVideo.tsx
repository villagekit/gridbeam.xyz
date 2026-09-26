// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-video.tsx
import { Video, type VideoProps } from './media'

type StoryVideoProps = VideoProps & {
  isInColumn?: boolean
}

export function StoryVideo(props: StoryVideoProps) {
  const { css, isInColumn = false, ...rest } = props

  const extraProps: Record<string, any> = {}
  if (isInColumn) {
    // NOTE (mw): if we pass an undefined `sizes`, it will override child components,
    //   when we'd rather use the child's default value.
    extraProps.sizes = {
      base: '100%',
      md: ['1024px', 2] as ['1024px', number],
    }
  }

  return (
    <Video
      aspectRatio="standard"
      {...rest}
      css={{
        ...css,
        borderRadius: 'xl',
        boxShadow: 'md',
        objectFit: 'cover',
      }}
    />
  )
}
