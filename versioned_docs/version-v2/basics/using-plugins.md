---
title: 使用 Capacitor 插件
description: 如何使用 Capacitor 插件
contributors:
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/basics/using-plugins
---

# 使用 Capacitor 插件

Capacitor 内置了多个核心插件，例如[相机插件](/apis/camera.md)和[文件系统插件](/apis/filesystem.md)。

不过在实际开发中，您的应用可能需要访问更多原生的功能，而不仅仅局限于 Capacitor 默认提供的那些。

幸运的是，您可以轻松扩展原生功能：只需编写少量原生代码，然后按照[插件开发指南](/plugins.md)将其封装成 Capacitor 插件即可。

## 查找插件

社区已经为各种原生功能开发了大量现成的插件，您可以直接集成到应用中。

可以参考我们的[社区插件列表](/plugins/community.md)来选择合适的插件。

## 使用 Cordova 和 Ionic Native 插件

Capacitor 还兼容大量[Cordova 插件](/cordova/using-cordova-plugins.md)，这为您提供了更丰富的选择空间。