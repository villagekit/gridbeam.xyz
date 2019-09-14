import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import useTypingEffect from 'use-typing-effect'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import * as images from '../images'
import createBackgroundImage from '../helpers/background'

function LandingPage () {
  return (
    <Layout header={<Hero />}>
      <Navbar />
      <Values />
      <Examples />
      <Spec />
      <Action />
    </Layout>
  )
}

export default LandingPage

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
      createBackgroundImage({
        fill: theme.colors.secondary[0],
        opacity: 0.15
      })};
        background-attachment: fixed;
        background-position: center;
      `}
      sx={{
        height: '100vh',
        borderBottomWidth: 8,
        borderBottomStyle: 'solid',
        borderBottomColor: 'dark'
      }}
    >
      <Text as='h1' p={3} fontSize={7} fontFamily='headline'>
        Grid Beam
      </Text>
      <Text as='p' p={3} fontSize={4} fontFamily='headline'>
        build a &nbsp;
        <Text as='span' color='primary'>
          {useCase}
        </Text>
      </Text>
      <ActionButton />
      <Box
        my={3}
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
    description: 'build again and again'
  },
  {
    name: 'adapt',
    icon: images.flexible,
    description: 'evolve for any situation'
  },
  {
    name: 'share',
    icon: images.share,
    description: 'explore with peers'
  },
  {
    name: 'live',
    icon: images.life,
    description: 'live long and prosper'
  },
  {
    name: 'sustain',
    icon: images.tree,
    description: 'help the planet be happy'
  },
  {
    name: 'play',
    icon: images.playground,
    description: 'have fun!'
  }
]

function Values () {
  return (
    <Section
      css={`
        background-color: ${({ theme }) => shader(theme.colors.primary, 0.85)};
      `}
      title='Why?'
    >
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

// TODO descriptions for a11y
const examples = [
  {
    name: 'Desk',
    imageUrl: images.gridBeamDesk0,
    editUrl: '#'
  },
  {
    name: 'Chair',
    imageUrl: images.gridBeamChair,
    editUrl: '#'
  },
  {
    name: 'Drawer',
    imageUrl: images.gridBeamDrawer,
    editUrl: '#'
  },
  {
    name: 'Desk',
    imageUrl: images.gridBeamDesk1,
    editUrl: '#'
  },
  {
    name: 'Cube',
    imageUrl: images.gridBeamCube,
    editUrl: '#'
  }
]

function Examples () {
  return (
    <Section
      title='Examples'
      css={`
        background-color: ${({ theme }) =>
      shader(theme.colors.secondary[0], 0.85)};
      `}
    >
      <Box
        p={3}
        textAlign='center'
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

function Spec () {
  return (
    <StaticQuery
      query={graphql`
        query {
          gridBeamTriJoint: file(
            relativePath: { eq: "grid-beam-tri-joint.jpg" }
          ) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <Section
          title='How?'
          css={`
            background-color: ${({ theme }) =>
          shader(theme.colors.secondary[1], 0.85)};
          `}
          fontSize={2}
          fontFamily='body'
        >
          <Text p={3}>
            Grid Beam is a modular construction system using primarily beams and
            bolts.
          </Text>
          <Text p={3}>
            Each beam has a repeating hole pattern where
            <Box as='em' p={4} fontSize={4} css={{ display: 'block' }}>
              the distance between each hole is equal to the width of the beam.
            </Box>
            <Image src={images.gridBeam} />
          </Text>
          <Text p={3}>
            When 3 beams join together with 3 bolts, they form a strong bond.
          </Text>
          <Image as={Img} fluid={data.gridBeamTriJoint.childImageSharp.fluid} />
          <Flex justifyContent='center'>
            <Button
              as={Link}
              forwardedAs={GatsbyLink}
              to='/spec'
              m={4}
              bg='secondary.1'
              fontSize={4}
              fontFamily='link'
            >
              Learn more
            </Button>
          </Flex>
        </Section>
      )}
    />
  )
}

function ActionButton (props) {
  return (
    <Button
      as={Link}
      href='http://www.gridbeam.com/woodproducts.html'
      p={3}
      fontSize={5}
      fontFamily='link'
      margin={2}
      sx={{
        backgroundColor: 'primary',
        color: ({ colors }) => shader(colors.primary, 0.95),
        borderWidth: '0.25rem',
        borderStyle: 'solid',
        borderColor: 'primary',

        ':hover': {
          backgroundColor: ({ colors }) => shader(colors.primary, 0.95),
          color: 'primary'
        }
      }}
      css={{
        transition: 'color 1s, background-color 1s',
        appearance: 'none',
        textDecoration: 'none'
      }}
      {...props}
    >
      Buy a kit
    </Button>
  )
}

function Action () {
  return (
    <Section
      title='Get Started'
      css={`
        background-color: ${({ theme }) => shader(theme.colors.primary, 0.85)};
      `}
    >
      <Flex p={4} flexDirection='column' alignItems='center'>
        <Image src={images.gridBeamKit} />
        <ActionButton m={4} />
      </Flex>
    </Section>
  )
}
