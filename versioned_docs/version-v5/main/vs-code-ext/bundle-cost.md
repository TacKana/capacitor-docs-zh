---
title: Bundle Analysis
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

保持应用程序中的 JavaScript 和资源文件数量最小化，有助于提升启动和运行时的性能。

你可以使用此扩展来分析哪些 JavaScript 包和资源文件导致了应用程序的**臃肿**，从而帮助你决定是否应该使用或移除当前或新的依赖项。

## 包成本

点击 `Configuration` > `Statistics` 可查看一个页面，该页面会详细列出每个 JavaScript 包的大小。

- 你可以点击一个包来**展开**或**折叠**它，以显示其中包含的包。
- 点击一个包将访问编译后的 JavaScript 文件
- 进行包分析的过程将会在生产模式下构建你的应用程序，并启用源映射。

:::note
该过程会显示所有已构建的包。但这并不意味着所有包都会在运行时加载。例如，`Ionic Core` 包显示的是**所有** Ionic 组件，而你的应用程序在运行时只会加载它**使用**的组件。
:::

## 资源成本

点击 `Configuration` > `Statistics` 可查看一个页面（你需要向下滚动），该页面会详细列出应用程序中所有资源文件的大小。

这包括字体、图标、样式表、图像和其他文件。

使用此工具可以识别：
- 过大或包含你不需要的格式的字体（例如，当你已经有了 `woff2` 或 `woff` 版本时，还包含 `ttf` 格式）
- 过大或可能使用了不合适的图像格式的图像（例如，对照片类图像使用 `png`、`gif` 格式）

:::note
所有资源文件都会显示。但并非所有资源文件都会在运行时加载。例如，[Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但只有你在应用程序中使用的图标才会被加载。
:::