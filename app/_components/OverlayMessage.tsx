// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/overlay-message.tsx
import { Box, Text } from '@villagekit/ui'
import type React from 'react'

interface OverlayMessageProps {
  showMessage: boolean
  message?: string
  children: React.ReactNode
}

/** Wraps its children and, when `showMessage` is set and a message is given, centers the message over them. */
export function OverlayMessage(props: OverlayMessageProps) {
  const { showMessage, message, children } = props

  return (
    <Box css={{ position: 'relative' }}>
      {children}

      {showMessage && message != null && (
        <Text
          // Note(cc): neither the ui theme nor Chakra v3's scale defines `3xs` (v3 starts at `2xs`), so at `base` the browser's default font size applies if the overlay ever shows.
          fontSize={{ base: '3xs', sm: 'xs' }}
          css={{
            backgroundColor: 'primary.400',
            color: 'white',
            fontFamily: 'heading',
            left: '50%',
            padding: 2,
            position: 'absolute',
            textAlign: 'center',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
          }}
        >
          {message}
        </Text>
      )}
    </Box>
  )
}
