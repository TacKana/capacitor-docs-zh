---
title: Capacitor 所需依赖项
description: 各平台运行所需的依赖组件
contributors:
  - mlynch
  - dotNetkow
---

# Capacitor 所需依赖项

Capacitor 根据您目标开发的平台和开发环境操作系统，需要安装不同的依赖组件。

## 基本要求

基础要求包括 **[Node.js v8.6.0](https://nodejs.org) 或更高版本**，以及 **NPM 5.6.0 或更高版本**（通常安装对应 Node 版本时会自动附带）。

Capacitor 也支持使用 [yarn](https://yarnpkg.com) 包管理器。

针对具体平台的开发，请参考以下指南确保安装了正确的依赖组件。

## iOS 开发要求

开发 iOS 应用需要 **配备 Xcode 11 或更高版本的 Mac 电脑**。若使用 Windows 系统，可通过 [Ionic Appflow](https://ionicframework.com/appflow) 进行 iOS 应用构建。

还需安装 **[CocoaPods](https://cocoapods.org/)** (`sudo gem install cocoapods`)，以及 **Xcode 命令行工具**（可通过 Xcode 安装或执行 `xcode-select --install` 命令）。

Capacitor 始终遵循支持最新两个 iOS 版本的惯例。

Capacitor 2.0 支持 iOS 11 及以上系统。

Capacitor 使用 WKWebView 作为网页视图组件。

## Android 开发要求

Android 开发需要安装 **[Android Studio](https://developer.android.com/studio/index.html)** 及其包含的 **Android SDK**。严格来说，虽然仅使用 Android CLI 工具也能构建运行应用，但 Android Studio 能显著简化开发流程，强烈建议安装使用。

Capacitor 对 Android 的版本支持比 iOS 更为复杂。当前我们的最低支持目标是 API 级别 21 及以上，即 Android 5.0（Lollipop）及以上系统，这已覆盖超过 99% 的 Android 市场份额。

此外，Capacitor 需要使用 Chrome 50 或更高版本的 Android WebView。具体而言：
- 在 Android 5-6 和 10+ 系统上使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
- 在 Android 7-9 系统上使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供的 WebView