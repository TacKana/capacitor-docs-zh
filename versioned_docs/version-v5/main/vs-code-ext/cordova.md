---
title: 从 Cordova 迁移
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展可自动化实现从 Cordova 到 Capacitor 的迁移体验。大多数 Cordova 插件在 Capacitor 应用中都能正常工作，但扩展仍会提供改进建议。

## 迁移流程

如果检测到 Cordova，将显示 `Capacitor Migration` 迁移选项：
1. 点击每个项目并选择操作（`Uninstall` 卸载、`Upgrade` 升级或 `Ignore` 忽略）。
2. 最后点击 [`Remove Cordova` 移除 Cordova](#remove-cordova) 完成迁移。

:::note
Capacitor 与大多数 Cordova 插件兼容，只有少数不兼容的 Cordova 插件需要在迁移后重构代码。
:::

### 不再需要的插件
对于**不再需要**的 Cordova 插件，系统会进行标记，你可以点击 `Uninstall` 卸载来移除它们。

### 不兼容的插件
对于已知的**[不兼容插件列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)**中的 Cordova 插件，系统会进行标记。可能存在对应的 Capacitor 插件，但你的代码需要重构。

### 更优的插件
对于有**更优**等效 Capacitor 插件的 Cordova 插件，会显示为可选建议（灯泡图标）。**更优**插件是指由 Capacitor 团队官方支持的插件。一些 Cordova 插件已被弃用或不再维护，我们会跟踪这些插件并提供替代建议。

### 移除 Cordova

迁移的最后一步是选择 **Remove Cordova** 移除 Cordova 选项，该操作会备份你的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。完成后，你将看到更多功能出现，如调试和运行。