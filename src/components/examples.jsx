import React from 'react'
import { take } from 'lodash'
import { Box, Flex, Link, Image, Text } from 'rebass/styled-components'
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'

import Example from './example'
import examples from '../data/examples'

function Examples (props) {
  const { limit = Infinity } = props

  const limitedExamples = limit === Infinity ? examples : take(examples, limit)

  return (
    <StaticQuery
      query={graphql`
        query {
          allFile(filter: { relativePath: { glob: "examples/*.jpg" } }) {
            nodes {
              base
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Box
          p={3}
          textAlign='center'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: 3
          }}
        >
          {limitedExamples.map((example, index) => {
            const exampleImageFile = data.allFile.nodes.find(
              node => node.base === example.image
            )

            const exampleImage =
              exampleImageFile == null ? (
                'image not found'
              ) : (
                <Image
                  as={Img}
                  fluid={exampleImageFile.childImageSharp.fluid}
                  css={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              )
            return <Example key={index} {...example} image={exampleImage} />
          })}
        </Box>
      )}
    />
  )
}

export default Examples
