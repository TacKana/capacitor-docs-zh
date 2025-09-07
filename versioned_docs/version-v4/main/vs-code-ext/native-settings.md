---
title: Native Settings
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您可以轻松查看和修改原生项目的版本号、Bundle ID 和显示名称。

![原生设置](/img/native-settings.png)

点击 `Configuration` > `Properties` 进行修改：

- **显示名称** - 在主屏幕图标下方显示的名称。
- **Bundle Identifier** - 应用程序的唯一标识符。
- **版本号** - 主版本号和次版本号（例如 `2.5`）。
- **构建号** - 通常与版本号关联的构建号（例如 `3`）。

:::note
修改其中任意一项将会同时更新 `ios` 和 `android` 原生项目，确保两个项目保持同步。
:::