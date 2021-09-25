import React from 'react'
import { Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Section from '../components/section'
import background from '../helpers/background'
import Guide from '../components/guide'

function GuidePage () {
  return (
    <Layout header={<GuideHeader />}>
      <Navbar />
      <Guide />
      <StaticQuery
        query={graphql`
          query {
            book: file(
              relativePath: { eq: "how-to-build-with-grid-beam-book.jpg" }
            ) {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            playground: file(
              relativePath: { eq: "gridcraft-sandbox.jpg" }
            ) {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => <>
          <BookSection book={data.book} />
          <PlaygroundSection playground={data.playground} />
        </>}
      />
      <ContributeSection />
    </Layout>
  )
}

export default GuidePage

function GuideHeader (props) {
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
        Grid Beam Guide
      </Text>
    </Flex>
  )
}

function BookSection (props) {
  const { book } = props
  return (
    <Section
      id="book"
      title='Read the book'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.secondary[0], 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        "How to Build With Grid Beam" by Phil Jergenson, Richard Jergenson &
        Wilma Keppel
      </Text>
      <Flex flexDirection='row' justifyContent='center'>
        <Image
          as={Img}
          width='16rem'
          fluid={book.childImageSharp.fluid}
        />
      </Flex>
      <Flex p={4} flexDirection='row' justifyContent='center'>
        <Button
          as={Link}
          mx={2}
          fontSize={4}
          href='https://www.newsociety.com/Books/H/How-to-Build-With-Grid-Beam-PDF'
        >
          PDF
        </Button>
        <Button
          as={Link}
          mx={2}
          fontSize={4}
          href='https://www.newsociety.com/Books/H/How-to-Build-With-Grid-Beam-EPUB'
        >
          EPUB
        </Button>
      </Flex>
    </Section>
  )
}

function PlaygroundSection (props) {
  const { playground } = props
  return (
    <Section
      id="playground"
      title='Playground'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.primary, 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        Have a play with a prototype
        {' '}
        <Link
          href='https://play.gridbeam.xyz' target='_blank' rel='noopener'
          color='primary'
          sx={{
            textDecoration: 'none',
            ':hover': { textDecoration: 'underline' }
          }}
        >
          Grid Beam sandbox
        </Link>
        !
      </Text>

      <Flex mt={2} mb={4} flexDirection='row' justifyContent='center' alignItems='center'>
        <Link width={[1 / 2]} href='https://play.gridbeam.xyz/#1bc_BCoAwDAPQUIaMIRJ66kGGn-Bx__9lc3N4qL0-EpoWzdAtg2JquHCjsbx2EsZp0vKyysMwLbWyTIIcHvM5BN0a5sTEbQH3n419yd2VwEb3-43o' target='_blank' rel='noopener'>
          <Image
            as={Img}
            width='100%'
            fluid={playground.childImageSharp.fluid}
          />
        </Link>
      </Flex>
    </Section>
  )
}

function ContributeSection () {
  return (
    <Section
      id="contribute"
      title='Contribute'
      sx={{
        backgroundColor: ({ colors }) => shader(colors.secondary[1], 0.85)
      }}
    >
      <Text p={4} fontFamily='body'>
        Want to improve the documentation? Send me a message!
      </Text>
    </Section>
  )
}
