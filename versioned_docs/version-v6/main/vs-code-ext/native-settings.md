---
title: 原生设置
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您的原生项目的版本、Bundle ID 和显示名称可以轻松读取和更改。

![原生设置](/img/native-settings.png)

点击 `Configuration` > `Properties` 以更改：

- **Display Name** - 主屏幕上图标下方显示的名称。
- **Bundle Identifier** - 您的应用的唯一标识符。
- **Version Number** - 主版本号和次版本号（例如 `2.5`）。
- **Build Number** - 通常与版本号关联的构建号（例如 `3`）。

:::note
更改这些属性之一时，`ios` 和 `android` 原生项目都将被更改。
:::
