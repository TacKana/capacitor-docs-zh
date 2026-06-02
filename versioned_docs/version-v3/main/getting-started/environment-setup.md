---
title: 环境设置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 有许多依赖项，具体取决于您目标平台和开发所用的操作系统。

## 系统要求

您至少需要 [NodeJS 12 LTS](https://nodejs.org) 或更高版本才能开始。对于特定平台，请遵循以下每个指南以确保您已安装正确的依赖项。

## iOS 开发

要构建 iOS 应用，您需要 **macOS** 系统。您还需要下载并设置 [Xcode](https://developer.apple.com/xcode/)。如果您在 Linux 或 Windows 上进行开发，可以跳过此部分。

> [Ionic Appflow](http://ionicframework.com/appflow) 可用于执行 iOS 云构建（如果您没有 Mac）。

### CocoaPods

安装 [CocoaPods](https://cocoapods.org/)，它用于管理 iOS 的 Capacitor 包。

```bash
sudo gem install cocoapods
```

### Xcode 命令行工具

通过打开 **Xcode -> Preferences -> Locations** 并从下拉列表中选择最新版本来安装 **Xcode 命令行工具**。

![Xcode 位置偏好设置](../../../../static/img/v3/docs/ios/xcode-preferences-location.png)

## Android 开发

要构建 Android 应用，您需要下载并设置 [Android Studio](https://developer.android.com/studio/index.html)。

### Android SDK

开发 Android 应用需要安装一些 Android SDK 包。请确保安装了 Android SDK 工具以及 API 21 或更高版本的 Android SDK 平台。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，并在 **SDK Platforms** 选项卡中安装您想要测试的平台版本：

![SDK 平台](../../../../static/img/v3/docs/android/sdk-platforms.png)

在 **SDK Tools** 选项卡中，确保至少安装了以下内容：

- Android SDK Build-Tools
- Android SDK Command-line Tools
- Android Emulator
- Android SDK Platform-Tools

![SDK 工具](../../../../static/img/v3/docs/android/sdk-tools.png)
