---
title: Capacitor 插件
description: Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins
---

# Capacitor 插件

Capacitor 中的插件使 JavaScript 能够直接与原生 API 交互。

通过插件，Web 应用可以访问原生 API 的全部能力，完成传统原生应用所能做的一切。插件特别适合封装那些在不同平台上可能使用截然不同的 API、但需要向 JavaScript 暴露一致且跨平台 API 的常见原生操作。

此外，Capacitor 的插件能力使得同时拥有传统原生开发者和 Web 开发者的团队能够在应用的不同部分协同工作。

Capacitor 会自动在客户端生成 JavaScript 钩子，因此大多数插件只需为 iOS 构建原生 Swift/Obj-C 插件，和/或为 Android 构建 Java 插件。当然，也可以为插件添加自定义 JavaScript，就像提供 JavaScript npm 包一样。
