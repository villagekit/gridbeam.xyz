'use client'

import { Box, Button, Flex, Heading, Tabs, Text, VStack } from '@villagekit/ui'
import {
  type ReactNode,
  type Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface CatalogueItemTab {
  key: string
  label: string
  content: ReactNode
}

export interface CatalogueItemAction {
  label: string
  /** Tab key to navigate to when the action is clicked. */
  navigateToTab: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: ReactNode
}

export interface CatalogueItemProps {
  /** Item heading shown above the controls on desktop, above the preview on mobile. */
  title: string
  /** Subtitle / description shown beneath the heading. */
  description?: string
  /** Large preview area on the left (typically a 3D viewer or image). */
  preview: ReactNode
  /** Right-column content (e.g. parameter controls + product info). */
  controls?: ReactNode
  /** Optional CTA below the controls; clicking it scrolls + activates a tab. */
  action?: CatalogueItemAction
  /** At least the `overview` tab is conventionally first. */
  tabs: ReadonlyArray<CatalogueItemTab>
  /** Initial tab key. Defaults to the first tab. */
  defaultTab?: string
}

export interface CatalogueItemHandle {
  navigateToTab: (key: string) => void
}

const CatalogueItemFn = (props: CatalogueItemProps, ref: Ref<CatalogueItemHandle>) => {
  const { title, description, preview, controls, action, tabs, defaultTab } = props

  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultTab ?? tabs[0]?.key ?? '')

  const navigateToTab = useCallback(
    (key: string) => {
      if (!tabs.some((t) => t.key === key)) return
      setActiveTab(key)
      // Defer to let the tab content mount before scrolling.
      requestAnimationFrame(() => {
        tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [tabs],
  )

  useImperativeHandle(ref, () => ({ navigateToTab }), [navigateToTab])

  const handleAction = useCallback(() => {
    if (action != null) navigateToTab(action.navigateToTab)
  }, [action, navigateToTab])

  const heading = (
    <VStack alignItems={{ base: 'center', lg: 'flex-start' }} gap="2">
      <Heading as="h1" size={{ base: 'xl', md: '2xl' }} textAlign={{ base: 'center', lg: 'left' }}>
        {title}
      </Heading>
      {description != null && (
        <Text variant="secondary" textAlign={{ base: 'center', lg: 'left' }}>
          {description}
        </Text>
      )}
    </VStack>
  )

  return (
    <VStack alignItems="stretch" gap={{ base: 6, lg: 12 }}>
      {/* Mobile/tablet: heading above the preview. */}
      <Box display={{ base: 'block', lg: 'none' }}>{heading}</Box>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 10 }}
        alignItems={{ base: 'stretch', lg: 'flex-start' }}
      >
        <Box
          flex={{ base: 'none', lg: '0 0 60%' }}
          w={{ base: 'full', lg: '60%' }}
          aspectRatio={{ base: '4 / 3', lg: '4 / 3' }}
          minH={{ base: '320px', md: '400px' }}
        >
          {preview}
        </Box>

        <Flex
          direction="column"
          flex="1"
          gap="6"
          justifyContent="space-between"
          minW="0"
          alignSelf="stretch"
        >
          <VStack alignItems="stretch" gap="6" flex="1">
            <Box display={{ base: 'none', lg: 'block' }}>{heading}</Box>
            {controls}
          </VStack>

          {action != null && (
            <Flex justifyContent="center">
              <Button
                onClick={handleAction}
                variant={action.variant ?? 'secondary'}
                w="full"
                maxW="md"
              >
                {action.icon}
                {action.label}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Box ref={tabsRef} scrollMarginTop="20">
        <Tabs.Root
          size="lg"
          lazyMount
          value={activeTab}
          onValueChange={({ value }) => setActiveTab(value)}
        >
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Trigger key={tab.key} value={tab.key}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map((tab) => (
            <Tabs.Content key={tab.key} value={tab.key}>
              <VStack alignItems="stretch" gap="4">
                {tab.content}
              </VStack>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Box>
    </VStack>
  )
}

export const CatalogueItem = forwardRef(CatalogueItemFn)
