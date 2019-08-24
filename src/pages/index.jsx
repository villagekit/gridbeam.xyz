import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import useTypingEffect from 'use-typing-effect'
import shader from 'shader'

import Layout from '../components/layout'
import SEO from '../components/seo'
import * as images from '../images'

function Landing () {
  return (
    <>
      <SEO
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
        <Action />
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
      <ActionButton />
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

          gridBeamBed: file(relativePath: { eq: "grid-beam-bed.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          gridBeamBicycle: file(relativePath: { eq: "grid-beam-bicycle.jpg" }) {
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
          <Text p={3}>Make a few and you have something.</Text>
          <Image as={Img} fluid={data.gridBeamBed.childImageSharp.fluid} />
          <Text p={3}>
            In the Grid Beam system, there are 5 types of parts:
            <Box
              as='ul'
              px={4}
              pt={4}
              pb={2}
              sx={{
                listStyleType: 'decimal',
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gridGap: 4
              }}
            >
              <li>beams (wood, aluminum, or steel)</li>
              <li>nuts and bolts</li>
              <li>skins (plywood, sheet metal, or fabric)</li>
              <li>accessories (wheels, lights, sinks, drawers, etc)</li>
              <li>
                adapters, which let you bolt odd-size accessories into the
                system
              </li>
            </Box>
          </Text>
          <Text p={3}>Anything is possible!</Text>
          <Image as={Img} fluid={data.gridBeamBicycle.childImageSharp.fluid} />
        </Section>
      )}
    />
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
      title='What?'
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

function ActionButton (props) {
  return (
    <Button
      as={Link}
      href='http://www.gridbeam.com/woodproducts.html'
      fontSize={3}
      fontFamily='heading'
      {...props}
    >
      Buy a kit
    </Button>
  )
}

function Action () {
  return (
    <Section
      title='Start'
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

function SectionTitle ({ title }) {
  return (
    <Text as='h2' p={[3, 3, 4]} fontSize={5} fontFamily='heading'>
      {title}
    </Text>
  )
}

function Section ({ title, children, ...props }) {
  return (
    <>
      <Box as='section' {...props}>
        <SectionTitle title={title} />
        {children}
      </Box>
      <Breakline />
    </>
  )
}
