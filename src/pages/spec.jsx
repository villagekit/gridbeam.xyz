import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import * as images from '../images'
import background from '../helpers/background'

function SpecPage () {
  return (
    <Layout header={<SpecHeader />}>
      <Navbar />
      <SpecContent />
    </Layout>
  )
}

export default SpecPage

function SpecHeader (props) {
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
        borderBottomWidth: 8,
        borderBottomStyle: 'solid',
        borderBottomColor: 'dark'
      }}
    >
      <Text as='h1' p={3} fontSize={[5, 6, 7]} fontFamily='headline'>
        Grid Beam Spec
      </Text>
    </Flex>
  )
}

function SpecContent (props) {
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
          <Text p={3}>Blah blah blah!</Text>
        </Section>
      )}
    />
  )
}
