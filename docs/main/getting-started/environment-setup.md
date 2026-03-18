---
title: Environment Setup
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 官方支持三种应用平台：Android、iOS 和 Web。要为所有这三个平台创建应用，你需要安装以下所有依赖项。如果你的目标不包含某个原生移动平台，可以跳过相应部分。

## 核心要求

要使用 Capacitor 开发任何应用，你需要安装 NodeJS 22 或更高版本。你可以通过以下方式安装 Node：
- 在 [Node 官网](https://nodejs.org) 使用安装程序
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 使用包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 进行安装

安装 Node 后，打开你选择的终端并输入以下命令，确保 Node 已正确安装：

```bash
node --version
# v22.21.1
```

安装 Node 后，你就可以开始使用 Capacitor 创建渐进式 Web 应用 (PWA) 了。

## iOS 要求

要构建 iOS 应用，你需要 **macOS** 系统。虽然如果你没有 Mac，可以使用 [Ionic Appflow](http://ionicframework.com/appflow) 等解决方案执行云端 iOS 构建，但强烈建议在本地环境中安装相关工具，以便正确测试你的 Capacitor 应用。

要使用 Capacitor 开发 iOS 应用，你需要两个额外的依赖项：

- Xcode
- Xcode 命令行工具

安装好核心要求以及 Xcode 和 Xcode 命令行工具后，你将能够创建 iOS 应用和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用的集成开发环境。你可以通过 Mac 上的 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装 Xcode。Capacitor 8 至少需要 Xcode 26.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心功能之外的工具集，构建和测试应用时需要用到。安装 Xcode 后，你可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟让安装包完成后，你可以运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### 可选依赖项

以下依赖项是在 iOS 上使用 Capacitor 的可选项。

如果你需要使用 CocoaPods 作为原生 iOS 包的依赖管理器，则应安装以下两个包管理器：

- Homebrew
- CocoaPods

我们推荐使用 [Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs) (SPM) 作为 iOS 的依赖管理器。如果你不需要 CocoaPods，那么可以使用 SPM 并跳过这两个依赖项的安装。

#### Homebrew

Homebrew 是 macOS 的包管理器。若要为 Intel 和 Apple Silicon 芯片的 Mac 安装 CocoaPods，你需要先安装 Homebrew。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
别只听我们的一面之词！这是 [brew.sh](https://brew.sh) 官方推荐的 Homebrew 安装方式。
:::

如果你不想安装 Homebrew，下面提供了替代方案（但不推荐）。

#### CocoaPods

CocoaPods 是 Capacitor 7 及更早版本中默认的 iOS 依赖管理器。自 Capacitor 8 起，默认管理器已替换为 SPM。但如果你的项目需要，仍然可以通过向 `npx cap add ios` 命令传递 `--packagemanager CocoaPods` 参数来使用 CocoaPods 作为替代方案。

你可以在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

你可以运行以下命令来验证 CocoaPods 是否已正确安装。

```bash
pod --version
# 1.12.1
```

##### 在不使用 Homebrew 的情况下安装 CocoaPods

你可以直接使用 Ruby Gem 安装 CocoaPods。要安装它，请运行以下命令。

```
sudo gem install cocoapods
```

关于无需 sudo 权限的运行方式，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 要求

要使用 Capacitor 开发 Android 应用，你需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
你无需单独安装 Java 开发工具包 (JDK)。Android Studio
会自动为你安装合适的 JDK。
:::

安装好核心要求以及 Android Studio 和 Android SDK 后，你将能够创建 Android 应用和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用的集成开发环境。你可以访问 [Android Studio 下载页面](https://developer.android.com/studio) 进行安装。Capacitor 8 至少需要 Android Studio 2025.2.1。

### Android SDK

安装 Android Studio 后，你需要安装一个 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。请确保安装 Android SDK 工具，以及 API 24 或更高版本的 Android SDK 平台。

在 Android Studio 中，从菜单打开 **工具 -> SDK 管理器**，然后在 **SDK 平台** 标签页中安装你希望测试的 Android 平台版本：

![SDK 平台](/img/v6/docs/android/sdk-platforms.png)

刚开始时，你只需要安装一个 API 版本。在上图中，安装了 Android 9 (API 28) 和 Android 10 (API 29) 的 SDK。目前最新的稳定版本是 Android 16 (API 36)。