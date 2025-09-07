---
title: Bundle Analysis
description: Capacitor 的 Visual Studio Code 扩展插件
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

控制应用中的 JavaScript 和资源文件体积对提升启动速度与运行时性能至关重要。

通过本扩展，您可以分析哪些 JavaScript 包和资源文件导致了应用的臃肿，从而决定是否应保留或移除现有/新引入的依赖项。

## 包体积分析

点击 `Configuration` > `Statistics` 查看 JavaScript 包的体积明细页面：

- 点击任意包可展开/折叠显示其内部包含的子包
- 点击包名可直接跳转至编译后的 JavaScript 文件
- 分析过程会在启用 source maps 的情况下构建生产环境应用

:::note
此处显示的是所有构建生成的包，但并非所有包都会在运行时加载。例如 `Ionic Core` 包会显示所有 Ionic 组件，但实际运行时只会加载应用中真正使用的组件。
:::

## 资源文件分析

点击 `Configuration` > `Statistics` 并向下滚动，可查看应用中所有资源文件的体积明细：

包含字体、图标、样式表、图片及其他文件类型。

该工具可帮助您识别：
- 体积过大或包含冗余格式的字体文件（例如已有 `woff2` 或 `woff` 格式时仍保留 `ttf`）
- 体积过大或使用不当格式的图片（例如对照片类图像使用 `png`、`gif` 格式）

:::note
此处显示的是所有资源文件，但并非所有文件都会在运行时加载。例如 [Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但实际只会加载应用中使用的图标。
:::