---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

你的 `package.json` 中包含用于运行测试、代码检查、构建等操作的脚本。使用扩展运行这些脚本，可以获得错误辅助支持，从而显示错误在代码中的具体位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表。
- 点击其中一个脚本。

脚本的输出将显示在 `OUTPUT`（输出）窗口中（你可能需要从下拉菜单中选择 `Ionic`）。

如果单元测试、E2E 测试、代码检查或语法中存在错误，扩展将显示错误并打开导致错误的文件及其所在行号。

:::note
脚本只是你在 `package.json` 中定义的命令，可以通过命令行使用 `npm run [名称]` 来运行。学习这种技术有助于简化应用程序的构建和测试过程。
:::
