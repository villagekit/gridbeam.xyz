import React from 'react'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Section from '../components/section'

function Guide (props) {
  const { limit = false } = props

  return (
    <StaticQuery
      query={graphql`
        query {
          parts: file(relativePath: { eq: "guide/parts.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          triJoint: file(relativePath: { eq: "guide/tri-joint.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          quickstart0: file(relativePath: { eq: "guide/quickstart-0.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          quickstart1: file(relativePath: { eq: "guide/quickstart-1.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          quickstart2: file(relativePath: { eq: "guide/quickstart-2.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          quickstart3: file(relativePath: { eq: "guide/quickstart-3.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          quickstart4: file(relativePath: { eq: "guide/quickstart-4.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          wood: file(relativePath: { eq: "guide/wood.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          aluminum: file(relativePath: { eq: "guide/aluminum.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          steel: file(relativePath: { eq: "guide/steel.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          nutsAndBoltsHardware: file(
            relativePath: { eq: "guide/nuts-and-bolts-hardware.jpg" }
          ) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          skin0: file(relativePath: { eq: "examples/workbench.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skin1: file(relativePath: { eq: "examples/desk-0.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          compatibleLengths: file(
            relativePath: { eq: "guide/compatible-lengths.png" }
          ) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          sizes: file(relativePath: { eq: "guide/sizes.png" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          accessories: file(relativePath: { eq: "examples/x-wing.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          future: file(relativePath: { eq: "guide/future.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => {
        const more = limit ? (
          <Flex justifyContent='center'>
            <Button
              as={Link}
              forwardedAs={GatsbyLink}
              to='/guide'
              m={4}
              bg='secondary.1'
              fontSize={4}
              fontFamily='link'
            >
              Learn more
            </Button>
          </Flex>
        ) : (
          <>
            <SubSection title='Quickstart'>
              <GuideText>
                The key to Grid Beam's quick assembly and strong integrity is
                the tri-joint:
                <Box as='em' p={4} fontSize={4} css={{ display: 'block' }}>
                  when 3 beams join together with 3 bolts, they form a strong
                  bond.
                </Box>
              </GuideText>
              <GuideImage
                as={Img}
                fluid={data.triJoint.childImageSharp.fluid}
              />
              <GuideText>
                To see how this works in action, let's construct a simple work
                bench!
              </GuideText>
              <GuideImage
                as={Img}
                fluid={data.quickstart0.childImageSharp.fluid}
              />
              <GuideImage
                as={Img}
                fluid={data.quickstart1.childImageSharp.fluid}
              />
              <GuideImage
                as={Img}
                fluid={data.quickstart2.childImageSharp.fluid}
              />
              <GuideImage
                as={Img}
                fluid={data.quickstart3.childImageSharp.fluid}
              />
              <GuideImage
                as={Img}
                fluid={data.quickstart4.childImageSharp.fluid}
              />
            </SubSection>
            <SubSection title='Beams'>
              <GuideText>
                Beams are square sticks, where the width is the same on both
                sides.
              </GuideText>
              <GuideText>
                Each beam has a repeating hole pattern where
                <Box as='em' p={4} fontSize={4} css={{ display: 'block' }}>
                  the distance between each hole is equal to the width of the
                  beam.
                </Box>
                The hole pattern is the key to Grid Beam's modularity and
                interoperability.
              </GuideText>
              <GuideText>
                Beams can be made from either wood, aluminum, or steel.
              </GuideText>
              <GuideImage as={Img} fluid={data.wood.childImageSharp.fluid} />
              <GuideImage
                as={Img}
                fluid={data.aluminum.childImageSharp.fluid}
              />
              <GuideImage as={Img} fluid={data.steel.childImageSharp.fluid} />
            </SubSection>
            <SubSection title='Nuts and Bolts'>
              <GuideText>
                The nuts and bolts are the fasteners that connect the beams
                together in the strong tri-joints.
              </GuideText>
              <GuideImage
                as={Img}
                fluid={data.nutsAndBoltsHardware.childImageSharp.fluid}
              />
            </SubSection>
            <SubSection title='Skins'>
              <GuideText>
                Skins are the flat planels that go over the beams.
              </GuideText>
              <GuideImage as={Img} fluid={data.skin0.childImageSharp.fluid} />
              <GuideImage as={Img} fluid={data.skin1.childImageSharp.fluid} />
            </SubSection>
            <SubSection title='Sizes'>
              <GuideText>Grid Beam thrives with standard sizes.</GuideText>
              <GuideText>
                Common beam widths:
                <GuideTable>
                  <tr>
                    <th>imperial</th>
                    <th>metric</th>
                  </tr>
                  <tr>
                    <td>
                      <sup>3</sup>&frasl;<sub>4</sub> inch
                    </td>
                    <td>20mm</td>
                  </tr>
                  <tr>
                    <td>1 inch</td>
                    <td>25 mm</td>
                  </tr>
                  <tr>
                    <td>
                      1 <sup>1</sup>&frasl;<sub>2</sub> inch
                    </td>
                    <td>40 mm</td>
                  </tr>
                  <tr>
                    <td>2 inches</td>
                    <td>50 mm</td>
                  </tr>
                </GuideTable>
              </GuideText>
              <GuideText>
                Common bolt diameters: (for wood beams)
                <GuideTable>
                  <tr>
                    <th>imperial</th>
                    <th>metric</th>
                  </tr>
                  <tr>
                    <td>
                      <sup>1</sup>&frasl;<sub>4</sub> inch
                    </td>
                    <td>6 mm</td>
                  </tr>
                  <tr>
                    <td>
                      <sup>5</sup>&frasl;<sub>16</sub> inch
                    </td>
                    <td>8 mm</td>
                  </tr>
                  <tr>
                    <td>
                      <sup>3</sup>&frasl;<sub>8</sub> inch
                    </td>
                    <td>9.5 mm</td>
                  </tr>
                  <tr>
                    <td>
                      <sup>7</sup>&frasl;<sub>16</sub> inch
                    </td>
                    <td>11 mm</td>
                  </tr>
                </GuideTable>
              </GuideText>
              <GuideText>
                Different beam lengths are still compatible:
                <GuideImage
                  as={Img}
                  fluid={data.compatibleLengths.childImageSharp.fluid}
                />
              </GuideText>
              <GuideText>
                Common beam and panel lengths: TODO
                <GuideImage as={Img} fluid={data.sizes.childImageSharp.fluid} />
              </GuideText>
            </SubSection>
            <SubSection title='Accessories and Adapters'>
              <GuideText>TODO</GuideText>
              <GuideImage
                as={Img}
                fluid={data.accessories.childImageSharp.fluid}
              />
            </SubSection>
            <SubSection title='Future'>
              <GuideText>Have fun building the future!</GuideText>
              <GuideImage as={Img} fluid={data.future.childImageSharp.fluid} />
            </SubSection>
          </>
        )

        return (
          <Section
            title='Guide'
            css={`
              background-color: ${({ theme }) =>
            shader(theme.colors.secondary[1], 0.85)};
            `}
            fontSize={2}
            fontFamily='body'
          >
            <GuideText>
              Grid Beam is a simple technique to build things from re-usable
              parts.
            </GuideText>
            <GuideText>
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
              <GuideImage as={Img} fluid={data.parts.childImageSharp.fluid} />
            </GuideText>
            {more}
          </Section>
        )
      }}
    />
  )
}

export default Guide

function SubSection ({ title, children }) {
  return (
    <Box as='section'>
      <Text as='h3' p={[3, 3, 4]} fontSize={5} fontFamily='heading'>
        {title}
      </Text>
      {children}
    </Box>
  )
}

function GuideText (props) {
  return <Text p={3} {...props} />
}

function GuideImage (props) {
  return (
    <Flex p={3} justifyContent='center' alignItems='center'>
      <Image width={[1 / 2]} {...props} />
    </Flex>
  )
}

function GuideTable (props) {
  return (
    <Box
      as='table'
      sx={{
        margin: 4,
        th: {
          fontWeight: 'bold'
        },
        'th, td': {
          padding: 2
        }
      }}
      {...props}
    />
  )
}
