---
title: Bundle Analysis
description: Capacitor 的 Visual Studio Code 扩展插件
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

控制应用程序中的 JavaScript 和资源文件数量最小化，有助于提升启动速度和运行时性能。

您可以使用本扩展来分析哪些 JavaScript 包和资源文件导致了应用体积膨胀，从而决定是否应该保留或移除现有/新增的依赖项。

## 包体积分析

点击 `Configuration` > `Statistics` 查看分解各 JavaScript 包大小的页面。

- 点击包名称可 `展开` 或 `收起` 查看内含的子包
- 点击包名称将跳转至编译后的 JavaScript 文件
- 分析过程会在开启 source map 的情况下构建生产环境应用

:::note
此处显示的是所有构建生成的包，并不意味着运行时都会加载。例如 `Ionic Core` 包会显示**所有** Ionic 组件，但您的应用在运行时只会加载实际**使用**的组件。
:::

## 资源文件分析

点击 `Configuration` > `Statistics` 并向下滚动，可查看应用中所有资源文件的大小分解。

包含字体、图标、样式表、图片及其他文件类型。

使用此工具可以识别：
- 体积过大的字体，或包含不需要的格式（例如已有 `woff2` 或 `woff` 版本时还保留 `ttf`）
- 体积过大的图片，可能使用了不恰当的格式（例如对照片类图像使用 `png`、`gif`）

:::note
此处显示所有资源文件，但并非所有文件都会在运行时加载。例如 [Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但实际只会加载应用中使用的图标。
:::