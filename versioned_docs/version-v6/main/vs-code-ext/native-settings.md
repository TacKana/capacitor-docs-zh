---
title: Native Settings
description: Visual Studio Code 的 Capacitor 扩展
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您可以轻松地查看和修改原生项目的版本、Bundle ID 和显示名称。

![原生设置](/img/native-settings.png)

点击 `Configuration` > `Properties` 进行修改：

- **Display Name** - 在主屏幕图标下方显示的应用名称。
- **Bundle Identifier** - 您应用程序的唯一标识符。
- **Version Number** - 主版本号和次版本号（例如 `2.5`）。
- **Build Number** - 通常与版本号关联的构建号（例如 `3`）。

:::note
修改其中任意一个属性时，`ios` 和 `android` 原生项目都会同时更改。
:::