// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue-item/catalogue-item.tsx
'use client'

import { capitalize } from 'lodash-es'
import type React from 'react'
import { type Ref, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import {
  Button,
  Container,
  Flex,
  Heading,
  HoverCard,
  Stack,
  Tabs,
  VStack,
  useIsMobile,
  useTopNavHeight,
} from '@villagekit/ui'

import { Tip } from '@/app/_components/Tip'

type BaseItemType = {
  id: string
  name: string
  description: string
}

interface CatalogueItemProps<ItemType extends BaseItemType> {
  item: ItemType
  preview: React.ReactNode
  controls: React.ReactNode
  buttonComponent?: React.FC
  buttonProps: any
  tip?: React.ReactNode
  tabs: Record<string, React.ReactNode> & { overview: React.ReactNode }
  itemImageMode?: 'hover-card' | 'full'
}

/** What a parent holds through the ref: a jump to one of the item's tabs by its key. */
export type CatalogueItemRef = {
  navigateToTab: (key: string) => void
}

const CatalogueItemFn = <ItemType extends BaseItemType>(
  props: CatalogueItemProps<ItemType>,
  ref: Ref<CatalogueItemRef>,
) => {
  const {
    item,
    preview,
    controls,
    buttonComponent: ButtonComponent = Button,
    buttonProps,
    tip,
    tabs,
    itemImageMode = 'hover-card',
  } = props

  const isMobile = useIsMobile()

  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabValue, setTabValue] = useState<string>(Object.keys(tabs)[0] ?? 'overview')
  const handleTabsChange = useCallback(({ value }: { value: string }) => setTabValue(value), [])
  useImperativeHandle(
    ref,
    () => ({
      navigateToTab(key: string) {
        const tabsEl = tabsRef.current
        if (tabsEl == null) return
        if (!Object.keys(tabs).includes(key)) return
        setTabValue(key)
        setTimeout(() => {
          tabsEl.scrollIntoView()
        })
      },
    }),
    [tabs],
  )

  const topNavHeight = useTopNavHeight()
  const scrollMarginTop = topNavHeight

  const heading = <Heading css={{ textTransform: 'capitalize' }}>{item.name}</Heading>

  return (
    <Container maxW="6xl">
      <VStack gap={{ base: 4, lg: 12 }} alignItems="stretch">
        {isMobile && heading}

        <Stack
          direction={isMobile ? 'column' : 'row'}
          gap={{ base: 8, lg: 12 }}
          alignItems="stretch"
          justifyContent="center"
        >
          <Flex
            alignSelf="center"
            css={{
              aspectRatio: isMobile ? undefined : '4 / 3',
              ...(isMobile ? { height: 256, maxWidth: '100%', width: '100%' } : { width: '60%' }),
            }}
          >
            {itemImageMode === 'hover-card' ? (
              <HoverCard
                isHoverable={false}
                css={{
                  WebkitTapHighlightColor: 'transparent',
                  cursor: 'pointer',
                  height: '100%',
                  width: '100%',
                }}
              >
                {preview}
              </HoverCard>
            ) : (
              preview
            )}
          </Flex>
          <Flex direction="column" justifyContent="space-between" css={{ flex: 1 }}>
            <VStack alignItems="flex-start" gap="4" css={{ height: '100%' }}>
              {!isMobile && heading}

              {controls}
            </VStack>

            <Flex justifyContent="center" css={{ marginTop: 8 }}>
              <ButtonComponent {...buttonProps} css={{ maxWidth: 'md', width: '100%' }} />
            </Flex>
          </Flex>
        </Stack>

        {tip != null && <Tip>{tip}</Tip>}

        <Tabs.Root
          size="lg"
          lazyMount
          unmountOnExit
          value={tabValue}
          onValueChange={handleTabsChange}
          ref={tabsRef}
          css={{ scrollMarginTop }}
        >
          <Tabs.List>
            {Object.keys(tabs).map((tab) => (
              <Tabs.Trigger key={tab} value={tab}>
                {capitalize(tab)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {Object.entries(tabs).map(([tab, tabContent]) => (
            <Tabs.Content key={tab} value={tab}>
              <VStack alignItems="flex-start" gap="4">
                {tabContent}
              </VStack>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </VStack>
    </Container>
  )
}

/**
 * One catalogue entry laid out as legacy's design page: the preview beside the controls and the
 * action button, the tip, then the tabs; the ref jumps to a tab and scrolls it under the nav.
 */
export const CatalogueItem = forwardRef(CatalogueItemFn)
