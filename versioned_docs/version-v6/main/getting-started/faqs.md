---
title: 常见问题解答
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果这里没有您需要的答案，可以访问 [我们的论坛](https://forum.ionicframework.com) 或 [Discord 社区](https://ionic.link/discord)。侧边栏也提供了常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 能够通过官方和社区平台支持几乎所有设备。

### 官方支持平台

Capacitor 官方支持以下平台：
- iOS 13+
- Android 5.1+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区支持平台

Capacitor 还通过社区平台支持跨平台桌面框架。当前社区支持的目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 必须配合 Ionic Framework 使用 Capacitor 吗？

完全不需要！Capacitor 可以与任何网页应用配合使用，而不仅限于 Ionic 工具开发的应用。如果您希望为 Capacitor 应用设计特定外观风格，而 Ionic Framework 不符合您的需求，您完全不必强制使用它。应用商店中有许多应用都使用了 Capacitor 而没有采用 Ionic Framework。

## 在哪里可以找到 Capacitor 项目所需的插件？

查找项目插件时，建议按以下顺序查看这些资源：

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了由优秀开发者社区创建的插件。这些都是专为 Capacitor 3+ 项目开发的优质插件，如果您需要插件，这里应该是您的首选查询地点。

### Awesome Capacitor 精选 😎

与其他 [Awesome 资源列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个由社区精选的优秀 Capacitor 插件列表。如果您找不到官方或社区插件，很可能您需要的插件已经在这里被开发者实现了。

### Project Fugu 计划 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪[已实现](https://fugu-tracker.web.app/#shipped)网页 API 的项目。虽然某些功能可能不兼容 Android 和 iOS，但如 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager (仅限 Android)](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 等功能，可能替代您项目中使用的 `@capacitor/share` 或 `@capacitor-community/contacts` 插件。

您可以通过 [Can I Use...?](https://caniuse.com) 查询这些功能在 Android 和 iOS 上的支持情况，无需依赖原生插件。

### Cordova 插件支持 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正从 Cordova 迁移，或者需要使用尚无 Capacitor 替代品的 Cordova 插件，大多数 Cordova 插件都可以直接在 Capacitor 中使用。请阅读我们关于 [如何在 Capacitor 中使用 Cordova 插件](https://capacitorjs.com/docs/plugins/cordova)的指南。

## 不使用 Mac 能构建 iOS 应用吗？

简短回答：不能。详细来说，虽然可以使用 [Ionic AppFlow](https://ionic.io/appflow) 等云服务，但您将无法在设备或模拟器上测试应用。为确保 Capacitor 应用对苹果设备用户可用，始终建议使用真机进行测试。

## 为什么 Android 模拟器运行时显示空白屏幕？

Capacitor 需要 Android 5.1 及以上版本，并且 WebView 版本需为 60 或更高。如果您创建的是 Android 6 或 7 模拟器，系统不会安装最新版 WebView，导致出现空白屏幕。解决方法是为测试应用安装新版 Android 模拟器。

## Apple Silicon 设备上出现 CocoaPods 错误怎么办？

如果您通过 `sudo gem install cocoapods` 安装了 CocoaPods 并在 Apple Silicon Mac 上运行 `npx cap update`，可能会遇到如下错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是与 `ffi` 在 Apple Silicon 电脑上安装相关的 CocoaPods 问题。
我们推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
另外，如果已安装 Rosetta，可以在 `x86_64` 架构下安装 `ffi` 并首次使用时通过模拟 Intel 架构运行 `pod install`：

```
$ sudo archanium -x86_64 gem install ffi
$ arch -x86_64 pod install
```

完成后，Capacitor 应该能够正常运行。