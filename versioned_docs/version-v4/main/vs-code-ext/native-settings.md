---
title: Native Settings
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您可以轻松查看和更改原生项目的版本号、Bundle Id 和显示名称。

![原生设置](/img/native-settings.png)

点击 `Configuration`（配置） > `Properties`（属性）可更改：

- **显示名称** - 在应用主屏幕图标下方显示的名称。
- **Bundle 标识符** - 您应用程序的唯一标识符。
- **版本号** - 主要和次要版本号（例如 `2.5`）。
- **构建号** - 通常与版本号关联的构建号（例如 `3`）。

:::note
更改其中任何一项时，它将同时更改 `ios` 和 `android` 原生项目，从而确保两个项目保持同步。
:::