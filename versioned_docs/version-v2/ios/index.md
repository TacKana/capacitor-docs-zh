---
title: Capacitor iOS 文档
description: 在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios
---

# Capacitor iOS 文档

Capacitor 提供了一个原生的 iOS 桥接层，使开发者能够在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信。

Capacitor iOS 应用通过 Xcode 进行配置和管理，依赖项由 CocoaPods 管理。

## 快速开始

构建 iOS 应用需要安装一些 iOS 开发依赖项，包括 Xcode 11 和 Xcode 命令行工具。

> 注意：也可以在非 Mac 环境下开发和构建 iOS 应用，例如使用 Ionic Appflow 的 [Package 功能](https://ionicframework.com/docs/appflow/package/intro)。更多信息请咨询您选择的服务提供商。

### 创建 iOS 应用

默认情况下，每个 Capacitor 项目都会创建一个 iOS 项目。如果您正在将 Capacitor 添加到现有项目中，可以手动添加 iOS 项目：

```bash
npx cap add ios
npx cap sync
```

`sync` 命令会更新依赖项，并将所有 Web 资源复制到您的项目中。您也可以运行：

```bash
npx cap copy
```

此命令仅复制 Web 资源，如果您确定不需要更新原生依赖，这种方式会更快。

### 在 Xcode 中打开项目

要在 Xcode 中打开项目，请运行：

```bash
npx cap open ios
```

### 运行您的应用

打开 Xcode 后，只需点击播放按钮即可在模拟器或设备上运行您的应用。

![运行您的应用](../../../static/img/v3/docs/ios/running.png)

## 后续步骤

现在您可以继续开发和构建您的应用了。利用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来完善您的应用。

## 延伸阅读

请参考以下指南以获取更多相关信息：

[配置 iOS 及设置权限 &#8250;](/ios/configuration.md)

[为 iOS 构建原生插件 &#8250;](/plugins.md)