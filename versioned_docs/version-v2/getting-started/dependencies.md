---
title: Capacitor 所需依赖项
description: 不同平台所需的依赖项
contributors:
  - mlynch
  - dotNetkow
---

# Capacitor 所需依赖项

Capacitor 有许多依赖项，具体取决于您要针对哪些平台以及您在哪些操作系统上进行开发。

## 要求

基本要求是 **[Node v8.6.0](https://nodejs.org) 或更高版本**，以及 **NPM 5.6.0 或更高版本**（通常随所需的 Node 版本自动安装）。

Capacitor 也支持 [yarn](https://yarnpkg.com)。

对于特定平台，请按照以下指南确保您已安装正确的依赖项。

## iOS 开发

为了构建 iOS 应用，Capacitor 需要一台 **安装了 Xcode 11 或更高版本的 Mac**。或者，您可以使用 [Ionic Appflow](https://ionicframework.com/appflow) 即使在 Windows 上也能为 iOS 进行构建。

此外，您需要安装 **[CocoaPods](https://cocoapods.org/)**（`sudo gem install cocoapods`），并安装 **Xcode Command Line tools**（从 Xcode 安装，或运行 `xcode-select --install`）。

通常，最新版本的 Capacitor 始终支持至少最新的两个 iOS 版本。

Capacitor 2.0 支持 iOS 11+。

Capacitor 使用 WKWebView。

## Android 开发

Android 开发需要使用 **[Android Studio](https://developer.android.com/studio/index.html)** 安装 **Android SDK**。从技术上讲，Android Studio 不是必需的，您可以仅使用 Android CLI 工具来构建和运行应用，但它会使构建和运行应用变得容易得多，因此我们强烈建议使用它。

Capacitor 的 Android 版本支持比 iOS 更复杂。目前，我们针对 API 级别 21 或更高版本，即 Android 5.0（Lollipop）或更高版本。这代表了超过 99% 的 Android 市场。

此外，Capacitor 需要 Chrome 50 或更高版本的 Android WebView。在 Android 5-6 和 10+ 上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。在 Android 7-9 上，[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView。