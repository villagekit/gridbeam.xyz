import { Box, Container, Section, Span, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextImage from 'next/image'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>What is grid beam?</Title>

        <Container maxW="3xl">
          <VStack alignItems="stretch" gap={{ base: 8, md: 10 }}>
            <AboutText>
              Grid beam is a <Span fontWeight="bold">modular system on a 40&nbsp;mm grid</Span>.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/grid"
              alt="A 40 mm × 40 mm grid square highlighted on a larger grid background."
              width={1188}
              height={841}
            />

            <AboutPhoto
              src="gridbeam.xyz/shared/grid-example"
              alt="A 40 mm grid overlaid on a grid beam and a grid panel showing how their holes line up."
              width={1333}
              height={750}
            />

            <AboutText>
              The primary building components are{' '}
              <Span fontWeight="bold">beams, panels, and fasteners</Span>.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/beams"
              alt="A row of square wooden grid beams with holes drilled at 40 mm centres."
              width={1207}
              height={714}
            />

            <AboutText>
              <Span fontWeight="bold">Beam</Span> profiles are 40 × 40&nbsp;mm with a repeating
              pattern of 8&nbsp;mm holes drilled 40&nbsp;mm apart.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/panels"
              alt="A grid panel — plywood with a 40 mm hole grid drilled across both dimensions."
              width={1111}
              height={564}
            />

            <AboutText>
              <Span fontWeight="bold">Plywood panels</Span> have the same 40&nbsp;mm hole grid
              drilled across both dimensions.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/fasteners"
              alt="A handful of hex-key furniture bolts and nuts."
              width={685}
              height={528}
            />

            <AboutText>
              <Span fontWeight="bold">Hex-key fasteners</Span> bolt beams and panels together
              quickly — and disassembly is just as fast.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/tri-joint"
              alt="Three grid beams meeting at right angles, each pair connected by a single bolt — a tri-joint."
              width={1333}
              height={750}
            />

            <AboutText>
              When <Span fontWeight="bold">three beams are joined with three bolts</Span>, a rigid
              corner is formed in all three axes.
            </AboutText>
          </VStack>
        </Container>
      </Section>
    </>
  )
}

interface AboutPhotoProps {
  src: string
  alt: string
  width: number
  height: number
}

function AboutPhoto(props: AboutPhotoProps) {
  const { src, alt, width, height } = props
  return (
    <Box
      position="relative"
      w="full"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      aspectRatio={`${width} / ${height}`}
    >
      <NextImage src={src} alt={alt} fill sizes="(min-width: 768px) 48rem, 100vw" />
    </Box>
  )
}

function AboutText(props: { children: ReactNode }) {
  return (
    <Text fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1.4" textAlign="center">
      {props.children}
    </Text>
  )
}
