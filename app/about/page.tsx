// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/about.tsx
import { Container, Image, Span, Text, type TextProps, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <>
      <Title size="2xl">What is grid beam?</Title>

      <Container maxW="breakpoint-md">
        <VStack gap="8">
          <AboutText>
            Grid beam is a <Span fontWeight="bold">modular system based on a 40mm grid</Span>.
          </AboutText>

          <Image
            type="cloudinary"
            src="gridbeam.xyz/about/grid"
            alt="The 40mm grid"
            sizes={{ base: '768px' }}
            width={1188}
            height={841}
          />

          <Image
            type="cloudinary"
            src="gridbeam.xyz/shared/grid-example"
            alt="40mm grid overlaid on grid beam & panel"
            sizes={{ base: '768px' }}
            width={1333}
            height={750}
          />

          <AboutText>
            The primary building components are{' '}
            <Span fontWeight="bold">beams, panels, and fasteners</Span>.
          </AboutText>

          <Image
            type="cloudinary"
            src="gridbeam.xyz/about/beams"
            alt="Grid beams"
            sizes={{ base: '768px' }}
            width={1207}
            height={714}
          />

          <AboutText>
            <Span fontWeight="bold">Beam</Span> profiles are 40mm x 40mm and have a repeating
            pattern of 8mm holes drilled 40mm apart.
          </AboutText>

          <Image
            type="cloudinary"
            src="gridbeam.xyz/about/panels"
            alt="Grid panels"
            sizes={{ base: '768px' }}
            width={1111}
            height={564}
          />

          <AboutText>
            <Span fontWeight="bold">Plywood panels</Span> have holes drilled in a 40mm grid.
          </AboutText>

          <Image
            type="cloudinary"
            src="gridbeam.xyz/about/fasteners"
            alt="Hex-nut fasteners"
            sizes={{ base: '768px' }}
            width={685}
            height={528}
          />

          <AboutText>
            <Span fontWeight="bold">Hex-nut fasteners</Span> bolt together beams and panels quickly
            for simple assembly (and disassembly!)
          </AboutText>

          <Image
            type="cloudinary"
            src="gridbeam.xyz/about/tri-joint"
            alt="Tri joint made with grid beams"
            sizes={{ base: '768px' }}
            width={1333}
            height={750}
          />

          <AboutText>
            When <Span fontWeight="bold">three beams are joined with three connectors</Span> a
            strong connection is created.
          </AboutText>
        </VStack>
      </Container>
    </>
  )
}

function AboutText(props: TextProps) {
  return <Text fontSize={['xl', null, '2xl']} textAlign="center" {...props} />
}
