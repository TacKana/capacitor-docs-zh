---
title: Bundle Analysis
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

控制应用程序中的 JavaScript 和资源文件体积最小化，有助于提升启动和运行时性能。

通过本扩展可以分析哪些 JavaScript 打包文件和资源导致了应用臃肿，从而帮助您决定是否应该使用或移除现有/新增的依赖项。

## 打包体积分析

点击 `Configuration` > `Statistics` 查看分解各 JavaScript 打包文件体积的页面。

- 点击任意打包文件可 `展开` 或 `折叠` 查看其包含的内容
- 点击打包文件名将跳转至编译后的 JavaScript 文件
- 打包分析过程会在启用 source map 的情况下构建生产环境应用

:::note
分析结果会显示所有构建出的打包文件，但这不意味着运行时所有文件都会被加载。例如 `Ionic Core` 打包会显示**所有** Ionic 组件，而实际运行时只会加载应用中**使用到**的组件。
:::

## 资源成本分析

点击 `Configuration` > `Statistics` 查看页面（需向下滚动）可分解应用中所有资源文件的大小。

包含字体、图标、样式表、图片及其他文件。

该工具可帮助识别：
- 体积过大的字体，或包含不需要的格式（如已具备 `woff2` 或 `woff` 版本时仍包含 `ttf`）
- 体积过大的图片，可能使用了不恰当的图片格式（如对摄影图片使用 `png`、`gif`）

:::note
显示的是所有资源文件，并非所有资源都会在运行时加载。例如 [Ionicons](https://ionic.io/ionicons/) 可能显示数百个图标，但实际只会加载应用中用到的那些。
:::