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

機能単位のコンポーネントを置く。timeline機能から本構成を採用。

hooksはコンポーネントと同階層に置く。複数機能から参照されるものは `shared/hooks/` に置く。

```
features/
├── {feature-name}/
│   └── components/
│       └── {ComponentName}/
│           ├── ComponentName.tsx
│           ├── useComponentName.ts   # そのコンポーネント専用のhook
│           └── index.ts
└── shared/
    └── hooks/                        # 複数機能から参照される共通hook
```

現在の機能:
- `auth/` — 認証（Login, Signup, RequireAuth）
- `profile/` — プロフィール作成
- `time-line/` — タイムライン（本構成を最初に採用した機能）
- `shared/` — 複数機能で共有するhooks（useCurrentUser, useLogout, usePagination）

### `src/libs/`

汎用ユーティリティ。SWR用のfetcher（api.ts）、formatTimestamp等。

### `src/pages/`

ルートに対応するページコンポーネント。ロジックは持たず、featuresのコンポーネントを組み合わせるだけにする。

### `src/types/`

TypeScriptの型定義。ドメイン単位（post, profile等）とAPI単位（api/）に分ける。

### `src/constants/`

パス定義（paths.ts）やバリデーションメッセージ等のアプリ定数。
