require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `gatsby-starter-exportarts`,
    // siteUrl will be used for sitemap
    siteUrl: 'https://www.example.com'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-transformer-typescript-css-modules',
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    // {
    //   resolve: `gatsby-source-prismic`,
    //   options: {
    //     repositoryName: `repo`,
    //     accessToken: `${process.env.PRISMIC_API_KEY}`,
    //     linkResolver: ({ node, key, value }) => doc => {
    //       // Available properties: https://prismic.io/docs/javascript/query-the-api/link-resolving
    //       // TODO: Define route mapping
    //       switch (doc.type) {
    //         default: return null;
    //       }
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-exportarts`,
        short_name: `exportarts`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#B2CA38`,
        display: `standalone`,
        // icon: './static/favicon.png'
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        // id: "GTM-XXX1234"
      },
    }
  ],
}
