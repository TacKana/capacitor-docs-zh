---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 和 Capacitor 运行时通过使用 **Capacitor 插件** 进行通信。插件提供对原生 API（如相机、地理位置和文件系统）的访问，使您的 Web 应用能够使用这些功能。

## Capacitor 插件

Capacitor 团队维护了[一套用于常用 API 的 Capacitor 插件](/plugins/official.md)。此外，还有大量来自 [Capacitor 社区](https://github.com/capacitor-community/) 的 Capacitor 插件可用。如果您对 Capacitor 插件有建议，可以使用 [Capacitor 社区提案仓库](https://github.com/capacitor-community/proposals/)。

[了解更多关于 Capacitor 插件的信息 &#8250;](/plugins.mdx)

:::info
您想要 **制作** Capacitor 插件吗？浏览同一个提案仓库，并尝试按照[我们的插件创建指南](/plugins/creating-plugins/overview.md)制作一个！
:::

## Cordova 插件

找不到适合您项目的 Web API 或 Capacitor 插件？或者您正在[从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 有一个 Cordova 兼容层，试图模拟 Cordova 插件的功能。Capacitor 兼容大多数 Cordova 插件，但安装时可能还需要额外的步骤。

[了解更多关于在 Capacitor 应用中使用 Cordova 插件的信息 &#8203;](/plugins/cordova.md)

:::info
如果您因为找不到合适的 Capacitor 插件而使用了 Cordova 插件，是否可以考虑[为 Capacitor 社区创建一个提案](https://github.com/capacitor-community/proposals/)？
:::
