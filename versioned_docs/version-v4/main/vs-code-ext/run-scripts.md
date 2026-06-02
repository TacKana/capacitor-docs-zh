---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 包含用于运行测试、linting、构建等的脚本。使用扩展运行这些脚本可获得错误辅助支持，该支持将显示代码中发生错误的位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表。
- 点击其中一个脚本

脚本输出将显示在 `OUTPUT` 窗口中（您可能需要从下拉菜单中选择 `Ionic`）。

如果您的单元测试、E2E 测试中存在错误，或者存在 lint 错误或语法错误，扩展将显示错误并打开导致错误的文件及其具体行号。

:::note
脚本只是您在 `package.json` 中定义的命令，可以通过命令行使用 `npm run [name]` 运行。学习这种技术有助于简化应用程序的构建和测试。
:::
