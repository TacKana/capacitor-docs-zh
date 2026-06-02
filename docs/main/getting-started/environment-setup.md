---
title: 环境搭建
description: 搭建 Capacitor 开发环境
slug: /getting-started/environment-setup
---

# 环境搭建

Capacitor 有三个官方支持的应用目标平台：Android、iOS 和 Web。为了在这三个平台上创建应用，你需要安装以下所有依赖。如果你不针对某个原生移动目标平台，可以跳过相应的部分。

## 核心要求

要使用 Capacitor 开发任何应用，你需要安装 NodeJS 22 或更高版本。你可以通过[Node 官网](https://nodejs.org)的安装程序、使用 [Volta](https://volta.sh/)（一个 JavaScript 工具管理器），或者通过 [Homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 等包管理器来安装 Node。

安装 Node 后，打开你选择的终端，输入以下命令以确保 Node 已正确安装：

```bash
node --version
# v22.21.1
```

安装 Node 后，你就可以开始使用 Capacitor 创建渐进式 Web 应用（PWA）了。

## iOS 要求

要构建 iOS 应用，你需要 **macOS**。虽然有一些解决方案（如 [Ionic Appflow](http://ionicframework.com/appflow)）可以在没有 Mac 的情况下进行 iOS 云端构建，但强烈建议在本地安装相关工具，以便正确测试你的 Capacitor 应用。

要使用 Capacitor 开发 iOS 应用，你需要额外安装两个依赖：

- Xcode
- Xcode Command Line Tools

安装完核心要求以及 Xcode、Xcode Command Line Tools 后，你将能够创建 iOS 应用和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用的 IDE。你可以通过 Mac 上的 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 8 要求最低 Xcode 版本为 26.0。

### Xcode Command Line Tools

Xcode Command Line Tools 是 Xcode 核心之外额外提供的工具，用于构建和测试你的应用。安装 Xcode 后，你可以通过在终端中运行以下命令来安装 Xcode Command Line Tools：

```bash
xcode-select --install
```

输入密码并等待几分钟完成安装后，你可以通过运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### 可选依赖

以下依赖在 iOS 上使用 Capacitor 时是可选的。

如果你需要使用 CocoaPods 作为原生 iOS 包的依赖管理器，那么你应该安装这两个包管理器：

- Homebrew
- CocoaPods

我们推荐使用 [Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs)（SPM）作为 iOS 的依赖管理器。如果你不需要 CocoaPods，那么你可以使用 SPM 并跳过这两个依赖的安装。

#### Homebrew

Homebrew 是 macOS 包的包管理器。你需要安装它以在 Intel 和 Apple Silicon Mac 上安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
别只相信我们！这就是 [brew.sh](https://brew.sh) 推荐的 Homebrew 安装方式。
:::

如果你不想安装 Homebrew，可以在下面找到备选方案（但不推荐）。

#### CocoaPods

CocoaPods 是 Capacitor 7 及更早版本中默认的 iOS 依赖管理器。从 Capacitor 8 开始，默认已替换为 SPM，但如果你的项目需要，你仍然可以通过在 `npx cap add ios` 命令后添加 `--packagemanager CocoaPods` 参数来使用 CocoaPods 作为替代方案。

你可以通过在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

你可以通过运行以下命令来验证 CocoaPods 是否已正确安装：

```bash
pod --version
# 1.12.1
```

##### 在不使用 Homebrew 的情况下安装 CocoaPods

你可以直接通过 Ruby Gem 安装 CocoaPods。要安装它，可以运行以下命令：

```
sudo gem install cocoapods
```

如需不使用 sudo 运行，请参阅 [CocoaPods 免 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)。

## Android 要求

要使用 Capacitor 开发 Android 应用，你需要额外安装两个依赖：

- Android Studio
- Android SDK 安装

:::note
你不需要单独安装 Java Development Kit（JDK）。Android Studio 会自动为你安装合适的 JDK。
:::

安装完核心要求以及 Android Studio 中的 Android SDK 后，你将能够创建 Android 应用和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用的 IDE。你可以通过访问 [Android Studio 下载页面](https://developer.android.com/studio) 来安装 Android Studio。Capacitor 8 要求最低 Android Studio 版本为 2025.2.1。

### Android SDK

安装 Android Studio 后，你需要安装 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。请确保安装了 Android SDK Tools，以及 API 24 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，然后在 **SDK Platforms** 标签页中安装你想要测试的平台版本：

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

开始时，你只需要安装一个 API 版本。上图中安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新的稳定版本是 Android 16（API 36）。
