---
draft: false
date: 2020-08-17
title: Copyrightの年表記を自動で更新する
description: コピーライトの年表記を自動で現在の西暦に更新する方法。
category: Programming
tags: [JavaScript, PHP, HTML, Tips]
thumbnail: ./copyright.png
---


## はじめに

自分のサイトやブログを持っている人はコピーライトの西暦部分を手動で更新している人もいるかと思います。

そこでフッターなどにある年表記をJavaScriptやPHPで、その年の表記に自動更新できるコードスニペットを紹介したいと思います。

WordPressを使っている人はPHPで、はてなブログなどを使っている人はJavaScriptのコードで自動化が実現できます。


## JavaScriptで現在の西暦を取得する

JavaScriptで現在の西暦を取得するのは以下のようなコードです。JavaScriptの`getFullYear()`メソッドで取得できます。

**スニペット**

```html
<script type="text/javascript">
  document.write(new Date().getFullYear());
</script>
```

**例1**

```js
&copy; <script type="text/javascript">document.write(new Date().getFullYear());</script> サイト名
```

**表示**

```
© 現在の西暦 サイト名
```

**例2**

```js
// 開始年の部分を西暦にする
&copy; 開始年<script>new Date().getFullYear()>開始年&&document.write("-"+new Date().getFullYear());</script> サイト名
```

**表示**

```
© 開始年-現在の西暦 サイト名
```


## PHPで現在の西暦を取得する

PHPで現在の西暦を取得するのは以下のようなコードです。PHPの`date`関数で取得できます。  
WordPressで運営している人は下記のスニペットを埋め込めばOKです。

**スニペット**

```php
<?php echo date('Y'); ?>
```

**例1**

```php
&copy; <?php echo date('Y');?> サイト名
```

**表示**

```
© 現在の西暦 サイト名
```

**例2**

```php
&copy; <?php
  $fromYear = 開始年; // 例えば2020
  $thisYear = (int)date('Y'); // 現在の西暦を取得
  echo $fromYear . (($fromYear != $thisYear) ? '-' . $thisYear : '');?> サイト名
```

**表示**

```
© 開始年-現在の西暦 サイト名
```


## 最後に

コピーライトってサイトによって書き方が違いますよね。  
*All Rights Rserved* は書かなくてもOKだとは知っていたのですが、実はコピーライト表記って**そもそも不要**なんだそう:frowning:

日本は[ベルヌ条約](https://ja.wikipedia.org/wiki/%E6%96%87%E5%AD%A6%E7%9A%84%E5%8F%8A%E3%81%B3%E7%BE%8E%E8%A1%93%E7%9A%84%E8%91%97%E4%BD%9C%E7%89%A9%E3%81%AE%E4%BF%9D%E8%AD%B7%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%83%99%E3%83%AB%E3%83%8C%E6%9D%A1%E7%B4%84)という著作権を国際的に保護する条約に加盟しているため、著作物を作った時点でコピーライトの表示がなくても著作物は保護されるみたいです。

ただそれでもコピーライトを書く場合は

* ©マーク(マルシー)
* 著作物を最初に発行した年
* 著作権者の名前

の3つが揃っていれば表記順はどうでもいいのだそう。

普段あまり気にしてなかったことだったので勉強になりました:metal:
