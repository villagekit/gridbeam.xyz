// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/selector.tsx
'use client'

import { Box, Heading, Select, VStack, useIsMobile } from '@villagekit/ui'
import { map } from 'lodash-es'
import { type ChangeEvent, useCallback } from 'react'

import { Option } from '@/app/_components/Option'

interface SelectorProps<SelectorOptionType extends string> {
  id: string
  title: string
  selectedValue: SelectorOptionType
  options: Record<SelectorOptionType, string>
  onChange: (newValue: SelectorOptionType) => void
}

/** A titled group of options: a native select on mobile, a column of option badges otherwise. */
export function Selector<SelectorOptionType extends string>(
  props: SelectorProps<SelectorOptionType>,
) {
  const { id, title, selectedValue, options, onChange } = props

  const isMobile = useIsMobile()

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      onChange(ev.target.value as SelectorOptionType)
    },
    [onChange],
  )

  return (
    <Box
      // biome-ignore lint/a11y/useSemanticElements:
      role="group"
      id={id}
      css={{ width: isMobile ? '100%' : '8rem' }}
    >
      <Heading id={`${id}-label`} size="md" css={{ marginBottom: 4 }}>
        {title}
      </Heading>

      {/* Note(cc): in both branches the callback's key is narrower than lodash's `string`, so under strictFunctionTypes TypeScript resolves the call to the `iteratee?: object` overload and types the result `boolean[]`; legacy's lines have the same hole, and the JSX renders at runtime. */}
      {isMobile ? (
        <Select.Root>
          <Select.Field
            role="menuitem"
            aria-labelledby={`${id}-label`}
            defaultValue={selectedValue}
            onChange={handleChange}
          >
            {map(options, (label: string, value: SelectorOptionType) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select.Field>
          <Select.Indicator />
        </Select.Root>
      ) : (
        <VStack alignItems="flex-start">
          {map(options, (label: string, value: SelectorOptionType) => (
            <Option
              key={value}
              label={label}
              value={value}
              isSelected={value === selectedValue}
              size="lg"
              onClick={onChange}
            />
          ))}
        </VStack>
      )}
    </Box>
  )
}
