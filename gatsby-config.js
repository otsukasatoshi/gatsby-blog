const config = require('./config/site-config');
const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    siteTitle: config.title,
    siteDescription: config.description,
    siteUrl: config.url,
    siteAuthor: config.author,
    siteUsername: config.userName,
    avatar: config.avatar,
    defaultImg: config.defaultImg,
    shortBio: config.shortBio,
    portfolio: config.portfolio,
    social: {
      twitter: config.twitter,
      instagram: config.instagram,
      github: config.github,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs-title',
            options: {
              className: 'gatsby-code-title',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '10',
              icon: '<svg aria-hidden="true" height="15" version="1.1" viewBox="0 0 16 16" width="15"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'autolink-header',
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              showLineNumbers: true,
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active : true,
              class  : 'emoji-icon',
              size   : 64,
              styles : {
                display      : 'inline',
                margin       : '0',
                position     : 'relative',
                top          : '-8px',
                width        : '18px',
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: { regex: "/^(?!/404/|/404.html|/dev-404-page/|/offline-plugin-app-shell-fallback/)/" }
            }
          ) {
            edges {
              node {
                path
              }
            }
          }
        }
        `,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: 'daily',
          priority: 0.7,
        }))
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.url,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [autoprefixer()],
        precision: 8,
        includePaths: ['src/styles', 'node_modules'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.title,
        description: config.description,
        start_url: `/`,
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'content/assets/favicon.png',
        icon_options: {
          purpose: 'maskable',
        },
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
