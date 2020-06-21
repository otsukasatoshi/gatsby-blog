---
draft: false
date: 2020-06-21
title: Gatsby.jsでブログを作った
description: Gatsby.jsを用いてブログを作り直した話
category: Programming
tags: [Gatsby, React, JavaScript]
thumbnail: ./gatsby.png
---

## はじめに

タイトルの通り[Gatsby.js](https://www.gatsbyjs.org/)を使ってブログを作り直しました。

元々はてなブログで書いていましたが、既存のサービスなので管理やデザインの融通が効かなく以前から引っ越しをしようと思っていたのが主な理由です。

あとは個人的にReactを学びたかったのもあります。

Vueは以前触ったことがあったので、最初の入りは意外とすんなりいけましたが、開発していて途中から結構難しいと感じました。。。


## 技術的なこと

Gatsby.jsは[GraphQL](https://graphql.org/)や[Headless CMS](https://headlesscms.org/)でモダンで高速なサイトを作れる**静的サイトジェネレーター**です。(今回はCMSは使っていません。)

同じReact.jsで作られている[Next.js](https://nextjs.org/)と迷いましたが、GraphQLを触ってみたかったのとGatsby.jsのほうが日本語での知見がネット上に転がっていたので、今回はGatsbyを選定してみました。(Next.jsでも今後なにか作りたい)

デプロイ先は[Netlify](https://www.netlify.com/)にしました。
Gatsbyとの連携も抜群でローコスト(個人利用なら実質ドメイン代だけ)で運営できるのもうれしいですね。:sunglasses:


## 今後に向けて

フロントエンドの本格的な開発は今回が初めてだったので、マークアップやデザインなどまだまだ改善の余地がある状態です。

今後はマイペースにブログを更新しつつ、フロント周りの勉強もして読みやすいブログを作っていきたいです。


## 最後に

このブログのソースは[こちら](https://github.com/otsukasatoshi/gatsby-blog)に置いておきます。

参考になるかわかりませんが、誰かのためになれれば光栄です。:simple_smile:
