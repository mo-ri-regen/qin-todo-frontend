# Qin todo

## 使用技術

- [React](https://ja.reactjs.org/)
  - 言わずとしれた Facebook 製 UI ライブラリ。
- [Next.js](https://nextjs.org/)
  - React のフレームワーク。純粋な React だけで構築すると面倒な部分を簡単にしてくれます。今後、頻繁に使われるようになる技術と考えています。
- [TypeScript](https://www.typescriptlang.org/)
  - 型があることでバグを防いだり、ドキュメント代わりになったり、チーム開発がスムースになります。
- [Tailwind CSS](https://tailwindcss.com/)
  - ユーティリティファーストな CSS フレームワークでスタイリングに非常に便利です。
- [ESLint](https://eslint.org/)
  - コードを分析し問題点を指摘してくれるツールです。これがあることでメンバー同士のコード差異が少なくなったり、独自ルールを追加して書き方を統一できます。
- [Prettier](https://prettier.io/)
  - コードフォーマッターです。改行やクォーテーションなどを統一できます。ESLint とあわせて使うのが一般的で、ESLint だけでは実現できない部分をカバーします。
- [GitMoji](https://gitmoji.dev/) 😜
  - Commit メッセージに絵文字を使うことでパッと見で分かりやすくするものです。
- [Mock Service Worker](https://mswjs.io/)
  - サービスワーカーを利用して API モックを作れるライブラリ。フロントエンド駆動開発やテストに便利です。
- [Vercel](https://vercel.com/)
- [Firebase](https://firebase.google.com/)+[next-firebase-auth](https://github.com/gladly-team/next-firebase-auth)
  - 認証に利用

### 未定

- [Jest](https://jestjs.io/ja/)
  - Facebook 製の JavaScript のテスティングフレームワークです。テストに関する様々な機能を提供しており、ドキュメントも豊富かつ実績もあるため、採用しています。
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - React "Components"をテストするためのものです。[Jest 公式](https://jestjs.io/docs/ja/tutorial-react#dom-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)でもコンポーネントをテストしたい場合に使えるものだと言及されています。

## セットアップ

### ① yarn の準備

まずは yarn がインストールされているか確認しましょう。ターミナルで下記コマンドを打ってバージョンが表示されたら、それ以降の手順は飛ばして OK です。

```
yarn -v
```

yarn がまだの方はインストールしましょう。yarn のインストールには npm が必要です。まずは npm が入っているか確認しましょう。

```
npm -v
```

バージョンが表示された方は下記コマンドを打って、yarn をインストールしてください。

```
npm install -g yarn
```

npm が入っていなかった方は Node.js も入っていないと思うので、まずは Node.js をインストールしてください。インストール方法はたくさんありますが、[VOLTA](https://volta.sh/)をオススメしております。VOLTA のサイトを参考に Node.js をインストールしてください。

npm は Node.js とともに配布されるため、Node.js をインストールしたら npm も自動的にインストールされます。その後、yarn をインストールしてください。

Next.js のインストールは、④ 依存関係のインストールの yarn で実行されるので、npx 等でインストールする必要はありません。

### ② VS Code 拡張機能のインストール

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

上記の拡張機能をいれることで、保存時に自動で ESLint(+Prettier) が走り、コードを整形してくれます。

### ③ リポジトリのクローン

このリポジトリをローカル環境にクローンしてください。

コマンドで行う場合

```
git clone https://github.com/qin-salon/qin-todo-web.git
```

VS Code で行う場合は、リポジトリをクローンする（英語だと Clone Repository）というボタンがあるので、それをクリックしていただき、`https://github.com/qin-salon/qin-todo-web.git` を入力してエンターを押してください。

### ④ 依存関係のインストール

ターミナルを開き、下記コマンドで依存関係をインストールしましょう。以上で、環境構築は完了です。

```
yarn
```

## 開発について

開発を行う場合

```
yarn dev // localhost:3000 で立ち上がります
```

本番の動作確認を行う場合

```
yarn build
yarn start // localhost:3000 で立ち上がります。dev中はportを変える必要があります。
```

## Git ブランチルール

`main`

- マージされると本番に自動反映されます。

`develop`

- 本番反映前に確認するための環境（ステージング環境）。
- 常駐しているブランチで、feature からの変更を受け付け、main にマージする。

`hotfix`

- 本番で発生した緊急のバグに対処するためのブランチ。
- 必ず main から分岐し、main と develop にマージする。

`feature/あなたのGitHub名-*`

- 開発にはここを用いる。
- 必ず develop から分岐し、develop にマージする。
- 「あなたの GitHub 名」にはアカウント名を入力。
- `*` は開発する対象の ISSUE の番号を記入。
- 例: feature/lightsound-#1

`main`, `develop`, `hotfix` に直接 push してはいけません。基本的に皆さんが触って良いのは `feature/あなたのGitHub名_*` ブランチだけです。

## その他

- [デザイン](https://www.figma.com/file/SNPCXNu0V6k6wHS4piYyS2/Qin-Todo?node-id=0%3A1)
- [バックエンドリポジトリ](https://github.com/mo-ri-regen/qin-todo-backend)
- [使用相談(プライベートリポジトリ)](https://github.com/qin-salon/qin-todo-backend/issues/1)
