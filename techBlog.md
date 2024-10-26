## 技術ブログアプリケーション

### 概要

本アプリケーションを通して、Excel 管理の技術資産をブログで管理出来るようにする

### 目次

-   必要な機能
-   使用技術
-   テーブル構造
-   機能詳細
-   スケジュール

### 必要な機能

#### 必須機能

-   ログイン → google アカウントを使用したログイン
-   記事投稿
    -   画像投稿
    -   コード投稿
-   記事一覧

-   記事参照
-   コメント
-   いいね

#### 推奨機能

-   チーム機能
-   マイリスト
-   タグ機能
-   マイページ → 自己紹介機能など
-   記事の下書き機能

### 使用技術

-   Typescript
-   React v18
-   Firebase
-   Chakra UI
-   Docker
-   Jest

### データベース設計書

Users

-   userId
-   username
-   email
-   profilePicture
-   createdAt

Posts

-   postId
-   userId
-   title
-   content
-   commentsCount
-   likesCount
-   createdAt
-   updatedAt

Comments(Posts のサブコレクション)

-   commentsId
-   userId
-   content
-   createdAt

Likes(Posts サブコレクション)

-   likeId
-   userId
-   createdAt

Pictures(Posts サブコレクション)

-   pictureId
-   userId
-   pictureUrl
-   createdAt

## 機能詳細

### login 機能

#### 概要

-   Google アカウントを使用してログインを行えるようにする

#### 詳細

-   認証が行われていないユーザーに対して、ログイン画面(ボタンを表示する)
-   ログインボタン押下後は [Firebase SDK を使用したログインフローの処理](https://firebase.google.com/docs/auth/web/google-signin?hl=ja&_gl=1*1oj26a4*_up*MQ..*_ga*MTQ0NjI4NjgwMC4xNzI5OTIyNjQx*_ga_CW55HF8NVT*MTcyOTkyMjY0MS4xLjAuMTcyOTkyMjY0MS4wLjAuMA..)
