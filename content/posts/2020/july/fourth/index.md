---
draft: false
date: 2020-07-04
title: Gatsby.jsにサイトマップを導入する
description: Gatsby.js製サイトにサイトマップを導入する方法
category: Programming
tags: [Gatsby]
thumbnail: ./gatsby-sitemap.png
---


## はじめに

Gatsbyで作ったブログにサイトマップを導入しました。  
その時の手順を忘備録として残しておきます。


## インストール

まず[gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/)というプラグインをインストールします。

```:title=terminal

// npm
npm install --save gatsby-plugin-sitemap

// yarn
yarn add gatsby-plugin-sitemap

```

プラグインのインストールはこれで完了です。


## 設定

次に`gatsby-config.js`にサイトマップの設定をしていきます。

```js:title=gatsby-config.js

// In your gatsby-config.js
siteMetadata: {
  siteUrl: `https://www.example.com`,
},
plugins: [`gatsby-plugin-sitemap`]

```

上記が一番シンプルな設定となります。  
これだけでサイトマップが出力されます。

ちなみにデフォルトだと以下のようなqueryを使って出力されます。

```js:title=gatsby-config.js

export const defaultOptions = {
  query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
  }`,
  output: `/sitemap.xml`,
  exclude: [
    `/dev-404-page`,
    `/404`,
    `/404.html`,
    `/offline-plugin-app-shell-fallback`,
  ],
  createLinkInHead: true,
  serialize: ({ site, allSitePage }) => {
    const { allPages } = getNodes(allSitePage)
    return allPages?.map(page => {
      return {
        url: `${site.siteMetadata?.siteUrl ?? ``}${page.path}`,
        changefreq: `daily`,
        priority: 0.7,
      }
    })
  },
  resolveSiteUrl: data => data.site.siteMetadata.siteUrl,
}

```

デフォルトで`/sitemap.xml`が出力先になり、404ページなどがサイトマップ出力から除外されています。


## オプション

特にデフォルトの設定のままでもOKですが、出力先や内容を変えるためにオプションもいくつかあります。

```js:title=gatsby-config.js

// In your gatsby-config.js
siteMetadata: {
  siteUrl: `https://www.example.com`,
},
plugins: [
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `/some-other-sitemap.xml`,
      // Exclude specific pages or groups of pages using glob parameters
      // See: https://github.com/isaacs/minimatch
      // The example below will exclude the single `path/to/page` and all routes beginning with `category`
      exclude: [`/category/*`, `/path/to/page`],
      query: `
        {
          wp {
            generalSettings {
              siteUrl
            }
          }

          allSitePage {
            nodes {
              path
            }
          }
      }`,
      resolveSiteUrl: ({site, allSitePage}) => {
        //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
        return site.wp.generalSettings.siteUrl
      },
      serialize: ({ site, allSitePage }) =>
        allSitePage.nodes.map(node => {
          return {
            url: `${site.wp.generalSettings.siteUrl}${node.path}`,
            changefreq: `daily`,
            priority: 0.7,
          }
        })
    }
  }
]

```

たとえばサイトマップの出力先を変えるには`output`の部分を変更します。  
サイトマップから除外したいページは`exclude`で指定します。

オプション一覧に関しては[こちら](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#options)を参照してください。


## 確認

設定したサイトマップは`gatsby build && gatsby serve`でローカル環境で確認できます。
`public/`以下に(デフォルト設定のままだと)`sitemap.xml`という名前のファイルが出力されます。

```:title=sitemap.xml

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url> <loc>https://url/</loc> <changefreq>daily</changefreq> <priority>0.7</priority> </url>
<url> <loc>https://url/</loc> <changefreq>daily</changefreq> <priority>0.7</priority> </url>
<url> <loc>https://url/</loc> <changefreq>daily</changefreq> <priority>0.7</priority> </url>
・
・
・
</urlset>

```

こんな感じでオプションで設定した内容が出力されます。


## 最後に

プラグインを使えばかなり簡単にサイトマップを導入することができました。  
SEO対策にも有効なのでぜひ導入してみてください。:smile:
