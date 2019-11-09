import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import Examples from '../components/examples'
import background from '../helpers/background'

function ExamplesPage () {
  return (
    <Layout header={<ExamplesHeader />}>
      <Navbar />
      <ExamplesSection />
      <ContributeSection />
    </Layout>
  )
}

export default ExamplesPage

function ExamplesHeader (props) {
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
        Grid Beam Examples
      </Text>
    </Flex>
  )
}

function ExamplesSection () {
  return (
    <Section
      id="examples"
      title='Examples'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.secondary[0], 0.85)
      }}
    >
      <Examples />
    </Section>
  )
}

function ContributeSection () {
  return (
    <Section
      id="contribute"
      title='Contribute'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.primary, 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        Want to add an example? Send me a message!
      </Text>
    </Section>
  )
}
