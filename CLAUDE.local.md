# tech-space-front

## ディレクトリ構成方針

`src/` 以下は以下の方針で管理する。

### `src/components/`

全機能で共通利用するUIコンポーネントを置く。

- `ui/` — shadcn/ui などのプリミティブコンポーネント
- `shared/` — アプリ独自の共通コンポーネント（PrimaryButton等）
- `layout/` — ページレイアウト系コンポーネント（Header等）

機能固有のコンポーネントは置かない。

### `src/features/`

機能単位のコンポーネント・hooksを置く。timeline機能から本構成を採用。

```
features/
└── {feature-name}/
    ├── components/   # その機能のコンポーネント
    └── hooks/        # その機能のhooks
```

現在の機能:
- `auth/` — 認証（Login, Signup, RequireAuth）※現在 components/auth/ に置かれているが features/ へ移行予定
- `profile/` — プロフィール作成 ※同上
- `timeline/` — タイムライン（本構成を最初に採用した機能）

### `src/lib/`

汎用ユーティリティ。SWR用のfetcher（api.ts）、formatTimestamp等。

### `src/pages/`

ルートに対応するページコンポーネント。ロジックは持たず、featuresのコンポーネントを組み合わせるだけにする。

### `src/types/`

TypeScriptの型定義。ドメイン単位（post, profile等）とAPI単位（api/）に分ける。

### `src/constants/`

パス定義（paths.ts）やバリデーションメッセージ等のアプリ定数。
