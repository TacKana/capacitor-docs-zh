---
title: Native Settings
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您可以轻松地读取和修改原生项目的版本号、包标识符和显示名称。

![Native Settings](/img/native-settings.png)

点击 `Configuration` > `Properties` 进行修改：

- **显示名称 (Display Name)** - 在主屏幕图标下方显示的应用名称。
- **包标识符 (Bundle Identifier)** - 您应用程序的唯一标识符。
- **版本号 (Version Number)** - 主要和次要版本号（例如 `2.5`）。
- **构建号 (Build Number)** - 通常与版本号相关联的构建号（例如 `3`）。

:::note
修改这些属性时，`ios` 和 `android` 两个原生项目将同时被更新。
:::