---
draft: false
date: 2020-07-08
title: Gatsby.jsにrobots.txtを導入する
description: Gatsby.js製サイトにrobots.txtを導入する方法
category: Programming
tags: [Gatsby]
thumbnail: ./gatsby-robots-txt.png
---


## はじめに

Gatsby.jsで作ったブログに、SEO対策でrobots.txtを追加しました。

robots.txtはサイト内で検索エンジンのクローラの動きを制御することができます。  
クローラに対してサイト内ページの巡回を許可しない、または許可するといったことが可能になります。

検索サイトにインデックスさせたくないページがあったり、まだ公開したくないページなどがある場合、robots.txtを設定することは有効な手段となります。


## インストール

まずはGatsby側で`gatsby-plugin-robots-txt`というプラグインのインストールをします。

```:title=terminal

// npm
npm install --save gatsby-plugin-robots-txt

// yarn
yarn add gatsby-plugin-robots-txt

```

次はプラグインの設定をしていきます。


## 設定

`gatsby-plugin-robots-txt`はいくつかの[オプション](https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/#options)がありますが、基本的にデフォルトの設定のままでOKだと思います。

```js:title=gatsby-config.js

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.example.com'
  },
  plugins: ['gatsby-plugin-robots-txt']
};

```

オプションで修正したい場合は以下のように設定します。(あくまで一例です。)

```js:title=gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.example.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    }
  ]
};

```

Gatsbyでのサイトマップの設定は[過去記事](https://blog.otsukasatoshi.com/posts/2020/07/04)を参照してください。

`host`がクロール対象のサイトURLとなります。デフォルトだと`siteMetadata`の`siteUrl`で指定されている値となります。`sitemap`がサイトマップの場所の指定となります。`policy`で特定のサイトURLをクロール許可するか否か設定します。(上記の例だとすべてのURLのクロールを許可しています。)

また、ステージング環境などでクロール巡回させたくない場合は、以下のように`env`の値で環境ごとに設定します。

```js:title=gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.example.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    }
  ]
};

```

上記の例だと、デベロップ環境ではすべてのURLのクロールを許可せずに、本番環境だとすべてのURLのクロールを許可しています。


## 確認

`gatsby build`コマンドでrobots.txtファイルが生成されます。  
生成されたrobots.txtはデフォルトでroot以下に吐き出されます。  
オプションで特にデフォルトの設定を上書きしていない場合、`public/`以下に`robots.txt`があるはずです。

```:title=robots.txt

User-agent: *
Allow: /
Sitemap: https://url/sitemap.xml
Host: https://url

```

こんな感じの内容になっているはずです。(オプションの設定によって内容は異なります。)


## 最後に

Gatsbyでrobots.txtを追加するのは、プラグインを使えばかなり簡単にできました。

ただし、robots.txtは設定を間違えるとクローラに巡回されずにインデックスに登録されないなど影響が大きいので、くれぐれも慎重に設定してください！
