// The module 'vscode' contains the VS Code extensibility API
// VS Code の拡張 API を含むモジュール 'vscode'

// Import the module and reference it with the alias vscode in your code below
// このモジュールをインポートし、以下のコードで vscode というエイリアスで参照します
import * as vscode from "vscode";

// This method is called when your extension is activated
// このメソッドは拡張機能が有効化されたときに呼び出されます

function helloWorld() {
	// Display a message box to the user
	// ユーザーにメッセージボックスを表示します
	const now = new Date();
	const msg = `Hello VS Code. Current time is ${now.toLocaleTimeString()}`;
	// vscode.window.showInformationMessage(msg);
	// 情報メッセージを表示する例（コメントアウト）
	vscode.window.showWarningMessage(msg);
}

// Your extension is activated the very first time the command is executed
// コマンドが初めて実行されたときに拡張機能が有効化されます
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// 診断情報（console.log）やエラー（console.error）を出力するにはコンソールを使います

	// This line of code will only be executed once when your extension is activated
	// このコードは拡張機能が有効化されたときに一度だけ実行されます
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// コマンドは package.json ファイルで定義されています

	// Now provide the implementation of the command with registerCommand
	// ここで registerCommand を使ってコマンドの実装を提供します

	// The commandId parameter must match the command field in package.json
	// commandId パラメータは package.json の command フィールドと一致させる必要があります

	const disposable = vscode.commands.registerCommand(
		"helloworld.helloWorld",
		() => {
			// The code you place here will be executed every time your command is executed
			// ここに記述したコードはコマンドが実行されるたびに実行されます
			helloWorld();
		},
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
// このメソッドは拡張機能が無効化されたときに呼び出されます
export function deactivate() {}
