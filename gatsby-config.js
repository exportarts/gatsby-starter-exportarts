require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Set additional configuration as env vars
process.env.SITE_URL = 'https://www.example.com';
process.env.GTM_ID = undefined;
process.env.SENTRY_DSN = undefined;
process.env.PRISMIC_REPO_NAME = undefined;

const dynamicPlugins = [];
if (process.env.GTM_ID && process.env.BRANCH_NAME && process.env.BRANCH_NAME === 'master') {
  dynamicPlugins.push({
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: process.env.GTM_ID
    },
  });
}
if (process.env.SENTRY_DSN) {
  dynamicPlugins.push({
    resolve: "gatsby-plugin-sentry",
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      enabled: (() => process.env.NODE_ENV === 'production')()
    }
  })
}
if (isBranchMaster) {
  dynamicPlugins.push({
    resolve: 'gatsby-plugin-htaccess',
    options: {
      host: process.env.SITE_URL.replace('https://', ''),
      https: true,
      www: true,
      SymLinksIfOwnerMatch: true
    }
  });
}

const robotsPolicy = isBranchMaster ? [{ userAgent: '*', allow: '/' }] : [{ userAgent: '*', disallow: '/' }];
dynamicPlugins.push({
  resolve: 'gatsby-plugin-robots-txt',
  options: {
    host: process.env.SITE_URL,
    sitemap: process.env.SITE_URL + '/sitemap.xml',
    policy: robotsPolicy
  }
});

const schemas = {
  // Todo: Add your custom types
  // page: require('./src/schemas/page.json'),
};
if (process.env.PRISMIC_API_KEY && Object.keys(schemas).length > 0) {
  dynamicPlugins.push({
    resolve: 'gatsby-source-prismic',
    options: {
      repositoryName: process.env.PRISMIC_REPO_NAME,
      accessToken: process.env.PRISMIC_API_KEY,
      schemas
    }
  })
}

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    title: 'gatsby-starter-exportarts',
    description: '',
    titleSuffix: '',
    titleDivider: ' - '
  },
  plugins: [
    ...dynamicPlugins,
    'gatsby-plugin-sitemap',
    'gatsby-transformer-typescript-css-modules',
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-exportarts`,
        short_name: ``,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#ff5975`,
        display: `standalone`,
        // TODO: Specify your favicon source file and un-comment the following lines
        // icon: './path/to/favicon.svg',
        // icons: [
        //   {
        //     src: `favicon/icon-48x48.png`,
        //     sizes: `48x48`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-72x72.png`,
        //     sizes: `72x72`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-96x96.png`,
        //     sizes: `96x96`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-144x144.png`,
        //     sizes: `144x144`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-192x192.png`,
        //     sizes: `192x192`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-256x256.png`,
        //     sizes: `256x256`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-384x384.png`,
        //     sizes: `384x384`,
        //     type: `image/png`,
        //   },
        //   {
        //     src: `favicon/icon-512x512.png`,
        //     sizes: `512x512`,
        //     type: `image/png`,
        //   },
        // ]
      },
    }
  ],
}
