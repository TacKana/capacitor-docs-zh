---
title: 开始使用
description: 在 JavaScript 和原生 Swift 或 Objective-C 代码之间进行通信
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS 文档

Capacitor 具有一个原生 iOS 运行时，使开发者能够在 JavaScript 和原生 Swift 或 Objective-C 代码之间进行通信。

Capacitor iOS 应用使用 Xcode 和 [CocoaPods](https://cocoapods.org/) 进行配置和管理。

## iOS 支持

支持 iOS 13+。需要 Xcode 13+（请参阅[环境设置](/main/getting-started/environment-setup.md#ios-要求)）。Capacitor 使用 [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)，而不是已弃用的 [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview)。

## 添加 iOS 平台

首先，安装 `@capacitor/ios` 包。

```bash
npm install @capacitor/ios
```

然后，添加 iOS 平台。

```bash
npx cap add ios
```

## 打开 iOS 项目

要在 Xcode 中打开项目，请运行：

```bash
npx cap open ios
```

或者，您也可以手动运行以下命令打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 运行您的应用

您可以在命令行或使用 Xcode 运行您的应用。

### 在命令行中运行

要在设备或模拟器上运行项目，请运行：

```bash
npx cap run ios
```

该命令将提示您选择一个目标。[了解关于 `run` 的更多信息](/cli/commands/run.md)。

### 在 Xcode 中运行

在 Xcode 中，首先选择设备或模拟器，然后点击播放按钮运行您的应用。

![运行您的应用](../../../../static/img/v4/docs/ios/running.png)

## 故障排除

如果在入门过程中遇到任何问题，可以查阅 [iOS 故障排除指南](/main/ios/troubleshooting.md)。如果您需要帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

您现在可以继续开发和构建您的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或者自定义原生代码来构建应用的其余部分。

## 延伸阅读

请遵循以下指南以获取关于每个主题的更多信息：

[配置和设置 iOS 权限 &#8250;](/main/ios/configuration.md)

[构建 iOS 原生插件 &#8250;](/plugins.mdx)
