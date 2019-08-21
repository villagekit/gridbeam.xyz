import React from 'react'
import { Box, Flex, Text, Link, Image } from 'rebass/styled-components'

import { withLayout } from '../components/layout'
import SEO from '../components/seo'

function Landing () {
  return (
    <>
      <SEO
        title='Home'
        keywords={[
          'grid',
          'beam',
          'modular',
          'open',
          'hardware',
          'construction',
          'furniture'
        ]}
      />
      <Hero />
      <Values />
      <Spec />
      <Examples />
    </>
  )
}

export default withLayout(Landing)

function Breakline () {
  return (
    <Box
      as='hr'
      sx={{
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'dark'
      }}
    />
  )
}

function Hero () {
  return (
    <Box
      as='header'
      sx={{
        backgroundImage: 'url("https://via.placeholder.com/960x640")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '100vh'
      }}
    >
      <Text as='h1' p={3} fontSize={7} fontFamily='heading' textAlign='center'>
        Grid Beam
      </Text>
    </Box>
  )
}

const values = [
  {
    name: 're-usable',
    description: 're-use same components for many purposes'
  },
  {
    name: 'flexible',
    description: 'build to fit for your specific situation'
  },
  {
    name: 'open',
    description: 'collaborate on designs and share your favorites'
  }
]

function Values () {
  return (
    <Section title='Values'>
      <Flex>
        {values.map(value => (
          <Value {...value} />
        ))}
      </Flex>
    </Section>
  )
}

function Value (props) {
  const { name, description } = props

  return (
    <Flex flexDirection='column' m={2} p={2}>
      <Text as='h3' fontSize={3} fontFamily='heading'>
        {name}
      </Text>
      <Text fontSize={1} fontFamily='body'>
        {description}
      </Text>
    </Flex>
  )
}

function Spec () {
  return (
    <Section title='Specification'>
      <Text fontSize={2} fontFamily='body'>
        GridBeam: square poles with holes
      </Text>
    </Section>
  )
}

// TODO descriptions for a11y
const examples = [
  {
    name: 'Desk',
    imageUrl: 'https://via.placeholder.com/150',
    editUrl: '#'
  },
  {
    name: 'Chair',
    imageUrl: 'https://via.placeholder.com/150',
    editUrl: '#'
  },
  {
    name: 'Shelves',
    imageUrl: 'https://via.placeholder.com/150',
    editUrl: '#'
  },
  {
    name: 'Bedframe',
    imageUrl: 'https://via.placeholder.com/150',
    editUrl: '#'
  },
  {
    name: 'Cube',
    imageUrl: 'https://via.placeholder.com/150',
    editUrl: '#'
  }
]

function Examples () {
  return (
    <Section title='Examples'>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 3
        }}
      >
        {examples.map(example => (
          <Example {...example} />
        ))}
      </Box>
    </Section>
  )
}

function Example (props) {
  const { name, imageUrl, editUrl } = props

  return (
    <Flex flexDirection='column' alignItems='center' m={2} p={2}>
      <Link
        href={editUrl}
        target='_window'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
      >
        <Text as='h3' fontSize={2} fontFamily='heading' textAlign='center'>
          {name}
        </Text>
        <Image src={imageUrl} />
      </Link>
    </Flex>
  )
}

function SectionTitle ({ title }) {
  return (
    <Text as='h2' p={2} fontSize={4} fontFamily='heading'>
      {title}
    </Text>
  )
}

function Section ({ title, children }) {
  return (
    <>
      <Breakline />
      <Box as='section'>
        <SectionTitle title={title} />
        {children}
      </Box>
    </>
  )
}
