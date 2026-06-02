---
title: 从 Cordova 迁移
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展自动化了从 Cordova 迁移到 Capacitor 的体验。大多数 Cordova 插件可以在 Capacitor 应用中工作，但扩展也会提供改进建议。

## 迁移

如果检测到 Cordova，将出现 `Capacitor Migration` 部分：
1. 点击每个项目并选择一个操作（`Uninstall`、`Upgrade` 或 `Ignore`）。
2. 最后点击 [`Remove Cordova`](#remove-cordova) 以完成迁移。

:::note
Capacitor 可以与大多数 Cordova 插件一起工作，只有少数 Cordova 插件不兼容，将需要您在迁移后重构代码。
:::

### 不需要的插件
标记出您**不再需要**的 Cordova 插件，您可以点击 `Uninstall` 来移除它们。

### 不兼容的插件
标记出在已知的**[不兼容列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)**中的 Cordova 插件。可能有等效的 Capacitor 插件，您的代码将需要重构。

### 更好的插件
有**更好**的等效 Capacitor 插件的 Cordova 插件将显示为可选建议（灯泡图标）。**更好**的插件定义为具有 Capacitor 团队官方支持的插件。某些 Cordova 插件已被弃用或不再维护，我们会跟踪这些并提供替代建议。

### 移除 Cordova

迁移的最后一步是选择 **Remove Cordova** 项目，它将备份您的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。之后，您将看到更多功能出现，如调试和运行。
