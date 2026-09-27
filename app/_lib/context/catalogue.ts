// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/context/catalogue.ts
import type { RasterImagePropsWithOptionalSizes } from '@villagekit/ui'
import constate from 'constate'
import { debounce } from 'lodash-es'
import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  type QueryParamConfig,
  StringParam,
  createEnumParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

/** One entry of a catalogue: what the card shows and what the filters and the search read. */
export interface CatalogueItem<FilterOptionType> {
  id: string
  name: string
  categories: Array<FilterOptionType>
  image: RasterImagePropsWithOptionalSizes
  active: boolean
}

/** The props of `Catalogue` and its context provider: the items, the filter table and the labels. */
export interface CatalogueContextProps<
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
> {
  items: Array<ItemType>
  filterOptions: Record<FilterOptionType, string>
  defaultFilterOption: DefaultFilterOptionType
  itemLabel: string
  listPath: string
  listMessage?: React.ReactNode
  itemImageMode?: 'hover-card' | 'full'
  inactiveItemMessage?: string
}

/** The sort options, keyed by the `sort` query value. */
export const sortOptions = {
  name: 'Name (A to Z)',
  nameReverse: 'Name (Z to A)',
}

/** A key of `sortOptions`. */
export type SortOptionType = keyof typeof sortOptions

const sortEnumParam = createEnumParam<SortOptionType>(
  Object.keys(sortOptions) as Array<SortOptionType>,
)

interface CatalogueContextType<
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
> extends CatalogueContextProps<ItemType, FilterOptionType, DefaultFilterOptionType> {
  search: string
  filter: FilterOptionType
  sort: SortOptionType
  setSearch: (search: string) => void
  setFilter: (filter: FilterOptionType) => void
  setSort: (sort: SortOptionType) => void
  onReset: () => void
}

function sortAlphabetically<ItemType extends CatalogueItem<FilterOptionType>, FilterOptionType>(
  items: Array<ItemType>,
) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}

function useCatalogue<
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
>(
  props: CatalogueContextProps<ItemType, FilterOptionType, DefaultFilterOptionType>,
): CatalogueContextType<ItemType, FilterOptionType, DefaultFilterOptionType> {
  const {
    items,
    filterOptions,
    defaultFilterOption,
    itemLabel,
    listPath,
    listMessage,
    itemImageMode = 'hover-card',
    inactiveItemMessage,
  } = props

  const filterEnumParam = useMemo(
    () => createEnumParam<FilterOptionType>(Object.keys(filterOptions) as Array<FilterOptionType>),
    [filterOptions],
  )

  const [query, setQuery] = useQueryParams<{
    search: QueryParamConfig<string>
    filter: QueryParamConfig<FilterOptionType>
    sort: QueryParamConfig<SortOptionType>
  }>({
    search: withDefault(StringParam, ''),
    // @ts-ignore TODO: not sure how to solve this right now
    filter: withDefault(filterEnumParam, defaultFilterOption),
    sort: withDefault(sortEnumParam, 'name' as const),
  })

  const { search: querySearch, filter, sort } = query

  const [search, setLocalSearch] = useState(querySearch)

  useEffect(() => {
    setLocalSearch(querySearch)
  }, [querySearch])

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'all': {
        return [...items]
      }

      default: {
        return items.filter((item) => item.categories.includes(filter))
      }
    }
  }, [items, filter])

  const searchedItems = useMemo(() => {
    if (search.length === 0) return filteredItems

    return filteredItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  }, [filteredItems, search])

  const sortedItems = useMemo(() => {
    switch (sort) {
      case 'name': {
        return sortAlphabetically(searchedItems)
      }
      case 'nameReverse': {
        return sortAlphabetically(searchedItems).reverse()
      }
    }
  }, [searchedItems, sort])

  const setSearchDebounced = useMemo(
    () =>
      debounce((value: string) => setQuery({ search: value }), 1000, {
        leading: false,
      }),
    [setQuery],
  )

  const setSearch = useCallback(
    (value: string) => {
      setLocalSearch(value)
      setSearchDebounced(value)
    },
    [setSearchDebounced],
  )

  const setFilter = useCallback(
    (value: FilterOptionType) => {
      setQuery({ filter: value })
    },
    [setQuery],
  )

  const setSort = useCallback(
    (value: SortOptionType) => {
      setQuery({ sort: value })
    },
    [setQuery],
  )

  const onReset = useCallback(() => {
    setQuery({
      search: '',
      filter: defaultFilterOption,
      sort: 'name',
    })
  }, [defaultFilterOption, setQuery])

  return {
    items: sortedItems,
    filterOptions,
    defaultFilterOption,
    itemLabel,
    listPath,
    listMessage,
    itemImageMode,
    inactiveItemMessage,
    search,
    filter,
    sort,
    setSearch,
    setFilter,
    setSort,
    onReset,
  }
}

// NB: constate does not support passing type generics so need to explicitly cast these exports
// Ref: https://github.com/diegohaz/constate/issues/110

// @ts-ignore
const [CatalogueContextProvider, _useCatalogueContext] = constate(useCatalogue)

export { CatalogueContextProvider }

/** Reads the catalogue's state and setters from the nearest `CatalogueContextProvider`. */
export const useCatalogueContext = _useCatalogueContext as <
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
>() => CatalogueContextType<ItemType, FilterOptionType, DefaultFilterOptionType>
