import React, { useEffect, useMemo, useState } from 'react'
import { keyBy, range } from 'lodash'
import { Box, Flex, Text, Link, Image, Button } from 'rebass/styled-components'
import { StaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import shader from 'shader'

import Section from '../components/section'
import systems from '../data/systems'
import { colors } from '../theme'

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
              <GridBeamSizesHelper systems={systems} />
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

function GuideBox (props) {
  return <Box p={3} {...props} />
}

function GuideText (props) {
  return <Text p={3} {...props} />
}

function GuideImage (props) {
  const { children } = props
  return (
    <Flex p={3} justifyContent='center' alignItems='center'>
      {children || <Image width={[1 / 2]} {...props} />}
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

/*
function CompatibleLengthsGraphic (props) {
  const totalWidth = 20 + 25 + 40 + 50 + 4 * 10
  const totalHeight = 400
  return (
    <svg width={totalWidth} height={totalHeight}>
      // 20 mm
      <rect x='0' width={40} height={totalHeight} rx={5} />
      {range(0, totalHeight / 40).map(index => (
        <circle cx={20} cy={40 * (index + 0.5)} r={9.5} fill='white' />
      ))}
      // 40 mm
      <rect x='0' width={40} height={totalHeight} rx={5} />
      {range(0, totalHeight / 40).map(index => (
        <circle cx={20} cy={40 * (index + 0.5)} r={9.5} fill='white' />
      ))}
    </svg>
  )
}
*/

const INCH_TO_MM = 25.4

function GridBeamSizesHelper (props) {
  const { systems } = props

  const [currentSystemId, setCurrentSystemId] = useState(systems[0].id)

  const systemsById = useMemo(() => keyBy(systems, 'id'), [systems])
  const currentSystem = systemsById[currentSystemId]
  const {
    label,
    systemOfMeasurement,
    sizes,
    defaultSizeId,
    materials,
    defaultMaterialId
  } = currentSystem

  const [currentSizeId, setCurrentSizeId] = useState(defaultSizeId)
  const [currentMaterialId, setCurrentMaterialId] = useState(defaultMaterialId)
  useEffect(() => {
    setCurrentSizeId(defaultSizeId)
    setCurrentMaterialId(defaultMaterialId)
  }, [currentSystemId])

  const materialsById = useMemo(() => keyBy(materials, 'id'), [materials])
  const sizesById = useMemo(() => keyBy(sizes, 'id'), [sizes])
  const size = sizesById[currentSizeId]
  const material = materialsById[currentMaterialId]

  return <GridBeamSystemsList systems={systems} />
}

function GridBeamSystemsList (props) {
  const { systems } = props

  return (
    <Box as='ul'>
      {systems.map((system, index) => (
        <Box as='li'>
          <GridBeamSystemInfo
            system={system}
            bg={
              index % 2 == 0
                ? shader(colors.secondary[1], 0.7)
                : shader(colors.secondary[1], 0.9)
            }
          />
        </Box>
      ))}
    </Box>
  )
}

function GridBeamSystemInfo (props) {
  const { system, ...restProps } = props
  const { label, systemOfMeasurement, sizes, materials } = system

  const sizesById = useMemo(() => keyBy(sizes, 'id'), [sizes])

  return (
    <GuideBox
      {...restProps}
      sx={{
        dl: {
          fontSize: 3
        },
        dt: {
          display: 'inline-block',
          width: '50%',
          marginY: 2,
          fontFamily: 'heading',
          fontWeight: 'bold'
        },
        'dd:not(:nth-child(3))': {
          display: 'inline-block',
          width: '50%'
        }
      }}
    >
      <dl>
        <dt>Name</dt>
        <dd>{label}</dd>
        <dt>System of measurement</dt>
        <dd>{systemOfMeasurement}</dd>
      </dl>
      <GuideTable>
        <thead>
          <tr>
            <th>material</th>
            <th>beam width</th>
            <th>hole diameter</th>
            <th>bolt diameter</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(currentMaterial => {
            const {
              id: materialId,
              label: materialLabel,
              sizes: materialSizes
            } = currentMaterial
            const currentSizes = materialSizes.map(materialSize => {
              return Object.assign({}, materialSize, sizesById[materialSize.id])
            })
            return currentSizes.map(currentSize => {
              const {
                beamWidthLabel,
                holeDiameterLabel,
                boltDiameterLabel
              } = currentSize
              return (
                <tr>
                  <td>{materialLabel}</td>
                  <td>{beamWidthLabel}</td>
                  <td>{holeDiameterLabel}</td>
                  <td>{boltDiameterLabel}</td>
                </tr>
              )
            })
          })}
        </tbody>
      </GuideTable>
    </GuideBox>
  )
}
