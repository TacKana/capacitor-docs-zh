---
title: Capacitor Plugins
description: Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins
---

# Capacitor 插件

Capacitor 中的插件让 JavaScript 能够直接与原生 API 进行交互。

通过插件，Web 应用可以充分利用原生 API 的全部能力，实现传统原生应用所能做的一切。插件特别适合封装那些在不同平台上可能使用完全不同 API 的常见原生操作，同时向 JavaScript 暴露出一致、跨平台的 API。

此外，Capacitor 的插件功能使得传统原生开发者和 Web 开发者组成的团队能够协同工作，各自负责应用的不同部分。

Capacitor 会在客户端自动生成 JavaScript 钩子，因此大多数插件只需要为 iOS 构建一个原生的 Swift/Obj-C 插件，和/或为 Android 构建一个 Java 插件。当然，为插件添加自定义 JavaScript 也是可行的，就像提供一个 JavaScript npm 包一样简单。
