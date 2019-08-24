import React from 'react'
import { Box, Flex, Text, Link, Image } from 'rebass/styled-components'
import useTypingEffect from 'use-typing-effect'

import Layout from '../components/layout'
import SEO from '../components/seo'
import * as images from '../images'

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
      <Layout header={<Hero />}>
        <Values />
        <Spec />
        <Examples />
      </Layout>
    </>
  )
}

export default Landing

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

const useCases = [
  'desk',
  'chair',
  'table',
  'shelving unit',
  'sleeping loft',
  'bed frame',
  'drawer cart',
  'pet gate',
  'bicycle',
  'temporary kitchen',
  'stage set',
  'solar concentrator',
  'hydro power system',
  'garden cart',
  'electric mower',
  'electric vehicle',
  'fence',
  'tractor',
  'train',
  'rocket'
]

const backgroundImage = ({ fill, opacity }) =>
  'url("data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="58" viewBox="0 0 42 58"><path fill="' +
      fill +
      '" fill-opacity="' +
      opacity +
      '" fill-rule="evenodd" d="M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>'
  ) +
  '")'

function Hero () {
  const useCase = useTypingEffect(useCases, { loop: true })

  return (
    <Flex
      as='header'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      css={`
        // https://www.heropatterns.com/
        background-color: 'white';
        background-image: ${({ theme }) =>
      backgroundImage({
        fill: theme.colors.secondary[0][3],
        opacity: 0.15
      })};
        background-attachment: fixed;
        background-position: center;
      `}
      sx={{
        height: '100vh',
        borderBottomWidth: 4,
        borderBottomStyle: 'solid',
        borderBottomColor: 'dark'
      }}
    >
      <Text as='h1' p={3} fontSize={7} fontFamily='headline'>
        Grid Beam
      </Text>
      <Text as='p' p={3} fontSize={4} fontFamily='headline'>
        build a &nbsp;
        <Text as='span' color='primary.2'>
          {useCase}
        </Text>
      </Text>
      <Box
        my={4}
        width={[420, 560, 812]}
        height={[236, 315, 457]}
        as='iframe'
        src='https://www.youtube-nocookie.com/embed/PIMESt9iLYg'
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </Flex>
  )
}

const values = [
  {
    name: 're-use',
    icon: images.recycle,
    description: 're-use same parts again and again'
  },
  {
    name: 'adapt',
    icon: images.flexible,
    description: 'build for any situation'
  },
  {
    name: 'share',
    icon: images.share,
    description: 'collaborate on designs and share your favorites'
  },
  {
    name: 'sustain',
    icon: images.tree,
    description: 'live planet friendly'
  },
  {
    name: 'live',
    icon: images.life,
    description: 'live with things that survive you'
  },
  {
    name: 'play',
    icon: images.playground,
    description: 'have fun!'
  }
]

function Values () {
  return (
    <Section title='Why?'>
      <Flex flexWrap='wrap'>
        {values.map((value, index) => (
          <Value key={index} {...value} />
        ))}
      </Flex>
    </Section>
  )
}

function Value (props) {
  const { name, icon, description } = props

  return (
    <Flex
      flexDirection='column'
      p={3}
      width={[1 / 2, 1 / 2, 1 / 3]}
      textAlign='center'
    >
      <Image src={icon} p={[1, 1, 2]} height={[5, 5, 6]} />
      <Text as='h3' p={[1, 1, 2]} fontSize={4} fontFamily='heading'>
        {name}
      </Text>
      <Text p={[1, 1, 2]} fontSize={2} fontFamily='body'>
        {description}
      </Text>
    </Flex>
  )
}

function Spec () {
  return (
    <Section title='How?'>
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
    <Section title='What?'>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 3
        }}
      >
        {examples.map((example, index) => (
          <Example key={index} {...example} />
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
    <Text as='h2' p={2} fontSize={5} fontFamily='heading'>
      {title}
    </Text>
  )
}

function Section ({ title, children }) {
  return (
    <>
      <Box as='section'>
        <SectionTitle title={title} />
        {children}
      </Box>
      <Breakline />
    </>
  )
}
