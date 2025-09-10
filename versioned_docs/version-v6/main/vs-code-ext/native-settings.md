---
title: Native Settings
description: Capacitor 的 Visual Studio Code 扩展插件
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

您可以轻松查看和修改原生项目的版本号、Bundle ID 以及显示名称。

![原生设置](/img/native-settings.png)

通过点击 `Configuration` > `Properties` 可修改以下内容：

- **显示名称** - 应用图标下方显示的名称（即桌面快捷方式名称）
- **Bundle 标识符** - 应用程序的唯一标识符
- **版本号** - 主版本号和次版本号（如 `2.5`）
- **构建号** - 通常与版本号关联的构建编号（如 `3`）

:::note
修改任一属性时，`ios` 和 `android` 原生项目将同步更新。
:::