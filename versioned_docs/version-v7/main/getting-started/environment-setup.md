---
title: 环境设置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 有三个官方支持的应用目标：Android、iOS 和 Web。要同时为这三个平台创建应用，你需要安装以下所有依赖项。如果你不 targeting 某个原生移动目标，可以跳过相关部分。

## 核心要求

要使用 Capacitor 开发任何应用，你需要安装 NodeJS 20 或更高版本。你可以通过 [Node 官网](https://nodejs.org) 的安装程序、使用 [Volta](https://volta.sh/)（一个 JavaScript 工具管理器）、或使用像 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 这样的包管理器来安装 Node。

安装 Node 后，打开你选择的终端并输入以下命令以确保 Node 正确安装：

```bash
node --version
# v20.9.0
```

安装了 Node 后，你就可以开始使用 Capacitor 创建渐进式 Web 应用（PWA）了。

## iOS 要求

要构建 iOS 应用，你需要 **macOS**。虽然有一些解决方案如 [Ionic Appflow](http://ionicframework.com/appflow) 可以在你没有 Mac 的情况下用于执行 iOS 云构建，但强烈建议你在本地拥有可用的工具，以便正确测试你的 Capacitor 应用。

要使用 Capacitor 开发 iOS 应用，你需要额外四个依赖项：

- Xcode
- Xcode Command Line Tools
- Homebrew
- Cocoapods

安装核心要求以及 Xcode、Xcode Command Line Tools 和 Cocoapods 后，你将能够创建 iOS 应用和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用的 IDE。你可以[通过 Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 在你的 Mac 上安装 Xcode。Capacitor 7 最低需要 Xcode 16.0。

### Xcode Command Line Tools

Xcode 命令行工具是 Xcode 核心未包含的附加工具，用于构建和测试你的应用。安装 Xcode 后，你可以通过在终端中运行以下命令来安装 Xcode Command Line Tools：

```bash
xcode-select --install
```

输入密码并等待几分钟完成安装后，你可以通过运行以下命令验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 包的包管理器。你需要安装它以在 Intel 和 Apple Silicon Mac 上安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
不只是我们这么说！[brew.sh](https://brew.sh) 也推荐这样安装 Homebrew。
:::

如果你不想安装 Homebrew，下面提供了替代（但不推荐）的说明。

### CocoaPods

CocoaPods 是一个 iOS 依赖管理器，Capacitor 使用它来安装和管理 iOS 项目的原生依赖项。你可以通过在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

你可以通过运行以下命令来验证 CocoaPods 是否正确安装：

```bash
pod --version
# 1.12.1
```

#### 不通过 Homebrew 安装 CocoaPods

你可以直接使用 Ruby Gem 安装 CocoaPods。运行以下命令即可安装：

```
sudo gem install cocoapods
```

关于无需 sudo 的运行方式，请参见 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)。

## Android 要求

要使用 Capacitor 开发 Android 应用，你需要额外两个依赖项：

- Android Studio
- Android SDK 安装

:::note
你不需要单独安装 Java Development Kit（JDK）。Android Studio 会自动为你安装合适的 JDK。
:::

安装核心要求以及 Android Studio 和 Android SDK 后，你将能够创建 Android 应用和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用的 IDE。你可以通过访问 [Android Studio 下载页面](https://developer.android.com/studio) 来安装 Android Studio。Capacitor 7 最低需要 Android Studio 2024.2.1。

### Android SDK

安装 Android Studio 后，你需要安装 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。确保安装了 Android SDK Tools 以及 API 23 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，然后在 **SDK Platforms** 选项卡中安装你想要测试的平台版本：

![SDK 平台](/img/v6/docs/android/sdk-platforms.png)

开始时，你只需要安装一个 API 版本。上图中安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新的稳定版本是 Android 15（API 35）。
