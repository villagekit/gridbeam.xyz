'use client'

import './registerParts'

import { useCallback, useRef, useState } from 'react'

import { ParamControls, useHasParams } from '@villagekit/parameters'
import { ProductInfo, type ProductMeta, ProductProvider, ProductView } from '@villagekit/product'
import { ProductKitModule } from '@villagekit/product-kit'
import { Text, VStack } from '@villagekit/ui'

import { CatalogueItem, type CatalogueItemHandle } from '@/app/_components/catalogue'
import type { DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'
import { replaceUrl } from '@/app/_lib/url-state'

import { DesignCuttingPlan } from './DesignCuttingPlan'
import { PartsBreakdown } from './PartsBreakdown'

export interface DesignViewerProps {
  meta: ProductMeta
  code: string
}

export function DesignViewer(props: DesignViewerProps) {
  const { meta, code } = props

  const onLocationUpdate = useCallback((nextLocation: Location) => {
    replaceUrl(`${nextLocation.pathname}${nextLocation.search}`)
  }, [])

  return (
    <ProductProvider
      Products={[ProductKitModule]}
      meta={meta}
      code={code}
      onLocationUpdate={onLocationUpdate}
    >
      <DesignViewerContent label={meta.label} description={meta.description} />
    </ProductProvider>
  )
}

interface DesignViewerContentProps {
  label: string
  description: string
}

function DesignViewerContent(props: DesignViewerContentProps) {
  const { label, description } = props
  const itemRef = useRef<CatalogueItemHandle>(null)
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('gu')
  const hasParams = useHasParams()

  return (
    <CatalogueItem
      ref={itemRef}
      title={label}
      description={description}
      preview={<ProductView showParamControls={hasParams} />}
      controls={
        <>
          {hasParams && <ParamControls />}
          <ProductInfo />
        </>
      }
      action={{
        label: 'View cutting plan',
        navigateToTab: 'plan',
        variant: 'secondary',
      }}
      tabs={[
        { key: 'overview', label: 'Overview', content: <Overview /> },
        {
          key: 'parts',
          label: 'Parts',
          content: (
            <PartsBreakdown displayUnit={displayUnit} onDisplayUnitChange={setDisplayUnit} />
          ),
        },
        {
          key: 'plan',
          label: 'Cutting plan',
          content: <DesignCuttingPlan displayUnit={displayUnit} />,
        },
      ]}
    />
  )
}

function Overview() {
  return (
    <VStack alignItems="flex-start" gap="3">
      <Text fontWeight="bold">Product care</Text>
      <Text>Beams and panels can be safely wiped clean.</Text>
    </VStack>
  )
}
