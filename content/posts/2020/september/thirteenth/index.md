---
draft: false
date: 2020-09-13
title: GitHubでプロフィールを作成する
description: GitHub Readme Statsを使ってGitHubプロフィールをカッコよくする方法。
category: Programming
tags: [GitHub, Tips]
thumbnail: ./github.png
---


## はじめに

GitHubではユーザーのプロフィール画面にREADMEを表示できる機能があります。

具体的には、以下のようにGitHubプロフィールの上部にREADMEを表示できるようになります。

![github-stats](./github-stats.png)

これはまだ隠し機能？みたいなので保証はできませんが、たぶんアカウントを持っていれば作れるはずです。


## リポジトリを作る

まず自分のGitHubのユーザーネームと同じ名前のリポジトリを作成します。

![create-repo](./create-repo.png)

README.mdを自動作成しておきたいので **Add a README file** にチェックを入れておきます。

そのままPushして、自分のプロフィール画面に戻ってみると初期画面が表示されているはずです。

![github-profile](./github-profile.png)

あとは、このファイルをマークダウンで自分好みに修正していくだけです。


## shields.io

[shields.io](https://shields.io/)というサービスを使うとバッチを作成できます。
(よくREADMEにCI/CDのステータスとかバージョンとかがあるバッチです)

ここで自分の好きなデザインを選んでSNSとかのアカウントをバッチで表示できます。

```
[![Twitter](https://img.shields.io/badge/-Twitter-%231DA1F2.svg?&style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/otsukasatoshi)
```

上記はTwitterを例にしています。
URLの部分を自分のアカウント名に変更してください。

バッチのデザインは他にもあるので好みのものを見つけましょう。


## GitHub Readme Stats

[GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)というサービスを使えば、自分のコミット数とか使用している言語の割合を自動で生成してくれます。:+1:

README.mdで下記のURLを埋め込めば良しなにやってくれます。

```
[![Stats](https://github-readme-stats.vercel.app/api?username=otsukasatoshi&count_private=true&show_icons=true)](https://github.com/otsukasatoshi)

[![Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=otsukasatoshi&layout=compact)](https://github.com/otsukasatoshi)
```

`username=`となっているところを自分のユーザー名に変更してください。

statsの数にプライベートリポジトリを含める、背景色を変えるといったオプションもいろいろ用意されています。
自分好みにカスタマイズしてみましょう！


## 完成

完成するとこんな感じでリッチなデザインでstats情報が表示できます。

![github-stats](./github-stats.png)

いろいろな開発者のプロフィールをみるのも楽しいです。

ぜひ自分だけのGitHubプロフィールを作ってみてください:smile:
