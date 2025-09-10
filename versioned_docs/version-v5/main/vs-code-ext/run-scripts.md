---
title: 运行脚本
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 文件中包含了运行测试、代码检查、构建等任务的脚本。通过本扩展运行这些脚本可获得错误辅助支持，该功能会显示错误在代码中的具体位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表
- 选择其中一个脚本

脚本输出将显示在 `OUTPUT` 窗口中（可能需要从下拉菜单中选择 `Ionic`）。

如果单元测试、端到端测试中出现错误，或存在代码规范问题、语法错误，扩展会显示错误信息并自动打开出错文件并定位到具体行号。

:::note
脚本其实就是您在 `package.json` 中定义的命令，可以通过 `npm run [name]` 在命令行执行。掌握这个技巧能有效简化应用的构建和测试流程。
:::