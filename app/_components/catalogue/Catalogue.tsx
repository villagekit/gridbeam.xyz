'use client'

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@villagekit/ui'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

import { ItemCard } from './ItemCard'
import { type CatalogueItemData, SORT_OPTIONS, type SortOption } from './types'

const ALL_FILTER = 'all'
const SEARCH_PARAM = 'q'
const FILTER_PARAM = 'f'
const SORT_PARAM = 's'
const SEARCH_DEBOUNCE_MS = 250

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    transition: { duration: 0.3, ease: 'easeOut', type: 'tween' },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeIn', type: 'tween' },
  },
}

export interface CatalogueProps<Tag extends string> {
  items: ReadonlyArray<CatalogueItemData<Tag>>
  /** Ordered map of tag → label, in the order they should appear. */
  filterOptions: Record<Tag, string>
  /** e.g. "designs" — used in empty-state copy and aria labels. */
  itemLabel: string
  /** URL prefix for item detail pages. e.g. "designs" → "/designs/<id>". */
  basePath: string
  /** Optional message shown after the last result (e.g. "Your designs here ✨"). */
  listMessage?: ReactNode
  searchPlaceholder?: string
}

export function Catalogue<Tag extends string>(props: CatalogueProps<Tag>) {
  const {
    items,
    filterOptions,
    itemLabel,
    basePath,
    listMessage,
    searchPlaceholder = 'Search…',
  } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  const urlFilter = (searchParams.get(FILTER_PARAM) ?? ALL_FILTER) as Tag | typeof ALL_FILTER
  const urlSort = (searchParams.get(SORT_PARAM) ?? 'name-asc') as SortOption
  const urlSearch = searchParams.get(SEARCH_PARAM) ?? ''

  const filter: Tag | typeof ALL_FILTER =
    urlFilter === ALL_FILTER || urlFilter in filterOptions ? urlFilter : ALL_FILTER
  const sort: SortOption = urlSort in SORT_OPTIONS ? urlSort : 'name-asc'

  const [search, setSearch] = useState(urlSearch)
  // Re-sync local search if the URL changed underneath us (back/forward, reset).
  useEffect(() => {
    setSearch(urlSearch)
  }, [urlSearch])

  const updateUrl = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(queryString)
      mutate(next)
      const qs = next.toString()
      const url = qs ? `?${qs}` : window.location.pathname
      router.replace(url, { scroll: false })
    },
    [queryString, router],
  )

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(
    () => () => {
      if (debounceRef.current != null) clearTimeout(debounceRef.current)
    },
    [],
  )

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setSearch(value)
      if (debounceRef.current != null) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        updateUrl((next) => {
          if (value.length === 0) next.delete(SEARCH_PARAM)
          else next.set(SEARCH_PARAM, value)
        })
      }, SEARCH_DEBOUNCE_MS)
    },
    [updateUrl],
  )

  const handleSearchClear = useCallback(() => {
    setSearch('')
    if (debounceRef.current != null) clearTimeout(debounceRef.current)
    updateUrl((next) => next.delete(SEARCH_PARAM))
  }, [updateUrl])

  const handleFilterChange = useCallback(
    (value: Tag | typeof ALL_FILTER) => {
      updateUrl((next) => {
        if (value === ALL_FILTER) next.delete(FILTER_PARAM)
        else next.set(FILTER_PARAM, value)
      })
    },
    [updateUrl],
  )

  const handleSortChange = useCallback(
    (value: SortOption) => {
      updateUrl((next) => {
        if (value === 'name-asc') next.delete(SORT_PARAM)
        else next.set(SORT_PARAM, value)
      })
    },
    [updateUrl],
  )

  const handleReset = useCallback(() => {
    setSearch('')
    if (debounceRef.current != null) clearTimeout(debounceRef.current)
    router.replace(window.location.pathname, { scroll: false })
  }, [router])

  const filteredItems = useMemo(() => {
    const filtered =
      filter === ALL_FILTER
        ? [...items]
        : items.filter((item) => item.categories.includes(filter as Tag))
    const searched =
      search.length === 0
        ? filtered
        : filtered.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    const sorted = [...searched].sort((a, b) => a.name.localeCompare(b.name))
    return sort === 'name-desc' ? sorted.reverse() : sorted
  }, [items, filter, search, sort])

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      gap={{ base: 6, lg: 12, xl: 16 }}
      alignItems={{ base: 'stretch', lg: 'flex-start' }}
      w="full"
    >
      {/* LEFT SIDEBAR — categories on lg+, plus sort below them at lg only. */}
      <VStack
        as="aside"
        alignItems="flex-start"
        gap="8"
        display={{ base: 'none', lg: 'flex' }}
        w="9rem"
        flexShrink={0}
      >
        <OptionGroup
          id="catalogue-filter"
          title={filterOptions ? 'Categories' : 'Category'}
          options={[
            [ALL_FILTER, `All ${itemLabel}`] as const,
            ...(Object.entries(filterOptions) as Array<[Tag, string]>),
          ]}
          selected={filter}
          onChange={handleFilterChange}
        />
        {/* Sort sits in the left sidebar at lg, moves to the right column at xl+. */}
        <Box display={{ base: 'block', xl: 'none' }} w="full">
          <OptionGroup
            id="catalogue-sort-left"
            title="Sort by"
            options={Object.entries(SORT_OPTIONS) as Array<[SortOption, string]>}
            selected={sort}
            onChange={handleSortChange}
          />
        </Box>
      </VStack>

      {/* MAIN COLUMN — search + grid. */}
      <VStack alignItems="stretch" gap="6" flex="1" minW="0">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 3, md: 6 }}
          alignItems={{ base: 'stretch', md: 'center' }}
          px={{ base: 0, lg: 4 }}
        >
          <SearchBar
            search={search}
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
            placeholder={searchPlaceholder}
            itemLabel={itemLabel}
          />
          <ResultsCount count={filteredItems.length} itemLabel={itemLabel} />
        </Flex>

        {/* Mobile/tablet inline controls — selects for category & sort. */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <Flex direction={{ base: 'column', sm: 'row' }} gap="3">
            <CategorySelect
              options={filterOptions}
              selected={filter}
              onChange={handleFilterChange}
              itemLabel={itemLabel}
            />
            <SortSelect sort={sort} onSortChange={handleSortChange} itemLabel={itemLabel} />
          </Flex>
        </Box>

        {filteredItems.length === 0 ? (
          <EmptyState itemLabel={itemLabel} onReset={handleReset} />
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={{ base: 6, md: 8 }}>
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ minWidth: 0 }}
                >
                  <ItemCard item={item} basePath={basePath} />
                </motion.div>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        )}

        {filteredItems.length > 0 && listMessage != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.5, duration: 0.3, ease: 'easeIn', type: 'tween' },
            }}
          >
            <Text variant="tertiary" textAlign="center" pt="8" fontSize="lg">
              {listMessage}
            </Text>
          </motion.div>
        )}
      </VStack>

      {/* RIGHT SIDEBAR — sort, only at xl+ to mirror the legacy 3-column shape. */}
      <Box display={{ base: 'none', xl: 'block' }} w="9rem" flexShrink={0}>
        <OptionGroup
          id="catalogue-sort-right"
          title="Sort by"
          options={Object.entries(SORT_OPTIONS) as Array<[SortOption, string]>}
          selected={sort}
          onChange={handleSortChange}
        />
      </Box>
    </Flex>
  )
}

interface OptionGroupProps<T extends string> {
  id: string
  title: string
  options: ReadonlyArray<readonly [T, string]>
  selected: T
  onChange: (value: T) => void
}

function OptionGroup<T extends string>(props: OptionGroupProps<T>) {
  const { id, title, options, selected, onChange } = props
  const titleId = `${id}-label`

  return (
    <Box w="full">
      <Heading id={titleId} as="h2" size="md" mb="4">
        {title}
      </Heading>
      <VStack role="radiogroup" aria-labelledby={titleId} alignItems="flex-start" gap="1">
        {options.map(([value, label]) => (
          <Option
            key={value}
            label={label}
            selected={selected === value}
            onSelect={() => onChange(value)}
          />
        ))}
      </VStack>
    </Box>
  )
}

interface OptionProps {
  label: string
  selected: boolean
  onSelect: () => void
}

function Option(props: OptionProps) {
  const { label, selected, onSelect } = props

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect()
      }
    },
    [onSelect],
  )

  return (
    <Badge
      // biome-ignore lint/a11y/useSemanticElements: styled clickable option inside a radiogroup; the visual is a text badge, not a native input
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      bg={selected ? 'gray.50' : 'transparent'}
      borderColor={selected ? 'gray.200' : 'transparent'}
      borderStyle="solid"
      borderWidth="2px"
      borderRadius="md"
      color="gray.800"
      cursor="pointer"
      fontSize="lg"
      fontWeight="normal"
      px="2"
      py="0.5"
      userSelect="none"
      transitionDuration="fast"
      transitionProperty="background-color, border-color, transform"
      _hover={{
        bg: 'gray.100',
        borderColor: 'gray.300',
        transform: 'scale(1.05)',
      }}
      _active={{ transform: 'scale(1)' }}
      _focus={{ outline: 'none', boxShadow: 'outline' }}
      WebkitTapHighlightColor="transparent"
    >
      {label}
    </Badge>
  )
}

interface SearchBarProps {
  search: string
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchClear: () => void
  placeholder: string
  itemLabel: string
}

function SearchBar(props: SearchBarProps) {
  const { search, onSearchChange, onSearchClear, placeholder, itemLabel } = props

  return (
    <Box position="relative" flex="1">
      <Input
        type="search"
        value={search}
        onChange={onSearchChange}
        placeholder={placeholder}
        aria-label={`Search ${itemLabel}`}
        size="lg"
        bg="white"
        pr="12"
      />
      <Flex
        position="absolute"
        top="0"
        right="2"
        h="full"
        alignItems="center"
        pointerEvents={search.length > 0 ? 'auto' : 'none'}
      >
        {search.length > 0 ? (
          <IconButton title="Clear search" variant="toolbar" size="sm" onClick={onSearchClear}>
            <Icon as={FaTimes} boxSize="5" />
          </IconButton>
        ) : (
          <Icon as={FaSearch} role="presentation" color="gray.700" boxSize="5" mr="2" />
        )}
      </Flex>
    </Box>
  )
}

interface ResultsCountProps {
  count: number
  itemLabel: string
}

function ResultsCount(props: ResultsCountProps) {
  const { count, itemLabel } = props
  return (
    <Text variant="tertiary" fontSize="md" aria-live="polite" whiteSpace="nowrap">
      {count} {count === 1 ? itemLabel.replace(/s$/, '') : itemLabel} found
    </Text>
  )
}

interface CategorySelectProps<Tag extends string> {
  options: Record<Tag, string>
  selected: Tag | typeof ALL_FILTER
  onChange: (next: Tag | typeof ALL_FILTER) => void
  itemLabel: string
}

function CategorySelect<Tag extends string>(props: CategorySelectProps<Tag>) {
  const { options, selected, onChange, itemLabel } = props

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value as Tag | typeof ALL_FILTER)
    },
    [onChange],
  )

  return (
    <Select.Root size="md" w="full" flex="1">
      <Select.Field
        value={selected}
        onChange={handleChange}
        aria-label={`Filter ${itemLabel} by category`}
        bg="white"
      >
        <option value={ALL_FILTER}>All {itemLabel}</option>
        {(Object.entries(options) as Array<[Tag, string]>).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select.Field>
      <Select.Indicator />
    </Select.Root>
  )
}

interface SortSelectProps {
  sort: SortOption
  onSortChange: (next: SortOption) => void
  itemLabel: string
}

function SortSelect(props: SortSelectProps) {
  const { sort, onSortChange, itemLabel } = props

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onSortChange(event.target.value as SortOption)
    },
    [onSortChange],
  )

  return (
    <Select.Root size="md" w="full" flex="1">
      <Select.Field
        value={sort}
        onChange={handleChange}
        aria-label={`Sort ${itemLabel}`}
        bg="white"
      >
        {(Object.entries(SORT_OPTIONS) as Array<[SortOption, string]>).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select.Field>
      <Select.Indicator />
    </Select.Root>
  )
}

interface EmptyStateProps {
  itemLabel: string
  onReset: () => void
}

function EmptyState(props: EmptyStateProps) {
  const { itemLabel, onReset } = props
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeIn', type: 'tween' } }}
    >
      <VStack gap="4" py="16" textAlign="center">
        <Text fontSize={{ base: 'lg', md: 'xl' }}>
          We couldn’t find any {itemLabel} that match your search.
        </Text>
        <Text variant="tertiary" fontSize={{ base: 'md', md: 'lg' }}>
          Try a different keyword or category, or hit reset.
        </Text>
        <Button variant="secondary" onClick={onReset} maxW="sm">
          <Icon as={FaTimes} boxSize="5" />
          Reset
        </Button>
      </VStack>
    </motion.div>
  )
}
