---
title: Running Scripts
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 文件中包含了运行测试、代码检查、构建等操作的脚本。通过扩展运行这些脚本可以获得错误辅助支持，它能显示错误在代码中的具体位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表
- 点击其中一个脚本

脚本的输出会显示在 `OUTPUT` 窗口中（可能需要从下拉菜单中选择 `Ionic`）。

如果在单元测试、E2E测试、代码检查或语法检查中出现错误，扩展会显示错误信息并自动打开出错文件，定位到具体的行号。

:::note
脚本其实就是您在 `package.json` 中定义的命令，可以通过 `npm run [name]` 在命令行运行。掌握这个技巧有助于简化应用的构建和测试流程。
:::