---
title: 入门指南
description: 实现JavaScript与原生Swift或Objective-C代码之间的通信
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS 文档

Capacitor 提供了原生 iOS 运行时环境，使开发者能够在 JavaScript 与原生 Swift 或 Objective-C 代码之间建立通信。

Capacitor iOS 应用通过 Xcode 和 [CocoaPods](https://cocoapods.org/) 进行配置和管理。

## iOS 支持要求

支持 iOS 13+ 系统。需要 Xcode 15.0+ 版本（参见[环境配置](/main/getting-started/environment-setup.md#ios-requirements)）。Capacitor 使用 [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)，而非已弃用的 [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview)。

## 添加 iOS 平台

首先安装 `@capacitor/ios` 包：

```bash
npm install @capacitor/ios
```

然后添加 iOS 平台：

```bash
npx cap add ios
```

## 打开 iOS 项目

在 Xcode 中打开项目运行：

```bash
npx cap open ios
```

也可以手动通过以下命令打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 运行应用

您可以通过命令行或 Xcode 运行应用。

### 命令行运行

在设备或模拟器上运行项目：

```bash
npx cap run ios
```

该命令会提示选择运行目标。了解更多关于 [`run` 命令](/cli/commands/run.md)的信息。

### 在 Xcode 中运行

在 Xcode 中，先选择设备或模拟器，然后点击播放按钮运行应用。

![运行应用](/img/v6/docs/ios/running.png)

## 问题排查

如果在入门阶段遇到任何问题，可以参考 [iOS 问题排查指南](/main/ios/troubleshooting.md)。如需帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

现在您可以继续开发和构建应用了。使用各类可用 API、Capacitor 或 Cordova 插件，或自定义原生代码来完成应用的其余部分。

## 延伸阅读

了解更多专题内容可查阅以下指南：

[iOS 配置与权限设置 &#8250;](/main/ios/configuration.md)

[为 iOS 构建原生插件 &#8250;](/plugins/creating-plugins/ios-guide.md)