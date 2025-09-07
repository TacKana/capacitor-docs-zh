---
title: 从 Cordova 迁移
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展自动化了从 Cordova 迁移到 Capacitor 的体验。大多数 Cordova 插件在 Capacitor 应用程序中都能正常工作，但扩展会提供改进建议。

## 迁移步骤

如果检测到 Cordova，将会显示 `Capacitor Migration` 部分：
1. 点击每个项目并选择一个操作（`卸载`、`升级` 或 `忽略`）。
2. 最后点击 [`移除 Cordova`](#remove-cordova) 完成迁移。

:::note
Capacitor 与大多数 Cordova 插件兼容，只有少数不兼容的 Cordova 插件需要在迁移后重构代码。
:::

### 不再需要的插件
对于您**不再需要**的 Cordova 插件，系统会进行标记，您可以点击 `卸载` 来移除它们。

### 不兼容的插件
对于已知的**[不兼容插件列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)**中的 Cordova 插件，系统会进行标记。可能存在等效的 Capacitor 插件，您的代码需要进行重构。

### 更好的插件
对于有**更好**等效 Capacitor 插件的 Cordova 插件，会显示为可选建议（灯泡图标）。**更好**的插件是指那些得到 Capacitor 团队官方支持的插件。一些 Cordova 插件已被弃用或不再维护，我们会跟踪这些插件并提供替代建议。

### 移除 Cordova

迁移的最后一步是选择 **Remove Cordova** 项目，这将备份您的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。之后，您将看到更多功能出现，如调试和运行。