import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import useTypingEffect from 'use-typing-effect'
import shader from 'shader'

import background from '../helpers/background'
import * as images from '../images'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import Examples from '../components/examples'
import Guide from '../components/guide'

function LandingPage () {
  return (
    <Layout header={<Hero />}>
      <Navbar />
      <Values />
      <ExamplesSection />
      <Guide limit />
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
        ${background}
      `}
      sx={{
        height: '100vh',
        borderBottomWidth: 8,
        borderBottomStyle: 'solid',
        borderBottomColor: 'dark'
      }}
    >
      <Text as='h1' p={3} fontSize={[5, 6, 7]} fontFamily='headline'>
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
      id='why'
      title='Why?'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.primary, 0.85)
      }}
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

function ExamplesSection () {
  return (
    <Section
      id='examples'
      title='Examples'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.secondary[0], 0.85)
      }}
    >
      <Examples limit={9} />
      <Flex justifyContent='center'>
        <Button
          as={Link}
          forwardedAs={GatsbyLink}
          to='/examples'
          m={4}
          bg='secondary.0'
          fontSize={4}
          fontFamily='link'
        >
          See more
        </Button>
      </Flex>
    </Section>
  )
}

function ActionButton (props) {
  return (
    <Button
      as={Link}
      forwardedAs={GatsbyLink}
      to='/buy'
      p={3}
      fontSize={5}
      fontFamily='link'
      fontWeight='bold'
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
    <StaticQuery
      query={graphql`
        query {
          gridBeamKit: file(relativePath: { eq: "grid-beam-kit.jpg" }) {
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
          id='get-started'
          title='Get Started'
          css={`
            background-color: ${({ theme }) =>
          shader(theme.colors.primary, 0.85)};
          `}
        >
          <Flex p={4} flexDirection='column' alignItems='center'>
            <Image
              as={Img}
              width='32rem'
              fluid={data.gridBeamKit.childImageSharp.fluid}
            />
            <ActionButton m={4} />
          </Flex>
        </Section>
      )}
    />
  )
}
