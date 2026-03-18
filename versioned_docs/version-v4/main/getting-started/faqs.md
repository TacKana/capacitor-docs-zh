---
title: Frequently Asked Questions
description: Capacitor 常见问题解答
slug: /getting-started/faqs
sidebar_label: FAQs
---

# 常见问题解答

以下是关于 Capacitor 的常见问题列表。如果您在这里找不到答案，请查看 [我们的论坛](https://forum.ionicframework.com) 或 [我们的 Discord](https://ionic.link/discord)。您也可以通过侧边栏查看其他常见问题 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过官方和社区平台支持几乎所有设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 13+
- Android 5.1+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 也有社区平台来支持跨平台桌面框架。当前的社区目标平台如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须配合 Ionic Framework 使用 Capacitor 吗？

不！完全不需要！Capacitor 可以与**任何** Web 应用程序一起使用，而不仅仅是使用其他 Ionic 工具构建的应用程序。如果您希望为 Capacitor 应用提供特定的外观和感觉，而 Ionic Framework 不适合您，您不应该被迫使用它。两个应用商店中都有许多应用使用 Capacitor 但未使用 Ionic Framework。

## 在哪里可以找到适用于我的 Capacitor 项目的插件？

要查找适用于您项目的插件，请按以下顺序查看以下位置。

### Capacitor Community GitHub ⚡

[Capacitor Community GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。这些是 Capacitor 优先的插件，正在积极开发中，应该可以在任何 Capacitor 3+ 项目中运行。如果您需要插件，这应该是您首先查看的地方之一。

### Awesome Capacitor 😎

与许多其他 [Awesome 列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区策划的优秀 Capacitor 插件列表。如果您找不到官方或社区插件，很可能有人已经在这里制作了您要找的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队对已添加到 Chromium 浏览器中的 Web API 的[追踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法在 Android 和 iOS 上都得到支持，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager (仅限 Android)](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能，可能会替代您用例中的 `@capacitor/share` 或 `@capacitor-community/contacts` 插件。

您可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些功能，而**无需**任何原生插件。

### Cordova 插件 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正在从 Cordova 迁移，或者有一个没有 Capacitor 等效插件的 Cordova 插件，您可以直接在 Capacitor 中使用大多数 Cordova 插件。您可以在我们的指南中了解[如何在 Capacitor 中使用 Cordova 插件](https://capacitorjs.com/docs/plugins/cordova)。

## 我可以不用 Mac 来构建 iOS 应用吗？

简短回答：不能。更详细的答案是，虽然您可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但您将无法在设备或模拟器上测试您的应用程序。您应该始终确保使用物理设备测试您的应用程序，以确保您的 Capacitor 应用程序对使用 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会出现空白屏幕？

Capacitor 需要 Android 5.1 以及 WebView 版本为 60 或更高。例如，如果您创建一个 Android 6 或 7 的模拟器，最新版本的 WebView 将不会被安装，您会看到一个空白的白色屏幕。为了解决这个问题，您可以安装一个更新的 Android 模拟器来测试您的应用程序。

## 为什么在我的 Apple Silicon 设备上会出现 CocoaPods 错误？

如果您使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且您使用的是 Apple Silicon 芯片的 Mac，在运行 `npx cap update` 时可能会遇到类似这样的错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与 `ffi` 未在 Apple Silicon 电脑上正确安装相关的 CocoaPods 错误。
我们建议[使用 Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
或者，如果您安装了 Rosetta，您可以在 `x86_64` 架构上安装 `ffi` 并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该会按预期工作。