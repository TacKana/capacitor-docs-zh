---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 与 Capacitor 运行环境通过 **Capacitor 插件** 进行通信。插件为你的 Web 应用提供了访问原生 API（如相机、地理定位和文件系统）的能力。

## Capacitor 插件

Capacitor 团队为常用的 API 维护 [一套官方 Capacitor 插件](/plugins/official.md)。此外，[Capacitor 社区](https://github.com/capacitor-community/) 也提供了大量可用的插件。如果你对 Capacitor 插件有任何建议，可以使用 [Capacitor 社区提案仓库](https://github.com/capacitor-community/proposals/)。

[了解更多关于 Capacitor 插件的信息 &#8250;](/plugins.mdx)

:::info
你想 **开发** Capacitor 插件吗？浏览同一个提案仓库，并尝试 [按照我们的插件创建指南](/plugins/creating-plugins/overview.md) 来制作一个吧！
:::

## Cordova 插件

在你的项目中找不到确切的 Web API 或 Capacitor 插件？或者你正在 [从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 提供了一个 Cordova 兼容层，旨在模拟 Cordova 插件的功能。Capacitor 与大多数 Cordova 插件兼容，但在安装它们时可能需要一些额外的步骤。

[了解更多关于在 Capacitor 应用中使用 Cordova 插件的信息 &#8250;](/plugins/cordova.md)

:::info
如果你因为找不到合适的 Capacitor 插件而使用了 Cordova 插件，介意 [为 Capacitor 社区创建一个提案](https://github.com/capacitor-community/proposals/) 吗？
:::