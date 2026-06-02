---
title: 包体积分析
description: Capactior 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

将应用程序中的 JavaScript 和资源文件保持在最小数量有助于提高启动和运行时性能。

您可以使用扩展来分析哪些 JavaScript 包和资源文件导致了应用程序的*臃肿*，从而帮助决定当前或新的依赖是否应该使用或移除。

## Bundle 成本

点击 `Configuration` > `Statistics` 查看页面，其中详细列出了每个 JavaScript Bundle 的大小。

- 您可以点击一个 bundle 来`展开`或`折叠`，显示其中包含的 bundles。
- 点击 bundle 将跳转到编译后的 JavaScript 文件
- 包体积分析过程将以生产模式构建您的应用程序，并开启 source maps。

:::note
该过程会显示所有已构建的 bundles。但这并不意味着所有 bundles 都会在运行时被加载。例如 `Ionic Core` bundle 显示了**所有** Ionic 组件，而您的应用在运行时只会加载它**使用**的组件。
:::

## 资源文件成本

点击 `Configuration` > `Statistics` 查看页面（您需要滚动到底部），其中详细列出了应用中所有资源文件的大小。

这包括字体、图标、样式表、图片和其他文件。

使用此工具可以识别：
- 过大或包含不需要格式的字体（例如当您已经有 `woff2` 或 `woff` 版本时仍有 `ttf`）
- 过大的图片，可能使用了不恰当的图片格式（例如对照片使用了 `png`、`gif`）

:::note
会显示所有资源文件，但并非所有资源文件都会在运行时加载。例如 [Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但只有您在应用中使用的图标才会被加载。
:::
