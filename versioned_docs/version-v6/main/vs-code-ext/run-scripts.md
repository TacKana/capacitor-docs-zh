---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 包含运行测试、代码检查、构建等的脚本。使用扩展运行这些脚本可获取错误协助支持，这将显示错误在代码中发生的位置。

## 运行脚本

- 点击 `Scripts` 以展开可以运行的脚本。
- 点击其中一个脚本

脚本的输出将显示在 `OUTPUT` 窗口中（您可能需要从下拉菜单中选择 `Ionic`）。

如果您的单元测试、E2E 测试、代码检查错误或语法错误中有错误，扩展将显示错误并在特定行号处打开导致错误的文件。

:::note
脚本只是您在 `package.json` 中定义的命令，可以在命令行中通过 `npm run [name]` 运行。学习这种技术对于简化构建和测试应用非常有用。
:::
