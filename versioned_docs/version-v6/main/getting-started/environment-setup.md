---
title: 环境配置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 官方支持三种应用目标平台：Android、iOS 和 Web。要开发针对所有这三个平台的应用程序，您需要安装以下所有依赖项。如果您不打算针对某个原生移动平台进行开发，可以跳过相关部分。

## 核心要求

要使用 Capacitor 开发任何应用程序，您需要安装 NodeJS 18 或更高版本。您可以通过以下方式安装 Node：
- 使用 [Node 官网](https://nodejs.org) 的安装程序
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 使用包管理器（如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/)）进行安装

安装 Node 后，打开您常用的终端并输入以下命令，以确认 Node 已正确安装：

```bash
node --version
# v20.9.0
```

安装 Node 后，您就可以开始使用 Capacitor 创建渐进式 Web 应用程序（PWA）。

## iOS 要求

要构建 iOS 应用，您需要 **macOS** 系统。虽然如果您没有 Mac，可以使用像 [Ionic Appflow](http://ionicframework.com/appflow) 这样的解决方案进行 iOS 云端构建，但强烈建议您本地安装这些工具，以便正确测试您的 Capacitor 应用程序。

要使用 Capacitor 开发 iOS 应用程序，您还需要四个额外的依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- CocoaPods

一旦您安装了核心要求以及 Xcode、Xcode 命令行工具和 CocoaPods，您将能够创建 iOS 应用程序和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用程序的集成开发环境。您可以在 Mac 上通过 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 6 至少需要 Xcode 15.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心未包含的额外工具，用于构建和测试您的应用程序。安装 Xcode 后，您可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟让软件包安装完成后，您可以通过运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的软件包管理器。您需要安装它以便为 Intel 和 Apple Silicon 芯片的 Mac 安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
别光信我们说的！这是 [brew.sh](https://brew.sh) 推荐的 Homebrew 安装方式。
:::

如果您不想安装 Homebrew，可以在下方找到替代（但不推荐）的安装说明。

### CocoaPods

CocoaPods 是一个 iOS 依赖管理器，Capacitor 使用它来安装和管理您的 iOS 项目的原生依赖项。您可以在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

您可以通过运行以下命令来验证 CocoaPods 是否已正确安装：

```bash
pod --version
# 1.12.1
```

#### 不通过 Homebrew 安装 CocoaPods

您可以直接使用 Ruby Gem 安装 CocoaPods。为此，您可以运行以下命令：
```
sudo gem install cocoapods
```

但是，**这种方式** 在 Apple Silicon 芯片的 Mac 上将无法正常工作。您需要通过启用了 Rosetta 的环境来运行 CocoaPods。为此，您可以运行以下命令：

```bash
sudo arch -x86_64 gem install ffi
```

之后，每当您想更新应用程序以使用新版 Web 代码时，都需要运行以下命令：

```bash
npx cap copy
arch -x86_64 pod install
```

## Android 要求

要使用 Capacitor 开发 Android 应用程序，您需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
您不需要单独安装 Java 开发工具包（JDK）。Android Studio 会自动为您安装合适的 JDK。
:::

一旦您安装了核心要求以及带有 Android Studio 的 Android SDK，您将能够创建 Android 应用程序和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用程序的集成开发环境。您可以前往 [Android Studio 下载页面](https://developer.android.com/studio) 进行安装。Capacitor 6 至少需要 Android Studio 2023.1.1。

### Android SDK

安装 Android Studio 后，您需要安装一个 Android SDK 软件包。

开发 Android 应用需要安装一些 Android SDK 软件包。请确保安装 Android SDK 工具以及 API 22 或更高版本的 Android SDK 平台。

在 Android Studio 中，从菜单打开 **工具 -> SDK 管理器**，然后在 **SDK 平台** 标签页中安装您想要测试的平台版本：

![SDK 平台](/img/v6/docs/android/sdk-platforms.png)

开始时，您只需安装一个 API 版本。在上图中，安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新的稳定版本是 Android 14（API 34）。