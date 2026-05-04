---
title: Environment Setup
description: Capacitor 开发环境配置指南
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 的依赖项取决于您要构建的目标平台以及您正在使用的开发操作系统。

## 基本要求

您至少需要安装 [NodeJS 12 LTS](https://nodejs.org) 或更高版本才能开始。针对特定平台，请按照下面的指南操作，以确保安装了正确的依赖项。

## iOS 开发 {#ios-development}

要构建 iOS 应用，您需要 **macOS** 操作系统。您还需要下载并安装 [Xcode](https://developer.apple.com/xcode/)。如果您在 Linux 或 Windows 上进行开发，可以跳过此部分。

> 如果您没有 Mac，可以使用 [Ionic Appflow](http://ionicframework.com/appflow) 进行 iOS 云端构建。

### CocoaPods

安装 [CocoaPods](https://cocoapods.org/)，它用于管理 iOS 平台的 Capacitor 包。

```bash
sudo gem install cocoapods
```

### Xcode 命令行工具

安装 **Xcode 命令行工具**：打开 **Xcode -> Preferences -> Locations**，并在下拉菜单中选择最新版本。

![Xcode 位置偏好设置](../../../../static/img/v3/docs/ios/xcode-preferences-location.png)

## Android 开发

要构建 Android 应用，您需要下载并安装 [Android Studio](https://developer.android.com/studio/index.html)。

### Android SDK

开发 Android 应用需要安装一些 Android SDK 包。请确保安装 Android SDK Tools，以及 API 21 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，然后在 **SDK Platforms** 标签页中安装您希望测试的平台版本：

![SDK 平台](../../../../static/img/v3/docs/android/sdk-platforms.png)

在 **SDK Tools** 标签页中，请确保至少安装以下项目：

- Android SDK Build-Tools
- Android SDK Command-line Tools
- Android Emulator
- Android SDK Platform-Tools

![SDK 工具](../../../../static/img/v3/docs/android/sdk-tools.png)