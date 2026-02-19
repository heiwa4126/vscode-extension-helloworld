# helloworld README

VSCode拡張の公式チュートリアルやってみる。

[Your First Extension | Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)

## セキュリティ対応

### 脆弱性の解決 (2026-02-19)

`pnpm audit` で検出された脆弱性のうち、high重大度の **minimatch** の脆弱性を `pnpm.overrides` で解決しました。

#### 対応内容

- **minimatch** の脆弱性（ReDoS）を解決
  - パッチレベル更新: `10.2.0` → `10.2.1`
  - 破壊的変更なし、安全に適用可能
  - `package.json` に以下を追加:
    ```json
    "pnpm": {
      "overrides": {
        "minimatch": ">=10.2.1"
      }
    }
    ```

#### 結果

- 脆弱性の件数: **3件 → 2件** (high重大度を削減)
- 残存する脆弱性（moderate: ajv、low: diff）は開発依存関係のみで、エンドユーザーへの影響なし
- 全テスト、lint、コンパイルが正常動作することを確認済み

#### BiomeとVitestへの移行検討について

ESLintとMochaの脆弱性対策として、BiomeとVitestへの移行を検討しましたが、以下の理由により見送りました：

- **Biome（ESLint代替）**: 技術的には可能だが、VS Code拡張機能開発のエコシステムから外れるリスクあり
- **Vitest（Mocha代替）**: `@vscode/test-cli` が Mocha 専用のため、技術的に移行不可能
  - VS Code拡張機能のテストは Extension Development Host（特殊なElectron環境）で実行される必要がある
  - `@vscode/test-electron` との統合が必須

現状、パッチレベルでの脆弱性対応を行い、親パッケージの将来的な更新によって残存脆弱性の自然解消を待つ方針としました。

---

(以下自動生成されたREADMEそのまま)

---

This is the README for your extension "helloworld". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
