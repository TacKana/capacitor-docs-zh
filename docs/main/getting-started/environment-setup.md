---
title: 环境配置
description: 为 Capacitor 搭建开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 官方支持三种应用平台：Android、iOS 和 Web。要为这三个平台开发应用，需要安装以下所有依赖项。如果不需要开发某个原生移动平台的应用，可以跳过相应章节。

## 核心需求

开发任何 Capacitor 应用都需要 NodeJS 20 或更高版本。您可以通过以下方式安装 Node：
- 访问 [Node 官网](https://nodejs.org)下载安装包
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 通过包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 安装

安装完成后，在终端运行以下命令验证安装是否成功：

```bash
node --version
# v20.9.0
```

安装 Node 后，您就可以开始使用 Capacitor 开发渐进式 Web 应用（PWA）了。

## iOS 环境要求

构建 iOS 应用需要 **macOS** 系统。虽然在没有 Mac 的情况下可以使用 [Ionic Appflow](http://ionicframework.com/appflow) 等方案进行云端构建，但我们强烈建议在本地安装开发工具以便充分测试您的 Capacitor 应用。

开发 iOS 应用需要额外安装四个依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- Cocoapods

安装完核心需求以及上述工具后，您就能同时开发 iOS 应用和 PWA 了。

### Xcode

Xcode 是苹果公司开发 macOS/iOS/iPadOS 应用的集成开发环境。您可以通过 [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装。Capacitor 7 要求最低 Xcode 16.0 版本。

### Xcode 命令行工具

Xcode 命令行工具包含构建应用所需的额外组件。安装 Xcode 后，在终端运行以下命令安装：

```bash
xcode-select --install
```

输入密码等待安装完成后，可通过以下命令验证：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的包管理工具，用于安装 CocoaPods（适用于 Intel 和 Apple Silicon 芯片的 Mac）。

运行以下命令安装：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
这不是我们自创的！[brew.sh](https://brew.sh) 官方就是推荐这样安装 Homebrew。
:::

如果您不想安装 Homebrew，文末提供了替代方案（但不推荐）。

### CocoaPods

CocoaPods 是 iOS 依赖管理工具，Capacitor 用它来管理 iOS 项目的原生依赖。在终端运行以下命令安装：

```bash
brew install cocoapods
```

通过以下命令验证安装：

```bash
pod --version
# 1.12.1
```

#### 不通过 Homebrew 安装 CocoaPods

可以直接使用 Ruby Gem 安装：

```
sudo gem install cocoapods
```

如需免 sudo 安装，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 环境要求

开发 Android 应用需要额外安装两个组件：

- Android Studio
- Android SDK

:::note
无需单独安装 Java 开发工具包（JDK），Android Studio 会自动安装合适的版本。
:::

安装完核心需求和上述工具后，您就能开发 Android 应用和 PWA 了。

### Android Studio

Android Studio 是谷歌官方的 Android 开发工具。访问 [Android Studio 下载页面](https://developer.android.com/studio) 获取安装包。Capacitor 7 要求最低 Android Studio 2024.2.1 版本。

### Android SDK

安装 Android Studio 后，还需安装 Android SDK 组件包。

开发 Android 应用需要安装 Android SDK Tools 和 API 23 及以上版本的 Android SDK Platforms。

在 Android Studio 中，通过菜单栏打开 **Tools -> SDK Manager**，在 **SDK Platforms** 选项卡中选择需要测试的平台版本：

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

初学者只需安装一个 API 版本即可。上图展示了已安装的 Android 9（API 28）和 Android 10（API 29）SDK。当前最新稳定版是 Android 15（API 35）。