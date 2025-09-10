---
title: 使用插件
description: 如何在Capacitor中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView和Capacitor运行时通过**Capacitor插件**进行通信。插件为您的Web应用提供了访问原生API的能力，如相机、地理位置和文件系统等功能。

## Capacitor官方插件

Capacitor团队维护了[一套官方插件](/plugins/official.md)，涵盖常用API功能。此外，[Capacitor社区](https://github.com/capacitor-community/)还提供了大量插件资源。如果您对插件功能有需求建议，可以在[社区提案仓库](https://github.com/capacitor-community/proposals/)中提交。

[了解更多关于Capacitor插件的信息 &#8250;](/plugins.mdx)

:::info
想要**开发**Capacitor插件？浏览相同的提案仓库，并按照[我们的插件创建指南](/plugins/creating-plugins/overview.md)尝试开发一个吧！
:::

## Cordova插件

在项目中找不到合适的Web API或Capacitor插件？或者您正在[从Cordova迁移到Capacitor](/main/cordova/migration-strategy.md)？Capacitor提供了Cordova兼容层，可以模拟Cordova插件的功能。虽然Capacitor能与大多数Cordova插件兼容，但在安装时可能需要额外的配置步骤。

[了解如何在Capacitor应用中使用Cordova插件 &#8250;](/plugins/cordova.md)

:::info
如果您因为找不到合适的Capacitor插件而使用了Cordova插件，是否愿意为Capacitor社区[创建一个功能提案](https://github.com/capacitor-community/proposals/)呢?
:::