---
title: 环境设置
description: 设置 Capacitor 开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 官方支持三种应用程序目标平台：Android、iOS 和 Web。要为所有这三个平台创建应用程序，您需要安装以下所有依赖项。如果您不针对某个原生移动平台，可以跳过相关部分。

## 核心要求

为了使用 Capacitor 开发任何应用程序，您需要安装 NodeJS 22 或更高版本。您可以通过以下方式安装 Node：
* 使用 [Node 官网](https://nodejs.org)的安装程序
* 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
* 使用包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 进行安装。

安装 Node 后，打开您选择的终端并输入以下命令以确保 node 已正确安装：

```bash
node --version
# v22.21.1
```

安装 Node 后，您就可以开始使用 Capacitor 创建渐进式网络应用程序（PWA）。

## iOS 要求

要构建 iOS 应用，您需要 **macOS**。虽然也有像 [Ionic Appflow](http://ionicframework.com/appflow) 这样的解决方案可以在没有 Mac 的情况下执行 iOS 云构建，但强烈建议您在本地拥有这些工具，以便正确测试您的 Capacitor 应用程序。

要使用 Capacitor 开发 iOS 应用程序，您需要两个额外的依赖项：

*   Xcode
*   Xcode 命令行工具

安装完核心要求以及 Xcode、Xcode 命令行工具后，您将能够创建 iOS 应用程序和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用程序的 IDE。您可以在 Mac 上[通过 Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 8 最低要求 Xcode 26.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心未包含的额外工具，用于构建和测试您的应用程序。安装 Xcode 后，您可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟安装完成后，您可以运行以下命令验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### 可选依赖项

以下依赖项是在 iOS 上使用 Capacitor 的可选项。

如果您需要使用 CocoaPods 作为原生 iOS 包的依赖管理器，那么您应该安装以下两个包管理器：

*   Homebrew
*   CocoaPods

我们建议使用 [Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs)（SPM）作为 iOS 的依赖管理器。如果您不需要 CocoaPods，那么可以使用 SPM 并跳过这两个依赖项的安装。

#### Homebrew

Homebrew 是 macOS 软件包的包管理器。您需要安装它才能为 Intel 和 Apple Silicon Mac 安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
请不要只相信我们！这是 [brew.sh](https://brew.sh) 推荐的 Homebrew 安装方式。
:::

如果您不想安装 Homebrew，下面提供了替代但不推荐的方法。

#### CocoaPods

CocoaPods 是 Capacitor 7 及更早版本的默认 iOS 依赖管理器。自 Capacitor 8 起，默认管理器已替换为 SPM，但如果您的项目需要，您仍然可以通过向 `npx cap add ios` 命令传递 `--packagemanager CocoaPods` 参数来使用 CocoaPods 作为替代方案。

您可以通过在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

您可以运行以下命令来验证 CocoaPods 是否已正确安装：

```bash
pod --version
# 1.12.1
```

##### 不通过 Homebrew 安装 CocoaPods

您可以直接使用 Ruby Gem 安装 CocoaPods。要安装，可以运行以下命令：

```
sudo gem install cocoapods
```

关于如何在不使用 sudo 的情况下运行，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 要求

要使用 Capacitor 开发 Android 应用程序，您需要两个额外的依赖项：

*   Android Studio
*   Android SDK 安装

:::note
您不需要单独安装 Java 开发工具包（JDK）。Android Studio 会自动为您安装合适的 JDK。
:::

安装完核心要求以及 Android Studio 和 Android SDK 后，您将能够创建 Android 应用程序和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用程序的 IDE。您可以访问 [Android Studio 下载页面](https://developer.android.com/studio)进行安装。Capacitor 8 最低要求 Android Studio 2025.2.1。

### Android SDK

安装 Android Studio 后，您需要安装一个 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。请确保安装 Android SDK Tools 以及 API 24 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，然后在 **SDK Platforms** 选项卡中安装您想要测试的平台版本：

![SDK 平台](/img/v6/docs/android/sdk-platforms.png)

开始时，您只需要安装一个 API 版本即可。在上图中，安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新的稳定版本是 Android 16（API 36）。