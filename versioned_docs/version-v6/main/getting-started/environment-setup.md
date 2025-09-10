---
title: 环境配置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor 官方支持三种应用目标平台：Android、iOS 和 Web。要为所有这三个平台创建应用，您需要安装以下全部依赖项。如果不需要针对某个原生移动平台，可以跳过相关章节。

## 核心要求

要使用 Capacitor 开发任何应用，您需要安装 NodeJS 18 或更高版本。可通过以下方式安装：
- 访问 [Node 官网](https://nodejs.org) 下载安装程序
- 使用 JavaScript 工具管理器 [Volta](https://volta.sh/)
- 通过包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 安装

安装 Node 后，在终端执行以下命令验证安装：

```bash
node --version
# v20.9.0
```

完成 Node 安装后，您就可以开始使用 Capacitor 开发渐进式网页应用 (PWA)。

## iOS 环境要求

构建 iOS 应用需要 **macOS** 系统。虽然可以通过 [Ionic Appflow](http://ionicframework.com/appflow) 等方案在没有 Mac 的情况下进行云端构建，但强烈建议在本地配置开发环境以便充分测试 Capacitor 应用。

开发 iOS 应用需要四个额外依赖项：
- Xcode
- Xcode 命令行工具
- Homebrew
- Cocoapods

安装核心要求及上述工具后，即可开发 iOS 应用和 PWA。

### Xcode

Xcode 是苹果官方开发工具，用于构建 macOS、iOS 和 iPadOS 应用。可通过 [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 安装。Capacitor 6 最低要求 Xcode 15.0。

### Xcode 命令行工具

这些工具包含 Xcode 核心未提供的额外功能，是应用构建和测试的必要组件。安装 Xcode 后，在终端执行：

```bash
xcode-select --install
```

输入密码等待安装完成后，可通过以下命令验证：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 包管理器，用于安装 CocoaPods（适用于 Intel 和 Apple Silicon 芯片）。

安装命令：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
安装方法与 [brew.sh](https://brew.sh) 官方推荐一致
:::

若不希望安装 Homebrew，后文提供替代方案（不推荐）。

### CocoaPods

CocoaPods 是 iOS 依赖管理工具，Capacitor 用它管理 iOS 项目的原生依赖。安装命令：

```bash
brew install cocoapods
```

验证安装：
```bash
pod --version
# 1.12.1
```

#### 不使用 Homebrew 安装 CocoaPods

可通过 Ruby Gem 直接安装：
```
sudo gem install cocoapods
```

注意：此方式在 Apple Silicon 芯片 Mac 上**无法正常使用**，需通过 Rosetta 转译运行。解决步骤：

```bash
sudo arch -x86_64 gem install ffi
```

后续更新网页代码时需执行：
```bash
npx cap copy
arch -x86_64 pod install
```

## Android 环境要求

开发 Android 应用需要两个额外组件：
- Android Studio
- Android SDK

:::note
无需单独安装 Java 开发工具包 (JDK)，Android Studio 会自动安装合适版本
:::

完成核心要求和 Android Studio 安装后，即可开发 Android 应用和 PWA。

### Android Studio

Android Studio 是谷歌官方开发工具。从 [下载页面](https://developer.android.com/studio) 获取安装包。Capacitor 6 最低要求 Android Studio 2023.1.1。

### Android SDK

安装 Android Studio 后，需要安装 SDK 组件包。

开发 Android 应用需安装 Android SDK Tools 和 API 22 及以上版本的平台组件。在 Android Studio 中：
1. 打开菜单 **Tools -> SDK Manager**
2. 在 **SDK Platforms** 标签页选择目标平台版本

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

初始阶段只需安装一个 API 版本即可。上图示例中安装了 Android 9 (API 28) 和 Android 10 (API 29)。当前最新稳定版为 Android 14 (API 34)。