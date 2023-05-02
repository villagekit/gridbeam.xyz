import React from 'react'
import { Box, Flex, Text, Link, Image } from 'rebass/styled-components'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Breakline from '../components/breakline'
import Section from '../components/section'
import background from '../helpers/background'

const suppliers = [
  {
    name: 'Original Grid Beam',
    href: 'https://web.archive.org/web/20200226012424/http://www.gridbeam.com/',
    isDead: true,
  },
  {
    name: 'Grid Kit',
    href: 'https://gridkit.nz/order',
    logo: '/suppliers/gridkit.svg'
  }
]

function BuyPage () {
  return (
    <Layout header={<BuyHeader />}>
      <Navbar />
      <Suppliers suppliers={suppliers} />
      <ContributeSection />
    </Layout>
  )
}

export default BuyPage

function BuyHeader (props) {
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
        Buy Grid Beam
      </Text>
    </Flex>
  )
}

function Suppliers (props) {
  const { suppliers } = props
  return (
    <Section
      id="suppliers"
      title='Suppliers'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.primary, 0.85)
      }}
      fontFamily='body'
    >
      <Box as='ul'>
        {suppliers.map(supplier => (
          <>
            <Breakline
              color={({ colors }) => shader(colors.primary, 0.7)}
              width='10%'
            />
            <Supplier {...supplier} />
          </>
        ))}
      </Box>
    </Section>
  )
}

function Supplier (props) {
  const {
    name,
    href,
    isDead,
    logo,
  } = props

  return (
    <Box as='li' my={[3, 3, 4]} mx={[2, 3, 4]}>
      <Link
        href={href}
        target='_window'
        color='primary'
        css={{
          textDecoration: 'none'
        }}
      >
        <Text as='h3' fontSize={4} fontFamily='heading' display='flex' alignItems='center'>
          <Box
            css={{
              display: 'inline',
              textDecoration: isDead ? 'line-through' : 'default',
              marginRight: '1rem',
            }}
          >
            {name}
          </Box>
          {isDead && <>
            <span aria-label='dead' role='img'>💀</span>
          </> ||
          logo != null && <>
            <Image width="auto" height="36px" src={logo} />
          </>}
        </Text>
      </Link>
    </Box>
  )
}

function ContributeSection () {
  return (
    <Section
      id="contribute"
      title='Contribute'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.secondary[0], 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        Want to add a supplier? Send me a message!
      </Text>
    </Section>
  )
}
