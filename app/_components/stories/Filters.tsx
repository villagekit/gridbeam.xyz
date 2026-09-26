// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/stories/filters.tsx
'use client'

import { HStack, useIsMobile } from '@villagekit/ui'
import { map } from 'lodash-es'

import { type FilterOptionType, filterOptions, useStoriesContext } from '../../_lib/context/stories'
import { StoryCategoryColors } from '../../_lib/stories'
import { Option } from '../Option'

const FilterCategoryColors = {
  ...StoryCategoryColors,
  all: 'accentB',
}

export function Filters() {
  const { filter, setFilter } = useStoriesContext()

  const isMobile = useIsMobile()

  return (
    <HStack
      // NOTE (mw): id here is used for aria-owns reference in parent component.
      id="stories-menu-filters"
      // biome-ignore lint/a11y/useSemanticElements:
      role="listbox"
      alignItems="center"
      gap={isMobile ? 2 : 4}
    >
      {/* Note(cc): the callback's key is narrower than lodash's `string`, so under strictFunctionTypes TypeScript resolves this call to the `iteratee?: object` overload and types the result `boolean[]`; legacy's line has the same hole, and the JSX renders at runtime. */}
      {map(filterOptions, (label: string, value: FilterOptionType) => (
        <Option
          key={value}
          label={label}
          value={value}
          isSelected={filter === value}
          onClick={setFilter}
          size={isMobile ? 'sm' : 'lg'}
          colorScheme={FilterCategoryColors[value]}
        />
      ))}
    </HStack>
  )
}
