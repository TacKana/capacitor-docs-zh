---
title: Capacitor 所需依赖项
description: 不同平台所需的依赖项
contributors:
  - mlynch
  - dotNetkow
---

# Capacitor 所需依赖项

Capacitor 需要一系列依赖项，具体取决于您要构建的目标平台以及您开发所使用的操作系统。

## 基本要求

基础要求是 **[Node v8.6.0](https://nodejs.org) 或更高版本**，以及 **NPM 5.6.0 或更高版本**（通常随所需版本的 Node 自动安装）。

Capacitor 也支持使用 [yarn](https://yarnpkg.com)。

对于特定平台，请遵循以下各指南以确保安装了正确的依赖项。

## iOS 开发

要构建 iOS 应用，Capacitor 需要一台 **安装了 Xcode 11 或更高版本的 Mac**。或者，您也可以使用 [Ionic Appflow](https://ionicframework.com/appflow) 来为 iOS 构建应用，即使您在 Windows 上开发。

此外，您还需要安装 **[CocoaPods](https://cocoapods.org/)** (`sudo gem install cocoapods`)，并安装 **Xcode 命令行工具**（可通过 Xcode 安装，或运行 `xcode-select --install`）。

通常，Capacitor 的最新版本至少支持最近的两个 iOS 版本。

Capacitor 2.0 支持 iOS 11 及以上版本。

Capacitor 使用 WKWebView。

## Android 开发

Android 开发需要安装带有 **[Android Studio](https://developer.android.com/studio/index.html)** 的 **Android SDK**。从技术上讲，Android Studio 不是必需的，因为您也可以仅使用 Android CLI 工具来构建和运行应用，但使用 Android Studio 会让构建和运行应用变得更加容易，因此我们强烈建议使用它。

Capacitor 的 Android 版本支持比 iOS 更为复杂。目前，我们的目标是 API 级别 21 或更高，即 Android 5.0（Lollipop）及以上版本。这涵盖了超过 99% 的 Android 市场。

此外，Capacitor 需要 Chrome 50 或更高版本的 Android WebView。在 Android 5-6 和 10+ 上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。在 Android 7-9 上，[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView。