---
title: Bundle Analysis
description: Visual Studio Code 扩展工具（专为 Capacitor 设计）
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

将应用程序中的 JavaScript 和资源文件保持在最低水平，有助于提升启动和运行时的性能。

您可以使用此扩展来分析哪些 JavaScript 包和资源文件导致了应用程序的 **臃肿**，从而帮助您决定是否应该使用或移除当前或新的依赖项。

## 包成本分析

点击 `Configuration` > `Statistics`，即可查看一个页面，该页面会详细分解每个 JavaScript 包的大小。

- 您可以点击一个包来 **展开** 或 **折叠**，以查看其内部包含哪些包。
- 点击某个包将会跳转到编译后的 JavaScript 文件。
- 包分析过程将在启用 source map 的情况下，以生产模式构建您的应用程序。

:::note
此过程会显示所有已构建的包。但这并不意味着所有包都会在运行时被加载。例如，`Ionic Core` 包显示了 **所有** Ionic 组件，而您的应用程序在运行时只会加载它 **实际使用** 的组件。
:::

## 资源成本分析

点击 `Configuration` > `Statistics` 查看页面（您可能需要向下滚动），该页面会详细分解您应用程序中所有资源文件的大小。

这包括字体、图标、样式表、图像以及其他文件。

使用此工具可以识别：
- 过大的字体，或者包含您不需要的格式的字体（例如，在已有 `woff2` 或 `woff` 版本的情况下还包含 `ttf` 格式）。
- 过大的图像，可能使用了不合适的图像格式（例如，对摄影图像使用 `png`、`gif` 格式）。

:::note
这里会显示所有资源文件，但并非所有资源都会在运行时被加载。例如，[Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但只有您在应用程序中使用的图标才会被加载。
:::