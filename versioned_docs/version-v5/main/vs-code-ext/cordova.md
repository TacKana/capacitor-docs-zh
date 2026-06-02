---
title: 从 Cordova 迁移
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

该扩展自动化了从 Cordova 迁移到 Capacitor 的过程。大多数 Cordova 插件可以在 Capacitor 应用程序中工作，但扩展还会提供改进建议。

## 迁移

如果检测到 Cordova，将显示 `Capacitor 迁移` 部分：
1. 点击每个项目并选择一个操作（`卸载`、`升级` 或 `忽略`）。
2. 最后点击 [`移除 Cordova`](#移除-cordova) 以完成迁移。

:::note
Capacitor 可以与大多数 Cordova 插件配合使用，只有少数 Cordova 插件不兼容，需要您在迁移后重构代码。
:::

### 不需要的插件
**不再需要**的 Cordova 插件将被标记出来，您可以点击 `卸载` 将其移除。

### 不兼容的插件
位于已知的**[不兼容列表](https://capacitorjs.com/docs/plugins/cordova#已知不兼容的插件)**中的 Cordova 插件将被标记。可能存在对应的 Capacitor 插件，但您的代码需要进行重构。

### 更好的插件
拥有**更好**的等效 Capacitor 插件的 Cordova 插件将显示为可选建议（灯泡图标）。**更好**的插件是指获得 Capacitor 团队官方支持的插件。某些 Cordova 插件已被弃用或不再维护，我们会追踪这些情况并提供替代方案建议。

### 移除 Cordova

迁移的最后一步是选择 **移除 Cordova** 项，它将备份您的 `config.xml` 并从 `package.json` 中移除 `cordova` 部分。之后，您将看到更多功能出现，如调试和运行。
