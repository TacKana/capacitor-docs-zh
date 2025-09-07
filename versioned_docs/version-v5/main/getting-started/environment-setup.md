---
title: 环境配置
description: 搭建Capacitor开发环境
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor官方支持三种应用平台：Android、iOS和Web。要为所有平台开发应用，需要安装以下所有依赖项。如果不需要开发某个原生移动平台的应用，可以跳过相关章节。

## 核心需求

开发任何Capacitor应用都需要安装NodeJS 16或更高版本。可以通过以下方式安装Node：
- 使用[Node官网](https://nodejs.org)的安装程序
- 使用JavaScript工具管理器[Volta](https://volta.sh/)
- 通过包管理器如[homebrew](https://brew.sh/)或[Chocolatey](https://chocolatey.org/)安装

安装完成后，在终端执行以下命令验证Node是否正确安装：

```bash
node --version
# v18.3.0
```

安装好Node后，就可以开始使用Capacitor开发渐进式Web应用(PWA)了。

## iOS开发需求

构建iOS应用需要**macOS**系统。虽然可以通过[Ionic Appflow](http://ionicframework.com/appflow)等方案进行云端构建，但强烈建议在本地配置开发环境以便充分测试应用。

开发iOS应用需要额外安装四个依赖项：
- Xcode
- Xcode命令行工具
- Homebrew
- CocoaPods

安装好这些工具后，就能同时开发iOS应用和PWA了。

### Xcode

Xcode是苹果官方的开发工具，用于构建macOS、iOS和iPadOS应用。可在[Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)下载安装。Capacitor 5要求最低Xcode 14.1版本。

### Xcode命令行工具

这些工具是Xcode的补充组件。安装Xcode后，在终端执行以下命令安装：

```bash
xcode-select --install
```

输入密码等待安装完成后，可通过以下命令验证：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew是macOS的包管理工具，用于安装CocoaPods（支持Intel和Apple Silicon芯片）。安装命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
这不是我们随意推荐的安装方式，而是[brew.sh](https://brew.sh)官方建议的安装方法。
:::

如果不希望安装Homebrew，下文提供了替代方案（但不推荐）。

### CocoaPods

CocoaPods是iOS依赖管理工具，Capacitor用它来管理原生依赖。通过Homebrew安装：

```bash
brew install cocoapods
```

验证安装：

```bash
pod --version
# 1.12.1
```

#### 不使用Homebrew安装CocoaPods

可通过Ruby Gem直接安装：
```
sudo gem install cocoapods
```

但这种方式在Apple Silicon芯片的Mac上**无法直接运行**，需要通过Rosetta转译。先执行：

```bash
sudo arch -x86_64 gem install ffi
```

之后每次更新web代码时，需要执行：

```bash
npx cap copy
arch -x86_64 pod install
```

## Android开发需求

开发Android应用需要两个额外组件：
- Android Studio
- Android SDK

:::note
注意：无需单独安装Java开发工具包(JDK)，Android Studio会自动安装所需JDK。
:::

安装完成后即可开发Android应用和PWA。

### Android Studio

这是Google官方的Android开发IDE。从[下载页面](https://developer.android.com/studio)获取。Capacitor 5要求最低Android Studio 2022.2.1版本。

### Android SDK

安装Android Studio后，需安装SDK组件包。必须安装Android SDK Tools和API 22及以上版本的平台工具。

在Android Studio中，通过**工具 -> SDK管理器**菜单，在**SDK平台**标签页选择需要测试的平台版本：

![SDK平台](/img/v5/docs/android/sdk-platforms.png)

初始阶段只需安装一个API版本即可。图中安装了Android 9（API 28）和Android 10（API 29）的SDK。当前最新稳定版是Android 13（API 33）。