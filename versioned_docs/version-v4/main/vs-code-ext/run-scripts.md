---
title: Running Scripts
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

您的 `package.json` 文件中包含了运行测试、代码检查、构建等任务的脚本。通过本扩展运行这些脚本可获得错误辅助支持，该功能会显示错误在代码中的具体位置。

## 运行脚本

- 点击 `Scripts` 展开可运行的脚本列表
- 点击任意一个脚本

脚本的输出内容将显示在 `OUTPUT` 窗口中（可能需要从下拉菜单中选择 `Ionic`）。

如果您的单元测试、端到端测试中出现错误，或者存在代码规范问题及语法错误，扩展程序会显示错误信息并自动打开出错文件，定位到具体行号。

:::note
脚本其实就是您在 `package.json` 中定义的命令，可以通过命令行 `npm run [名称]` 来运行。掌握这个技巧有助于简化应用的构建和测试流程。
:::