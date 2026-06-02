---
title: 包分析
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

将应用程序中的 JavaScript 和资源量保持在最低水平将有助于提高启动和运行时性能。

您可以使用扩展来分析哪些 JavaScript 包和资源导致了应用的_臃肿_，以帮助决定是否使用或移除当前或新的依赖。

## 包成本

点击 `Configuration` > `Statistics` 查看详细说明每个 JavaScript 包大小的页面。

- 您可以点击一个包来`展开`或`折叠`它，显示内部包含的包。
- 点击一个包将打开编译后的 JavaScript 文件。
- 包分析过程将以生产模式构建您的应用，并启用 source map。

:::note
此过程会显示所有构建的包。这并不意味着所有包都会在运行时加载。例如，`Ionic Core` 包显示了**所有** Ionic 组件，而您的应用在运行时只会加载它**使用**的组件。
:::

## 资源成本

点击 `Configuration` > `Statistics` 查看页面（您需要向下滚动），详细说明应用中所有资源的大小。

这包括字体、图标、样式表、图片和其他文件。

使用此工具来识别：
- 过大的字体，或者包含您不需要的格式（例如，当您已经有 `woff2` 或 `woff` 版本时的 `ttf`）
- 过大的图片，可能使用了不合适的图片格式（例如，对摄影图片使用 `png`、`gif`）

:::note
所有资源都会显示。并非所有资源都会在运行时加载。例如，[Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但只有您在应用中使用的图标才会被加载。
:::
