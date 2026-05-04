---
title: 环境配置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 官方支持三种应用目标平台：Android、iOS 和 Web。要为所有这三个平台创建应用程序，你需要安装以下所有依赖项。如果你不打算针对某个原生移动平台，可以跳过相关部分。

## 核心要求

要使用 Capacitor 开发任何应用程序，你需要安装 NodeJS 16 或更高版本。你可以通过以下方式安装 Node：
- 在 [Node 官网](https://nodejs.org) 使用安装程序
- 使用 [Volta](https://volta.sh/)（一个 JavaScript 工具管理器）
- 使用包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 安装

安装 Node 后，打开你选择的终端并输入以下命令，确保 Node 已正确安装：

```bash
node --version
# v18.3.0
```

安装 Node 后，你就可以开始使用 Capacitor 创建渐进式 Web 应用程序（PWA）了。

## iOS 要求 {#ios-requirements}

要构建 iOS 应用程序，你需要 **macOS** 系统。虽然如果你没有 Mac，可以使用像 [Ionic Appflow](http://ionicframework.com/appflow) 这样的解决方案来执行 iOS 云端构建，但强烈建议在本地安装这些工具，以便正确测试你的 Capacitor 应用程序。

要使用 Capacitor 开发 iOS 应用程序，你需要四个额外的依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- Cocoapods

安装好核心要求以及 Xcode、Xcode 命令行工具和 Cocoapods 后，你就能够创建 iOS 应用程序和 PWAs 了。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用程序的集成开发环境。你可以在 Mac 上通过 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 5 至少需要 Xcode 14.1。

### Xcode 命令行工具

Xcode 命令行工具是构建和测试应用程序所需的一些额外工具，不包含在 Xcode 的核心部分中。安装 Xcode 后，你可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟让软件包安装完成后，你可以运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的包管理器。你需要安装它，以便为 Intel 和 Apple Silicon 芯片的 Mac 安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
不要只相信我们！这是 [brew.sh](https://brew.sh) 推荐的 Homebrew 安装方式。
:::

如果你不想安装 Homebrew，可以在下面找到替代方案（但不推荐）的说明。

### CocoaPods

CocoaPods 是 iOS 的依赖管理器，Capacitor 使用它来安装和管理 iOS 项目的原生依赖项。你可以在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

你可以运行以下命令来验证 CocoaPods 是否正确安装：

```bash
pod --version
# 1.12.1
```

#### 不使用 Homebrew 安装 CocoaPods

你可以直接使用 Ruby Gem 安装 CocoaPods。运行以下命令进行安装：

```
sudo gem install cocoapods
```

但是，**这种方式安装的 CocoaPods 在 Apple Silicon 芯片的 Mac 上无法工作**。你需要通过启用 Rosetta 来运行 CocoaPods。为此，可以运行以下命令：

```bash
sudo arch -x86_64 gem install ffi
```

然后，每当你想将应用程序更新为使用更新的 Web 代码版本时，都需要运行以下命令：

```bash
npx cap copy
arch -x86_64 pod install
```

## Android 要求

要使用 Capacitor 开发 Android 应用程序，你需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
你不需要单独安装 Java 开发工具包（JDK）。Android Studio 会自动为你安装适当的 JDK。
:::

安装好核心要求以及带有 Android Studio 的 Android SDK 后，你就能够创建 Android 应用程序和 PWAs 了。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用程序的集成开发环境。你可以访问 [Android Studio 下载页面](https://developer.android.com/studio) 来安装 Android Studio。Capacitor 5 至少需要 Android Studio 2022.2.1。

### Android SDK

安装 Android Studio 后，你需要安装一个 Android SDK 软件包。

开发 Android 应用程序需要安装一些 Android SDK 软件包。请确保安装 Android SDK 工具，以及 API 22 或更高版本的 Android SDK 平台。

在 Android Studio 中，从菜单打开 **工具 -> SDK 管理器**，然后在 **SDK 平台** 标签页中安装你想要测试的平台版本：

![SDK 平台](/img/v5/docs/android/sdk-platforms.png)

开始时，你只需要安装一个 API 版本。在上图中，安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新的稳定版本是 Android 13（API 33）。