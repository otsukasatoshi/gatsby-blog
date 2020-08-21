---
draft: false
date: 2020-08-21
title: Node.jsのバージョンを上げたらnode-sassでエラーが発生
description: Node.jsをアップデートしてnode-sassが原因でビルドできなくなった時の解決方法。
category: Programming
tags: [JavaScript, Node, Sass]
thumbnail: ./node-sass.png
---


## 起こった事象

ビルド環境でNode12系で動いていた既存の勉強用GatsbyJSプロジェクトをNode14系にアップデートしました。

その結果、ビルド時に以下のようなエラーが発生しました。

```text:title=SHELL
Missing binding /・・・/node_modules/node-sass/vendor/darwin-x64-83/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 14.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 12.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.
```

端的に、アップデートしたNodeのバージョンに対応するnode-sassのバイナリがないよということです。


## 解決策

エラー文の通り、以下のコマンドを実行します。

```text:title=SHELL
npm rebuild node-sass
```

rebuildすることで、アップデートしたNodeのバージョンに対応するバイナリを生成してくれます。

```text:title=SHELL
> node-sass@4.14.1 install /・・・/node_modules/node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.14.1/darwin-x64-83_binding.node
Download complete  ⸩ ⠋ :
Binary saved to /・・・/node_modules/node-sass/vendor/darwin-x64-83/binding.node
Caching binary to /・・・/.npm/node-sass/4.14.1/darwin-x64-83_binding.node

> node-sass@4.14.1 postinstall /・・・/node_modules/node-sass
> node scripts/build.js

Binary found at /・・・/node_modules/node-sass/vendor/darwin-x64-83/binding.node
Testing binary
Binary is fine
node-sass@4.14.1 /・・・/node_modules/node-sass
```

これでもう一回ビルドし直したら無事に動きました。
