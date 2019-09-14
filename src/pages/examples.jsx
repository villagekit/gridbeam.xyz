import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import Example from '../components/example'
import background from '../helpers/background'
import examples from '../data/examples'

function ExamplesPage () {
  return (
    <Layout header={<ExamplesHeader />}>
      <Navbar />
      <Examples />
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
