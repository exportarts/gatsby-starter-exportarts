require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `gatsby-starter-exportarts`,
  },
  plugins: [
    'gatsby-transformer-typescript-css-modules',
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `repo`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => doc => {
          // Available properties: https://prismic.io/docs/javascript/query-the-api/link-resolving
          // TODO: Define route mapping
          switch (doc.type) {
            default: return null;
          }
        },
      },
    }
  ],
}
