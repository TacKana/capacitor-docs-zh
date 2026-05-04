---
title: 环境配置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 官方支持三种应用目标平台：Android、iOS 和 Web。要开发这三个平台的应用程序，你需要安装以下所有依赖项。如果你不打算开发某个原生移动平台的应用，可以跳过对应章节。

## 核心要求

要使用 Capacitor 开发任何应用程序，你需要安装 NodeJS 20 或更高版本。你可以通过以下几种方式安装 Node：
- 使用 [Node 官网](https://nodejs.org) 的安装程序
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 使用包管理器安装，例如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/)

安装 Node 后，打开你常用的终端并输入以下命令，确保 Node 已正确安装：

```bash
node --version
# v20.9.0
```

安装好 Node，你就可以开始使用 Capacitor 创建渐进式 Web 应用程序（PWA）了。

## iOS 要求 {#ios-requirements}

要构建 iOS 应用，你需要 **macOS** 系统。虽然存在像 [Ionic Appflow](http://ionicframework.com/appflow) 这样的解决方案，可以在没有 Mac 的情况下进行 iOS 云端构建，但强烈建议在本地安装相关工具，以便正确测试你的 Capacitor 应用程序。

要使用 Capacitor 开发 iOS 应用，你需要额外安装四个依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- CocoaPods

安装好核心要求以及 Xcode、Xcode 命令行工具和 CocoaPods 后，你就能创建 iOS 应用程序和 PWA 了。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用程序的集成开发环境（IDE）。你可以在 Mac 上通过 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 7 要求最低版本为 Xcode 16.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心功能之外的一些额外工具，用于构建和测试你的应用程序。安装 Xcode 后，你可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟让包安装完成后，你可以运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的软件包管理器。你需要安装它，以便在 Intel 和 Apple Silicon 架构的 Mac 上安装 CocoaPods。

运行以下 bash 命令来安装 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
请不要轻信我们！这是 [brew.sh](https://brew.sh) 官方推荐的 Homebrew 安装方式。
:::

如果你不想安装 Homebrew，可以在下方找到替代方案（但不推荐）。

### CocoaPods

CocoaPods 是 iOS 的依赖项管理器，Capacitor 使用它来安装和管理 iOS 项目的原生依赖。你可以在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

你可以运行以下命令来验证 CocoaPods 是否正确安装：

```bash
pod --version
# 1.12.1
```

#### 不使用 Homebrew 安装 CocoaPods

你可以直接使用 Ruby Gem 安装 CocoaPods。运行以下命令即可：

```
sudo gem install cocoapods
```

有关无需 sudo 权限运行的说明，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 要求

要使用 Capacitor 开发 Android 应用，你需要额外安装两个依赖项：

- Android Studio
- Android SDK

:::note
你不需要单独安装 Java 开发工具包（JDK）。Android Studio 会自动为你安装合适的 JDK。
:::

安装好核心要求以及 Android Studio 和 Android SDK 后，你就能创建 Android 应用程序和 PWA 了。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用程序的集成开发环境（IDE）。你可以前往 [Android Studio 下载页面](https://developer.android.com/studio) 进行安装。Capacitor 7 要求最低版本为 Android Studio 2024.2.1。

### Android SDK

安装 Android Studio 后，你需要安装一个 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。请确保安装 Android SDK 工具以及 API 23 或更高版本的 Android SDK 平台。

在 Android Studio 中，从菜单打开 **工具 -> SDK 管理器**，然后在 **SDK 平台** 标签页中安装你想要测试的平台版本：

![SDK 平台](/img/v6/docs/android/sdk-platforms.png)

刚开始时，你只需要安装一个 API 版本。在上图中，安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。目前最新的稳定版本是 Android 15（API 35）。