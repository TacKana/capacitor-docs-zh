---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

你的 `package.json` 文件包含了运行测试、代码检查、构建等任务的脚本。通过该扩展运行这些脚本可以获得错误辅助支持，该功能会显示错误在代码中发生的位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表。
- 点击其中一个脚本

脚本的输出将显示在 `OUTPUT` 窗口中（你可能需要从下拉菜单中选择 `Ionic`）。

如果你的单元测试、E2E 测试、代码检查或语法存在错误，扩展会显示错误信息，并在特定行号打开导致错误的文件。

:::note
脚本只是你在 `package.json` 中定义的命令，可以通过 `npm run [名称]` 在命令行运行。学习这种技术有助于简化应用程序的构建和测试过程。
:::