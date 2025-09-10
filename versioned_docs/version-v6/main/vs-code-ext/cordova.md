---
title: 从 Cordova 迁移
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

本扩展可自动完成从 Cordova 到 Capacitor 的迁移体验。大多数 Cordova 插件在 Capacitor 应用中都能正常工作，但扩展仍会提供改进建议。

## 迁移步骤

当检测到 Cordova 时，将显示 `Capacitor Migration` 部分：
1. 点击每个项目并选择操作（`Uninstall`、`Upgrade` 或 `Ignore`）。
2. 最后点击 [`Remove Cordova`](#remove-cordova) 完成迁移。

:::note
Capacitor 与大多数 Cordova 插件兼容，仅有少数不兼容的 Cordova 插件需要在迁移后重构代码。
:::

### 不再需要的插件
对于您**不再需要**的 Cordova 插件，系统会进行标记，您可以点击 `Uninstall` 将其移除。

### 不兼容的插件
对于已知**[不兼容列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)**中的 Cordova 插件，系统会进行标记。可能存在对应的 Capacitor 插件，但您的代码需要重构。

### 更优插件
对于存在**更优**等效 Capacitor 插件的 Cordova 插件，将显示为可选建议（灯泡图标）。**更优**插件是指获得 Capacitor 团队官方支持的插件。部分 Cordova 插件已被弃用或不再维护，我们会跟踪这些插件并提供替代方案建议。

### 移除 Cordova

迁移的最后一步是选择 **Remove Cordova** 项目，该操作将备份您的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。此后，您将看到调试和运行等附加功能出现。