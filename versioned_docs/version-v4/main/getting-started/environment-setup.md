---
title: Environment Setup
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 官方支持三个应用目标平台：Android、iOS 和 Web。要为这三个平台开发应用，您需要安装以下所有依赖项。如果不针对某个原生移动平台，可以跳过相关章节。

## 核心要求

要使用 Capacitor 开发任何应用，您需要安装 NodeJS 12 或更高版本。可以通过以下方式安装 Node：
- 使用 [Node 官网](https://nodejs.org) 的安装程序
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 使用包管理器安装，如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/)

安装 Node 后，打开终端并输入以下命令确认 Node 已正确安装：

```bash
node --version
# v18.3.0
```

安装 Node 后，您就可以开始使用 Capacitor 创建渐进式 Web 应用程序（PWA）了。

## iOS 要求 {#ios-requirements}

要构建 iOS 应用，您需要 **macOS** 系统。虽然如果没有 Mac，可以使用 [Ionic Appflow](http://ionicframework.com/appflow) 等方案进行 iOS 云端构建，但强烈建议在本地安装相关工具，以便正确测试 Capacitor 应用。

要使用 Capacitor 开发 iOS 应用，您需要四个额外的依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- Cocoapods

安装核心要求以及 Xcode、Xcode 命令行工具和 Cocoapods 后，您就可以创建 iOS 应用和 PWA 了。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用的集成开发环境。可以通过 Mac 上的 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 4 至少需要 Xcode 13。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心未包含的额外工具，用于构建和测试应用。安装 Xcode 后，可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟完成安装后，可以运行以下命令验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的包管理器。无论是 Intel 还是 Apple Silicon 芯片的 Mac，都需要安装它来安装 CocoaPods。

运行以下 bash 命令安装 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
不要只听我们说的！这是 [brew.sh](https://brew.sh) 推荐的安装方式。
:::

如果不想安装 Homebrew，可以在下方找到替代方案；但不推荐这样做。

### CocoaPods

CocoaPods 是 iOS 依赖项管理器，Capacitor 使用它来安装和管理 iOS 项目的原生依赖项。可以在终端中运行以下命令安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

可以运行以下命令验证 CocoaPods 是否正确安装：

```bash
pod --version
# 1.11.3
```

#### 不使用 Homebrew 安装 CocoaPods

可以直接通过 Ruby Gem 安装 CocoaPods。运行以下命令安装：

```
sudo gem install cocoapods
```

但是，这种方式安装的 CocoaPods **无法**在 Apple Silicon 芯片的 Mac 上运行。需要通过 Rosetta 兼容模式运行 CocoaPods。可以运行以下命令：

```bash
sudo arch -x86_64 gem install ffi
```

然后，每当要更新应用以使用更新的 Web 代码时，需要运行以下命令：

```bash
npx cap copy
arch -x86_64 pod install
```

## Android 要求

要使用 Capacitor 开发 Android 应用，您需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
您不需要单独安装 Java 开发工具包（JDK）。Android Studio 会自动为您安装合适的 JDK。
:::

安装核心要求以及 Android Studio 和 Android SDK 后，您就可以创建 Android 应用和 PWA 了。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用的集成开发环境。可以访问 [Android Studio 下载页面](https://developer.android.com/studio) 进行安装。Capacitor 4 至少需要 Android Studio 2020.1。

### Android SDK

安装 Android Studio 后，需要安装 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。确保安装 Android SDK Tools 以及 API 22 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **工具 -> SDK 管理器**，在 **SDK 平台** 选项卡中安装您想要测试的平台版本：

![SDK 平台](/img/v4/docs/android/sdk-platforms.png)

开始时，您只需要安装一个 API 版本。上图中安装了 Android 9（API 28）和 Android 10（API 29）的 SDK。最新稳定版本是 Android 12（API 32）。