# ハウディ × ソラコム 協業提案サイト

ソラコムへの協業提案資料をシンプルで読みやすいWebサイトとして実装したプロジェクトです。

## 概要

- **デザイン**: シンプル、クリーン、読みやすさ重視
- **認証**: パスワード保護機能
- **モック管理**: Supabaseを使用したモック一覧の管理機能

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **データベース**: Supabase
- **認証**: 簡易パスワード認証
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを編集し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SITE_PASSWORD=haudi0601
```

### 3. Supabaseデータベースのセットアップ

Supabaseプロジェクトを作成し、以下のテーブルを作成してください：

```sql
CREATE TABLE mocks (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  url TEXT NOT NULL,
  auth_id TEXT,
  auth_password TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. ロゴファイルの配置

ハウディのロゴファイル (`haudi-logo.png`) を `/public/logos/` ディレクトリに配置してください。

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## 機能

### 認証機能
- パスワード: `haudi0601`
- 未認証の場合、自動的にログインページにリダイレクト

### メインコンテンツ
以下の5つのセクションを含みます：

1. **ハウディのイノベーションパートナー戦略**
   - 提供価値
   - ブランドポジション
   - 強み

2. **IoT開発の実績**
   - 大手との受託・共同開発実績
   - 自社プロダクト群
   - 特徴

3. **モック先行営業と事業化までの流れ**
   - 圧倒的スピード
   - 営業プロセス
   - 成果

4. **ソラコムとの協業ビジョン**
   - 共通点
   - 協業イメージ
   - ハウディの正直なニーズ

5. **最後に**
   - 協業への期待とメッセージ

### モック管理機能
- モック一覧の表示
- 認証情報の管理
- 管理画面での追加・編集・削除

## ファイル構造

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx           # メインページ
│   │   ├── login/
│   │   │   └── page.tsx       # ログインページ
│   │   ├── admin/
│   │   │   └── page.tsx       # モック管理ページ
│   │   └── api/
│   │       └── auth/
│   │           └── route.ts   # 認証API
│   ├── components/
│   │   ├── Header.tsx         # ヘッダーコンポーネント
│   │   ├── MainContent.tsx    # メインコンテンツ
│   │   └── MockList.tsx       # モック一覧
│   ├── lib/
│   │   └── supabase.ts        # Supabase設定
│   └── middleware.ts          # 認証ミドルウェア
├── public/
│   └── logos/
│       └── haudi-logo.png     # ロゴファイル（要配置）
└── .env.local                 # 環境変数
```

## デプロイ

### Vercel

1. VercelにGitHubリポジトリを連携
2. 環境変数を設定
3. 自動デプロイ

### 環境変数（本番環境）

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SITE_PASSWORD=haudi0601
```

## カスタマイズ

### デザインの変更

- カラー: `#50A69F` がブランドカラーとして使用されています
- フォント: Inter フォントを使用
- レスポンシブ: Tailwind CSSのユーティリティクラスを使用

### コンテンツの変更

メインコンテンツは `src/components/MainContent.tsx` で編集できます。

### ユーザー権限システム

- **一般ユーザー** (haudi0601): 資料の閲覧のみ
- **管理者** (haudi2025): 資料内容の編集、モック管理が可能

### コンテンツ編集機能（管理者のみ）

管理者でログインした場合、以下の機能が利用できます：
- 各セクションの見出しや本文をWeb上で直接編集
- リスト項目の追加・削除・並び替え
- 変更内容はSupabaseに自動保存
- 編集ボタンはホバー時に表示

### 認証設定の変更

パスワードは環境変数 `USER_PASSWORD` と `ADMIN_PASSWORD` で変更できます。

## Supabaseテーブル構造

**mocksテーブル**
```sql
CREATE TABLE mocks (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  url TEXT NOT NULL,
  auth_id TEXT,
  auth_password TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**contentテーブル**（コンテンツ編集機能用）
```sql
CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 注意事項

- ロゴファイルは必ず配置してください
- Supabaseの設定が完了してからモック機能を使用してください
- コンテンツ編集機能を使う場合は必ずcontentテーブルを作成してください
- 本番環境では適切な認証方式に変更することを推奨します

## ライセンス

このプロジェクトはハウディの協業提案用に作成されたものです。
