// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/logo/svg.tsx
import { Box, type BoxProps } from '@villagekit/ui'

import Content from '@/app/icon.svg'

export interface LogoSvgProps extends BoxProps {
  size: BoxProps['width']
}

export function LogoSvg(props: LogoSvgProps) {
  const { size } = props

  return (
    <Box width={size} height={size} {...props}>
      <Content role="img" aria-label="Grid Beam logo" width="100%" height="100%" />
    </Box>
  )
}
