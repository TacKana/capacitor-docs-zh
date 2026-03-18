---
title: Bundle Analysis
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

将应用程序中的 JavaScript 和资源（Assets）保持在最低限度，将有助于提升启动和运行时的性能。

您可以使用此扩展来分析哪些 JavaScript 包和资源导致应用程序“臃肿”，从而帮助决定是否应该使用或移除当前或新增的依赖项。

## 包成本

点击 `Configuration` > `Statistics` 查看一个页面，该页面详细分解了每个 JavaScript 包的大小。

- 您可以点击一个包来 `展开` 或 `折叠`，以显示其内部包含的包。
- 点击某个包将访问编译后的 JavaScript 文件。
- 包分析过程将在生产环境中构建您的应用程序，并启用源映射（source maps）。

:::note
该过程显示所有已构建的包。这并不意味着运行时所有包都会被加载。例如，`Ionic Core` 包显示了 **所有** Ionic 组件，但您的应用程序在运行时只会加载它 **使用** 的组件。
:::

## 资源成本

点击 `Configuration` > `Statistics` 查看一个页面（您可能需要向下滚动），该页面详细分解了应用程序中所有资源的大小。

这包括字体、图标、样式表、图像和其他文件。

使用此工具可以识别：
- 字体文件过大，或者包含您不需要的格式（例如，在已有 `woff2` 或 `woff` 版本的情况下仍包含 `ttf` 格式）
- 图像文件过大，可能使用了不恰当的图像格式（例如，对摄影图像使用 `png` 或 `gif` 格式）

:::note
显示所有资源。并非所有资源都会在运行时加载。例如，[Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但只有您在应用程序中使用的图标才会被加载。
:::