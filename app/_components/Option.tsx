// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/option.tsx
'use client'

import { Badge } from '@villagekit/ui'
import { type KeyboardEvent, useCallback } from 'react'

interface OptionProps<T> {
  label: string
  value: T
  isSelected: boolean
  colorScheme?: string
  size?: 'sm' | 'md' | 'lg'
  onClick: (value: T) => void
}

export function Option<T>(props: OptionProps<T>) {
  const { label, value, isSelected, colorScheme = 'gray', size = 'md', onClick } = props

  const handleClick = useCallback(() => {
    onClick(value)
  }, [onClick, value])

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        onClick(value)
      }
    },
    [onClick, value],
  )

  return (
    <Badge
      // biome-ignore lint/a11y/useSemanticElements:
      role="option"
      tabIndex={0}
      css={{
        _hover: {
          backgroundColor: `${colorScheme}.100`,
          borderColor: `${colorScheme}.300`,
          transform: 'scale(1.05)',
        },

        _active: {
          transform: 'scale(1)',
        },

        _focus: {
          boxShadow: 'outline',
          outline: 'none',
        },

        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        cursor: 'pointer',
        fontSize: size,
        fontWeight: 'normal',
        paddingX: 2,
        transitionDuration: 'fast',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',

        ...(isSelected
          ? {
              backgroundColor: `${colorScheme}.50`,
              borderColor: `${colorScheme}.200`,
            }
          : {}),
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </Badge>
  )
}
