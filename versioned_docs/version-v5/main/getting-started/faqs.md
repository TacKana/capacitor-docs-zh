---
title: Frequently Asked Questions
description: 常见 Capacitor 问题解答
slug: /getting-started/faqs
sidebar_label: FAQs
---

# 常见问题解答

以下是关于 Capacitor 的常见问题列表。如果这里没有找到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[我们的 Discord](https://ionic.link/discord)。查看侧边栏可获取更多常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过官方和社区平台支持几乎所有设备。

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

Capacitor 还拥有针对跨平台桌面框架的社区平台。当前的社区目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须配合 Ionic Framework 使用 Capacitor 吗？

不！完全不需要！Capacitor 可以与**任何** Web 应用程序配合使用，不仅限于使用其他 Ionic 工具构建的应用程序。如果你想为 Capacitor 应用设计特定的外观和感觉，而 Ionic Framework 不适合你，你也不应该被迫使用它。应用商店中有许多应用都使用 Capacitor 而没有使用 Ionic Framework。

## 在哪里可以找到 Capacitor 项目的插件？

要查找项目插件，请按以下顺序检查以下位置。

### Capacitor 官方插件 ⚡

[Capacitor 官方插件](https://github.com/ionic-team/capacitor-plugins)是由 Capacitor 团队维护的一组插件，提供对常用原生 API 的访问。如果你需要插件，这应该是你首先查看的地方之一。

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。它们是优先为 Capacitor 开发的插件，处于活跃开发状态，应该可以在任何 Capacitor 3+ 项目中使用。如果找不到官方插件，这里应该是你查看的地方。

### Awesome Capacitor 😎

与其他许多 [Awesome 列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个由社区策划的优秀 Capacitor 插件列表。如果找不到官方或社区插件，很可能有人已经在这里制作了你需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队用于跟踪已添加到 Chromium 浏览器中的 Web API 的[追踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法同时在 Android 和 iOS 上支持，但像 [Web 分享](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)和[联系人管理器（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager)这样的功能，可能可以替代 `@capacitor/share` 或 `@capacitor-community/contacts` 来满足你的使用场景。

你可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些功能，而**不需要**任何原生插件。

### Cordova 插件 🔌

你知道吗？Capacitor 支持 Cordova 插件！如果你正在从 Cordova 迁移，或者有一个没有 Capacitor 等效插件的 Cordova 插件，你可以直接在 Capacitor 中使用大多数 Cordova 插件。你可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 能否在没有 Mac 的情况下使用 Capacitor 构建 iOS 应用？

简短回答：不能。更详细的解释是，虽然你可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但你将无法在设备或模拟器上测试你的应用程序。你应该始终确保在实际设备上测试你的应用程序，以确保你的 Capacitor 应用对使用 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会出现白屏？

Capacitor 需要 Android 5.1 以及 WebView 版本 60 或更高。如果你创建了 Android 6 或 7 的模拟器，最新的 WebView 版本将不会被安装，你会看到一个空白的白屏。要解决这个问题，你可以安装一个更新版本的 Android 模拟器来测试你的应用程序。

## 为什么在我的 Apple Silicon 设备上出现 CocoaPods 错误？

如果你使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且你使用的是 Apple Silicon 芯片的 Mac，在运行 `npx cap update` 时可能会遇到类似这样的错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与 `ffi` 未在 Apple Silicon 电脑上安装相关的 CocoaPods 错误。
我们推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
或者，如果你安装了 Rosetta，你可以在 `x86_64` 架构上安装 `ffi`，并在第一次使用时使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该就能正常工作了。