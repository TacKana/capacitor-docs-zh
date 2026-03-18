---
title: Migrate from Cordova
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展自动处理从 Cordova 迁移到 Capacitor 的流程。大多数 Cordova 插件在 Capacitor 应用中仍可工作，但扩展会提供改进建议。

## 迁移步骤

如果检测到 Cordova，将出现 `Capacitor Migration` 部分：
1. 点击每个项目并选择一个操作（`Uninstall`、`Upgrade` 或 `Ignore`）。
2. 最后点击 [`Remove Cordova`](#remove-cordova) 完成迁移。

:::note
Capacitor 兼容大多数 Cordova 插件，只有少数不兼容的 Cordova 插件需要在迁移后重构代码。
:::

### 不再需要的插件
对于您**不再需要**的 Cordova 插件，将进行标记，您可以点击 `Uninstall` 来移除它们。

### 不兼容的插件
对于已知**[不兼容列表](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)**中的 Cordova 插件，将进行标记。可能存在等效的 Capacitor 插件，您的代码需要进行重构。

### 更优插件
对于存在**更优**等效 Capacitor 插件的 Cordova 插件，将显示为可选建议（灯泡图标）。**更优**插件是指获得 Capacitor 团队官方支持的插件。一些 Cordova 插件已被弃用或不再维护，我们会追踪这些情况并提供替代建议。

### 移除 Cordova

迁移的最后一步是选择 **Remove Cordova** 项目，这将备份您的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。此后，您将看到更多功能出现，例如调试和运行。