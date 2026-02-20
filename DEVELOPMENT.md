# 開発メモ

VSCode 拡張の公式チュートリアルやってみました。  
[Your First Extension | Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)

- README は VSCode 拡張の README になるので、このファイルと分けた
- テスト追加
- VSIX を dist/ 以下に出すようにした
- アイコン追加

## TODO

- [minimatch](https://www.npmjs.com/package/minimatch?activeTab=versions) v3.1.3が出たら調整すること

## セットアップ

- 依存関係のインストール: `pnpm install`

## ビルドと監視

- コンパイル: `pnpm run compile`
- 監視: `pnpm run watch`

## デバッグ

1. `F5` で Extension Development Host を起動
2. コマンドパレットから `Hello World` を実行

## E2Eテスト

- `pnpm run test`

## VSIX 配布

ローカルで VSIX を作成する:

```bash
pnpm run vsix
```

出力先: `dist/<name>-<version>.vsix`

また

```bash
pnpm run vsix:install
pnpm run vsix:uninstall
```

で、このパッケージをインストール・アンインストールできます。

### VSIX のインストール

作成した VSIX を VS Code にインストールするには、以下のいずれかの方法を使います。

**方法1: コマンドパレットから**

1. VS Code でコマンドパレットを開く (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. `Extensions: Install from VSIX...` を選択
3. `dist/<name>-<version>.vsix` を選択

**方法2: コマンドラインから**

```bash
code --install-extension dist/helloworld-0.0.1.vsix
```

**方法3: 拡張機能ビューから**

1. 拡張機能ビューを開く (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. `...` メニュー → `Install from VSIX...` を選択
3. `dist/<name>-<version>.vsix` を選択

### VSIX のアンインストール

インストールした拡張機能をアンインストールするには、以下のいずれかの方法を使います。

**方法1: コマンドパレットから**

1. VS Code でコマンドパレットを開く (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. `Extensions: Show Installed Extensions` を選択
3. 該当の拡張機能を選択し、「アンインストール」をクリック

**方法2: コマンドラインから**

```bash
code --uninstall-extension yourname.helloworld
```

**方法3: 拡張機能ビューから**

1. 拡張機能ビューを開く (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. インストール済みの拡張機能を右クリック
3. 「アンインストール」を選択

### VSIX の更新

拡張機能を更新する場合は、上記の「VSIX のインストール」と同じ手順で新しいバージョンの VSIX をインストールします。既存のバージョンは自動的に上書きされます。

## セキュリティ対応

### 脆弱性の解決 (2026-02-19)

`pnpm audit` で検出された high 重大度の **minimatch** 脆弱性を `pnpm.overrides` で解決しました。

#### 対応内容

- **minimatch** の ReDoS を修正
  - パッチ更新: `10.2.0` -> `10.2.1`
  - 破壊的変更なし
  - `package.json` に追加:
    ```json
    "pnpm": {
      "overrides": {
        "minimatch": ">=10.2.1"
      }
    }
    ```

#### @vscode/vsce の minimatch 互換性

`vsce package` 実行時に `minimatch` の default export 互換性エラーが出たため、
`@vscode/vsce` に限って `minimatch` を CJS 互換の `3.1.2` に固定しています。

```json
"overrides": {
  "@vscode/vsce>minimatch": "3.1.2"
}
```

#### 結果

- 脆弱性件数: **3** -> **2**（high の削減）
- 残存脆弱性（moderate: ajv、low: diff）は開発依存のみ
- compile / lint / test の動作確認済み

#### Biome と Vitest への移行検討

ESLint と Mocha から Biome / Vitest への移行を検討しましたが、以下の理由で見送りました。

- **Biome（ESLint 代替）**: 可能だが、VS Code 拡張のエコシステムから外れるリスク
- **Vitest（Mocha 代替）**: `@vscode/test-cli` が Mocha 専用のため不可
  - VS Code 拡張のテストは Extension Development Host で実行する必要がある
  - `@vscode/test-electron` との統合が必須

現状はパッチレベルの対応を継続し、親パッケージの更新で自然解消を待つ方針です。

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
