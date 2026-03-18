---
title: Frequently Asked Questions
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: FAQs
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果您在这里没有找到答案，请查看 [我们的论坛](https://forum.ionicframework.com) 或 [我们的 Discord](https://ionic.link/discord)。侧边栏也列出了高频问题 👉

## Capacitor 支持哪些平台？

Capacitor 几乎可以针对任何设备平台，包括官方和社区平台。

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

Capacitor 也有社区平台支持跨平台桌面框架。目前的社区目标平台如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须将 Ionic Framework 与 Capacitor 一起使用吗？

不！您不需要！Capacitor 适用于**任何** Web 应用程序，而不仅仅是使用其他 Ionic 工具构建的应用程序。如果您希望为您的 Capacitor 应用提供特定的外观和感觉，而 Ionic Framework 不适合您，您不必强制使用它。应用商店中有许多应用都使用 Capacitor 而没有使用 Ionic Framework。

## 在哪里可以找到我的 Capacitor 项目所需的插件？

要为您的项目查找插件，请按以下顺序检查以下位置。

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。它们是 Capacitor 优先的插件，积极开发，并且应该适用于任何 Capacitor 3+ 项目。如果您需要插件，这应该是您首先查看的地方之一。

### Awesome Capacitor 😎

像许多其他 [Awesome 列表](https://github.com/sindresorhus/awesome)一样，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区策划的优秀 Capacitor 插件列表。如果您找不到官方或社区插件，很可能有人已经在这里制作了您需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队对已添加到 Chromium 浏览器的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法同时在 Android 和 iOS 上受支持，但诸如 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 等功能，可能会替代 `@capacitor/share` 或 `@capacitor-community/contacts` 来满足您的需求。

您可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些功能，而**无需**任何原生插件。

### Cordova 插件 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正在从 Cordova 迁移，或者有一个没有 Capacitor 等效插件的 Cordova 插件，您可以直接在 Capacitor 中使用大多数 Cordova 插件。您可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)了解如何在 Capacitor 中使用 Cordova 插件。

## 没有 Mac 的情况下，我可以用 Capacitor 构建 iOS 应用吗？

简短回答：不能。更详细的解释是，虽然可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但您将无法在设备或模拟器上测试您的应用程序。您应该始终确保使用物理设备测试您的应用程序，以确保您的 Capacitor 应用程序对拥有 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会出现空白屏幕？

Capacitor 需要 Android 5.1 以及 WebView 版本 60 或更高。例如，如果您创建 Android 6 或 7 模拟器，将不会安装最新版本的 WebView，您会看到一个空白的白色屏幕。要解决这个问题，您可以安装一个更新的 Android 模拟器来测试您的应用程序。

## 为什么在我的 Apple Silicon 设备上出现 CocoaPods 错误？

如果您使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且您使用的是 Apple Silicon 芯片的 Mac，在运行 `npx cap update` 时可能会遇到类似这样的错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与 `ffi` 未在 Apple Silicon 电脑上安装相关的 CocoaPods 错误。
我们建议使用 [Homebrew 来安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
或者，如果您安装了 Rosetta，可以在 `x86_64` 架构上安装 `ffi`，并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该会按预期工作。