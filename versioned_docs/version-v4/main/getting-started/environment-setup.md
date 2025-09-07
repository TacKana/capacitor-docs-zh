---
title: 环境配置
description: 配置Capacitor开发环境所需步骤
slug: /getting-started/environment-setup
---

# 环境配置

Capacitor官方支持三大应用平台：Android、iOS和Web。如需开发跨平台应用，您需要安装以下全部依赖项。若仅针对特定平台开发，可跳过对应章节。

## 核心需求

开发Capacitor应用需安装NodeJS 12或更高版本。您可通过以下方式安装：
- 访问[Node官网](https://nodejs.org)下载安装包
- 使用JavaScript工具管理器[Volta](https://volta.sh/)
- 通过包管理器如[homebrew](https://brew.sh/)或[Chocolatey](https://chocolatey.org/)安装

安装完成后，在终端执行以下命令验证Node是否安装成功：

```bash
node --version
# v18.3.0
```

安装Node后，即可开始使用Capacitor开发渐进式Web应用(PWA)。

## iOS开发环境

构建iOS应用必须使用**macOS**系统。虽可通过[Ionic Appflow](http://ionicframework.com/appflow)实现云端构建，但强烈建议配置本地环境以便充分测试。

iOS开发需额外安装四个组件：
- Xcode
- Xcode命令行工具
- Homebrew
- Cocoapods

安装完核心组件及上述工具后，即可同时开发iOS应用和PWA。

### Xcode

Xcode是苹果官方开发工具，可通过[Mac应用商店](https://apps.apple.com/us/app/xcode/id497799835?mt=12)安装。Capacitor 4要求最低Xcode 13版本。

### Xcode命令行工具

该工具包包含Xcode核心未集成的构建测试组件。安装Xcode后执行：

```bash
xcode-select --install
```

输入密码等待安装完成后，通过以下命令验证：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew是macOS包管理器，用于安装CocoaPods（支持Intel和Apple Silicon芯片）。安装命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
此安装方式与[brew.sh](https://brew.sh)官方推荐一致
:::

若不安装Homebrew，下文提供替代方案（不推荐）。

### CocoaPods

iOS依赖管理工具，执行以下命令安装：

```bash
brew install cocoapods
```

验证安装：

```bash
pod --version
# 1.11.3
```

#### 非Homebrew安装方案

可通过Ruby Gem直接安装：
```
sudo gem install cocoapods
```

注意：此方式在Apple Silicon芯片Mac上需通过Rosetta运行：
```bash
sudo arch -x86_64 gem install ffi
```

更新应用时需执行：
```bash
npx cap copy
arch -x86_64 pod install
```

## Android开发环境

Android开发需两个核心组件：
- Android Studio
- Android SDK

:::note
无需单独安装JDK，Android Studio会自动配置所需Java开发工具包。
:::

### Android Studio

谷歌官方开发工具，请从[官网下载](https://developer.android.com/studio)。Capacitor 4要求最低Android Studio 2020.1版本。

### Android SDK

安装完成后需配置SDK：
1. 打开Android Studio
2. 进入**Tools -> SDK Manager**
3. 在**SDK Platforms**选项卡安装API 22及以上版本

![SDK Platforms](/img/v4/docs/android/sdk-platforms.png)

初始阶段只需安装一个API版本即可（图示为API 28和29）。当前最新稳定版为Android 12（API 32）。