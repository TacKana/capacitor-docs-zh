---
title: 常见问题解答
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: FAQs
---

# 常见问题解答

以下是一些 Capacitor 的常见问题。如果您在这里找不到答案，请查看[我们的论坛](https://forum.ionicframework.com)或 [Discord](https://ionic.link/discord)。查看侧边栏以获取常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过我们的官方和社区平台支持几乎任何设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 13+
- Android 5.1+
  - 需要 Chrome WebView 60+
- 现代 Web 浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 也有针对跨平台桌面框架的社区平台。当前的社区目标如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我需要将 Ionic Framework 与 Capacitor 一起使用吗？

不，不需要！Capacitor 可以与**任何** Web 应用配合使用，不仅仅是使用其他 Ionic 工具构建的应用。如果您希望为 Capacitor 应用实现特定的外观和感觉，而 Ionic Framework 不是适合您的 UI 工具包，您不应该感到被迫使用它。两个应用商店中有大量应用使用了 Capacitor 而没有使用 Ionic Framework。

## 在哪里可以找到我的 Capacitor 项目的插件？

要为您的项目找到插件，您应该按以下顺序查看以下地方。

### Capacitor 官方插件 ⚡

[Capacitor 官方插件](https://github.com/ionic-team/capacitor-plugins)是由 Capacitor 团队维护的一组 Capacitor 插件，提供对常用原生 API 的访问。如果您需要插件，这应该是您首先查找的地方之一。

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们出色的开发者社区创建的插件。它们是优先为 Capacitor 开发的插件，正在积极开发中，并且应该可以在任何 Capacitor 3+ 项目中使用。如果您找不到官方插件，这应该是您查找的地方。

### Awesome Capacitor 😎

像许多其他 [Awesome 列表](https://github.com/sindresorhus/awesome)一样，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区精选的优质 Capacitor 插件列表。如果您找不到官方或社区插件，很可能已经有人在这里制作了您正在寻找的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队用于跟踪已添加到 Chromium 浏览器的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能不支持 Android 和 iOS 两者，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能可能会替代您的用例中的 `@capacitor/share` 或 `@capacitor-community/contacts`。

您可以使用 [Can I Use...?](https://caniuse.com) 来检查您是否可以在 Android 和 iOS 上使用这些功能，而**无需**任何原生插件。

### Cordova 插件 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正在从 Cordova 迁移，或者有一个没有对应 Capacitor 版本的 Cordova 插件，您可以直接在 Capacitor 中使用大多数 Cordova 插件。您可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 我可以在没有 Mac 的情况下使用 Capacitor 构建 iOS 应用吗？

简短的回答是，不能。更长的回答是，虽然您可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但您将无法在设备或模拟器上测试您的应用。您应该始终确保使用物理设备测试您的应用，以确保您的 Capacitor 应用对使用 Apple 产品的人是可用的。

## 为什么在 Android 模拟器上运行时会看到空白屏幕？

Capacitor 需要 Android 5.1 以及 WebView 版本 60 或更高版本。例如，如果您创建 Android 6 或 7 的模拟器，将不会安装最新版本的 WebView，您会看到空白的白屏。为了解决这个问题，您可以安装更新的 Android 模拟器来测试您的应用。

## 为什么我在 Apple Silicon 设备上遇到 CocoaPods 错误？

如果您使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且使用的是 Apple Silicon 驱动的 Mac，则在运行 `npx cap update` 时可能会遇到类似以下的情况：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与 `ffi` 未在 Apple Silicon 计算机上安装相关的 CocoaPods 错误。我们建议[使用 Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。或者，如果您已安装 Rosetta，可以在 `x86_64` 架构上安装 `ffi`，并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该可以正常工作。
