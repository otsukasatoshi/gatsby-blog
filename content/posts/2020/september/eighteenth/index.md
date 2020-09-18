---
draft: false
date: 2020-09-18
title: SassにStylelintとPrettierを導入する
description: StylelintとPrettierを使ってSassのコード品質を保つ方法。
category: Programming
tags: [Sass, Prettier, Stylelint]
thumbnail: ./stylelint-prettier.png
---


## はじめに

プロジェクトでSassを使用していてインデントなどのスタイルを自動でフォーマットできるようにしたいと思い、stylelintとprettierを導入してみました。

* [stylelint](https://stylelint.io/)はcssのスタイルをチェックしてくれるlinterです。

* [prettier](https://prettier.io/)はコードをフォーマットしてくれます。

この2つを導入すれば、きれいなコード品質を保ってくれます。


## インストール

まずプロジェクトルートで`package.json`を生成します。

```text:title=SHELL
yarn init
```

次に必要なプラグインをインストールします。

```text:title=SHELL
yarn add -D stylelint stylelint-scss stylelint-config-recommended-scss prettier stylelint-config-prettier stylelint-prettier
```


## .stylelintrc

Stylelintを使えるようにするために、`.stylelintrc`ファイルをルート直下に作成します。

```text:title=.stylelintrc
{
  "plugin": [
    "stylelint-scss"
  ],
  "extends": [
    "stylelint-config-recommended-scss",
    "stylelint-prettier/recommended"
  ],
  "ignoreFiles": [
    "**/node_modules/**"
  ],
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "else", "for", "each", "include", "mixin", "content"]
    }]
  }
}
```

Linterのルールは各自決めてもよいですが、`stylelint-config-recommended-scss`と`stylelint-prettier/recommended`を継承するとおすすめの設定を勝手にやってくれます。

また`ignoreAtRules`の部分で`if`や`mixin`などプロジェクトで使用しているものを指定してあげます。


## .prettierrc

Prettierを使えるようにするために、`.prettierrc`ファイルをルート直下に作成します。

```text:title=.prettierrc
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": false,
  "trailingComma": none,
  "semi": true
}
```

こちらもフォーマットのルールは各自で決めます。
上記だと、フォーマット時にダブルクォーテーションやセミコロンをつけるといった具合です。


## 動作確認

`package.json`にscriptコマンドを書きます。

```text:title=package.json
{
  "name": "name",
  "description": "description",
  "version": "1.0.0",
  "main": "main",
  "license": "MIT",
  "scripts": {
    "lint": "stylelint \"src/**/*.scss\"",
    "format": "stylelint --fix \"src/**/*.scss\""
  },
  "devDependencies": {
    "prettier": "^2.1.2",
    "stylelint": "^13.7.1",
    "stylelint-config-prettier": "^8.0.2",
    "stylelint-config-recommended-scss": "^4.2.0",
    "stylelint-prettier": "^1.1.2",
    "stylelint-scss": "^3.18.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com"
  },
  "bugs": {
    "url": "https://github.com"
  }
}
```

上記の例だと`src`フォルダ以下のすべてのscssファイルに対して `lint`コマンドでコードチェック、`format`コマンドで自動でフォーマットしてくれます。

試しにsassファイル内のコードを適当にグチャグチャにします。

```scss:title=_foobar.scss
@mixin box($width, $height: $width) {
      width: $width;
  height:         $height;
}
```

まずはlintにかけてみましょう。

```text:title=SHELL
yarn lint
```

ターミナル上で該当箇所にエラーメッセージが表示されます。

```text:title=SHELL
yarn run v1.22.4
$ stylelint "src/**/*.scss"

src/mixins/_foobar.scss
 28:3   ✖  Delete "····"       prettier/prettier
 29:10  ✖  Delete "········"   prettier/prettier

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

では自動でフォーマットしてみましょう。

```text:title=SHELL
yarn format
```

```text:title=SHELL
yarn run v1.22.4
$ stylelint --fix "src/**/*.scss"
✨  Done in 2.85s.
```

該当ファイルを再度開くときれいにフォーマットされているはずです。

```scss:title=_foobar.scss
@mixin box($width, $height: $width) {
  width: $width;
  height: $height;
}
```

いい感じに自動でフォーマットしてくれました:+1:
