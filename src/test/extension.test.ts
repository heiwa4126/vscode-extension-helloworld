import * as assert from "node:assert";
import * as sinon from "sinon";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";

// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	test("Hello World command is registered", async () => {
		// Activate the extension before checking for registered commands.
		// コマンド登録を確認する前に拡張機能を有効化します。
		const extension = vscode.extensions.all.find((item) => item.packageJSON?.name === "helloworld");
		assert.ok(extension, "Expected the helloworld extension to be installed.");
		await extension?.activate();

		// Verify the command contributed by the extension exists.
		// 拡張機能が提供するコマンドが存在することを確認します。
		const commands = await vscode.commands.getCommands(true);
		assert.ok(
			commands.includes("helloworld.helloWorld"),
			"Expected command helloworld.helloWorld to be registered.",
		);
	});

	test("Hello World command executes without error", async () => {
		// Execute the command to ensure it runs without throwing.
		// 例外を投げずに実行できることを確認するためコマンドを実行します。
		await vscode.commands.executeCommand("helloworld.helloWorld");
		assert.ok(true);
	});

	test("Hello World shows expected message", async () => {
		// Stub the notification API to capture the message.
		// 通知 API をスタブしてメッセージを取得します。
		const showWarningMessageStub = sinon
			.stub(vscode.window, "showWarningMessage")
			.resolves(undefined);

		try {
			await vscode.commands.executeCommand("helloworld.helloWorld");
			assert.ok(showWarningMessageStub.calledOnce);

			const [message] = showWarningMessageStub.firstCall.args;
			assert.ok(
				typeof message === "string" && message.startsWith("Hello VS Code. Current time is "),
				"Expected hello world warning message to include the current time.",
			);
		} finally {
			showWarningMessageStub.restore();
		}
	});
});
