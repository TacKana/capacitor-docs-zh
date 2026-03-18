---
title: 从 Cordova 迁移
description: Visual Studio Code 的 Capacitor 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展能够自动完成从 Cordova 到 Capacitor 的迁移体验。大多数 Cordova 插件在 Capacitor 应用中都能工作，但扩展会同时提供改进建议。

## 迁移

如果检测到 Cordova，`Capacitor Migration` 部分将出现：
1. 点击每个项目并选择一个操作（`卸载`、`升级` 或 `忽略`）。
2. 最后点击 [`移除 Cordova`](#remove-cordova) 以完成迁移。

:::note
Capacitor 与大多数 Cordova 插件兼容，只有少数不兼容的 Cordova 插件需要你在迁移后重构代码。
:::

### 不再需要的插件
你**不再需要**的 Cordova 插件会被标记，你可以点击 `卸载` 来移除它们。

### 不兼容的插件
已知 **[不兼容列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)** 中的 Cordova 插件会被标记。可能存在 Capacitor 等效插件，你的代码需要进行重构。

### 更好的插件
具有**更优**等效 Capacitor 插件的 Cordova 插件将显示为可选建议（灯泡图标）。**更优**插件定义为由 Capacitor 团队官方支持的插件。一些 Cordova 插件已被弃用或不再维护，我们会跟踪这些插件并提供替代方案建议。

### 移除 Cordova

迁移的最后一步是选择 **移除 Cordova** 项目，这将备份你的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。此后，你将看到其他功能出现，如调试和运行。