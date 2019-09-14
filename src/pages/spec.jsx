import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import background from '../helpers/background'
import Spec from '../components/spec'

function SpecPage () {
  return (
    <Layout header={<SpecHeader />}>
      <Navbar />
      <Spec />
      <ContributeSection />
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

function ContributeSection () {
  return (
    <Section
      title='Contribute'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.primary, 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        Want to improve the documentation? Send me a message!
      </Text>
    </Section>
  )
}
