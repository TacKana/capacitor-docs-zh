---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 与 Capacitor 运行时通过 **Capacitor 插件** 进行通信。插件为您的 Web 应用提供了访问原生 API（如相机、地理位置和文件系统）的能力。

## Capacitor 官方插件

Capacitor 团队维护了 [一系列官方插件](/plugins/official.md)，这些插件覆盖了常用的 API。此外，[Capacitor 社区](https://github.com/capacitor-community/) 还提供了大量第三方插件。如果您有插件需求建议，可以在 [Capacitor 社区提案仓库](https://github.com/capacitor-community/proposals/) 中提交。

[了解更多关于 Capacitor 插件的信息 &#8250;](/plugins.mdx)

:::info
想要 **开发** Capacitor 插件？浏览同一个提案仓库，并按照 [我们的插件创建指南](/plugins/creating-plugins/overview.md) 尝试开发一个吧！
:::

## Cordova 插件

在项目中找不到合适的 Web API 或 Capacitor 插件？或者您正在 [从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 提供了 Cordova 兼容层，可以模拟 Cordova 插件的功能。Capacitor 兼容大多数 Cordova 插件，但在安装时可能需要额外步骤。

[了解如何在 Capacitor 应用中使用 Cordova 插件 &#8250;](/plugins/cordova.md)

:::info
如果您因为找不到合适的 Capacitor 插件而使用了 Cordova 插件，是否愿意 [为 Capacitor 社区创建一个提案](https://github.com/capacitor-community/proposals/)？
:::