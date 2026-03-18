---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 文件中包含了用于运行测试、代码检查、构建等的脚本。使用此扩展运行这些脚本，可以获得错误辅助支持，该功能会显示错误在代码中发生的位置。

## 运行脚本

- 点击 `Scripts` 来展开可以运行的脚本列表。
- 点击其中一个脚本

脚本的输出将显示在 `OUTPUT` 窗口中（您可能需要从下拉菜单中选择 `Ionic`）。

如果您的单元测试、端到端测试、代码检查或语法出现错误，扩展程序将显示错误信息，并在特定行号打开导致错误的文件。

:::note
脚本只是您在 `package.json` 中定义的命令，可以通过 `npm run [名称]` 在命令行运行。学习这种技术有助于简化应用程序的构建和测试过程。
:::