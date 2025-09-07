---
title: Capacitor iOS 文档
description: 实现 JavaScript 与原生 Swift/Objective-C 代码的通信
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios
---

# Capacitor iOS 文档

Capacitor 提供了原生 iOS 桥接功能，使开发者能够在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信。

Capacitor iOS 应用通过 Xcode 进行配置和管理，依赖项由 CocoaPods 管理。

## 开始使用

构建 iOS 应用需要安装一些开发依赖环境，包括 Xcode 11 和 Xcode 命令行工具。

> 注意：开发者可以在没有 Mac 设备的情况下进行 iOS 应用开发和构建，例如使用 Ionic Appflow 的 [Package 功能](https://ionicframework.com/docs/appflow/package/intro)。具体请咨询您选择的服务提供商。

### 创建 iOS 应用

默认情况下，每个 Capacitor 项目都会自动创建 iOS 工程。如需向现有项目添加 Capacitor，可以手动执行以下命令：

```bash
npx cap add ios
npx cap sync
```

`sync` 命令会更新依赖项并将 web 资源复制到项目中。也可以单独执行：

```bash
npx cap copy
```

该命令仅复制 web 资源，在确认不需要更新原生依赖时执行速度更快。

### 打开 iOS 工程

在 Xcode 中打开项目只需运行：

```bash
npx cap open ios
```

### 运行应用

Xcode 启动后，点击播放按钮即可在模拟器或真机上运行应用。

![运行应用](../../../static/img/v3/docs/ios/running.png)

## 后续步骤

现在您可以继续开发和构建应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或者自定义原生代码来完成应用的其余部分。

## 延伸阅读

以下指南提供了各主题的详细信息：

[iOS 配置与权限设置 &#8250;](/ios/configuration.md)

[为 iOS 构建原生插件 &#8250;](/plugins.md)