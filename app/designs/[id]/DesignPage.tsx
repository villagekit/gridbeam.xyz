// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/designs/[id].tsx
'use client'

import '@villagekit/part-gridbeam'
import '@villagekit/part-gridbeam/creator'
import '@villagekit/part-gridpanel'
import '@villagekit/part-gridpanel/creator'
import '@villagekit/part-fastener'
import '@villagekit/part-fastener/creator'

import '@villagekit/plugin-smart-fasteners'

import { debounce } from 'lodash-es'
import NextLink from 'next/link'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaList } from 'react-icons/fa'

import { ParamControls, useHasParams, useReloadQueryParams } from '@villagekit/parameters'
import type { PartCreator } from '@villagekit/part'
import { ProductInfo, type ProductMeta, ProductProvider, useProductMeta } from '@villagekit/product'
import { ProductKitContext, ProductKitModule } from '@villagekit/product-kit'
import { Button, Icon, Link, Text, VStack } from '@villagekit/ui'

import { CatalogueItem, type CatalogueItemRef } from '@/app/_components/catalogue-item'
import { DesignViewDynamic, PartsBreakdown } from '@/app/_components/design'
import { type BeamQuota, firstFitDecreasing } from '@/app/tools/cutting-planner/algorithm'
import { CuttingPlannerResult } from '@/app/tools/cutting-planner/components'

interface DesignProps {
  meta: ProductMeta
  code: string
}

/** One design's page: the product provider around the viewer, the controls and the three tabs. */
export function DesignPage(props: DesignProps) {
  const { meta, code } = props

  const onLocationUpdate = useCallback((nextLocation: Location) => {
    // Next patches the History API to keep its router in sync: the app router's shallow replace
    window.history.replaceState(null, '', `${nextLocation.pathname}${nextLocation.search}`)
  }, [])

  return (
    <ProductProvider
      Products={[ProductKitModule]}
      meta={meta}
      code={code}
      onLocationUpdate={onLocationUpdate}
    >
      <Content />
    </ProductProvider>
  )
}

interface ContentProps {}

function Content(_props: ContentProps) {
  const { name, label, description } = useProductMeta()
  const id = name.split('/')[1] ?? name
  const catalogueItem = { description, id, name: label }

  const hasParams = useHasParams()

  // Sync parameter state from URL when backward/forward navigation occurs
  const reloadQueryParams = useReloadQueryParams()
  useEffect(() => {
    const onPopState = () => {
      reloadQueryParams()
    }
    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [reloadQueryParams])

  const itemRef = useRef<CatalogueItemRef>(null)

  return (
    <CatalogueItem
      ref={itemRef}
      item={catalogueItem}
      preview={<DesignViewDynamic />}
      controls={
        <VStack
          gap="8"
          justifyContent={hasParams ? 'space-between' : 'center'}
          css={{ height: '100%', width: '100%' }}
        >
          {hasParams && <ParamControls />}

          <ProductInfo />
        </VStack>
      }
      buttonComponent={Button}
      buttonProps={{
        children: (
          <>
            <Icon as={FaList} />
            View plan
          </>
        ),
        onClick: () => itemRef.current?.navigateToTab('plan'),
        variant: 'secondary',
      }}
      tabs={{
        overview: <Overview description={description} />,
        parts: <PartsBreakdown />,
        plan: <DesignCuttingPlan />,
      }}
    />
  )
}

interface OverviewProps {
  description: string
}

function Overview(props: OverviewProps) {
  const { description } = props

  return (
    <>
      <Text>{description}</Text>

      <Text css={{ fontWeight: 'bold' }}>Product Care</Text>
      <Text>Beams and panels can be safely wiped clean.</Text>
    </>
  )
}

type DesignCuttingPlanProps = {}

function DesignCuttingPlan(_props: DesignCuttingPlanProps) {
  const context = useContext(ProductKitContext)
  if (context == null) {
    throw new Error('useProductKitContext must be wrapped in ProductKitProvider')
  }
  const { parts } = context

  const [requiredBeams, setRequiredBeams] = useState<Array<BeamQuota>>(() =>
    getRequiredBeamsFromParts(parts),
  )
  const setRequiredBeamsDebounced = useMemo(
    () =>
      debounce(
        (parts: Array<PartCreator>) => setRequiredBeams(getRequiredBeamsFromParts(parts)),
        500,
        { leading: false },
      ),
    [],
  )
  useEffect(() => {
    setRequiredBeamsDebounced(parts)
  }, [setRequiredBeamsDebounced, parts])

  const requiredStockSize = useMemo(() => {
    const requiresSizeGreaterThan30 = requiredBeams.some((requiredBeam) => requiredBeam.size > 30)
    return requiresSizeGreaterThan30 ? 60 : 30
  }, [requiredBeams])

  const planResult = useMemo(() => {
    return firstFitDecreasing({
      requiredBeams,
      stockBeams: [],
      hasUnlimitedStock: requiredStockSize,
    })
  }, [requiredBeams, requiredStockSize])

  return (
    <VStack css={{ width: '100%', alignItems: 'center' }}>
      <VStack css={{ maxWidth: { base: '100%', md: '50%' } }}>
        <Text fontSize="large">
          Requires {planResult.cutBeams.length}x {requiredStockSize}gu (
          <Link as={NextLink} href="/stories/whats-a-grid-unit" target="_blank" rel="noopener">
            grid unit
          </Link>
          ) beams.
        </Text>
        <Text fontSize="small">
          Panels and fasteners not included in estimate. Please{' '}
          <Link as={NextLink} href="/contact">
            contact us
          </Link>{' '}
          for any help.
        </Text>
      </VStack>
      <CuttingPlannerResult result={planResult} />
    </VStack>
  )
}

function getRequiredBeamsFromParts(parts: Array<PartCreator>): Array<BeamQuota> {
  const countBySize: Record<number, number> = {}
  for (const part of parts) {
    const { spec } = part
    if (spec.type === 'gridbeam') {
      const { lengthInGrids: size } = spec
      if (countBySize[size] === undefined) {
        countBySize[size] = 1
      } else {
        countBySize[size] += 1
      }
    }
  }
  return Object.entries(countBySize).map(([size, count]) => ({
    size: Number(size),
    count,
  }))
}
