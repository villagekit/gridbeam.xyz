'use client'

import { HStack, SimpleGrid, VStack, chakra } from '@villagekit/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { StoryCard } from '../_components/StoryCard'
import type { StoryCategory, StoryMetadata } from '../_lib/stories'

interface StoriesBrowserProps {
  stories: ReadonlyArray<{ metadata: StoryMetadata }>
}

const ALL_FILTER = 'all'
const FILTER_PARAM = 'f'

type FilterValue = typeof ALL_FILTER | StoryCategory

// Order matters — drives the on-screen chip order. Mirrors the legacy
// `filterOptions` map.
const FILTERS: ReadonlyArray<{ value: FilterValue; label: string; palette: string }> = [
  { value: 'all', label: 'All', palette: 'accentB' },
  { value: 'guide', label: 'Guides', palette: 'accentB' },
  { value: 'newsletter', label: 'Newsletters', palette: 'accentA' },
  { value: 'inspiration', label: 'Inspiration', palette: 'purple' },
]

export function StoriesBrowser(props: StoriesBrowserProps) {
  const { stories } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  const urlFilter = (searchParams.get(FILTER_PARAM) ?? ALL_FILTER) as FilterValue
  const filter: FilterValue = FILTERS.some((f) => f.value === urlFilter) ? urlFilter : ALL_FILTER

  const setFilter = useCallback(
    (next: FilterValue) => {
      const params = new URLSearchParams(queryString)
      if (next === ALL_FILTER) params.delete(FILTER_PARAM)
      else params.set(FILTER_PARAM, next)
      const qs = params.toString()
      const url = qs ? `?${qs}` : window.location.pathname
      router.replace(url, { scroll: false })
    },
    [queryString, router],
  )

  const filteredStories = useMemo(() => {
    if (filter === ALL_FILTER) return stories
    return stories.filter((story) => story.metadata.category === filter)
  }, [stories, filter])

  return (
    <VStack gap={{ base: 6, md: 10 }} alignItems="stretch">
      <HStack
        aria-label="Filter stories by category"
        justifyContent="center"
        gap={{ base: 2, md: 3 }}
        flexWrap="wrap"
      >
        {FILTERS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            palette={option.palette}
            selected={filter === option.value}
            onSelect={() => setFilter(option.value)}
          />
        ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
        {filteredStories.map((story) => (
          <StoryCard key={story.metadata.slug} metadata={story.metadata} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

interface FilterChipProps {
  label: string
  palette: string
  selected: boolean
  onSelect: () => void
}

// Real `<button aria-pressed>` instead of `role="radio"` — toggle semantics
// are a closer match to "set of styled chips with single selection" than a
// true radiogroup, and using a native button gets the keyboard contract
// (Enter/Space) for free without needing the full roving-tabindex +
// arrow-key behaviour an ARIA radiogroup would require.
function FilterChip(props: FilterChipProps) {
  const { label, palette, selected, onSelect } = props

  return (
    <chakra.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      colorPalette={palette}
      bg={selected ? 'colorPalette.50' : 'transparent'}
      borderColor={selected ? 'colorPalette.300' : 'transparent'}
      borderStyle="solid"
      borderWidth="2px"
      borderRadius="md"
      color="gray.800"
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight="normal"
      px="3"
      py="1"
      userSelect="none"
      transitionDuration="fast"
      transitionProperty="background-color, border-color, transform"
      _hover={{
        bg: 'colorPalette.50',
        borderColor: 'colorPalette.300',
        transform: 'scale(1.05)',
      }}
      _active={{ transform: 'scale(1)' }}
      _focusVisible={{ outline: 'none', boxShadow: 'outline' }}
      WebkitTapHighlightColor="transparent"
    >
      {label}
    </chakra.button>
  )
}
