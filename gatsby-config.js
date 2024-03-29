module.exports = {
  siteMetadata: {
    title: 'Grid Beam',
    description:
      'Build what you imagine: Grid Beam is a clean, re-usable construction system to build anything from furniture to small vehicles and house structures.',
    author: 'Mikey Williams'
  },
  plugins: [
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
        name: 'grid-beam-landing',
        short_name: 'gridbeam.xyz',
        start_url: '/',
        background_color: '#4B2D73',
        theme_color: '#4B2D73',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://analytics.mikey.nz',
        siteUrl: 'https://gridbeam.xyz'
      }
    }
    // 'gatsby-plugin-offline',
  ]
}
