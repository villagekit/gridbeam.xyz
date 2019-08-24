const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Grid Beam - New Zealand',
    description:
      'Erector sets for adults: reconfigurable furniture from durable materials made locally',
    author: 'Mikey Williams'
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') }
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'grid-beam-new-zealand',
        short_name: 'gridbeam-nz',
        start_url: '/',
        background_color: '#4B2D73',
        theme_color: '#4B2D73',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
