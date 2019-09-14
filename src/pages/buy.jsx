import React from 'react'
import { Box, Flex, Text, Link, Button } from 'rebass/styled-components'
import shader from 'shader'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Breakline from '../components/breakline'
import Section from '../components/section'
import background from '../helpers/background'

const suppliers = [
  {
    name: 'GridBeam.com',
    href: 'http://gridbeam.com',
    location: 'California',
    currency: 'USD',
    systemOfMeasurement: 'imperial',
    products: [
      {
        width: '1.5 inches',
        holeDiameter: '5/16 inch',
        material: 'wood',
        price: '$3.00 - $3.50 per foot',
        href: 'http://www.gridbeam.com/woodproducts.html'
      },
      {
        width: '1.5, 2, or 3 inches',
        holeDiameter: '13/32, 7/16, or 3/4 inch',
        material: 'aluminum',
        price: '$7.00, $9.00, or $10.00 per foot',
        href: 'http://www.gridbeam.com/metalproducts.html'
      },
      {
        width: '2 inches',
        holeDiameter: '7/16 inch',
        material: 'steel',
        price: '$5.00 per foot',
        href: 'http://www.gridbeam.com/metalproducts.html'
      }
    ]
  }
]

function BuyPage () {
  return (
    <Layout header={<BuyHeader />}>
      <Navbar />
      <Suppliers suppliers={suppliers} />
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
      <Text as='h1' p={3} fontSize={7} fontFamily='headline'>
        Buy Grid Beam
      </Text>
    </Flex>
  )
}

function Suppliers (props) {
  const { suppliers } = props
  return (
    <Section
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
              css={{
                margin: '0 auto'
              }}
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
    location,
    currency,
    systemOfMeasurement,
    products
  } = props

  return (
    <Box as='li' m={4}>
      <Link
        href={href}
        target='_window'
        color='primary'
        css={{
          textDecoration: 'none'
        }}
      >
        <Text as='h3' fontSize={4} fontFamily='heading'>
          {name}
        </Text>
      </Link>
      <Box
        as='dl'
        m={3}
        sx={{
          dt: {
            marginBottom: 2
          }
        }}
        css={{
          dt: {
            display: 'inline-block',
            width: '30%',
            fontFamily: 'heading',
            fontWeight: 'bold'
          },
          'dd:not(:nth-child(8))': {
            display: 'inline-block',
            width: '70%'
          }
        }}
      >
        <dt>Location</dt>
        <dd>{location}</dd>

        <dt>Currency</dt>
        <dd>{currency}</dd>

        <dt>System of measurement</dt>
        <dd>{systemOfMeasurement}</dd>

        <dt>Products</dt>
        <dd>
          <Products products={products} />
        </dd>
      </Box>
    </Box>
  )
}

function Products (props) {
  const { products } = props

  return (
    <Box
      as='table'
      sx={{
        th: {
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 2
        },
        tr: {
          paddingTop: 3,
          paddingBottom: 3
        }
      }}
      css={{
        'th:nth-child(1), td:nth-child(1)': {
          width: '8%'
        },
        'th:nth-child(2), td:nth-child(2)': {
          width: '10%'
        },
        'th:nth-child(3), td:nth-child(3)': {
          width: '27%'
        },
        'th:nth-child(4), td:nth-child(4)': {
          width: '20%'
        },
        'th:nth-child(5), td:nth-child(5)': {
          width: '25%'
        }
      }}
    >
      <tr>
        <th />
        <th>Material</th>
        <th>Price</th>
        <th>Width</th>
        <th>Hole Diameter</th>
      </tr>
      {products.map(product => {
        const { width, holeDiameter, material, price, href } = product

        return (
          <tr>
            <td>
              <Button as={Link} href={href} target='_blank' my={2}>
                Buy
              </Button>
            </td>
            <td>{material}</td>
            <td>{price}</td>
            <td>{width}</td>
            <td>{holeDiameter}</td>
          </tr>
        )
      })}
    </Box>
  )
}
