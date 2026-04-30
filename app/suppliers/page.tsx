import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  LinkButton,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Span,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

import { type Supplier, type SupplierOffering, suppliers } from '../../content/suppliers'

const title = 'Suppliers'
const description =
  "People who make grid-beam-compatible hardware. We don't sell parts; we link to those who do."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/suppliers',
  },
  twitter: { title, description },
}

const offeringLabels: Record<SupplierOffering, string> = {
  beams: 'Beams',
  panels: 'Panels',
  fasteners: 'Fasteners',
  kits: 'Kits',
  custom: 'Custom',
  'design-build': 'Design + build',
}

export default function SuppliersPage() {
  const visibleSuppliers = suppliers.filter((supplier) => supplier.status !== 'archived')
  const hasSuppliers = visibleSuppliers.length > 0

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Places that sell grid-beam hardware: beams, panels, fasteners, and sometimes full kits.">
          Suppliers
        </Title>
        <Container maxW="3xl">
          <Text fontSize="lg" textAlign="center">
            This site catalogues the{' '}
            <Link variant="paragraph" href="/about">
              40&nbsp;mm flavour
            </Link>{' '}
            of grid beam, and most listed suppliers ship 40&nbsp;mm hardware. We also list the
            original Imperial flavour for completeness — each card flags its profile so you know
            what mixes with what. We don't sell parts; we link to those who do.
          </Text>
        </Container>
      </Section>

      {hasSuppliers ? (
        <Section index={1} maxW="6xl">
          <Title as="h2" description="Each card links out to the supplier's site.">
            Listings
          </Title>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
            {visibleSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </SimpleGrid>
        </Section>
      ) : (
        <Section index={1} maxW="6xl">
          <Title
            as="h2"
            description="No suppliers are listed yet — but there are still ways to get parts."
          >
            None listed yet
          </Title>
          <Container maxW="3xl">
            <VStack alignItems="flex-start" gap="5">
              <Text>
                If you make or stock grid-beam-compatible hardware,{' '}
                <Link variant="paragraph" href="/contact">
                  get in touch
                </Link>{' '}
                — we'll add you. Until then, two paths:
              </Text>
              <VStack alignItems="flex-start" gap="4" pl="4">
                <Text>
                  <Span fontWeight="bold">Build your own.</Span> A drill press and a jig is enough
                  to mill beams in your own workshop. The{' '}
                  <Link variant="paragraph" href="/stories/how-to-cut-grid-beams">
                    How to mark and cut grid beams
                  </Link>{' '}
                  story walks through the basics.
                </Text>
                <Text>
                  <Span fontWeight="bold">Adapt t-slot.</Span> 80/20-style aluminium extrusion isn't
                  directly grid-beam-compatible (different profile, different fastener system) but
                  it's the closest off-the-shelf alternative if you don't want to mill your own.
                </Text>
              </VStack>
            </VStack>
          </Container>
        </Section>
      )}

      <Section
        index={2}
        maxW="6xl"
        colorPalette="accentA"
        id="how-to-be-listed"
        aria-labelledby="how-to-be-listed-heading"
      >
        <Title
          as="h2"
          id="how-to-be-listed-heading"
          description="If you produce or resell grid-beam-compatible hardware, you can be listed for free."
        >
          How to be listed
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="5">
            <Text>
              <Span fontWeight="bold">What "compatible" means.</Span> Your beams (or panels, or
              fasteners) honour the{' '}
              <Link variant="paragraph" href="/about">
                40&nbsp;mm grid
              </Link>{' '}
              — 40&nbsp;mm hole spacing, 8&nbsp;mm hole diameter, M6 bolts. We're material-agnostic
              — wood, aluminium, recycled, anything that holds a bolt is fine.
            </Text>
            <Text>
              <Span fontWeight="bold">What we ask.</Span> Just that the parts genuinely fit. We
              don't charge listing fees, take commissions, or require exclusivity. If a customer
              reports compatibility issues with parts from your shop, we'll reach out before
              changing your listing.
            </Text>
            <Text>
              <Span fontWeight="bold">How to apply.</Span>{' '}
              <Link variant="paragraph" href="/contact">
                Email us
              </Link>{' '}
              with your shop URL, a short blurb, and a sample part you can ship for fit-check (or
              detailed photos with a 40&nbsp;mm reference object). We'll respond within a week.
            </Text>
            <Flex justifyContent="center" pt="2" w="full">
              <LinkButton href="/contact">Become a supplier</LinkButton>
            </Flex>
          </VStack>
        </Container>
      </Section>
    </Main>
  )
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Box
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentA.300"
    >
      <VStack alignItems="flex-start" gap="4" h="full">
        <VStack alignItems="flex-start" gap="1">
          <HStack gap="2" alignItems="center" flexWrap="wrap">
            <Heading as="h3" size="md">
              {supplier.name}
            </Heading>
            {supplier.status === 'paused' && <Badge colorPalette="orange">Paused</Badge>}
          </HStack>
          <Text fontSize="sm" variant="secondary">
            {supplier.country}
          </Text>
        </VStack>
        <Text flex="1">{supplier.blurb}</Text>
        <HStack gap="2" flexWrap="wrap">
          {supplier.offerings.map((offering) => (
            <Badge key={offering} colorPalette="accentA">
              {offeringLabels[offering]}
            </Badge>
          ))}
        </HStack>
        <Text fontSize="sm" variant="secondary">
          <Span fontWeight="bold">Compatibility:</Span> {supplier.compatibility}
        </Text>
        {supplier.notes && (
          <Text fontSize="sm" variant="tertiary">
            {supplier.notes}
          </Text>
        )}
        <LinkButton href={supplier.website} variant="secondary" size="sm" isExternal>
          Visit website
        </LinkButton>
      </VStack>
    </Box>
  )
}
