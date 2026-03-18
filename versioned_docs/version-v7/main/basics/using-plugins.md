---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 与 Capacitor 运行时通过 **Capacitor 插件** 进行通信。插件为你的 Web 应用提供了访问原生 API（例如摄像头、地理位置和文件系统）的能力。

## Capacitor 插件

Capacitor 团队维护着 [一套官方 Capacitor 插件](/plugins/official.md)，用于访问常用的 API。此外，[Capacitor 社区](https://github.com/capacitor-community/)也提供了大量可用的 Capacitor 插件。如果你对某个 Capacitor 插件有需求，可以在 [Capacitor 社区提案仓库](https://github.com/capacitor-community/proposals/)中提出。

[了解更多关于 Capacitor 插件的信息 &#8250;](/plugins.mdx)

:::info
想要 **创建** Capacitor 插件吗？浏览同一个提案仓库，并尝试 [按照我们的插件创建指南](/plugins/creating-plugins/overview.md) 制作一个！
:::

## Cordova 插件

在你的项目中找不到确切的 Web API 或 Capacitor 插件？或者你正在 [从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 提供了一个 Cordova 兼容层，旨在模拟 Cordova 插件的功能。Capacitor 兼容大多数 Cordova 插件，但在安装它们时可能需要额外的步骤。

[了解更多关于在 Capacitor 应用中使用 Cordova 插件的信息 &#8250;](/plugins/cordova.md)

:::info
如果你因为找不到合适的 Capacitor 插件而使用了 Cordova 插件，是否愿意 [为 Capacitor 社区创建一个提案](https://github.com/capacitor-community/proposals/)？
:::