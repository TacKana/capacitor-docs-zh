---
title: 入门指南
description: 在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS 文档

Capacitor 提供了一个原生 iOS 运行时，使开发者能够在 JavaScript 与原生 Swift 或 Objective-C 代码之间进行通信。

Capacitor iOS 应用通过 Xcode 和 [CocoaPods](https://cocoapods.org) 进行配置和管理。

## iOS 支持

支持 iOS 15+ 版本。需要 Xcode 26.0+（参见[环境设置](/main/getting-started/environment-setup.md#ios-requirements)）。Capacitor 使用 [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)，而非已弃用的 [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview)。

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

或者，你也可以通过运行以下命令手动打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 运行你的应用

你可以通过命令行或 Xcode 运行你的应用。

### 通过命令行运行

要在设备或模拟器上运行项目，请运行：

```bash
npx cap run ios
```

该命令会提示你选择一个目标。了解更多关于 [`run` 命令的信息](/cli/commands/run.md)。

### 无线 iOS 设备

要启用无线 iOS 设备运行，请确保你的设备已与访达配对，并选择“在 Wi-Fi 上显示此 iPhone”选项：

![启用无线 iPhone 调试](../../../static/img/wireless-iphone.png)

你的设备现在应该会出现在 `npx cap run ios --list` 提供的可用设备列表中。

### 在 Xcode 中运行

在 Xcode 中，首先选择设备或模拟器，然后点击播放按钮运行你的应用。

![运行你的应用](../../../static/img/v6/docs/ios/running.png)

## 故障排除

如果在入门过程中遇到任何问题，可以查阅 [iOS 故障排除指南](/main/ios/troubleshooting.md)。如果需要帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions)。

## 后续步骤

你现在可以继续开发和构建你的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或者自定义原生代码来完善你的应用。

## 延伸阅读

如需了解更多关于每个主题的信息，请参考以下指南：

[配置 iOS 及设置权限 &#8250;](/main/ios/configuration.md)

[为 iOS 构建原生插件 &#8250;](/plugins/creating-plugins/ios-guide.md)