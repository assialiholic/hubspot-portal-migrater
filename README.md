# ファイル

File Manager から一括エクスポートして、FTP でアップするのが 1 番早いです

# テンプレート

Design Manager から右クリック → ポータルにコピーするのが 1 番よいです。依存（HubDB まで）とかごっそり持って行ってくれるので。

# ページマイグレーター

テンプレートは移行先のポータルに複製されている前提です。
config.json に必要値を入力の後、`node migratePages.ts` または `node migratePages.js`
