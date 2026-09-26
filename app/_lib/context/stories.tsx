// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/context/stories.tsx
import constate from 'constate'
import { useCallback, useMemo } from 'react'
import {
  type QueryParamConfig,
  createEnumParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import { type StoryCategory, type StoryMetadata, allStories } from '../stories'

export type FilterOptionType = 'all' | StoryCategory

export const filterOptions: Record<FilterOptionType, string> = {
  all: 'All',
  // article: 'Articles',
  guide: 'Guides',
  inspiration: 'Inspiration',
  newsletter: 'Newsletters',
}

const filterEnumParam = createEnumParam<FilterOptionType>(
  Object.keys(filterOptions) as Array<FilterOptionType>,
)

interface StoriesContextType {
  stories: Array<StoryMetadata>
  filter: FilterOptionType
  setFilter: (filter: FilterOptionType) => void
}

const sortedStories = allStories.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())

function useStories(): StoriesContextType {
  const [query, setQuery] = useQueryParams<{
    filter: QueryParamConfig<FilterOptionType>
  }>({
    filter: withDefault(filterEnumParam, 'all' as const),
  })

  const { filter } = query

  const filteredStories = useMemo(() => {
    switch (filter) {
      case 'all': {
        return [...sortedStories]
      }

      default: {
        return sortedStories.filter((story) => story.category === filter)
      }
    }
  }, [filter])

  const setFilter = useCallback(
    (value: FilterOptionType) => {
      setQuery({ filter: value })
    },
    [setQuery],
  )

  return {
    stories: filteredStories,
    filter,
    setFilter,
  }
}

export const [StoriesContextProvider, useStoriesContext] = constate(useStories)
