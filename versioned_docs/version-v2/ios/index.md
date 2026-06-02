---
title: Capacitor iOS 文档
description: 在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios
---

# Capacitor iOS 文档

Capacitor 提供了一个原生 iOS 桥接，使开发者能够实现 JavaScript 与原生 Swift 或 Objective-C 代码之间的通信。

Capacitor iOS 应用通过 Xcode 进行配置和管理，依赖项由 CocoaPods 管理。

## 开始使用

构建 iOS 应用需要安装一些 iOS 开发依赖项，包括 Xcode 11 和 Xcode 命令行工具。

> 注意：即使没有 Mac 也可以开发和构建 iOS 应用，例如使用 Ionic Appflow 的 [Package 功能](https://ionicframework.com/docs/appflow/package/intro)。请咨询您选择的服务以获取更多信息。

### 创建 iOS 应用

默认情况下，每个 Capacitor 项目都会创建一个 iOS 项目。如果您正在为现有项目添加 Capacitor，可以使用以下命令手动添加 iOS 项目：

```bash
npx cap add ios
npx cap sync
```

`sync` 命令会更新依赖项，并将 web 资源复制到您的项目中。您也可以运行：

```bash
npx cap copy
```

仅复制 web 资源，如果您知道不需要更新原生依赖项，这样会更快。

### 打开 iOS 项目

要在 Xcode 中打开项目，请运行：

```bash
npx cap open ios
```

### 运行您的应用

打开 Xcode 后，只需点击 Play 按钮即可在模拟器或设备上运行您的应用。

![Running your app](../../../static/img/v3/docs/ios/running.png)

## 下一步

您现在可以继续开发和构建您的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来完成应用的其余部分。

## 延伸阅读

请阅读以下指南了解更多关于每个主题的信息：

[配置和设置 iOS 权限 &#8250;](/ios/configuration.md)

[构建 iOS 原生插件 &#8250;](/plugins.md)