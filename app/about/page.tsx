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
              Grid beam is a <Span fontWeight="bold">modular system based on a 40mm grid</Span>.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/grid"
              alt="The 40mm grid"
              width={1188}
              height={841}
            />

            <AboutPhoto
              src="gridbeam.xyz/shared/grid-example"
              alt="40mm grid overlaid on grid beam & panel"
              width={1333}
              height={750}
            />

            <AboutText>
              The primary building components are{' '}
              <Span fontWeight="bold">beams, panels, and fasteners</Span>.
            </AboutText>

            <AboutPhoto src="gridbeam.xyz/about/beams" alt="Grid beams" width={1207} height={714} />

            <AboutText>
              <Span fontWeight="bold">Beam</Span> profiles are 40mm x 40mm and have a repeating
              pattern of 8mm holes drilled 40mm apart.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/panels"
              alt="Grid panels"
              width={1111}
              height={564}
            />

            <AboutText>
              <Span fontWeight="bold">Plywood panels</Span> have holes drilled in a 40mm grid.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/fasteners"
              alt="Hex-nut fasteners"
              width={685}
              height={528}
            />

            <AboutText>
              <Span fontWeight="bold">Hex-nut fasteners</Span> bolt together beams and panels
              quickly for simple assembly (and disassembly!)
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/tri-joint"
              alt="Tri joint made with grid beams"
              width={1333}
              height={750}
            />

            <AboutText>
              When <Span fontWeight="bold">three beams are joined with three connectors</Span> a
              strong connection is created.
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
