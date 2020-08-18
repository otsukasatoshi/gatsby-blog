---
draft: false
date: 2020-08-19
title: Macで隠しフォルダ・隠しファイルを表示する
description: Macで隠しフォルダと隠しファイルを表示する方法。
category: Programming
tags: [Tips, Mac]
thumbnail: ./finder.png
---


## はじめに

プログラミング関連の設定などPCに高度な設定をする際に、隠しファイル(ドットファイル)を表示したい場合があると思います。

`ls -a`コマンドをターミナルに打つと *.bashrc* や *.ssh* などの隠しフォルダ・隠しファイルが表示されますが、Finder上にはデフォルトでは表示されないようになっています。

しかしMacではターミナルかショートカットキーから簡単にFinder上に表示することができるので、その方法を紹介したいと思います。


## ターミナル

ターミナルを使って表示するには、以下のコマンドを打ちます。

```text:title=SHELL
defaults write com.apple.finder AppleShowAllFiles TRUE
```

設定を反映するためにFinderを再起動します。

```text:title=SHELL
killall Finder
```

改めてFinderを開くと、隠しフォルダ・隠しファイルが表示されていると思います。

隠しフォルダや隠しファイルは通常のフォルダ・ファイルと比べると半透明になっていて、フォルダやファイルの前に***.(ドット)***がついています。


また、ターミナルを使って非表示にするには、以下のコマンドを打ちます。

```text:title=SHELL
defaults write com.apple.finder AppleShowAllFiles FALSE
```

もちろんFinderを再起動することを忘れずに。

```text:title=SHELL
killall Finder
```

今度は隠しフォルダと隠しファイルがきちんと非表示になって、もとに戻ったのがわかると思います。


## ショートカットキー

ショートカットキーで表示するには、以下のキーを同時に押します。

```text:title=ショートカットキー
shift + command + .(ドット)
```

もとに戻すには再度同じショートカットキーを押すと非表示になります。


## 最後に

隠しフォルダと隠しファイルを表示したら、最後はきちんと非表示に戻しましょう。
