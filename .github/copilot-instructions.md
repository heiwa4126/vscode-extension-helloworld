# Copilot Instructions

このリポジトリは VS Code 拡張機能「HelloWorld」のプロジェクトです。

## プロジェクト概要

- VS Code 拡張機能の公式チュートリアルに基づいたサンプルプロジェクト
- 参考: [Your First Extension | Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)

## 技術スタック

- **言語**: TypeScript (5.9.x)
- **ターゲット**: ES2022, モジュール: Node16
- **パッケージマネージャー**: pnpm
- **リンター**: ESLint 10 + typescript-eslint
- **テストフレームワーク**: Mocha (`@vscode/test-cli` + `@vscode/test-electron`)
- **VS Code エンジン**: ^1.109.0

## プロジェクト構成

- `src/extension.ts` - 拡張機能のエントリポイント。`activate` / `deactivate` をエクスポートする
- `src/test/` - テストファイル (`*.test.ts` パターン)
- `out/` - コンパイル済み JS の出力先 (`tsconfig.json` の `outDir`)
- `package.json` の `main` は `./out/extension.js`

## コーディング規約

- **strict モード**: `tsconfig.json` で `"strict": true` が有効
- **ESLint ルール**:
  - `curly`: warn（中括弧の省略禁止）
  - `eqeqeq`: warn（厳密等価演算子を使用）
  - `no-throw-literal`: warn（リテラルのスロー禁止）
  - `semi`: warn（セミコロン必須）
  - `@typescript-eslint/naming-convention`: import は camelCase または PascalCase
- **コメント**: 日英併記のスタイル（英語コメントの下に日本語コメント）

## よく使うコマンド

| コマンド           | 説明                                                |
| ------------------ | --------------------------------------------------- |
| `pnpm run compile` | TypeScript をコンパイル                             |
| `pnpm run watch`   | ファイル変更を監視して自動コンパイル                |
| `pnpm run lint`    | ESLint で `src/` を検査                             |
| `pnpm run test`    | `vscode-test` でテスト実行（事前に compile + lint） |

## 開発フロー

1. `F5` で Extension Development Host を起動してデバッグ
2. コマンドパレット (`Ctrl+Shift+P`) → `Hello World2` でコマンド実行
3. テストは `@vscode/test-cli` 経由で実行。テスト設定は `.vscode-test.mjs` に定義

## コード生成時の注意

- VS Code API (`vscode` モジュール) を使用する際は `import * as vscode from "vscode"` のパターンを使う
- コマンド登録時は `package.json` の `contributes.commands` と `commandId` を一致させること
- `context.subscriptions.push()` で Disposable を登録し、リソースリークを防ぐ
- 新しいテストファイルは `src/test/` 配下に `*.test.ts` パターンで作成する
