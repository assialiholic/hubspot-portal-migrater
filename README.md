<!-- TODO: ブログのマイグレーター実装 -->

# ファイル

File Manager から一括エクスポートして、FTP でアップするのが 1 番早いです

# 本マイグレーターの概要

## config.json について

- replace は必須ではありません。ページやテンプレートを移行後、変な文字列が入ったりでパス解決出来なかったりする場合に  置換前後の文字列を設定し、 replaceTemplateStr.js または replacePageStr.js を実行します。

## 実行順序

初めに`npm run build`で.jsを用意してください。

### 1. migrateTemplates.js

全テンプレートを Origin ポータルから Target ポータルへ移行します。

また、File Managerにアップしたファイルは複数のパスを持っており、テンプレートでの指定方法によってはポータル依存のパスを利用していることがあります。

そのため

* 全文字列中のポータル ID とホストを自動的に Target ポータルのものへ書き換え
* アセットへの参照パスをポータル依存（url）から一般的なパス（alt_url File Manager上の構造と一致するもの）への書き換え

の処理も含んでいます。

**カスタムモジュールがAPIで取得できないため、カスタムモジュールのみ手動でコピーする必要があります（Design Manager上で右クリック→ポータルへコピー）。**

### 2. migratePage.js

全ページを Origin ポータルから Target ポータルへ移行します。ターゲットポータルに新しくページを作る挙動のため、ページ ID が変わります。

「1. replaceTemplateUniqueStr.js」同様、ポータル ID とホストの書き換え処理、パスの書き換え処理も含んでいます。

### 3. replacePageId.js

ここまでの手順では、Targetポータルのページ内の、他のページへの参照（リンクやURLモジュールで他のページをしている場合など）がOriginポータルのページIDのままになっています。

これをOriginポータルのページIDからTargetポータルのページIDへ書き換えます。

### 任意実行

- replaceTemplateStr.js
- replacePageStr.js

テンプレートやページを移行した際、稀に余計な文字列が付与されてパス解決ができなくなる場合があります（私は「file-数字-拡張子/」というパスが勝手に入る事象に出くわしました）。
そういった際に config.json の replace の before に正規表現を、after に文字列を設定し書き換えます。

template / page ともに配列のため複数のパターンの設定が可能です。
