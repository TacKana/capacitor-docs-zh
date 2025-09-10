---
title: 使用插件
description: 如何在Capacitor中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView与Capacitor运行时通过**Capacitor插件**进行通信。插件为您的Web应用提供了访问原生API的能力，如摄像头、地理位置和文件系统等。

## Capacitor插件

Capacitor团队维护了[一组官方插件](/plugins/official.md)用于常见的API需求。同时[Capacitor社区](https://github.com/capacitor-community/)也提供了大量可选插件。如果您有插件建议，可以使用[社区提案仓库](https://github.com/capacitor-community/proposals/)提交想法。

[了解更多关于Capacitor插件的信息 &#8250;](/plugins.mdx)

:::info
想要**开发**Capacitor插件？浏览相同的提案仓库，并尝试按照[我们的插件创建指南](/plugins/creating-plugins/overview.md)来开发一个吧！
:::

## Cordova插件

在项目中找不到合适的Web API或Capacitor插件？或者您正在[从Cordova迁移到Capacitor](/main/cordova/migration-strategy.md)？Capacitor提供了Cordova兼容层来模拟Cordova插件的功能。虽然Capacitor兼容大多数Cordova插件，但在安装时可能需要额外步骤。

[了解如何在Capacitor应用中使用Cordova插件 &#8250;](/plugins/cordova.md)

:::info
如果您因找不到合适的Capacitor插件而使用Cordova插件，是否愿意[为Capacitor社区创建提案](https://github.com/capacitor-community/proposals/)？
:::