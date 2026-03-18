---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 与 Capacitor 运行时通过使用 **Capacitor 插件** 进行通信。插件让您的 Web 应用能够访问原生 API，例如相机、地理定位和文件系统。

## Capacitor 插件

Capacitor 团队维护了 [一套官方 Capacitor 插件](/plugins/official.md)，用于常用的 API。[Capacitor 社区](https://github.com/capacitor-community/) 也提供了大量插件。如果您对 Capacitor 插件有建议，可以前往 [Capacitor 社区提案仓库](https://github.com/capacitor-community/proposals/) 提出。

[了解更多关于 Capacitor 插件的信息 &#8250;](/plugins.mdx)

:::info
您想 **开发** Capacitor 插件吗？请浏览同一个提案仓库，并尝试 [按照我们的插件创建指南](/plugins/creating-plugins/overview.md) 开发一个吧！
:::

## Cordova 插件

在您的项目中找不到确切的 Web API 或 Capacitor 插件？或者您正在 [从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 提供了 Cordova 兼容层，旨在模拟 Cordova 插件的功能。Capacitor 兼容大多数 Cordova 插件，但在安装时可能需要额外的步骤。

[详细了解如何在 Capacitor 应用中使用 Cordova 插件 &#8250;](/plugins/cordova.md)

:::info
如果您因找不到合适的 Capacitor 插件而使用了 Cordova 插件，是否愿意 [为 Capacitor 社区创建一个提案](https://github.com/capacitor-community/proposals/)？
:::